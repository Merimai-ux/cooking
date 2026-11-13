// screens/HistoryScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export default function HistoryScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>История</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={60} color={COLORS.PRIMARY} style={{ opacity: 0.5 }} />
          <Text style={styles.emptyText}>Вы пока ничего не готовили</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 22, color: COLORS.PRIMARY, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 16, color: COLORS.PRIMARY, opacity: 0.6, marginTop: 15 },
});