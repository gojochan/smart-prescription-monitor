import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const PatientLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Incomplete Form', 'Please enter your account email and security password.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('PatientDashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back btn */}
          <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')} style={styles.backBtn}>
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>

          {/* Skip btn */}
          <TouchableOpacity onPress={() => navigation.navigate('PatientDashboard')} style={styles.skipBtnAbs}>
            <Text style={styles.skipBtnText}>Skip</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} style={{marginLeft: 4}} />
          </TouchableOpacity>

          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('../../../assets/images/patient_illustration.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.heroSection}>
            <LinearGradient colors={[COLORS.secondary, '#059669']} style={styles.logoBadge}>
              <Ionicons name="heart-pulse-outline" size={36} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.title}>Patient Portal</Text>
            <Text style={styles.subtitle}>Welcome back to Smart Prescription Monitor</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <PremiumInput
              label="EMAIL OR MOBILE NUMBER"
              placeholder="e.g. john.doe@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon="mail-outline"
            />

            <PremiumInput
              label="SECURITY PASSWORD"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              icon="lock-closed-outline"
            />

            <TouchableOpacity 
              style={styles.forgotBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.actionContainer}>
              <PremiumButton 
                title="Sign In to Health Portal" 
                onPress={handleLogin}
                gradientColors={[COLORS.secondary, '#059669']}
              />
            </View>
          </View>

          {/* Switch to Sign Up */}
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>New patient?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PatientSignup')}>
              <Text style={styles.footerAction}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isLoading && <Loading visible={true} message="Securing health records tunnel..." />}
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
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    position: 'absolute',
    top: 10,
    left: 24,
    ...SHADOWS.soft,
  },
  skipBtnAbs: {
    position: 'absolute',
    top: 10,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderRadius: 20,
    zIndex: 10,
  },
  skipBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: SIZES.font,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 60,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.premium,
  },
  title: {
    fontSize: SIZES.title - 4,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
    marginBottom: 24,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  forgotText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  actionContainer: {
    marginTop: 24,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  footerAction: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary,
    marginLeft: 6,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationContainer: {
    width: 180,
    height: 180,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...SHADOWS.premium,
  },
  illustration: {
    width: '85%',
    height: '85%',
  },
});

export default PatientLogin;
