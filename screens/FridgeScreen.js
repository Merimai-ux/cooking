import React, { useState } from 'react';
import { 
  View, Text, TextInput, ScrollView, Image, StyleSheet, 
  TouchableOpacity, Modal, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

const imgLogo = require('../assets/logo.png');

const CATEGORIES = [
  { id: 'veg', title: 'Овощи', icon: 'leaf-outline' },
  { id: 'fruits', title: 'Фрукты', icon: 'nutrition-outline' },
  { id: 'meat', title: 'Мясо', icon: 'restaurant-outline' },
  { id: 'dairy', title: 'Молочные', icon: 'water-outline' },
];

// Начальные данные (теперь это стейт, который мы будем менять)
const INITIAL_PRODUCTS = {
  veg: [
    { id: '1', name: 'Картофель', amount: '500 гр.', date: '02.11.2026' },
    { id: '2', name: 'Помидор', amount: '250 гр.', date: '' },
    { id: '3', name: 'Огурец', amount: '300 гр.', date: '01.11.2026' },
  ],
  fruits: [
    { id: '4', name: 'Яблоко', amount: '90 гр.', date: '' },
    { id: '5', name: 'Мандарин', amount: '100 гр.', date: '01.11.2026' },
    { id: '6', name: 'Банан', amount: '150 гр.', date: '31.10.2026' },
  ],
  meat: [
    { id: '7', name: 'Говядина', amount: '1000 гр.', date: '02.11.2026' },
    { id: '8', name: 'Курица', amount: '500 гр.', date: '02.11.2026' },
    { id: '9', name: 'Лосось', amount: '450 гр.', date: '' },
  ],
  dairy: [
    { id: '10', name: 'Молоко', amount: '750 мл.', date: '02.11.2026' },
    { id: '11', name: 'Яйца', amount: '30 шт.', date: '' },
    { id: '12', name: 'Сметана', amount: '450 гр.', date: '' },
  ]
};

export default function FridgeScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('veg');
  
  // Состояние для списка продуктов
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  
  // Состояния для модального окна (добавление/изменение)
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Если null - добавляем, иначе - редактируем
  
  // Поля формы
  const [formName, setFormName] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState('');

  // Открыть окно для добавления
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormAmount('');
    setFormDate('');
    setModalVisible(true);
  };

  // Открыть окно для редактирования
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormAmount(product.amount);
    setFormDate(product.date);
    setModalVisible(true);
  };

  // Сохранить (добавить или обновить)
  const handleSave = () => {
    if (!formName.trim()) return; // Не сохраняем пустое название

    if (editingProduct) {
      // Обновляем существующий
      const updatedProducts = { ...products };
      updatedProducts[activeCategory] = updatedProducts[activeCategory].map(p => 
        p.id === editingProduct.id ? { ...p, name: formName, amount: formAmount, date: formDate } : p
      );
      setProducts(updatedProducts);
    } else {
      // Добавляем новый
      const newProduct = {
        id: Date.now().toString(), // Уникальный ID
        name: formName,
        amount: formAmount || '-',
        date: formDate || '',
      };
      setProducts({
        ...products,
        [activeCategory]: [newProduct, ...products[activeCategory]]
      });
    }
    setModalVisible(false);
  };

  // Удалить продукт
  const handleDelete = (id) => {
    const updatedProducts = { ...products };
    updatedProducts[activeCategory] = updatedProducts[activeCategory].filter(p => p.id !== id);
    setProducts(updatedProducts);
  };

  const currentProducts = products[activeCategory] || [];

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
          <View>
            <Text style={styles.headerTitle}>Холодильник</Text>
            <Text style={styles.headerSubtitle}>На моей кухне есть...</Text>
          </View>
        </View>

        {/* Поиск */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Поиск" placeholderTextColor="#A9A9A9" />
          <Ionicons name="search-outline" size={20} color={COLORS.PRIMARY} style={styles.searchIcon} />
        </View>

        {/* Категории */}
        <Text style={styles.sectionTitle}>Категории</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity 
                key={cat.id} 
                style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Ionicons name={cat.icon} size={18} color={isActive ? COLORS.WHITE : COLORS.PRIMARY} style={{ marginRight: 5 }} />
                <Text style={[styles.categoryButtonText, isActive && styles.categoryButtonTextActive]}>{cat.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Список продуктов */}
        <View style={styles.productsList}>
          {currentProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.addedBadge}>
                  <Text style={styles.addedBadgeText}>Добавлено</Text>
                </View>
              </View>

              <View style={styles.productDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="scale-outline" size={16} color={COLORS.PRIMARY} />
                  <Text style={styles.detailText}>{product.amount}</Text>
                </View>
                {product.date ? (
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color={COLORS.PRIMARY} />
                    <Text style={styles.detailText}>{product.date}</Text>
                  </View>
                ) : null}
              </View>

              {/* Кнопки действий */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionBtnWhite} onPress={() => handleOpenEdit(product)}>
                  <Text style={styles.actionBtnText}>Изменить</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtnWhite} onPress={() => handleDelete(product.id)}>
                  <Text style={styles.actionBtnText}>Удалить</Text>
                </TouchableOpacity>
                
                {/* Кнопка "Добавить" теперь открывает модалку */}
                <TouchableOpacity style={styles.actionBtnOrange} onPress={handleOpenAdd}>
                  <Text style={styles.actionBtnOrangeText}>Добавить</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* ================= МОДАЛЬНОЕ ОКНО ДЛЯ ДОБАВЛЕНИЯ/ИЗМЕНЕНИЯ ================= */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingProduct ? 'Изменить продукт' : 'Добавить продукт'}
            </Text>

            <TextInput 
              style={styles.modalInput} 
              placeholder="Название (например, Картофель)" 
              value={formName} 
              onChangeText={setFormName} 
            />
            <TextInput 
              style={styles.modalInput} 
              placeholder="Количество (например, 500 гр.)" 
              value={formAmount} 
              onChangeText={setFormAmount} 
            />
            <TextInput 
              style={styles.modalInput} 
              placeholder="Дата (например, 02.11.2026)" 
              value={formDate} 
              onChangeText={setFormDate} 
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#ccc' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: COLORS.PRIMARY }]} onPress={handleSave}>
                <Text style={[styles.modalBtnText, { color: COLORS.WHITE }]}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  actionBtnOrange: { backgroundColor: '#F4C694', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 },
  actionBtnOrangeText: { color: COLORS.PRIMARY, fontSize: 14 },

  // Стили для модального окна
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: COLORS.BACKGROUND, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  modalTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalInput: { backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 12, marginBottom: 15, color: COLORS.PRIMARY, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalBtn: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  modalBtnText: { fontSize: 16, fontWeight: '500', color: COLORS.PRIMARY },
});