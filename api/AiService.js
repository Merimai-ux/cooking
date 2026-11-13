// api/AiService.js

// Ключ авторизации из .env (должен начинаться с EXPO_PUBLIC_)
const AUTH_KEY = process.env.EXPO_PUBLIC_GIGACHAT_AUTH_KEY;

// 1. Получение временного токена (живет 30 минут)
const getAccessToken = async () => {
  try {
    const response = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': '123e4567-e89b-12d3-a456-426614174000', // Уникальный ID запроса
        'Authorization': `Basic ${AUTH_KEY}`,
      },
      body: 'scope=GIGACHAT_API_PERS', // Доступ для физлиц
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка получения токена:', response.status, errorText);
      throw new Error('Не удалось получить токен');
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Ошибка получения токена GigaChat:', error);
    throw error;
  }
};

// 2. Генерация рецепта по списку продуктов
export const generateRecipeWithAI = async (products) => {
  const token = await getAccessToken();
  if (!token) throw new Error('Не удалось получить токен');

  // Формируем список продуктов для промпта
  const productList = products.map(p => p.name).join(', ');
  
  const prompt = `Ты — профессиональный повар. Придумай простой и вкусный рецепт, используя следующие продукты: ${productList}. 
  Ответь строго в формате JSON без лишнего текста:
  {
    "title": "Название блюда",
    "ingredients": ["Ингредиент 1 - количество", "Ингредиент 2 - количество"],
    "steps": ["Шаг 1", "Шаг 2", "Шаг 3"]
  }`;

  try {
    const response = await fetch('https://api.giga.chat/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'GigaChat',
        messages: [
          { role: 'system', content: 'Ты помощник на кухне. Отвечай только валидным JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка генерации:', response.status, errorText);
      throw new Error('Ошибка генерации рецепта');
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;
    
    // Очищаем от возможных markdown-тегов ```json ... ```
    const cleanJson = recipeText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Ошибка генерации рецепта:', error);
    throw error;
  }
};