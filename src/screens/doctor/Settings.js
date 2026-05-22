import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const Settings = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [genericSubstitution, setGenericSubstitution] = useState(true);
  const [aiReviewEnabled, setAiReviewEnabled] = useState(true);

  const settingSections = [
    {
      title: 'Practice Preferences',
      settings: [
        {
          title: 'Auto Generic Substitution',
          desc: 'Alert when lower cost generic equivalents exist',
          type: 'switch',
          value: genericSubstitution,
          onValueChange: setGenericSubstitution,
          icon: 'git-compare-outline',
        },
        {
          title: 'Realtime AI Contraindication Checks',
          desc: 'Automatically run drug-interaction scans',
          type: 'switch',
          value: aiReviewEnabled,
          onValueChange: setAiReviewEnabled,
          icon: 'shield-outline',
        },
      ],
    },
    {
      title: 'Security & Access',
      settings: [
        {
          title: 'Biometric Login',
          desc: 'Secure authentication using FaceID / TouchID',
          type: 'switch',
          value: biometricsEnabled,
          onValueChange: setBiometricsEnabled,
          icon: 'finger-print-outline',
        },
        {
          title: 'Push Notifications',
          desc: 'Transaction alerts and pharmacist feedback',
          type: 'switch',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
          icon: 'notifications-outline',
        },
      ],
    },
    {
      title: 'Support & Info',
      settings: [
        {
          title: 'Terms of Clinical Practice',
          type: 'link',
          icon: 'document-text-outline',
        },
        {
          title: 'Privacy Policy',
          type: 'link',
          icon: 'lock-closed-outline',
        },
        {
          title: 'Reset Application Preferences',
          type: 'button',
          color: COLORS.danger,
          icon: 'trash-outline',
        },
      ],
    },
  ];

  const handleLinkPress = (title) => {
    Alert.alert(title, `Displaying clinical document details for: ${title}`);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Preferences',
      'Are you sure you want to reset all clinical and dashboard parameters to factory defaults?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset Defaults', 
          style: 'destructive',
          onPress: () => {
            setNotificationsEnabled(true);
            setBiometricsEnabled(false);
            setGenericSubstitution(true);
            setAiReviewEnabled(true);
            Alert.alert('Reset Success', 'Clinical values returned to default standards.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, secIdx) => (
          <View key={secIdx} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.card}>
              {section.settings.map((setting, setIdx) => {
                const isLast = setIdx === section.settings.length - 1;
                return (
                  <View key={setIdx} style={[styles.settingRow, isLast && styles.noBorder]}>
                    <View style={styles.settingIconCircle}>
                      <Ionicons name={setting.icon} size={20} color={COLORS.text} />
                    </View>
                    
                    <View style={styles.settingDetails}>
                      <Text style={[styles.settingTitle, setting.color && { color: setting.color }]}>
                        {setting.title}
                      </Text>
                      {setting.desc && <Text style={styles.settingDesc}>{setting.desc}</Text>}
                    </View>

                    {setting.type === 'switch' && (
                      <Switch
                        value={setting.value}
                        onValueChange={setting.onValueChange}
                        trackColor={{ false: '#CBD5E1', true: '#BAE6FD' }}
                        thumbColor={setting.value ? COLORS.primary : '#F1F5F9'}
                      />
                    )}

                    {setting.type === 'link' && (
                      <TouchableOpacity onPress={() => handleLinkPress(setting.title)}>
                        <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
                      </TouchableOpacity>
                    )}

                    {setting.type === 'button' && (
                      <TouchableOpacity onPress={handleReset} style={styles.rowResetBtn}>
                        <Text style={styles.resetBtnText}>Reset</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={styles.legalText}>
          Authorized clinical staff portals are HIPAA and GDPR compliant. Accessing logs outside authorized clinical hardware is strictly audited.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    paddingHorizontal: 20,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1.2,
    borderBottomColor: '#F8FAFC',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 14,
  },
  settingDetails: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  settingDesc: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 14,
    fontWeight: '500',
  },
  rowResetBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
  },
  resetBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.danger,
  },
  legalText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 10,
    marginTop: 8,
    fontWeight: '500',
  },
});

export default Settings;
