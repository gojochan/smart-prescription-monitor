import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';
import { COLORS, BORDER_RADIUS, SIZES, SHADOWS } from '../styles/theme';

const Loading = ({ visible, text, message }) => {
  const displayMessage = message || text || 'Processing securely...';
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.glassContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.text}>{displayMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 30,
    borderRadius: BORDER_RADIUS.card,
    alignItems: 'center',
    ...SHADOWS.premium,
    width: 250,
  },
  text: {
    marginTop: SIZES.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Loading;
