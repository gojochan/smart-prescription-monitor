import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Animated, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumButton from '../../components/PremiumButton';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    title: 'Fast Digital Prescriptions',
    description: 'Empower clinical workflows with instantly generated smart prescriptions secured via AI assistance.',
    image: require('../../../assets/images/onboarding1.png'),
    colors: [COLORS.primary, '#0284C7'],
  },
  {
    title: 'Verified Doctors & Organizations',
    description: 'Ensure trust with unified verification pipelines validating doctors, clinics, and pharmacies.',
    image: require('../../../assets/images/onboarding2.png'),
    colors: [COLORS.secondary, '#059669'],
  },
  {
    title: 'Secure Patient History',
    description: 'Access centralized health timelines, dosage history, and safe analytical profiles seamlessly.',
    image: require('../../../assets/images/onboarding3.png'),
    colors: [COLORS.dark, '#1E293B'],
  },
];

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.replace('RoleSelection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('RoleSelection')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.slideContainer}>
        {/* Active illustration visual widget */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={SLIDES[currentSlideIndex].image}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{SLIDES[currentSlideIndex].title}</Text>
          <Text style={styles.description}>{SLIDES[currentSlideIndex].description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {/* Page indicator dots */}
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index ? styles.activeIndicator : null,
              ]}
            />
          ))}
        </View>

        <PremiumButton
          title={currentSlideIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          gradientColors={SLIDES[currentSlideIndex].colors}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  skipText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustrationWrapper: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: BORDER_RADIUS.card,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.premium,
    marginBottom: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.large * 1.2,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  button: {
    width: '100%',
  },
});

export default Onboarding;
