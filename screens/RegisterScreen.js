// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAppStore } from '../store/UseAppStore'; 

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = useAppStore((state) => state.signUp);
  const isLoadingAuth = useAppStore((state) => state.isLoadingAuth);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен быть не менее 6 символов');
      return;
    }

    const result = await signUp(email, password, name);
    
    if (result.error) {
      Alert.alert('Ошибка регистрации', result.error);
    } else {
      Alert.alert('Успех', 'Аккаунт создан! Теперь вы можете войти.', [
        { text: 'ОК', onPress: () => navigation.goBack() }
      ]);
    }
  };

  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.logoContainer}>
             <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.redBackground}>
            
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.WHITE} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Регистрация</Text>
            
            <Text style={styles.label}>Ваше имя</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Введите имя" 
              placeholderTextColor="#A9A9A9"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Эл. почта</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Введите почту" 
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
                placeholder="Введите пароль (мин. 6 символов)" 
                secureTextEntry={!isPasswordVisible} 
                placeholderTextColor="#A9A9A9"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.mainButton} onPress={handleRegister} disabled={isLoadingAuth}>
              {isLoadingAuth ? (
                <ActivityIndicator color={COLORS.PRIMARY} />
              ) : (
                <Text style={styles.mainButtonText}>Зарегистрироваться</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
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
  redBackground: { backgroundColor: '#B71C1C', borderRadius: 30, padding: 25, paddingTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8 },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  headerTitle: { fontSize: 22, color: COLORS.WHITE, textAlign: 'center', marginBottom: 20, fontWeight: '500' },
  label: { fontSize: 14, color: COLORS.WHITE, marginBottom: 5 },
  input: { backgroundColor: '#FCEED5', borderRadius: 10, padding: 12, marginBottom: 15, color: COLORS.PRIMARY, fontSize: 14 },
  passwordContainer: { flexDirection: 'row', backgroundColor: '#FCEED5', borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  passwordInput: { flex: 1, padding: 12, color: COLORS.PRIMARY, fontSize: 14 },
  eyeIcon: { padding: 10 },
  mainButton: { backgroundColor: '#FCEED5', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 12, height: 50, justifyContent: 'center', marginTop: 10 },
  mainButtonText: { color: COLORS.PRIMARY, fontSize: 16, fontWeight: 'bold' },
  loginLink: { alignSelf: 'center', marginTop: 10 },
  linkText: { color: COLORS.WHITE, textDecorationLine: 'underline', fontSize: 14 },
});