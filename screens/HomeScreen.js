import React from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // <-- ДОБАВЛЕН ИМПОРТ
import { COLORS } from '../constants/colors';

// --- МЕСТО ДЛЯ ВАШИХ КАРТИНОК ---
const imgLogo = require('../assets/logo.png');
const imgRecipeDay = require('../assets/recipe_day.png'); 
const imgPP = require('../assets/pp.png');         
const imgVypechka = require('../assets/cake.png');
const imgSalad = require('../assets/salad.png'); 
const imgDrink = require('../assets/drink.png');
const imgZakuski = require('../assets/zakuski.png');
const imgSousi = require('../assets/sousi.png');   
const imgMainDish = require('../assets/dish.png'); 

export default function HomeScreen() {
  const navigation = useNavigation(); // <-- ПОЛУЧАЕМ ДОСТУП К НАВИГАЦИИ

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Заголовок с мини-логотипом */}
        <View style={styles.header}>
          <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Главная</Text>
        </View>

        {/* Строка поиска */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Поиск" 
            placeholderTextColor="#A9A9A9"
          />
          <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
        </View>

        {/* Горизонтальная прокрутка с категориями */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          
          {/* Карточка: Рецепт дня (КЛИКАБЕЛЬНАЯ) */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Recipe')} // <-- ПЕРЕХОД НА РЕЦЕПТ
          >
            <Image source={imgRecipeDay} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Рецепт дня</Text>
          </TouchableOpacity>

          {/* Карточка: ПП рецепты */}
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={imgPP} style={styles.categoryImage} />
            <Text style={styles.categoryText}>ПП рецепты</Text>
          </TouchableOpacity>

          {/* Карточка: Выпечка */}
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={imgVypechka} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Выпечка</Text>
          </TouchableOpacity>

          {/* Карточка: Салаты */}
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={imgSalad} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Салаты</Text>
          </TouchableOpacity>

          {/* Карточка: Напитки */}
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={imgDrink} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Напитки</Text>
          </TouchableOpacity>

          {/* Карточка: Закуски */}
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={imgZakuski} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Закуски</Text>
          </TouchableOpacity>

          {/* Карточка: Соусы */}
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={imgSousi} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Соусы</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* Блок: Специально для вас */}
        <Text style={styles.sectionTitle}>Специально для вас</Text>
        
        <TouchableOpacity style={styles.mainDishCard}>
          {/* Большая картинка блюда */}
          <Image source={imgMainDish} style={styles.mainDishImage} resizeMode="cover" />
          
          {/* Описание под картинкой */}
          <View style={styles.dishInfo}>
            <Text style={styles.dishTitle}>Пенне с курицей в томатном соусе</Text>
            <View style={styles.dishTimeRow}>
              <Ionicons name="time-outline" size={16} color={COLORS.PRIMARY} />
              <Text style={styles.dishTimeText}>30 минут</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Отступ снизу */}
        <View style={{ height: 80 }} /> 

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 25,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    color: COLORS.PRIMARY,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoriesScroll: {
    marginBottom: 20,
    marginTop: 15, 
  },
  categoryCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    width: 130,
    overflow: 'hidden', 
  },
  categoryImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover', 
  },
  categoryText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    paddingVertical: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.PRIMARY,
    fontWeight: '500',
    marginBottom: 15,
    marginTop: 30, 
  },
  mainDishCard: {
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  mainDishImage: {
    width: '100%',
    height: 280, 
    borderRadius: 20,
    marginBottom: 15,
  },
  dishInfo: {
    paddingHorizontal: 5,
  },
  dishTitle: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    marginBottom: 5,
  },
  dishTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishTimeText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    marginLeft: 5,
    opacity: 0.7,
  },
});