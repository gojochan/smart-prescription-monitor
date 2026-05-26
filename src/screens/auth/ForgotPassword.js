import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { type: 'password_reset' });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Password Recovery" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationContainer}>
              <Ionicons name="lock-open-outline" size={80} color={COLORS.primary} />
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              No worries. Enter your email below, and we will send you a verification code to reset it.
            </Text>
          </View>

          <View style={styles.form}>
            <PremiumInput
              label="Email Address"
              placeholder="e.g. dr.wilson@smp.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="mail-outline"
              error={error}
            />

            <PremiumButton
              title="Send Verification Code"
              onPress={handleReset}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Loading visible={loading} text="Sending recovery link..." />
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
  header: {
    marginVertical: 30,
  },
  title: {
    fontSize: SIZES.extraLarge,
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
  button: {
    marginTop: 30,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  illustrationContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgotPassword;
