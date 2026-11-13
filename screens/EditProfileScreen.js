// screens/EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/UseAppStore';
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ
  
  const user = useAppStore((state) => state.user);
  const updateUser = useAppStore((state) => state.updateUser);
  const [isLoading, setIsLoading] = useState(false);

  const currentName = user?.user_metadata?.full_name || '';
  const currentEmail = user?.email || '';
  const currentPhone = user?.user_metadata?.phone || '';

  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [phone, setPhone] = useState(currentPhone);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Ошибка', 'Имя и почта не могут быть пустыми');
      return;
    }

    setIsLoading(true);
    const result = await updateUser({ name, email, phone });
    setIsLoading(false);

    if (result?.error) {
      Alert.alert('Ошибка', result.error);
    } else {
      Alert.alert('Успех', 'Профиль обновлен');
      navigation.goBack();
    }
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { maxWidth: isTablet ? 600 : '100%', alignSelf: 'center', width: '100%' }]}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Редактировать</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Имя</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Введите имя"
            placeholderTextColor="#A9A9A9"
          />

          <Text style={styles.label}>Электронная почта</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Введите почту"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A9A9A9"
          />

          <Text style={styles.label}>Номер телефона</Text>
          <TextInput 
            style={styles.input} 
            value={phone} 
            onChangeText={setPhone} 
            placeholder="Введите телефон"
            keyboardType="phone-pad"
            placeholderTextColor="#A9A9A9"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={COLORS.WHITE} />
            ) : (
              <Text style={styles.saveButtonText}>Сохранить изменения</Text>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, color: COLORS.PRIMARY, fontWeight: 'bold' },
  formContainer: { backgroundColor: '#DCE6CC', borderRadius: 20, padding: 20 },
  label: { fontSize: 14, color: COLORS.PRIMARY, marginBottom: 5, fontWeight: '500' },
  input: { backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 12, marginBottom: 15, color: COLORS.PRIMARY, fontSize: 16 },
  saveButton: { backgroundColor: COLORS.PRIMARY, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: COLORS.WHITE, fontSize: 16, fontWeight: 'bold' },
});