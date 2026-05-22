import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';
import { getUpcomingReminders, markReminderTaken, markReminderMissed } from '../../utils/storage';
import GradientCard from '../../components/GradientCard';

const { width } = Dimensions.get('window');

const UpcomingSchedule = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const data = await getUpcomingReminders();
    setReminders(data);
  };

  const handleTaken = async (id) => {
    await markReminderTaken(id);
    loadReminders();
  };

  const handleMissed = async (id) => {
    await markReminderMissed(id);
    loadReminders();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Upcoming Schedule" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {reminders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-clear-outline" size={80} color="#E2E8F0" />
            <Text style={styles.emptyText}>No upcoming medicines scheduled</Text>
          </View>
        ) : (
          reminders.map((item, index) => {
            const timeObj = new Date(item.time);
            return (
              <View key={item.id} style={styles.cardContainer}>
                <View style={styles.timeLine}>
                  <Text style={styles.timeText}>
                    {timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <View style={styles.timeDot} />
                  {index < reminders.length - 1 && <View style={styles.timeLineConnect} />}
                </View>
                
                <GradientCard colors={['#FFFFFF', '#F8FAFC']} style={styles.reminderCard}>
                  <View style={styles.cardHeader}>
                    <View style={styles.pillIcon}>
                      <Ionicons name="medical" size={20} color={COLORS.primary} />
                    </View>
                    <View style={styles.medInfo}>
                      <Text style={styles.medName}>{item.medicine}</Text>
                      <Text style={styles.medDose}>{item.dosage}</Text>
                    </View>
                  </View>
                  
                  {item.instructions && (
                    <Text style={styles.instructions}>
                      <Ionicons name="information-circle-outline" size={14} color={COLORS.textSecondary} /> {item.instructions}
                    </Text>
                  )}
                  
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleMissed(item.id)} style={[styles.actionBtn, styles.missedBtn]}>
                      <Text style={styles.missedBtnText}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTaken(item.id)} style={[styles.actionBtn, styles.takenBtn]}>
                      <Text style={styles.takenBtnText}>Mark Taken</Text>
                    </TouchableOpacity>
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
    marginBottom: 8,
  },
  timeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: 'rgba(14, 165, 233, 0.2)',
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
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pillIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medInfo: {
    marginLeft: 12,
    flex: 1,
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
    marginTop: 2,
  },
  instructions: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.pill,
    marginLeft: 10,
  },
  missedBtn: {
    backgroundColor: '#FEE2E2',
  },
  missedBtnText: {
    color: COLORS.danger,
    fontWeight: '700',
    fontSize: SIZES.small,
  },
  takenBtn: {
    backgroundColor: COLORS.primary,
  },
  takenBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: SIZES.small,
  },
});

export default UpcomingSchedule;
