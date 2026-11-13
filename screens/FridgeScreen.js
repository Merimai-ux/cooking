// screens/FridgeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/UseAppStore';
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

const imgLogo = require('../assets/logo.png');

const CATEGORIES = [
  { id: 'veg', title: 'Овощи', icon: 'leaf-outline' },
  { id: 'fruits', title: 'Фрукты', icon: 'nutrition-outline' },
  { id: 'meat', title: 'Мясо', icon: 'restaurant-outline' },
  { id: 'dairy', title: 'Молочные', icon: 'water-outline' },
];

export default function FridgeScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('veg');
  const [refreshing, setRefreshing] = useState(false);
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ
  
  const { fridgeItems, addFridgeItem, updateFridgeItem, deleteFridgeItem } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formName, setFormName] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState('');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleOpenAdd = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
    setEditingProduct(null); setFormName(''); setFormAmount(''); setFormDate(formattedDate); setModalVisible(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product); setFormName(product.name); setFormAmount(product.amount); setFormDate(product.date); setModalVisible(true);
  };

  const handleSave = () => {
    if (!formName.trim()) return;
    if (editingProduct) {
      updateFridgeItem(activeCategory, editingProduct.id, { name: formName, amount: formAmount, date: formDate });
    } else {
      addFridgeItem(activeCategory, { name: formName, amount: formAmount || '-', date: formDate || '' });
    }
    setModalVisible(false);
  };

  let displayProducts = [];
  if (searchQuery.trim() !== '') {
    const allProducts = Object.values(fridgeItems).flat();
    displayProducts = allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
  } else {
    displayProducts = fridgeItems[activeCategory] || [];
  }

  const handleCreateRecipe = () => {
    const allProducts = Object.values(fridgeItems).flat();
    if (allProducts.length === 0) {
      alert('Холодильник пуст! Сначала добавьте продукты.');
      return;
    }
    navigation.navigate('CreateRecipe', { availableProducts: allProducts });
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
          <TouchableOpacity style={styles.headerLogoContainer} onPress={() => navigation.navigate('MainApp', { screen: 'Главная' })}>
            <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Холодильник</Text>
            <Text style={styles.headerSubtitle}>На моей кухне есть...</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Поиск по всем продуктам..." placeholderTextColor="#A9A9A9" value={searchQuery} onChangeText={setSearchQuery} />
          <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
        </View>

        <Text style={styles.sectionTitle}>Категории</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity key={cat.id} style={[styles.categoryButton, isActive && styles.categoryButtonActive]} onPress={() => { setActiveCategory(cat.id); setSearchQuery(''); }}>
                <Ionicons name={cat.icon} size={18} color={isActive ? COLORS.WHITE : COLORS.PRIMARY} style={{ marginRight: 5 }} />
                <Text style={[styles.categoryButtonText, isActive && styles.categoryButtonTextActive]}>{cat.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={[styles.productsList, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: isTablet ? 'space-between' : 'flex-start' }]}>
          {displayProducts.length === 0 ? (
            <Text style={styles.emptyText}>{searchQuery ? 'Ничего не найдено' : 'В этой категории пока нет продуктов'}</Text>
          ) : (
            displayProducts.map((product) => (
              <View key={product.id} style={[styles.productCard, { width: isTablet ? '48%' : '100%' }]}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.addedBadge}><Text style={styles.addedBadgeText}>Добавлено</Text></View>
                </View>
                <View style={styles.productDetails}>
                  <View style={styles.detailItem}><Ionicons name="scale-outline" size={16} color={COLORS.PRIMARY} /><Text style={styles.detailText}>{product.amount}</Text></View>
                  {product.date ? (<View style={styles.detailItem}><Ionicons name="calendar-outline" size={16} color={COLORS.PRIMARY} /><Text style={styles.detailText}>{product.date}</Text></View>) : null}
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionBtnWhite} onPress={() => handleOpenEdit(product)}><Text style={styles.actionBtnText}>Изменить</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnRed} onPress={() => deleteFridgeItem(activeCategory, product.id)}><Text style={styles.actionBtnRedText}>Удалить</Text></TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
        <View style={{ height: 160 }} /> 
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleOpenAdd}><Ionicons name="add" size={32} color={COLORS.WHITE} /></TouchableOpacity>
      <TouchableOpacity style={styles.fabRecipe} onPress={handleCreateRecipe}><Ionicons name="restaurant-outline" size={28} color={COLORS.WHITE} /></TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingProduct ? 'Изменить продукт' : 'Добавить продукт'}</Text>
            <TextInput style={styles.modalInput} placeholder="Название" value={formName} onChangeText={setFormName} />
            <TextInput style={styles.modalInput} placeholder="Количество" value={formAmount} onChangeText={setFormAmount} />
            <TextInput style={styles.modalInput} placeholder="Дата" value={formDate} onChangeText={setFormDate} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#ccc' }]} onPress={() => setModalVisible(false)}><Text style={styles.modalBtnText}>Отмена</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: COLORS.PRIMARY }]} onPress={handleSave}><Text style={[styles.modalBtnText, { color: COLORS.WHITE }]}>Сохранить</Text></TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerLogoContainer: { marginRight: 10 },
  headerLogo: { width: 50, height: 50 },
  headerTitle: { fontSize: 24, color: COLORS.PRIMARY, fontWeight: '500' },
  headerSubtitle: { fontSize: 12, color: COLORS.PRIMARY, opacity: 0.7 },
  searchContainer: { flexDirection: 'row', backgroundColor: COLORS.WHITE, borderRadius: 25, paddingHorizontal: 15, alignItems: 'center', marginBottom: 25, height: 50, elevation: 3 },
  searchInput: { flex: 1, color: COLORS.PRIMARY, fontSize: 16 },
  searchIcon: { marginLeft: 10 },
  sectionTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: '500', marginBottom: 15 },
  categoriesScroll: { marginBottom: 20 },
  categoryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#D3E0C5', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, marginRight: 10 },
  categoryButtonActive: { backgroundColor: '#4A6B3E' },
  categoryButtonText: { color: COLORS.PRIMARY, fontSize: 14 },
  categoryButtonTextActive: { color: COLORS.WHITE },
  productsList: { flex: 1 },
  productCard: { backgroundColor: '#DCE6CC', borderRadius: 20, padding: 15, marginBottom: 15 },
  productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  productName: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: '500' },
  addedBadge: { backgroundColor: '#4A6B3E', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  addedBadgeText: { color: COLORS.WHITE, fontSize: 12 },
  productDetails: { flexDirection: 'row', marginBottom: 15 },
  detailItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  detailText: { marginLeft: 5, color: COLORS.PRIMARY, fontSize: 14 },
  actionButtons: { flexDirection: 'row', gap: 10 },
  actionBtnWhite: { backgroundColor: COLORS.WHITE, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 },
  actionBtnText: { color: COLORS.PRIMARY, fontSize: 14 },
  actionBtnRed: { backgroundColor: '#D32F2F', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 },
  actionBtnRedText: { color: COLORS.WHITE, fontSize: 14, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: COLORS.PRIMARY, opacity: 0.6, width: '100%' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: COLORS.BACKGROUND, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  modalTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalInput: { backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 12, marginBottom: 15, color: COLORS.PRIMARY, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalBtn: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  modalBtnText: { fontSize: 16, fontWeight: '500', color: COLORS.PRIMARY },
  fab: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.PRIMARY, alignItems: 'center', justifyContent: 'center', right: 20, bottom: 30, elevation: 8 },
  fabRecipe: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#4A6B3E', alignItems: 'center', justifyContent: 'center', right: 20, bottom: 100, elevation: 8 },
});