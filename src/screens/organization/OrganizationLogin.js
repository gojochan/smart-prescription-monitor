import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import SafeImage from '../../components/SafeImage';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const OrganizationLogin = ({ navigation }) => {
  const [clinicId, setClinicId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!clinicId || !passcode) {
      Alert.alert('Incomplete Form', 'Please enter your clinical ID and security passcode.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('OrganizationDashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
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
              onChangeText={setClinicId}
              iconName="business-outline"
            />

            <PremiumInput
              label="SECURITY ACCESS PASSCODE"
              placeholder="••••••••"
              value={passcode}
              onChangeText={setPasscode}
              secureTextEntry={true}
              iconName="key-outline"
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
    marginBottom: 24,
    marginTop: 50, // Moved lower down for easy thumb access
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtnAbs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  skipBtnText: {
    color: COLORS.primary,
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
    color: COLORS.danger,
    marginTop: 6,
    letterSpacing: 0.5,
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  illustration: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default OrganizationLogin;
