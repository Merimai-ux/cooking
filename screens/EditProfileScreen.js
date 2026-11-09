import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export default function EditProfileScreen({ route }) {
  const navigation = useNavigation();
  
  // Безопасно получаем параметры (если их нет, ставим дефолтные значения)
  const currentName = route.params?.name || 'огузок';
  const currentEmail = route.params?.email || 'oguzok@mail.ru';
  const currentPhone = route.params?.phone || '+7 (999) 123-45-67';

  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [phone, setPhone] = useState(currentPhone);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Ошибка', 'Имя и почта не могут быть пустыми');
      return;
    }
    
    // Правильный переход к вкладке "Профиль" внутри MainApp
    navigation.navigate('MainApp', { 
      screen: 'Профиль', 
      params: { 
        updatedName: name, 
        updatedEmail: email, 
        updatedPhone: phone 
      } 
    });
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
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
          />

          <Text style={styles.label}>Электронная почта</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Введите почту"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Номер телефона</Text>
          <TextInput 
            style={styles.input} 
            value={phone} 
            onChangeText={setPhone} 
            placeholder="Введите телефон"
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Сохранить изменения</Text>
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