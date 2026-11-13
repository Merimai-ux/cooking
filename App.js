// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { COLORS } from './constants/colors';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { preloadImages } from './constants/PreloadImages';
import { useAppStore } from './store/UseAppStore'; 

// Не даем заставке исчезнуть автоматически
SplashScreen.preventAutoHideAsync();

// --- ПОЛНАЯ ТЕМА НАВИГАЦИИ (С ПОЛЕМ text) ---
const navTheme = {
  dark: false,
  colors: {
    primary: COLORS.PRIMARY,
    background: COLORS.GRADIENT_START, 
    card: COLORS.WHITE,
    text: COLORS.PRIMARY,          // <-- ИСПРАВЛЕНИЕ ОШИБКИ
    border: 'transparent',
    notification: COLORS.PRIMARY,  // <-- Добавлено для совместимости
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '600' },
    heavy: { fontFamily: 'System', fontWeight: '700' },
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const checkSession = useAppStore((state) => state.checkSession);

  useEffect(() => {
    async function prepare() {
      try {
        // Восстанавливаем сессию пользователя из Supabase
        await checkSession();
        // Загружаем все картинки в кэш
        await preloadImages();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  // Пока идет загрузка, показываем заставку
  if (!appIsReady) {
    return null; 
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
      <RootNavigator /> 
    </NavigationContainer>
  );
}