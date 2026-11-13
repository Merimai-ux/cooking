// screens/CreateRecipeScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { searchMealsByIngredient, getMealDetailsById } from '../api/MealService';
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

const ingredientMap = {
  'Говядина': 'beef', 'Курица': 'chicken', 'Яйца': 'eggs', 'Молоко': 'milk',
  'Сметана': 'sour_cream', 'Помидор': 'tomato', 'Огурец': 'cucumber',
  'Картофель': 'potato', 'Яблоко': 'apple', 'Банан': 'banana',
  'Мандарин': 'mandarin', 'Лосось': 'salmon', 'Сыр': 'cheese',
  'Лук': 'onion', 'Чеснок': 'garlic',
};

export default function CreateRecipeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ
  
  const availableProducts = route.params?.availableProducts || [];
  const [selected, setSelected] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSelect = (product) => {
    if (selected.find(p => p.id === product.id)) {
      setSelected(selected.filter(p => p.id !== product.id));
    } else {
      setSelected([...selected, product]);
    }
  };

  const generateRecipe = async () => {
    if (selected.length === 0) {
      Alert.alert('Внимание', 'Выберите хотя бы один продукт!');
      return;
    }

    setIsLoading(true);
    setGeneratedRecipe(null);

    try {
      const ingredientName = selected[0].name;
      const englishName = ingredientMap[ingredientName] || ingredientName.toLowerCase();
      
      const meals = await searchMealsByIngredient(englishName);

      if (!meals || meals.length === 0) {
        Alert.alert('Не найдено', `Не удалось найти рецепт с ингредиентом "${ingredientName}". Попробуйте выбрать другой продукт.`);
        setIsLoading(false);
        return;
      }

      const randomMeal = meals[Math.floor(Math.random() * meals.length)];
      const fullRecipe = await getMealDetailsById(randomMeal.idMeal);

      if (fullRecipe) {
        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
          const ing = fullRecipe[`strIngredient${i}`];
          const measure = fullRecipe[`strMeasure${i}`];
          if (ing && ing.trim() !== '') {
            ingredientsList.push(`${ing} — ${measure || ''}`);
          }
        }

        setGeneratedRecipe({
          title: fullRecipe.strMeal,
          ingredients: ingredientsList,
          steps: fullRecipe.strInstructions,
          area: fullRecipe.strArea,
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Ошибка', 'Не удалось загрузить рецепт. Проверьте интернет.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { maxWidth: isTablet ? 800 : '100%', alignSelf: 'center', width: '100%' }]} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Создать блюдо</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.subtitle}>Выберите продукты:</Text>

        <View style={styles.productsContainer}>
          {availableProducts.map((product) => {
            const isSelected = selected.find(p => p.id === product.id);
            return (
              <TouchableOpacity 
                key={product.id} 
                style={[styles.productItem, isSelected && styles.productItemSelected]}
                onPress={() => toggleSelect(product)}
              >
                <Ionicons 
                  name={isSelected ? "checkbox" : "square-outline"} 
                  size={24} 
                  color={isSelected ? COLORS.WHITE : COLORS.PRIMARY} 
                />
                <Text style={[styles.productName, isSelected && { color: COLORS.WHITE }]}>
                  {product.name} ({product.amount})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={generateRecipe} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.WHITE} />
          ) : (
            <>
              <Ionicons name="search-outline" size={20} color={COLORS.WHITE} />
              <Text style={styles.generateButtonText}>Найти рецепт</Text>
            </>
          )}
        </TouchableOpacity>

        {generatedRecipe && (
          <View style={styles.recipeBox}>
            <Text style={styles.recipeTitle}>{generatedRecipe.title}</Text>
            {generatedRecipe.area && <Text style={styles.recipeArea}>Кухня: {generatedRecipe.area}</Text>}
            
            <Text style={styles.sectionTitle}>Ингредиенты:</Text>
            {generatedRecipe.ingredients.map((ing, idx) => (
              <Text key={idx} style={styles.recipeText}>• {ing}</Text>
            ))}
            
            <Text style={styles.sectionTitle}>Приготовление:</Text>
            <Text style={styles.recipeText}>{generatedRecipe.steps}</Text>
          </View>
        )}
        
        <View style={{ height: 80 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 22, color: COLORS.PRIMARY, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: COLORS.PRIMARY, marginBottom: 15, fontWeight: '500' },
  productsContainer: { marginBottom: 20 },
  productItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE6CC', padding: 15, borderRadius: 10, marginBottom: 10, gap: 10 },
  productItemSelected: { backgroundColor: '#4A6B3E' },
  productName: { fontSize: 16, color: COLORS.PRIMARY },
  generateButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.PRIMARY, paddingVertical: 15, borderRadius: 15, marginBottom: 20, gap: 10 },
  generateButtonText: { color: COLORS.WHITE, fontSize: 16, fontWeight: 'bold' },
  recipeBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, borderWidth: 2, borderColor: '#DCE6CC' },
  recipeTitle: { fontSize: 22, color: COLORS.PRIMARY, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  recipeArea: { fontSize: 14, color: COLORS.PRIMARY, opacity: 0.7, textAlign: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, color: COLORS.PRIMARY, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  recipeText: { fontSize: 15, color: '#333', lineHeight: 22, marginBottom: 5 },
});