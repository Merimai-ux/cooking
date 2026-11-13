// api/MealService.js

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealsByIngredient = async (ingredient) => {
  try {
    const encodedIngredient = encodeURIComponent(ingredient.toLowerCase().replace(/\s+/g, '_'));
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodedIngredient}`);
    
    if (!response.ok) throw new Error('Ошибка сети');
    
    const data = await response.json();
    return data.meals || []; 
  } catch (error) {
    console.error('Ошибка поиска блюд:', error);
    return [];
  }
};

export const getMealDetailsById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error('Ошибка сети');
    
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Ошибка получения деталей рецепта:', error);
    return null;
  }
};