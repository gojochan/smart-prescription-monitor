import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../styles/theme';

const RoleCard = ({ 
  title, 
  iconName, 
  onPress, 
  color,
  description,
  disabled = false,
  selected = false,
  style
}) => {
  const cardColor = color || COLORS?.primary || '#007AFF';
  
  // Generate color with opacity for different states
  const getBackgroundColor = () => {
    if (selected) return cardColor + '15';
    return cardColor + '25';
  };
  
  const getBorderColor = () => {
    if (selected) return cardColor;
    if (disabled) return COLORS?.border || '#E5E7EB';
    return cardColor + '50';
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        selected && styles.cardSelected,
        disabled && styles.cardDisabled,
        style
      ]} 
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <View style={[
        styles.iconContainer, 
        { 
          backgroundColor: getBackgroundColor(), 
          borderColor: getBorderColor(),
          ...(selected && { transform: [{ scale: 1.05 }] })
        }
      ]}>
        <Ionicons 
          name={iconName} 
          size={32} 
          color={selected ? cardColor : (disabled ? (COLORS?.textSecondary || '#6B7280') : cardColor)} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[
          styles.title,
          disabled && styles.titleDisabled,
          selected && styles.titleSelected
        ]}>
          {title}
        </Text>
        {description && (
          <Text style={[
            styles.description,
            disabled && styles.descriptionDisabled
          ]}>
            {description}
          </Text>
        )}
      </View>
      {selected ? (
        <View style={[styles.chevronContainer, { backgroundColor: cardColor + '20' }]}>
          <Ionicons name="checkmark" size={20} color={cardColor} />
        </View>
      ) : (
        <View style={styles.chevronContainer}>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={disabled ? (COLORS?.textSecondary || '#6B7280') : (COLORS?.textSecondary || '#6B7280')} 
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS?.glass || 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS?.lg || 16,
    padding: SIZES?.lg || 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES?.md || 16,
    borderWidth: 1.5,
    borderColor: COLORS?.border || 'rgba(255, 255, 255, 0.1)',
    ...(SHADOWS?.glass || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  cardSelected: {
    borderWidth: 2,
    ...(SHADOWS?.glow || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    }),
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS?.md || 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES?.md || 16,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZES?.fontLg || 18,
    fontWeight: '700',
    color: COLORS?.text || '#1F2937',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  titleSelected: {
    color: COLORS?.primary || '#007AFF',
  },
  titleDisabled: {
    color: COLORS?.textSecondary || '#6B7280',
  },
  description: {
    fontSize: SIZES?.fontSm || 12,
    color: COLORS?.textSecondary || '#6B7280',
    letterSpacing: 0.3,
  },
  descriptionDisabled: {
    color: (COLORS?.textSecondary || '#6B7280') + '80',
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS?.glassLight || 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RoleCard;