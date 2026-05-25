import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SafeImage from '../../components/SafeImage';
import { COLORS, SIZES, SHADOWS } from '../../styles/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeLogoAnim = useRef(new Animated.Value(0)).current;
  const pulseScaleAnim = useRef(new Animated.Value(1)).current;
  const loadingProgressAnim = useRef(new Animated.Value(0)).current;
  const fadeTextAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Fade in the logo wrapper
    Animated.timing(fadeLogoAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // 2. Start the looping logo pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScaleAnim, {
          toValue: 1.06,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseScaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Animate loading progress bar from 0 to 1 over 2200ms (starts after 400ms delay)
    Animated.sequence([
      Animated.delay(400),
      Animated.timing(loadingProgressAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      })
    ]).start(() => {
      // 5. Navigate to Onboarding after progress fills
    setTimeout(() => {
    navigation.replace('Onboarding');
  }, 3000);
});
    // 4. Fade in tagline and bottom text when progress is ~70% (using delay)
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(fadeTextAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();

  }, []);

  // Interpolate progress width
  const progressBarWidth = loadingProgressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={['#0B1528', '#0284C7', '#10B981']}
      style={styles.container}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo Circle Container */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeLogoAnim,
                transform: [{ scale: pulseScaleAnim }],
              }
            ]}
          >
            <SafeImage
              source={require('../../../assets/images/spm_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Spacing Gap */}
          <View style={styles.gapSmall} />

          {/* Custom Animated Progress Bar */}
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, { width: progressBarWidth }]}>
              <LinearGradient
                colors={['#34D399', '#10B981']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>

          {/* Spacing Gap */}
          <View style={styles.gapLarge} />

          {/* Tagline section */}
          <Animated.View style={{ opacity: fadeTextAnim, alignItems: 'center' }}>
            <Text style={styles.appName}>Smart Prescription Monitor</Text>
            <Text style={styles.tagline}>Prescribe Smarter. Care Better.</Text>
          </Animated.View>
        </View>

        {/* Footer text */}
        <Animated.View style={[styles.footer, { opacity: fadeTextAnim }]}>
          <Text style={styles.footerText}>Powered by AI Healthcare Technology</Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 120,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 48,
  },
  logo: {
    width: 220,
    height: 220,
  },
  gapSmall: {
    height: 12,
  },
  progressContainer: {
    width: 220,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  progressGradient: {
    flex: 1,
  },
  gapLarge: {
    height: 28,
  },
  appName: {
    fontSize: SIZES.large * 1.3,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: SIZES.medium,
    color: '#E2E8F0',
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: SIZES.font,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
