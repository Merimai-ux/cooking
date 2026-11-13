// navigation/MainTabNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <-- 1. ИМПОРТ
import { COLORS } from '../constants/colors';
import { useDeviceType } from '../utils/Device'; 

// Ваши экраны
import HomeScreen from '../screens/HomeScreen';
import FridgeScreen from '../screens/FridgeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Ваша картинка
import FridgeIcon from '../assets/fridge-icon.png'; 

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { isTablet } = useDeviceType(); 
  const insets = useSafeAreaInsets(); // <-- 2. ПОЛУЧАЕМ ОТСТУПЫ УСТРОЙСТВА

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        
        // Принудительно текст под иконкой
        tabBarLabelPosition: 'below-icon', 
        
        tabBarStyle: { 
          // Базовая высота + отступ безопасной зоны (для кнопок навигации Android)
          height: (isTablet ? 90 : 64) + insets.bottom, 
          
          // Добавляем отступ снизу, чтобы контент не перекрывался системной панелью
          paddingBottom: insets.bottom > 0 ? insets.bottom : (isTablet ? 15 : 5), 
          
          paddingTop: isTablet ? 10 : 5, 
          backgroundColor: COLORS.WHITE, 
          borderTopWidth: 0, 
          elevation: 10 
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_MUTED,
        
        tabBarLabelStyle: {
          fontSize: isTablet ? 14 : 10,
          fontWeight: '500',
          marginBottom: isTablet ? 5 : 0,
        },

        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Холодильник') {
            return (
             <Image 
                source={FridgeIcon} 
                style={{ 
                  width: isTablet ? 45 : 32, 
                  height: isTablet ? 45 : 32, 
                  tintColor: color 
                }}
                resizeMode="contain"
              />
            );
          }

          let iconName;
          if (route.name === 'Главная') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Поиск') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Избранное') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Профиль') iconName = focused ? 'person' : 'person-outline';

          const iconSize = isTablet ? 32 : 24;

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Холодильник" component={FridgeScreen} />
      <Tab.Screen name="Поиск" component={SearchScreen} />
      <Tab.Screen name="Избранное" component={FavoritesScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
}