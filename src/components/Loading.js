import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';
import { COLORS, BORDER_RADIUS, SIZES, SHADOWS } from '../styles/theme';

const Loading = ({ 
  visible = false, 
  text, 
  message, 
  transparent = true,
  animationType = 'fade',
  backgroundColor = 'rgba(15, 23, 42, 0.4)'
}) => {
  const displayMessage = message || text || 'Processing securely...';
  
  return (
    <Modal 
      transparent={transparent} 
      visible={visible} 
      animationType={animationType}
      statusBarTranslucent={true}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.glassContainer}>
          <ActivityIndicator 
            size="large" 
            color={COLORS?.primary || '#007AFF'} 
          />
          <Text style={styles.text}>{displayMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassContainer: {
    padding: SIZES?.extraLarge || 30,
    borderRadius: BORDER_RADIUS?.card || 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS?.card || '#FFFFFF',
    minWidth: 200,
    maxWidth: '80%',
    ...(SHADOWS?.premium || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10,
    }),
  },
  text: {
    marginTop: SIZES?.medium || 16,
    fontSize: SIZES?.font || 14,
    color: COLORS?.text || '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Loading;