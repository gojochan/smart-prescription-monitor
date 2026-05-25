import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../styles/theme';

const Header = ({ 
  title, 
  onBackPress, 
  onSkipPress, 
  rightComponent, 
  dark = false,
  backIcon = 'chevron-back',
  skipIcon = 'arrow-forward',
  transparent = false
}) => {
  return (
    <SafeAreaView style={[
      styles.safeArea, 
      dark && styles.safeAreaDark,
      transparent && styles.safeAreaTransparent
    ]}>
      <View style={[
        styles.container,
        transparent && styles.containerTransparent
      ]}>
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons
              name={backIcon}
              size={24}
              color={dark ? COLORS?.textLight : COLORS?.text || '#1F2937'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <Text style={[
          styles.title, 
          dark && styles.titleDark,
          transparent && styles.titleTransparent
        ]} 
        numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightContainer}>
          {rightComponent ? (
            rightComponent
          ) : onSkipPress ? (
            <TouchableOpacity onPress={onSkipPress} style={styles.actionButton} activeOpacity={0.7}>
              <Ionicons
                name={skipIcon}
                size={24}
                color={dark ? COLORS?.textLight : COLORS?.text || '#1F2937'}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS?.dark || '#030A18',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  safeAreaDark: {
    backgroundColor: COLORS?.dark || '#030A18',
  },
  safeAreaTransparent: {
    backgroundColor: 'transparent',
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES?.md || 16,
    backgroundColor: (COLORS?.dark || '#030A18') + 'D9', // 85% opacity (D9 = 217/255 ≈ 0.85)
    borderBottomWidth: 1,
    borderBottomColor: COLORS?.border || 'rgba(255, 255, 255, 0.1)',
  },
  containerTransparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS?.md || 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS?.glass || 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: COLORS?.border || 'rgba(255, 255, 255, 0.15)',
    ...(SHADOWS?.glass || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  title: {
    fontSize: SIZES?.fontLg || 18,
    fontWeight: '700',
    color: COLORS?.text || '#1F2937',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: SIZES?.sm || 12,
    letterSpacing: 0.5,
  },
  titleDark: {
    color: COLORS?.textLight || '#FFFFFF',
  },
  titleTransparent: {
    color: COLORS?.textLight || '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rightContainer: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  placeholder: {
    width: 44,
  },
});

export default Header;