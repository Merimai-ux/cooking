import React, { useState } from 'react';
import { 
  View, Text, TextInput, ScrollView, Image, StyleSheet, 
  TouchableOpacity, Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

const imgLogo = require('../assets/logo.png');

// --- ЗАГЛУШКИ ДЛЯ КАРТИНОК (замените пути на свои, если они другие) ---
const imgKarpaccio = require('../assets/karpaccio.png'); 
const imgRisotto = require('../assets/risotto.png');
const imgTiramisu = require('../assets/tiramisu.png');
const imgClafoutis = require('../assets/clafoutis.png');
const imgRatatouille = require('../assets/ratatouille.png');
const imgRamen = require('../assets/ramen.png');

// Моковые данные для рецептов
const RECIPES = [
  { id: '1', title: 'Карпаччо', rating: '4.8', image: imgKarpaccio },
  { id: '2', title: 'Ризотто', rating: '4.6', image: imgRisotto },
  { id: '3', title: 'Тирамису', rating: '5.0', image: imgTiramisu },
  { id: '4', title: 'Клафути', rating: '4.9', image: imgClafoutis },
  { id: '5', title: 'Рататуй', rating: '4.7', image: imgRatatouille },
  { id: '6', title: 'Рамен', rating: '4.9', image: imgRamen },
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // --- СОСТОЯНИЯ ДЛЯ ФИЛЬТРОВ ---
  const [selectedTime, setSelectedTime] = useState('Популярные');
  const [selectedRating, setSelectedRating] = useState('★ 5.0');
  const [selectedCategory, setSelectedCategory] = useState('Испанский');

  // Массивы вариантов
  const timeOptions = ['Всё', 'Новые', 'Старые', 'Популярные'];
  const ratingOptions = ['★ 5.0', '★ 4.0', '★ 3.0', '★ 2.0', '★ 1.0'];
  const categoryOptions = ['Всё', 'Овощное', 'Завтрак', 'Ужин', 'Обед', 'ПП', 'Испанский', 'Выпечка', 'Закуски', 'Соусы'];

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Заголовок с логотипом */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerLogoContainer}
            onPress={() => navigation.navigate('MainApp', { screen: 'Главная' })}
          >
            <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Поиск</Text>
        </View>

        {/* Строка поиска с кнопкой фильтра */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Поиск" 
              placeholderTextColor="#A9A9A9"
            />
            <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
          </View>
          
          {/* Кнопка открытия фильтров */}
          <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="options-outline" size={24} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>

        {/* Сетка рецептов (2 колонки) */}
        <View style={styles.gridContainer}>
          {RECIPES.map((recipe) => (
            <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
              {/* Плашка с рейтингом */}
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FFF" />
                <Text style={styles.ratingText}>{recipe.rating}</Text>
              </View>
              <Image source={recipe.image} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* ================= МОДАЛЬНОЕ ОКНО ФИЛЬТРОВ ================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <Text style={styles.modalTitle}>Фильтры поиска</Text>

            {/* Фильтр по времени */}
            <Text style={styles.filterLabel}>Время</Text>
            <View style={styles.filterRow}>
              {timeOptions.map((option) => (
                <TouchableOpacity 
                  key={option} 
                  style={[styles.chip, selectedTime === option && styles.chipActive]}
                  onPress={() => setSelectedTime(option)}
                >
                  <Text style={[styles.chipText, selectedTime === option && styles.chipTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Фильтр по рейтингу */}
            <Text style={styles.filterLabel}>Рейтинг</Text>
            <View style={styles.filterRow}>
              {ratingOptions.map((option) => (
                <TouchableOpacity 
                  key={option} 
                  style={[styles.chip, selectedRating === option && styles.chipActive]}
                  onPress={() => setSelectedRating(option)}
                >
                  <Text style={[styles.chipText, selectedRating === option && styles.chipTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Фильтр по категориям */}
            <Text style={styles.filterLabel}>Категории</Text>
            <View style={styles.filterRowWrap}>
              {categoryOptions.map((option) => (
                <TouchableOpacity 
                  key={option} 
                  style={[styles.chip, selectedCategory === option && styles.chipActive]}
                  onPress={() => setSelectedCategory(option)}
                >
                  <Text style={[styles.chipText, selectedCategory === option && styles.chipTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Кнопка Готово */}
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.submitButtonText}>ГОТОВО</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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

  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 10,
  },
  searchInput: { flex: 1, color: COLORS.PRIMARY, fontSize: 16 },
  searchIcon: { marginLeft: 10 },
  filterButton: {
    backgroundColor: '#F4C694', 
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recipeCard: {
    width: '48%', 
    backgroundColor: '#DCE6CC', 
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  recipeImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#C78552', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },
  ratingText: { color: COLORS.WHITE, fontSize: 12, fontWeight: 'bold', marginLeft: 3 },
  recipeTitle: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: '500' },

  // --- Стили для модального окна фильтров ---
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: {
    backgroundColor: '#FCEED5', 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: '80%', 
  },
  modalTitle: { fontSize: 20, color: COLORS.PRIMARY, textAlign: 'center', marginBottom: 20 },
  filterLabel: { fontSize: 16, color: COLORS.PRIMARY, marginBottom: 10, marginTop: 10 },
  
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  filterRowWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  
  chip: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: '#4A6B3E' }, 
  chipText: { color: COLORS.PRIMARY, fontSize: 13 },
  chipTextActive: { color: COLORS.WHITE, fontSize: 13 },

  submitButton: {
    backgroundColor: '#4A6B3E',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: COLORS.WHITE, fontSize: 16, fontWeight: 'bold' },
});