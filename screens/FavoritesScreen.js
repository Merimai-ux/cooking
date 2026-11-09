import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

// --- МЕСТО ДЛЯ ВАШИХ КАРТИНОК ---
const imgLogo = require('../assets/logo.png');
const imgPizza = require('../assets/pizza.png'); 
const imgDuck = require('../assets/duck.png'); 
const imgSushi = require('../assets/sushi.png'); 
const imgMochi = require('../assets/mochi.png'); 
const imgDolma = require('../assets/dolma.png'); 
const imgShakshuka = require('../assets/shakshuka.png'); 
const imgBananaBadge = require('../assets/banana.png'); 

// Начальные данные
const INITIAL_FAVORITES = [
  { id: '1', title: 'Пицца', image: imgPizza },
  { id: '2', title: 'Утка по-пекински', image: imgDuck },
  { id: '3', title: 'Суши', image: imgSushi },
  { id: '4', title: 'Моти', image: imgMochi },
  { id: '5', title: 'Долма', image: imgDolma },
  { id: '6', title: 'Шакшука', image: imgShakshuka },
];

export default function FavoritesScreen() {
  const navigation = useNavigation();
  
  // Стейт для списка
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);

  // Функция удаления
  const handleDelete = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Заголовок */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerLogoContainer}
            onPress={() => navigation.navigate('MainApp', { screen: 'Главная' })}
          >
            <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Избранное</Text>
        </View>

        {/* Поиск */}
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Поиск" 
            placeholderTextColor="#A9A9A9"
          />
          <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
        </View>

        {/* Сетка избранных блюд */}
        <View style={styles.gridContainer}>
          {favorites.length === 0 ? (
            <Text style={styles.emptyText}>В избранном пока пусто...</Text>
          ) : (
            favorites.map((item) => (
              <View key={item.id} style={styles.favoriteCard}>
                
                {/* НАКЛЕЙКА БАНАНА (ТЕПЕРЬ УДАЛЯЕТ) */}
                <TouchableOpacity 
                  style={styles.badgeContainer} 
                  onPress={() => handleDelete(item.id)}
                >
                   <Image source={imgBananaBadge} style={styles.badgeImage} resizeMode="contain" />
                </TouchableOpacity>

                {/* Картинка блюда */}
                <Image source={item.image} style={styles.favoriteImage} resizeMode="contain" />
                
                {/* Название */}
                <Text style={styles.favoriteTitle}>{item.title}</Text>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // ... (все стили остаются такими же, как у вас были, включая badgeContainer и badgeImage)
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerLogoContainer: { marginRight: 10 },
  headerLogo: { width: 50, height: 50 },
  headerTitle: { fontSize: 24, color: COLORS.PRIMARY, fontWeight: '500' },
  searchContainer: { flexDirection: 'row', backgroundColor: COLORS.WHITE, borderRadius: 25, paddingHorizontal: 15, alignItems: 'center', marginBottom: 25, height: 50, elevation: 3 },
  searchInput: { flex: 1, color: COLORS.PRIMARY, fontSize: 16 },
  searchIcon: { marginLeft: 10 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  emptyText: { textAlign: 'center', width: '100%', marginTop: 50, fontSize: 16, color: COLORS.PRIMARY, opacity: 0.6 },
  favoriteCard: { width: '48%', backgroundColor: '#DCE6CC', borderRadius: 15, padding: 10, marginBottom: 15, alignItems: 'flex-start', position: 'relative' },
  badgeContainer: { position: 'absolute', top: -20, left: -20, zIndex: 2 },
  badgeImage: { width: 75, height: 75 },
  favoriteImage: { width: '100%', height: 110, borderRadius: 10, marginBottom: 10, marginTop: 15 },
  favoriteTitle: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: '500' },
});