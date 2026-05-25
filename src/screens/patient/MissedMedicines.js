import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';
import { getMissedMedicines } from '../../utils/storage';
import GradientCard from '../../components/GradientCard';

const MissedMedicines = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const data = await getMissedMedicines();
    setMedicines(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Missed Doses" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {medicines.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="shield-checkmark-outline" size={80} color="#E2E8F0" />
            <Text style={styles.emptyText}>Great! No missed medicines</Text>
          </View>
        ) : (
          medicines.map((item, index) => {
            const timeObj = new Date(item.missedAt);
            return (
              <GradientCard key={index} colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']} style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="close" size={24} color={COLORS.danger} />
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.medName}>{item.medicine}</Text>
                    <Text style={styles.medDose}>{item.dosage}</Text>
                  </View>
                  <View style={styles.timeInfo}>
                    <Text style={styles.timeText}>
                      {timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Text style={styles.dateText}>
                      {timeObj.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </Text>
                  </View>
                </View>
              </GradientCard>
            );
          })
        )}
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
    paddingBottom: 120,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  medName: {
    fontSize: SIZES.font + 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  medDose: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  timeInfo: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.danger,
  },
  dateText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '700',
  },
});

export default MissedMedicines;
