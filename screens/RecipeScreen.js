// screens/RecipeScreen.js
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

const imgLogo = require('../assets/logo.png');

// Данные по умолчанию (Драники), если рецепт не передан
const DEFAULT_RECIPE = {
  title: 'Драники',
  image: require('../assets/recipe_day.png'),
  time: '30 минут',
  ingredients: [
    'Картофель — 6 шт.',
    'Лук репчатый — 1 шт.',
    'Яйцо — 1 шт.',
    'Мука — 2 ст. ложки',
    'Соль, перец — по вкусу',
    'Растительное масло — для жарки'
  ],
  steps: [
    '1. Картофель и лук очистите и натрите на мелкой терке.',
    '2. Добавьте яйцо, муку, соль и перец. Хорошо перемешайте.',
    '3. Разогрейте сковороду с маслом. Выкладывайте ложкой массу и обжаривайте с двух сторон до золотистой корочки.',
    '4. Подавайте со сметаной или чесночным соусом. Приятного аппетита!'
  ]
};

export default function RecipeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Получаем рецепт из параметров (если перешли с главной), иначе берем дефолт
  const recipe = route.params?.recipe || DEFAULT_RECIPE;

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Шапка с кнопкой назад */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Рецепт</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Картинка блюда */}
        <Image source={recipe.image} style={styles.mainImage} resizeMode="cover" />

        {/* Заголовок и время */}
        <View style={styles.titleContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={18} color={COLORS.PRIMARY} />
            <Text style={styles.timeText}>{recipe.time}</Text>
          </View>
        </View>

        {/* Ингредиенты */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ингредиенты</Text>
          <View style={styles.ingredientsBox}>
            {recipe.ingredients.map((ing, index) => (
              <Text key={index} style={styles.ingredientText}>• {ing}</Text>
            ))}
          </View>
        </View>

        {/* Приготовление */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Приготовление</Text>
          {recipe.steps.map((step, index) => (
            <Text key={index} style={styles.stepText}>{step}</Text>
          ))}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: 'bold' },
  mainImage: { width: '100%', height: 250, borderRadius: 20, marginBottom: 20 },
  titleContainer: { marginBottom: 20 },
  recipeTitle: { fontSize: 28, color: COLORS.PRIMARY, fontWeight: 'bold', marginBottom: 10 },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { fontSize: 16, color: COLORS.PRIMARY, marginLeft: 5, opacity: 0.8 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: '600', marginBottom: 15 },
  ingredientsBox: { backgroundColor: '#DCE6CC', padding: 15, borderRadius: 15 },
  ingredientText: { fontSize: 16, color: COLORS.PRIMARY, marginBottom: 5 },
  stepText: { fontSize: 16, color: COLORS.PRIMARY, marginBottom: 10, lineHeight: 22 },
});