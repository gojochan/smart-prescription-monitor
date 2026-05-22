import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BORDER_RADIUS, SHADOWS, COLORS } from '../styles/theme';

const GradientCard = ({ children, colors, style, onPress, activeOpacity = 0.9 }) => {
  const gradientColors = colors || [COLORS.card, COLORS.card];
  const isTouchable = !!onPress;

  const CardWrapper = isTouchable ? TouchableOpacity : View;

  return (
    <CardWrapper
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.premium,
    backgroundColor: 'transparent',
  },
  gradient: {
    padding: 20,
    width: '100%',
  },
});

export default GradientCard;
