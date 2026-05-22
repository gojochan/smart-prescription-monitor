import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';
import { getCompletedMedicines, getMissedMedicines } from '../../utils/storage';
import GradientCard from '../../components/GradientCard';

const MedicineReminderHistory = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const completed = await getCompletedMedicines();
    const missed = await getMissedMedicines();
    
    const combined = [
      ...completed.map(m => ({ ...m, type: 'taken', sortTime: new Date(m.takenAt).getTime(), displayTime: m.takenAt })),
      ...missed.map(m => ({ ...m, type: 'missed', sortTime: new Date(m.missedAt).getTime(), displayTime: m.missedAt }))
    ];
    
    combined.sort((a, b) => b.sortTime - a.sortTime); // newest first
    setHistory(combined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reminder History" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={80} color="#E2E8F0" />
            <Text style={styles.emptyText}>No reminder history available</Text>
          </View>
        ) : (
          history.map((item, index) => {
            const timeObj = new Date(item.displayTime);
            const isTaken = item.type === 'taken';
            
            return (
              <View key={index} style={styles.cardContainer}>
                <View style={styles.timeLine}>
                  <Text style={styles.timeText}>
                    {timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={styles.dateText}>
                    {timeObj.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </Text>
                  <View style={[styles.timeDot, isTaken ? styles.dotSuccess : styles.dotDanger]} />
                  {index < history.length - 1 && <View style={styles.timeLineConnect} />}
                </View>
                
                <GradientCard 
                  colors={isTaken ? ['#F0FDF4', '#DCFCE7'] : ['#FEF2F2', '#FEE2E2']} 
                  style={[styles.reminderCard, isTaken ? styles.cardSuccess : styles.cardDanger]}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.medInfo}>
                      <Text style={styles.medName}>{item.medicine}</Text>
                      <Text style={styles.medDose}>{item.dosage} • {item.instructions || 'As directed'}</Text>
                    </View>
                    <View style={[styles.badge, isTaken ? styles.badgeSuccess : styles.badgeDanger]}>
                      <Text style={[styles.badgeText, isTaken ? styles.badgeTextSuccess : styles.badgeTextDanger]}>
                        {isTaken ? 'TAKEN' : 'MISSED'}
                      </Text>
                    </View>
                  </View>
                </GradientCard>
              </View>
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
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeLine: {
    width: 65,
    alignItems: 'center',
  },
  timeText: {
    fontSize: SIZES.small,
    fontWeight: '800',
    color: COLORS.text,
  },
  dateText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginTop: 2,
  },
  timeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
  },
  dotSuccess: {
    backgroundColor: COLORS.success,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  dotDanger: {
    backgroundColor: COLORS.danger,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  timeLineConnect: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  reminderCard: {
    flex: 1,
    marginLeft: 10,
    padding: 16,
    borderWidth: 1,
  },
  cardSuccess: {
    borderColor: '#BBF7D0',
  },
  cardDanger: {
    borderColor: '#FECACA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  medInfo: {
    flex: 1,
    paddingRight: 10,
  },
  medName: {
    fontSize: SIZES.font + 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  medDose: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
    lineHeight: 18,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeSuccess: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextSuccess: {
    color: COLORS.success,
  },
  badgeTextDanger: {
    color: COLORS.danger,
  },
});

export default MedicineReminderHistory;
