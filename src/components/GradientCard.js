import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BORDER_RADIUS, SHADOWS, COLORS } from '../styles/theme';

const GradientCard = ({ 
  children, 
  colors, 
  style, 
  onPress, 
  activeOpacity = 0.9,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  padding = 24
}) => {
  const gradientColors = colors || COLORS?.gradientColors || ['#667EEA', '#764BA2'];
  const isTouchable = !!onPress;

  const CardWrapper = isTouchable ? TouchableOpacity : View;

  // Only apply TouchableOpacity props when it's touchable
  const touchableProps = isTouchable ? {
    onPress,
    activeOpacity,
    style: [styles.container, style]
  } : {
    style: [styles.container, style]
  };

  return (
    <CardWrapper {...touchableProps}>
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        style={[styles.gradient, { padding }]}
      >
        {children}
      </LinearGradient>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS?.xl || 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS?.cardBorder || 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'transparent',
    ...(SHADOWS?.premium || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    }),
  },
  gradient: {
    width: '100%',
    flex: 1,
  }
});

export default GradientCard;