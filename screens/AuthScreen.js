import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

export default function AuthScreen({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    navigation.replace('MainApp'); 
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Логотип */}
          <View style={styles.logoContainer}>
             <Image 
               source={require('../assets/logo.png')} 
               style={styles.logo} 
               resizeMode="contain" 
             />
          </View>

          {/* КРАСНАЯ ПОДЛОЖКА (Клякса) */}
          <View style={styles.redBackground}>
            
            <Text style={styles.headerTitle}>Авторизация</Text>

            <Text style={styles.label}>Логин/эл.почта</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Введите логин или почту" 
              placeholderTextColor="#A9A9A9"
            />

            <Text style={styles.label}>Пароль</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="Введите пароль" 
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#A9A9A9"
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.linkText}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
            <Text style={styles.mainButtonText}>Войти</Text>
          </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleLogin}>
              <Text style={styles.socialButtonText}>Войти через Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleLogin}>
              <Text style={styles.socialButtonText}>Войти через Яндекс</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink}>
              <Text style={styles.linkText}>Зарегистрироваться</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  
  logoContainer: { alignItems: 'center', marginBottom: -20, zIndex: 1 }, // zIndex выводит логотип поверх кляксы
  logo: { width: 180, height: 180 },
  
  // Стиль красной подложки
  redBackground: {
    backgroundColor: '#B71C1C', // Темно-красный цвет (подберите точный HEX из Figma, если нужно)
    borderRadius: 30, // Закругления
    padding: 25,
    paddingTop: 40, // Чуть больше отступа сверху, так как логотип немного перекрывает
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  headerTitle: { fontSize: 22, color: COLORS.WHITE, textAlign: 'center', marginBottom: 20, fontWeight: '500' },
  label: { fontSize: 14, color: COLORS.WHITE, marginBottom: 5 },
  
  // Поля ввода песочного цвета
  input: { 
    backgroundColor: '#FCEED5', // Цвет фона приложения (песочный)
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 15, 
    color: COLORS.PRIMARY,
    fontSize: 14,
  },
  passwordContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FCEED5', 
    borderRadius: 10, 
    marginBottom: 15, 
    alignItems: 'center' 
  },
  passwordInput: { flex: 1, padding: 12, color: COLORS.PRIMARY, fontSize: 14 },
  eyeIcon: { padding: 10 },
  
  forgotPassword: { alignSelf: 'center', marginBottom: 20 },
  linkText: { color: COLORS.WHITE, textDecorationLine: 'underline', fontSize: 14 },
  
  mainButton: { backgroundColor: '#FCEED5', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 12 },
  mainButtonText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: 'bold' },
  
  socialButton: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 10 },
  socialButtonText: { color: COLORS.WHITE, fontSize: 14 },
  
  registerLink: { alignSelf: 'center', marginTop: 10 },
});