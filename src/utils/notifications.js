import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Medicine Reminders',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#0EA5E9',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }
  return token;
};

const getHoursFromFrequency = (frequency) => {
  switch (frequency) {
    case 'Every 1 hour': return 1;
    case 'Every 3 hours': return 3;
    case 'Every 6 hours': return 6;
    case 'Every 12 hours': return 12;
    case 'Twice daily': return 12; // Approximation
    case 'Once daily': return 24;
    default: return 24;
  }
};

const parseDurationDays = (durationStr) => {
  if (!durationStr) return 1;
  const match = String(durationStr).match(/\d+/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return 1; // default to 1 day
};

export const scheduleMedicineReminders = async (prescription) => {
  const medicine = prescription.medicine || 'Medicine';
  const dosage = prescription.dosage || '1 Tablet';
  const frequency = prescription.frequency || 'Once daily';
  const duration = prescription.duration || '1 day';
  const instructions = prescription.instructions || 'As prescribed';
  const id = prescription.id;

  const hoursInterval = getHoursFromFrequency(frequency);
  const days = parseDurationDays(duration);
  const totalDoses = (24 / hoursInterval) * days;
  
  // Cap notifications at 60 to prevent OS limits (iOS allows 64 max local notifications)
  const cappedDoses = Math.min(totalDoses, 60);

  const reminders = [];
  const now = new Date();

  for (let i = 1; i <= cappedDoses; i++) {
    const triggerTime = new Date(now.getTime() + i * hoursInterval * 60 * 60 * 1000);
    
    // Create the unique ID for this specific reminder
    const reminderId = `${id}_dose_${i}`;

    const notificationBody = `Medicine: ${medicine}\nDose: ${dosage}\nInstruction: ${instructions || 'As prescribed'}\nDoctor: Dr. Sharma`;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Time to take your medicine',
          body: notificationBody,
          data: { reminderId, prescriptionId: id },
          sound: true,
        },
        trigger: triggerTime,
      });
    } catch (error) {
      console.log('Push notification scheduling failed (likely due to Expo Go limitations). Skipping push notification for this dose.', error);
    }

    reminders.push({
      id: reminderId,
      prescriptionId: id,
      medicine,
      dosage,
      instructions,
      time: triggerTime.toISOString(),
      status: 'upcoming'
    });
  }

  return reminders;
};
