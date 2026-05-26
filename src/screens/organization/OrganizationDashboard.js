import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientCard from '../../components/GradientCard';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';
import { api } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const OrganizationDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [orgName, setOrgName] = useState('Organization');

  const [stats, setStats] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.name) setOrgName(user.name);
        }

        const res = await api.org.getDashboard();
        setStats([
          { value: res.data.stats.totalDoctors.toString(), label: 'Doctors', color: COLORS.primary },
          { value: res.data.stats.pendingDoctors.toString(), label: 'Pending', color: COLORS.warning },
          { value: res.data.stats.totalMedicines.toString(), label: 'Medicines', color: COLORS.secondary },
        ]);
        if (res.data.recentLogs) {
          setRecentLogs(res.data.recentLogs);
        }
      } catch (err) {
        console.error('Dashboard API Error:', err);
      }
    };
    loadDashboard();
  }, []);

  const quickActions = [
    { title: 'Verify Practitioners', desc: 'Review credentials & licenses', icon: 'checkbox-outline', colors: [COLORS.primary, '#0284C7'], route: 'VerifyDoctors' },
    { title: 'Pharmacy Analytics', desc: 'Medication prescription metrics', icon: 'analytics-outline', colors: [COLORS.secondary, '#059669'], route: 'Analytics' },
    { title: 'Inventory Levels', desc: 'Hospital drug stocks & counters', icon: 'flask-outline', colors: [COLORS.dark, '#1E293B'], route: 'ManageMedicines' },
  ];

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Log out of medical registry terminal?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await api.auth.logout();
          navigation.replace('RoleSelection');
        }
      }
    ]);
  };

  return (
    <PremiumBackground safeArea={true} colors={['#0f172a', '#312e81']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>System Administrator,</Text>
          <Text style={styles.facilityName}>{orgName}</Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Stats Row */}
        {stats.length > 0 ? (
          <View style={styles.statsRow}>
            {stats.map((stat, i) => (
              <LinearGradient 
                key={i} 
                colors={[`${stat.color}20`, `${stat.color}05`]} 
                style={[styles.statBox, { borderColor: `${stat.color}40` }]}
              >
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </LinearGradient>
            ))}
          </View>
        ) : (
          <View style={[styles.statsRow, { justifyContent: 'center' }]}>
            <Text style={{color: COLORS.textSecondary, textAlign: 'center'}}>Loading metrics...</Text>
          </View>
        )}

        {/* Security Announcement Banner */}
        <GradientCard colors={['#0F172A', '#1E293B']} style={styles.securityCard}>
          <View style={styles.securityContent}>
            <View style={styles.securityTextCol}>
              <Text style={styles.securityTitle}>Registry HIPAA Shield</Text>
              <Text style={styles.securityDesc}>
                Secure clinical tunneling is established. All transactions are logged and encrypted.
              </Text>
            </View>
            <View style={styles.securityBadge}>
              <Ionicons name="shield-checkmark" size={32} color={COLORS.secondary} />
            </View>
          </View>
        </GradientCard>

        {/* Quick Menu Grid */}
        <Text style={styles.sectionTitle}>Administrative Functions</Text>
        <View style={styles.grid}>
          {quickActions.map((action, index) => (
            <GradientCard
              key={index}
              colors={action.colors}
              onPress={() => navigation.navigate(action.route)}
              style={styles.gridCard}
            >
              <Ionicons name={action.icon} size={32} color="#FFFFFF" />
              <Text style={styles.gridTitle}>{action.title}</Text>
              <Text style={styles.gridDesc}>{action.desc}</Text>
            </GradientCard>
          ))}
        </View>

        {/* Recent logs */}
        <Text style={styles.sectionTitle}>Realtime Facility Events</Text>
        <View style={styles.logList}>
          {recentLogs.length > 0 ? (
            recentLogs.map((log) => (
              <View key={log.id} style={styles.logCard}>
                <View style={styles.logLeft}>
                  <View style={styles.logIconCircle}>
                    <Ionicons name="git-branch-outline" size={16} color={COLORS.primary} />
                  </View>
                  <View style={styles.logDetails}>
                    <Text style={styles.logEvent}>{log.event}</Text>
                    <Text style={styles.logDetailText}>{log.detail}</Text>
                  </View>
                </View>
                <Text style={styles.logTime}>{log.time}</Text>
              </View>
            ))
          ) : (
            <Text style={{color: COLORS.textSecondary, textAlign: 'center', marginVertical: 20}}>No recent facility events.</Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setActiveTab('home');
            }}
          >
            <Ionicons
              name={activeTab === 'home' ? 'home' : 'home-outline'}
              size={24}
              color={activeTab === 'home' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('VerifyDoctors')}
          >
            <View style={styles.addTabCircle}>
              <Ionicons name="checkbox-outline" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('Analytics')}
          >
            <Ionicons
              name={activeTab === 'analytics' ? 'analytics' : 'analytics-outline'}
              size={24}
              color={activeTab === 'analytics' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[styles.tabLabel, activeTab === 'analytics' && styles.tabLabelActive]}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1.2,
    borderBottomColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  welcomeText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  facilityName: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 2,
  },
  logoutBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE2E2',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 110,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    width: (width - 72) / 3,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 16,
    alignItems: 'center',
    ...SHADOWS.soft,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  securityCard: {
    marginBottom: 28,
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  securityTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  securityDesc: {
    fontSize: SIZES.small + 1,
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 18,
  },
  securityBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: SIZES.medium + 2,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  gridCard: {
    width: (width - 64) / 2,
    marginBottom: 16,
    height: 150,
    justifyContent: 'space-between',
  },
  gridTitle: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
  },
  gridDesc: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  logList: {
    marginBottom: 20,
  },
  logCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  logLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logDetails: {
    flex: 1,
  },
  logEvent: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.text,
  },
  logDetailText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  logTime: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    ...SHADOWS.premium,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: COLORS.card,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  addTabCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.premium,
    transform: [{ translateY: -4 }],
  },
});

export default OrganizationDashboard;
