// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/UseAppStore'; 
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

const imgLogo = require('../assets/logo.png');

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ

  const userName = useAppStore((state) => state.user?.user_metadata?.full_name || state.user?.email || 'Гость');
  const signOut = useAppStore((state) => state.signOut);
  const recipesCount = useAppStore((state) => state.recipes.length);
  const favoritesCount = useAppStore((state) => state.favorites.length);
  const fridgeItems = useAppStore((state) => state.fridgeItems);
  const fridgeCount = Object.values(fridgeItems).reduce((acc, category) => acc + category.length, 0);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Ошибка', 'Нужен доступ к галерее!'); return; }
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 1 });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };

  const handleLogout = () => {
    Alert.alert('Выход из аккаунта', 'Вы уверены, что хотите выйти?', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Выйти', style: 'destructive', onPress: async () => { await signOut(); navigation.replace('Auth'); } }
    ]);
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingHorizontal: isTablet ? 60 : 20, maxWidth: isTablet ? 700 : '100%', alignSelf: 'center', width: '100%' }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate('MainApp', { screen: 'Главная' })}>
            <Image source={imgLogo} style={styles.headerLogo} resizeMode="contain" />
            <Text style={styles.headerTitle}>Профиль</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => Alert.alert('Настройки', 'Здесь будут настройки приложения.')}>
            <Ionicons name="settings-outline" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>

        <View style={styles.redBlockTop}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            {profileImage ? <Image source={{ uri: profileImage }} style={styles.avatarImage} /> : <Ionicons name="person" size={60} color="#F5C796" />}
            <View style={styles.cameraIconBadge}><Ionicons name="camera" size={14} color={COLORS.PRIMARY} /></View>
          </TouchableOpacity>
          <Text style={styles.greetingText}>Привет, {userName}!</Text>
          <Text style={styles.subGreetingText}>Рады видеть тебя на нашей кухне ♡</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButtonText}>Редактировать профиль</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.redBlockMiddle}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}><Ionicons name="book-outline" size={32} color={COLORS.WHITE} /><Text style={styles.statNumber}>{recipesCount}</Text><Text style={styles.statLabel}>Рецептов</Text></View>
            <View style={styles.statItem}><Ionicons name="heart-outline" size={32} color={COLORS.WHITE} /><Text style={styles.statNumber}>{favoritesCount}</Text><Text style={styles.statLabel}>Избранных</Text></View>
            <View style={styles.statItem}><Ionicons name="cart-outline" size={32} color={COLORS.WHITE} /><Text style={styles.statNumber}>{fridgeCount}</Text><Text style={styles.statLabel}>Продуктов</Text></View>
          </View>
        </View>

        <View style={styles.redBlockBottom}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('History')}>
            <View style={styles.menuIconContainer}><Ionicons name="time-outline" size={24} color={COLORS.WHITE} /></View>
            <View style={styles.menuTextContainer}><Text style={styles.menuTitle}>История приготовления</Text><Text style={styles.menuSubtitle}>Рецепты, которые вы готовили</Text></View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favorites')}>
            <View style={styles.menuIconContainer}><Ionicons name="book-outline" size={24} color={COLORS.WHITE} /></View>
            <View style={styles.menuTextContainer}><Text style={styles.menuTitle}>Мои любимые блюда</Text><Text style={styles.menuSubtitle}>Ваша личная подборка</Text></View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Preferences')}>
            <View style={styles.menuIconContainer}><Ionicons name="restaurant-outline" size={24} color={COLORS.WHITE} /></View>
            <View style={styles.menuTextContainer}><Text style={styles.menuTitle}>Мои предпочтения</Text><Text style={styles.menuSubtitle}>Любимые кухни и категории</Text></View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuIconContainer}><Ionicons name="log-out-outline" size={24} color={COLORS.WHITE} /></View>
            <View style={styles.menuTextContainer}><Text style={styles.menuTitle}>Выйти из аккаунта</Text><Text style={styles.menuSubtitle}>Сменить пользователя</Text></View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerLogo: { width: 50, height: 50, marginRight: 10 },
  headerTitle: { fontSize: 24, color: COLORS.PRIMARY, fontWeight: '500' },
  settingsIcon: { padding: 5 },
  redBlockTop: { backgroundColor: '#B71C1C', borderRadius: 15, padding: 20, alignItems: 'center', marginBottom: 15, elevation: 8 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FCEED5', justifyContent: 'center', alignItems: 'center', marginBottom: 15, position: 'relative' },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  cameraIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFF', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#B71C1C' },
  greetingText: { color: COLORS.WHITE, fontSize: 20, marginBottom: 5 },
  subGreetingText: { color: COLORS.WHITE, fontSize: 12, opacity: 0.8, marginBottom: 20, textAlign: 'center' },
  editButton: { backgroundColor: '#F5C796', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  editButtonText: { color: COLORS.PRIMARY, fontSize: 14, fontWeight: '500' },
  redBlockMiddle: { backgroundColor: '#B71C1C', borderRadius: 15, paddingVertical: 20, paddingHorizontal: 10, marginBottom: 15, elevation: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statNumber: { color: COLORS.WHITE, fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  statLabel: { color: COLORS.WHITE, fontSize: 12, marginTop: 2 },
  redBlockBottom: { backgroundColor: '#B71C1C', borderRadius: 15, paddingVertical: 10, paddingHorizontal: 15, elevation: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  menuIconContainer: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: COLORS.WHITE, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuTextContainer: { flex: 1 },
  menuTitle: { color: COLORS.WHITE, fontSize: 15, fontWeight: '500' },
  menuSubtitle: { color: COLORS.WHITE, fontSize: 11, opacity: 0.7, marginTop: 2 },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginLeft: 55 },
});