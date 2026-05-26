import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const AdminDashboard = ({ navigation }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // TODO: Replace with original API integration
    // fetch('https://your-api.com/admin/dashboard')
    //   .then(res => res.json())
    //   .then(data => setStats(data))
    //   .catch(err => console.error('API Error:', err));
  }, []);

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
          {stats.length > 0 ? (
            stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={styles.statCount}>{stat.count}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))
          ) : (
            <Text style={{color: '#6B7280', textAlign: 'center', width: '100%', marginVertical: 20}}>
              Loading stats...
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionRow}>
          <View style={[styles.actionIcon, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="person-add" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Verify Doctor Accounts</Text>
            <Text style={styles.actionDesc}>Review pending requests</Text>
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
    backgroundColor: COLORS.background || '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.large || 20,
    paddingVertical: SIZES.medium || 15,
    backgroundColor: COLORS.card || '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...SHADOWS?.soft,
  },
  title: {
    fontSize: SIZES.large || 24,
    fontWeight: 'bold',
    color: COLORS.text || '#1F2937',
  },
  subtitle: {
    fontSize: SIZES.font || 14,
    color: COLORS.textSecondary || '#6B7280',
    marginTop: 4,
  },
  logoutBtn: {
    padding: SIZES.small || 8,
    backgroundColor: (COLORS.danger || '#EF4444') + '15',
    borderRadius: SIZES.base || 8,
  },
  scrollContent: {
    padding: SIZES.large || 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.large || 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.card || '#FFFFFF',
    padding: SIZES.medium || 16,
    borderRadius: BORDER_RADIUS?.card || 12,
    marginBottom: SIZES.medium || 16,
    ...SHADOWS?.soft,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base || 12,
  },
  statCount: {
    fontSize: SIZES.extraLarge || 28,
    fontWeight: 'bold',
    color: COLORS.text || '#1F2937',
  },
  statTitle: {
    fontSize: SIZES.small || 12,
    color: COLORS.textSecondary || '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: SIZES.large || 20,
    fontWeight: 'bold',
    color: COLORS.text || '#1F2937',
    marginBottom: SIZES.medium || 16,
    marginTop: SIZES.base || 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card || '#FFFFFF',
    padding: SIZES.medium || 16,
    borderRadius: BORDER_RADIUS?.card || 12,
    marginBottom: SIZES.medium || 16,
    ...SHADOWS?.soft,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.base || 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTextContainer: {
    flex: 1,
    marginLeft: SIZES.medium || 16,
  },
  actionTitle: {
    fontSize: SIZES.medium || 16,
    fontWeight: 'bold',
    color: COLORS.text || '#1F2937',
  },
  actionDesc: {
    fontSize: SIZES.small || 12,
    color: COLORS.textSecondary || '#6B7280',
    marginTop: 2,
  },
});

export default AdminDashboard;