// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/UseAppStore';
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

const imgLogo = require('../assets/logo.png');
const imgRecipeDay = require('../assets/recipe_day.png');
const imgPP = require('../assets/pp.png');
const imgVypechka = require('../assets/cake.png');
const imgSalad = require('../assets/salad.png');
const imgDrink = require('../assets/drink.png');
const imgZakuski = require('../assets/zakuski.png');
const imgSousi = require('../assets/sousi.png');

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ
  
  const { recipes = [], isLoading, error, fetchRecipes } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (recipes?.length === 0) {
      fetchRecipes();
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes();
    setRefreshing(false);
  };

  const mainRecipe = recipes[0];

  const penneRecipe = {
    title: 'Пенне с курицей в томатном соусе',
    image: require('../assets/dish.png'),
    time: mainRecipe?.time || '30 минут',
    ingredients: ['Паста пенне — 250 г','Куриное филе — 300 г','Томаты в собственном соку — 400 г','Лук — 1 шт.','Чеснок — 2 зубчика','Сливки — 100 мл','Пармезан — по вкусу','Соль, перец, базилик — по вкусу'],
    steps: ['1. Отварите пасту в подсоленной воде до готовности (около 10-12 минут).','2. Куриное филе нарежьте кусочками и обжарьте на сковороде до золотистой корочки.','3. Добавьте к курице мелко нарезанный лук и чеснок, обжаривайте 2-3 минуты.','4. Влейте томаты в собственном соку, добавьте специи и тушите 10 минут.','5. Влейте сливки, перемешайте и тушите еще 5 минут.','6. Добавьте отварную пасту в соус, перемешайте и прогрейте 1-2 минуты.','7. Подавайте, посыпав тертым пармезаном и свежим базиликом.']
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingHorizontal: isTablet ? 40 : 20, maxWidth: isTablet ? 900 : '100%', alignSelf: 'center', width: '100%' }
        ]} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Главная</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Поиск" placeholderTextColor="#A9A9A9" />
          <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Recipe')}>
            <Image source={imgRecipeDay} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Рецепт дня</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Category', { category: 'ПП рецепты' })}>
            <Image source={imgPP} style={styles.categoryImage} />
            <Text style={styles.categoryText}>ПП рецепты</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Category', { category: 'Выпечка' })}>
            <Image source={imgVypechka} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Выпечка</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Category', { category: 'Салаты' })}>
            <Image source={imgSalad} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Салаты</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Category', { category: 'Напитки' })}>
            <Image source={imgDrink} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Напитки</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Category', { category: 'Закуски' })}>
            <Image source={imgZakuski} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Закуски</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { width: isTablet ? 160 : 130 }]} onPress={() => navigation.navigate('Category', { category: 'Соусы' })}>
            <Image source={imgSousi} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Соусы</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>Специально для вас</Text>

        {isLoading && <ActivityIndicator size="large" color={COLORS.PRIMARY} style={{ marginTop: 20 }} />}

        {error && !isLoading && (
          <View style={styles.errorContainer}>
            <Ionicons name="cloud-offline-outline" size={50} color={COLORS.PRIMARY} />
            <Text style={styles.errorText}>Нет соединения с интернетом</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchRecipes}>
              <Text style={styles.retryButtonText}>Повторить</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !error && mainRecipe && (
          <TouchableOpacity style={styles.mainDishCard} onPress={() => navigation.navigate('Recipe', { recipe: penneRecipe })}>
            <Image source={require('../assets/dish.png')} style={[styles.mainDishImage, { height: isTablet ? 400 : 280 }]} resizeMode="cover" />
            <View style={styles.dishInfo}>
              <Text style={styles.dishTitle}>{mainRecipe.title}</Text>
              <Text style={styles.dishSubtitle}>Пенне с курицей в томатном соусе</Text> 
              <View style={styles.dishTimeRow}>
                <Ionicons name="time-outline" size={16} color={COLORS.PRIMARY} />
                <Text style={styles.dishTimeText}>{mainRecipe.time || '30 минут'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerLogo: { width: 40, height: 40, marginRight: 10 },
  headerTitle: { fontSize: 24, color: COLORS.PRIMARY, fontWeight: '500' },
  searchContainer: { flexDirection: 'row', backgroundColor: COLORS.WHITE, borderRadius: 25, paddingHorizontal: 15, alignItems: 'center', marginBottom: 25, height: 50, elevation: 3 },
  searchInput: { flex: 1, color: COLORS.PRIMARY, fontSize: 16 },
  searchIcon: { marginLeft: 10 },
  categoriesScroll: { marginBottom: 20, marginTop: 15 },
  categoryCard: { backgroundColor: COLORS.BACKGROUND, borderRadius: 15, marginRight: 15, alignItems: 'center', overflow: 'hidden' },
  categoryImage: { width: '100%', height: 100, resizeMode: 'cover' },
  categoryText: { color: COLORS.PRIMARY, fontSize: 14, paddingVertical: 10, textAlign: 'center' },
  sectionTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: '500', marginBottom: 15, marginTop: 30 },
  mainDishCard: { backgroundColor: 'transparent', marginBottom: 20 },
  mainDishImage: { width: '100%', borderRadius: 20, marginBottom: 15 },
  dishInfo: { paddingHorizontal: 5 },
  dishTitle: { fontSize: 16, color: COLORS.PRIMARY, marginBottom: 5 },
  dishSubtitle: { fontSize: 14, color: COLORS.PRIMARY, marginBottom: 8 },
  dishTimeRow: { flexDirection: 'row', alignItems: 'center' },
  dishTimeText: { fontSize: 14, color: COLORS.PRIMARY, marginLeft: 5, opacity: 0.7 },
  errorContainer: { alignItems: 'center', marginTop: 30, padding: 20 },
  errorText: { fontSize: 16, color: COLORS.PRIMARY, marginTop: 10, marginBottom: 20 },
  retryButton: { backgroundColor: COLORS.PRIMARY, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  retryButtonText: { color: COLORS.WHITE, fontWeight: 'bold' },
});