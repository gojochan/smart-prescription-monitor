import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import SafeImage from '../../components/SafeImage';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';
import { api } from '../../utils/api';

const PatientLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email or Mobile number is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    try {
      const result = await api.auth.login(email, password);
      setIsLoading(false);
      if (result.role !== 'patient') {
        Alert.alert('Access Denied', 'This credential is not registered as a patient.');
        await api.auth.logout();
        return;
      }
      navigation.replace('PatientDashboard');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Login Failed', error.message || 'Check your credentials or backend server.');
    }
  };

  return (
    <PremiumBackground safeArea={false} colors={['#0f172a', '#064e3b']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back & Skip Buttons - Shifted lower for thumb access */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PatientDashboard')} style={styles.skipBtnAbs}>
              <Text style={styles.skipBtnText}>Skip</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.secondary} style={{marginLeft: 6}} />
            </TouchableOpacity>
          </View>

          {/* Premium Illustration Rounded Card Thumbnail */}
          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationContainer}>
              <SafeImage
                source={require('../../../assets/images/patient_illustration.png')}
                style={styles.illustration}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={styles.heroSection}>
            <LinearGradient colors={[COLORS.secondary, '#059669']} style={styles.logoBadge}>
              <Ionicons name="medkit-outline" size={36} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.title}>Patient Portal</Text>
            <Text style={styles.subtitle}>Welcome back to Smart Prescription Monitor</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <PremiumInput
              label="EMAIL OR MOBILE NUMBER"
              placeholder="e.g. rahul.sharma@gmail.com"
              value={email}
              onChangeText={(text) => { setEmail(text); setErrors(prev => ({...prev, email: null})); }}
              keyboardType="email-address"
              iconName="mail-outline"
              error={errors.email}
            />

            <PremiumInput
              label="SECURITY PASSWORD"
              placeholder="••••••••"
              value={password}
              onChangeText={(text) => { setPassword(text); setErrors(prev => ({...prev, password: null})); }}
              secureTextEntry={true}
              iconName="lock-closed-outline"
              error={errors.password}
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
      <Loading visible={isLoading} text="Securing health records tunnel..." />
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    marginBottom: 24,
    marginTop: 50, // Moved lower down for easy thumb access
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skipBtnAbs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skipBtnText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: SIZES.font,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.soft,
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
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
    ...SHADOWS.soft,
    marginBottom: 32,
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
    marginBottom: 20,
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
    marginBottom: 24,
  },
  illustrationContainer: {
    width: 160,
    height: 160,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 6,
    ...SHADOWS.soft,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  illustration: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default PatientLogin;
