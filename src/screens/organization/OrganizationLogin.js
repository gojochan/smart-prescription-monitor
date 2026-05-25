import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import SafeImage from '../../components/SafeImage';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const OrganizationLogin = ({ navigation }) => {
  const [clinicId, setClinicId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const newErrors = {};
    if (!clinicId) newErrors.clinicId = 'Clinical ID is required';
    if (!passcode) newErrors.passcode = 'Passcode is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('OrganizationDashboard');
    }, 1500);
  };

  return (
    <PremiumBackground safeArea={false} colors={['#0f172a', '#312e81']}>
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

            <TouchableOpacity onPress={() => navigation.navigate('OrganizationDashboard')} style={styles.skipBtnAbs}>
              <Text style={styles.skipBtnText}>Skip</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} style={{marginLeft: 6}} />
            </TouchableOpacity>
          </View>

          {/* Premium Illustration Rounded Card Thumbnail */}
          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationContainer}>
              <SafeImage
                source={require('../../../assets/images/organization_illustration.png')}
                style={styles.illustration}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={styles.heroSection}>
            <LinearGradient colors={[COLORS.dark, '#1E293B']} style={styles.logoBadge}>
              <Ionicons name="business" size={32} color={COLORS.primary} />
            </LinearGradient>
            <Text style={styles.title}>Clinical Registry</Text>
            <Text style={styles.subtitle}>Authorized Administrator Terminal Only</Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <PremiumInput
              label="CLINICAL REGISTRY ID / EMAIL"
              placeholder="e.g. SMC-2026-WILSON"
              value={clinicId}
              onChangeText={(text) => { setClinicId(text); setErrors(prev => ({...prev, clinicId: null})); }}
              iconName="business-outline"
              error={errors.clinicId}
            />

            <PremiumInput
              label="SECURITY ACCESS PASSCODE"
              placeholder="••••••••"
              value={passcode}
              onChangeText={(text) => { setPasscode(text); setErrors(prev => ({...prev, passcode: null})); }}
              secureTextEntry={true}
              iconName="key-outline"
              error={errors.passcode}
            />

            <TouchableOpacity 
              style={styles.forgotBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Lost administrative credentials?</Text>
            </TouchableOpacity>

            <View style={styles.actionContainer}>
              <PremiumButton 
                title="Establish Secure Connection" 
                onPress={handleLogin}
                gradientColors={[COLORS.dark, '#1E293B']}
              />
            </View>
          </View>

          {/* Switch to Register */}
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>New medical facility?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrganizationRegister')}>
              <Text style={styles.footerAction}>Register Facility</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Loading visible={isLoading} text="Establishing clinical registry tunnel..." />
    </PremiumBackground>
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
    color: COLORS.danger,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
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
    color: COLORS.primary,
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

export default OrganizationLogin;
