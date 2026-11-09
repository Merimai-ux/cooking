import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'; // Импорт картинки
import { COLORS } from '../constants/colors';

// Ваши экраны
import HomeScreen from '../screens/HomeScreen';
import FridgeScreen from '../screens/FridgeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Ваша картинка (убедитесь, что она лежит в assets)
import FridgeIcon from '../assets/fridge-icon.png'; 

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 64, backgroundColor: COLORS.WHITE, borderTopWidth: 0, elevation: 10 },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_MUTED,
        
        tabBarIcon: ({ focused, color, size }) => {
          // Если это экран "Холодильник", показываем картинку
          if (route.name === 'Холодильник') {
            return (
             <Image 
                source={FridgeIcon} 
                style={{ width: 40, height: 40, tintColor: color }}
                resizeMode="contain"
              />
            );
          }

          // Для остальных экранов — векторные иконки
          let iconName;
          if (route.name === 'Главная') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Поиск') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Избранное') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Профиль') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* ВОТ ЭТИ СТРОКИ ДОЛЖНЫ БЫТЬ ОБЯЗАТЕЛЬНО */}
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Холодильник" component={FridgeScreen} />
      <Tab.Screen name="Поиск" component={SearchScreen} />
      <Tab.Screen name="Избранное" component={FavoritesScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
}