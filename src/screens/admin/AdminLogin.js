import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill out all administrator fields.');
      return;
    }
    navigation.replace('AdminDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')} style={styles.skipBtn}>
              <Text style={styles.skipBtnText}>Skip</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} style={{marginLeft: 4}} />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>ADMIN SYSTEM</Text>
            </View>
            <Text style={styles.title}>System Control</Text>
            <Text style={styles.subtitle}>Authorized personnel and system operators only</Text>
          </View>

          <View style={styles.formContainer}>
            <PremiumInput
              label="Admin Identifier"
              placeholder="e.g. admin@srm-monitor.org"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="shield-half-outline"
            />
            
            <PremiumInput
              label="Access Code / Password"
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              iconName="key-outline"
            />

            <View style={styles.buttonContainer}>
              <PremiumButton 
                title="Establish Secure Session" 
                onPress={handleLogin} 
                gradientColors={[COLORS.dark, '#334155']}
                style={styles.loginBtn}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderRadius: 20,
  },
  skipBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: SIZES.font,
  },
  header: {
    marginTop: SIZES.base,
    marginBottom: SIZES.extraLarge,
    alignItems: 'center',
  },
  badgeContainer: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.small,
    marginBottom: SIZES.large,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: SIZES.small,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.danger, 
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SIZES.large,
    borderRadius: BORDER_RADIUS.card,
    ...SHADOWS.premium,
  },
  buttonContainer: {
    marginTop: SIZES.extraLarge,
  },
  loginBtn: {
    marginTop: SIZES.base,
  },
});

export default AdminLogin;

