// navigation/RootNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import RecipeScreen from '../screens/RecipeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';

// --- НОВЫЕ ЭКРАНЫ ---
import HistoryScreen from '../screens/HistoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import PreferencesScreen from '../screens/PreferencesScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
      
      {/* --- НОВЫЕ МАРШРУТЫ --- */}
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
    </Stack.Navigator>
  );
}