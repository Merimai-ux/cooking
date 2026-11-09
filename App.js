import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator'; // <-- Меняем импорт
import { COLORS } from './constants/colors';
import { StatusBar } from 'expo-status-bar';

const navTheme = {
  dark: false,
  colors: {
    primary: COLORS.PRIMARY,
    background: COLORS.GRADIENT_START, 
    card: COLORS.WHITE,
    text: COLORS.PRIMARY,
    border: 'transparent',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '600' },
    heavy: { fontFamily: 'System', fontWeight: '700' },
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
      <RootNavigator /> {/* <-- Рендерим RootNavigator */}
    </NavigationContainer>
  );
}