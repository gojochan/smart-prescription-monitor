import React from 'react';
import { StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../styles/theme';

const PremiumBackground = ({ 
  children, 
  style, 
  safeArea = true,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  colors
}) => {
  const gradientColors = colors || COLORS?.gradientColors || ['#667EEA', '#764BA2'];
  
  const ContentWrapper = safeArea ? SafeAreaView : View;
  
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
      start={start}
      end={end}
    >
      <ContentWrapper style={[styles.container, style]}>
        {children}
      </ContentWrapper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    ...(Platform.OS === 'android' && {
      paddingTop: 25, // Fallback safe area for android
    }),
  },
});

export default PremiumBackground;