import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const AdminDashboard = ({ navigation }) => {
  const stats = [
    { title: 'Total Doctors', count: '156', icon: 'medkit', color: COLORS.primary },
    { title: 'Total Patients', count: '8,421', icon: 'people', color: COLORS.secondary },
    { title: 'Prescriptions', count: '24.5k', icon: 'document-text', color: COLORS.dark },
    { title: 'Active Issues', count: '3', icon: 'warning', color: COLORS.danger },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>System Admin</Text>
          <Text style={styles.subtitle}>Dashboard Overview</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('RoleSelection')}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionRow}>
          <View style={[styles.actionIcon, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="person-add" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Verify Doctor Accounts</Text>
            <Text style={styles.actionDesc}>12 pending verifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionRow}>
          <View style={[styles.actionIcon, { backgroundColor: COLORS.dark }]}>
            <Ionicons name="settings" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>System Settings</Text>
            <Text style={styles.actionDesc}>Manage app configurations</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.large,
    backgroundColor: COLORS.card,
    ...SHADOWS.soft,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
  logoutBtn: {
    padding: SIZES.small,
    backgroundColor: COLORS.danger + '15',
    borderRadius: SIZES.base,
  },
  scrollContent: {
    padding: SIZES.large,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.large,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: SIZES.medium,
    borderRadius: BORDER_RADIUS.card,
    marginBottom: SIZES.medium,
    ...SHADOWS.soft,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  statCount: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statTitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.medium,
    marginTop: SIZES.base,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SIZES.medium,
    borderRadius: BORDER_RADIUS.card,
    marginBottom: SIZES.medium,
    ...SHADOWS.soft,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTextContainer: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  actionTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  actionDesc: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

export default AdminDashboard;
