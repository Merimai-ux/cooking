// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/UseAppStore'; 
import { useDeviceType } from '../utils/Device'; // <-- ИМПОРТ

export default function AuthScreen({ navigation }) {
  const { isTablet } = useDeviceType(); // <-- ИСПОЛЬЗУЕМ
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useAppStore((state) => state.signIn);
  const isLoadingAuth = useAppStore((state) => state.isLoadingAuth);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Введите email и пароль');
      return;
    }

    const result = await signIn(email, password);
    if (result.error) {
      Alert.alert('Ошибка входа', result.error);
    } else {
      navigation.replace('MainApp'); 
    }
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.logoContainer}>
             <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={[styles.redBackground, { maxWidth: isTablet ? 500 : '100%', alignSelf: 'center', width: '100%' }]}>
            <Text style={styles.headerTitle}>Авторизация</Text>
            
            <Text style={styles.label}>Логин/эл.почта</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Введите логин или почту" 
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Пароль</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="Введите пароль" 
                secureTextEntry={!isPasswordVisible} 
                placeholderTextColor="#A9A9A9"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.linkText}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainButton} onPress={handleLogin} disabled={isLoadingAuth}>
              {isLoadingAuth ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                <Text style={styles.mainButtonText}>Войти</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('В разработке', 'Вход через Google появится позже')}>
              <Text style={styles.socialButtonText}>Войти через Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('В разработке', 'Вход через Яндекс появится позже')}>
              <Text style={styles.socialButtonText}>Войти через Яндекс</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
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
  logoContainer: { alignItems: 'center', marginBottom: -20, zIndex: 1 },
  logo: { width: 180, height: 180 },
  redBackground: { backgroundColor: '#B71C1C', borderRadius: 30, padding: 25, paddingTop: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8 },
  headerTitle: { fontSize: 22, color: COLORS.WHITE, textAlign: 'center', marginBottom: 20, fontWeight: '500' },
  label: { fontSize: 14, color: COLORS.WHITE, marginBottom: 5 },
  input: { backgroundColor: '#FCEED5', borderRadius: 10, padding: 12, marginBottom: 15, color: COLORS.PRIMARY, fontSize: 14 },
  passwordContainer: { flexDirection: 'row', backgroundColor: '#FCEED5', borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  passwordInput: { flex: 1, padding: 12, color: COLORS.PRIMARY, fontSize: 14 },
  eyeIcon: { padding: 10 },
  forgotPassword: { alignSelf: 'center', marginBottom: 20 },
  linkText: { color: COLORS.WHITE, textDecorationLine: 'underline', fontSize: 14 },
  mainButton: { backgroundColor: '#FCEED5', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 12, height: 50, justifyContent: 'center' },
  mainButtonText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: 'bold' },
  socialButton: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 10 },
  socialButtonText: { color: COLORS.WHITE, fontSize: 14 },
  registerLink: { alignSelf: 'center', marginTop: 10 },
});