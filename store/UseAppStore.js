// store/UseAppStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../api/ApiService'; 
import { supabase } from '../lib/SupabaseClient';

const INITIAL_FAVORITES = [
  { id: '1', title: 'Пицца', image: require('../assets/pizza.png') },
  { id: '2', title: 'Утка по-пекински', image: require('../assets/duck.png') },
  { id: '3', title: 'Суши', image: require('../assets/sushi.png') },
  { id: '4', title: 'Моти', image: require('../assets/mochi.png') },
  { id: '5', title: 'Долма', image: require('../assets/dolma.png') },
  { id: '6', title: 'Шакшука', image: require('../assets/shakshuka.png') },
];

const INITIAL_FRIDGE = {
  veg: [
    { id: '1', name: 'Картофель', amount: '500 гр.', date: '02.11.2026' },
    { id: '2', name: 'Помидор', amount: '250 гр.', date: '' },
    { id: '3', name: 'Огурец', amount: '300 гр.', date: '01.11.2026' },
  ],
  fruits: [
    { id: '4', name: 'Яблоко', amount: '90 гр.', date: '' },
    { id: '5', name: 'Мандарин', amount: '100 гр.', date: '01.11.2026' },
    { id: '6', name: 'Банан', amount: '150 гр.', date: '31.10.2026' },
  ],
  meat: [
    { id: '7', name: 'Говядина', amount: '1000 гр.', date: '02.11.2026' },
    { id: '8', name: 'Курица', amount: '500 гр.', date: '02.11.2026' },
    { id: '9', name: 'Лосось', amount: '450 гр.', date: '' },
  ],
  dairy: [
    { id: '10', name: 'Молоко', amount: '750 мл.', date: '02.11.2026' },
    { id: '11', name: 'Яйца', amount: '30 шт.', date: '' },
    { id: '12', name: 'Сметана', amount: '450 гр.', date: '' },
  ]
};

const customStorage = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    console.log(`[Persist] Загрузка ${name}:`, value ? 'Успешно' : 'Пусто');
    return value;
  },
  setItem: async (name, value) => {
    console.log(`[Persist] Сохранение ${name}`);
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name) => {
    console.log(`[Persist] Удаление ${name}`);
    await AsyncStorage.removeItem(name);
  },
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      // --- ПОЛЬЗОВАТЕЛЬ ---
      user: null,
      isLoadingAuth: false,

      signIn: async (email, password) => {
        set({ isLoadingAuth: true });
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          set({ isLoadingAuth: false });
          return { error: error.message };
        }
        set({ user: data.user, isLoadingAuth: false });
        return { success: true };
      },

      signUp: async (email, password, name) => {
        set({ isLoadingAuth: true });
        const { data, error } = await supabase.auth.signUp({ 
          email, password,
          options: { data: { full_name: name } }
        });
        if (error) {
          set({ isLoadingAuth: false });
          return { error: error.message };
        }
        set({ user: data.user, isLoadingAuth: false });
        return { success: true };
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },

      checkSession: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) set({ user: session.user });
      },

      // --- ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ (С ПРИНУДИТЕЛЬНЫМ ОБНОВЛЕНИЕМ СЕССИИ) ---
      updateUser: async (data) => {
        try {
          // 1. Проверяем сессию
          const { data: { session } } = await supabase.auth.getSession();
          
          if (!session) {
            const { error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
              return { error: 'Сессия истекла. Войдите в аккаунт заново.' };
            }
          }

          // 2. Обновляем данные в Supabase
          const { data: { user }, error } = await supabase.auth.updateUser({
            data: { 
              full_name: data.name,
              phone: data.phone 
            }
          });

          if (error) throw error;

          // 3. ГЛАВНОЕ: Принудительно обновляем сессию, чтобы получить новый токен с именем
          await supabase.auth.refreshSession();

          // 4. Обновляем локальный стор
          set((state) => ({ 
            user: state.user ? { ...state.user, ...data } : data 
          }));
          
          return { success: true };
        } catch (error) {
          console.error('Ошибка обновления профиля:', error);
          return { error: error.message };
        }
      },

      // --- РЕЦЕПТЫ ---
      recipes: [],
      isLoading: false,
      error: null, 

      fetchRecipes: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiService.getRecipes();
          set({ recipes: data, isLoading: false });
        } catch (err) {
          set({ error: err.message || 'Ошибка загрузки', isLoading: false });
        }
      },

      // --- ИЗБРАННОЕ ---
      favorites: INITIAL_FAVORITES,
      removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter((item) => item.id !== id) })),
      addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),

      // --- ХОЛОДИЛЬНИК ---
      fridgeItems: INITIAL_FRIDGE,
      addFridgeItem: (category, item) => set((state) => ({
        fridgeItems: { ...state.fridgeItems, [category]: [{ id: Date.now().toString(), ...item }, ...state.fridgeItems[category]] }
      })),
      updateFridgeItem: (category, id, updatedItem) => set((state) => ({
        fridgeItems: { ...state.fridgeItems, [category]: state.fridgeItems[category].map(p => p.id === id ? { ...p, ...updatedItem } : p) }
      })),
      deleteFridgeItem: (category, id) => set((state) => ({
        fridgeItems: { ...state.fridgeItems, [category]: state.fridgeItems[category].filter(p => p.id !== id) }
      })),
    }),
    {
      name: 'app-storage-v8',
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({ 
        recipes: state.recipes, 
        favorites: state.favorites, 
        fridgeItems: state.fridgeItems 
      }),
    }
  )
);