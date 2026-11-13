// screens/FavoritesScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

const imgLogo = require('../assets/logo.png');
const imgPizza = require('../assets/pizza.png'); 
const imgDuck = require('../assets/duck.png'); 
const imgSushi = require('../assets/sushi.png'); 
const imgMochi = require('../assets/mochi.png'); 
const imgDolma = require('../assets/dolma.png'); 
const imgShakshuka = require('../assets/shakshuka.png'); 
const imgBananaBadge = require('../assets/banana.png'); 

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
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ
  
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [searchQuery, setSearchQuery] = useState('');

  const confirmDelete = (item) => {
    Alert.alert(
      'Удалить из избранного?',
      `Вы уверены, что хотите убрать «${item.title}» из избранного?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: () => setFavorites(favorites.filter(fav => fav.id !== item.id)) },
      ],
      { cancelable: true }
    );
  };

  const filteredFavorites = searchQuery.trim() === ''
    ? favorites
    : favorites.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const cardWidth = isTablet ? '31%' : '48%'; // <-- Динамическая ширина

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { maxWidth: 1000, alignSelf: 'center', width: '100%' }]} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLogoContainer} onPress={() => navigation.navigate('MainApp', { screen: 'Главная' })}>
            <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Избранное</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Поиск в избранном..." 
            placeholderTextColor="#A9A9A9"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
        </View>

        <View style={styles.gridContainer}>
          {filteredFavorites.length === 0 ? (
            <Text style={styles.emptyText}>
              {searchQuery ? 'Ничего не найдено' : 'В избранном пока пусто...'}
            </Text>
          ) : (
            filteredFavorites.map((item) => (
              <View key={item.id} style={[styles.favoriteCard, { width: cardWidth }]}>
                <TouchableOpacity style={styles.badgeContainer} onPress={() => confirmDelete(item)}>
                   <Image source={imgBananaBadge} style={styles.badgeImage} resizeMode="contain" />
                </TouchableOpacity>
                <Image source={item.image} style={styles.favoriteImage} resizeMode="contain" />
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
  favoriteCard: { backgroundColor: '#DCE6CC', borderRadius: 15, padding: 10, marginBottom: 15, alignItems: 'flex-start', position: 'relative' },
  badgeContainer: { position: 'absolute', top: -20, left: -20, zIndex: 2 },
  badgeImage: { width: 75, height: 75 },
  favoriteImage: { width: '100%', height: 110, borderRadius: 10, marginBottom: 10, marginTop: 15 },
  favoriteTitle: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: '500' },
});