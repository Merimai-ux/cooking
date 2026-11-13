// api/ApiService.js
const BASE_URL = 'https://dummyjson.com';

export const apiService = {
  // Получение списка рецептов
  getRecipes: async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes?limit=10`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.recipes; // Возвращаем массив рецептов
    } catch (error) {
      console.error('Ошибка при получении рецептов:', error);
      throw error;
    }
  },
};