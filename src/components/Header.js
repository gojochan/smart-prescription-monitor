import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../styles/theme';

const Header = ({ title, onBackPress, rightComponent, dark = false }) => {
  return (
    <SafeAreaView style={[styles.safeArea, dark && styles.safeAreaDark]}>
      <View style={styles.container}>
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={dark ? COLORS.white || '#FFFFFF' : COLORS.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <Text style={[styles.title, dark && styles.titleDark]} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightContainer}>
          {rightComponent || <View style={styles.placeholder} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
  },
  safeAreaDark: {
    backgroundColor: COLORS.dark,
  },
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  titleDark: {
    color: COLORS.white || '#FFFFFF',
  },
  rightContainer: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
  },
});

export default Header;
