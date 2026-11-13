// screens/PreferencesScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export default function PreferencesScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Предпочтения</Text>
          <View style={{ width: 28 }} />
        </View>
        
        <Text style={styles.subtitle}>Любимые кухни и категории:</Text>
        
        <View style={styles.preferenceItem}>
          <Ionicons name="restaurant-outline" size={24} color={COLORS.PRIMARY} />
          <Text style={styles.preferenceText}>Итальянская кухня</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Ionicons name="leaf-outline" size={24} color={COLORS.PRIMARY} />
          <Text style={styles.preferenceText}>ПП рецепты</Text>
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
  headerTitle: { fontSize: 22, color: COLORS.PRIMARY, fontWeight: 'bold' },
  subtitle: { fontSize: 18, color: COLORS.PRIMARY, fontWeight: '500', marginBottom: 20 },
  preferenceItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE6CC', padding: 15, borderRadius: 10, marginBottom: 10, gap: 10 },
  preferenceText: { fontSize: 16, color: COLORS.PRIMARY },
});