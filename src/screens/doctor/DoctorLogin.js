import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import SafeImage from '../../components/SafeImage';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const DoctorLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email address is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('DoctorDashboard');
    }, 1500);
  };

  return (
    <PremiumBackground safeArea={false} colors={['#0f172a', '#0c4a6e']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back & Skip Buttons - Shifted lower for thumb access */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('DoctorDashboard')} style={styles.skipPillAbs}>
              <Text style={styles.skipPillText}>Skip</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} style={{marginLeft: 6}} />
            </TouchableOpacity>
          </View>

          {/* Premium Illustration Rounded Card Thumbnail */}
          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationContainer}>
              <SafeImage
                source={require('../../../assets/images/doctor_illustration.png')}
                style={styles.illustration}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome Practitioner</Text>
            <Text style={styles.subtitle}>Enter your secure credentials to proceed to clinical portal.</Text>
          </View>

          <View style={styles.form}>
            <PremiumInput
              label="Official Email Address"
              placeholder="e.g. sarah.wilson@smp.com"
              value={email}
              onChangeText={(text) => { setEmail(text); setErrors(prev => ({...prev, email: null})); }}
              keyboardType="email-address"
              iconName="mail-outline"
              error={errors.email}
            />

            <PremiumInput
              label="Security Password"
              placeholder="••••••••••••"
              value={password}
              onChangeText={(text) => { setPassword(text); setErrors(prev => ({...prev, password: null})); }}
              secureTextEntry
              iconName="lock-closed-outline"
              error={errors.password}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotContainer}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PremiumButton title="Access Portal" onPress={handleLogin} style={styles.loginBtn} />

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <PremiumButton
              title="Apply for Medical Verification"
              onPress={() => navigation.navigate('DoctorVerification')}
              type="outline"
              style={styles.verifyBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Loading visible={loading} text="Verifying doctor identity..." />
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  skipPillAbs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  skipPillText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: SIZES.font,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: SIZES.extraLarge - 2,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: '700',
  },
  loginBtn: {
    marginTop: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    paddingHorizontal: 16,
    color: COLORS.textTertiary,
    fontSize: SIZES.font,
    fontWeight: '600',
  },
  verifyBtn: {
    marginBottom: 20,
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

export default DoctorLogin;

