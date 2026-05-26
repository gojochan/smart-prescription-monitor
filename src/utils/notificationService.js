import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure how notifications appear when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ─── Permission Setup ──────────────────────────────────────────────────────────
export const registerForNotificationsAsync = async () => {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('medicine-reminders', {
        name: 'Medicine Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#0EA5E9',
        sound: 'default',
        enableVibrate: true,
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('[Notifications] Permission not granted.');
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Notifications] Error in registration:', err);
    return false;
  }
};

// ─── Frequency Parser ──────────────────────────────────────────────────────────
export const parseIntervalMinutes = (frequency) => {
  if (!frequency) return 24 * 60;

  const f = frequency.toLowerCase().trim();

  if (f === 'once daily') return 24 * 60;
  if (f === 'twice daily') return 12 * 60;

  const minuteMatch = f.match(/(\d+)\s*(?:minute|min)/);
  if (minuteMatch) {
    return parseInt(minuteMatch[1], 10);
  }

  const hourMatch = f.match(/(\d+)\s*(?:hour|hr)/);
  if (hourMatch) {
    return parseInt(hourMatch[1], 10) * 60;
  }

  return 24 * 60;
};

// ─── Duration Parser ───────────────────────────────────────────────────────────
export const parseDurationDays = (durationStr) => {
  if (!durationStr) return 1;
  const d = String(durationStr).toLowerCase().trim();
  
  const match = d.match(/(\d+)\s*(?:day|week|wk|hour|hr|min)/);
  if (!match) {
    const numMatch = d.match(/(\d+)/);
    return numMatch ? parseInt(numMatch[0], 10) : 1;
  }
  
  const value = parseInt(match[1], 10);
  if (d.includes('week') || d.includes('wk')) {
    return value * 7;
  }
  if (d.includes('hour') || d.includes('hr')) {
    return value / 24;
  }
  if (d.includes('minute') || d.includes('min')) {
    return value / (24 * 60);
  }
  return value; // days
};

// ─── Main Scheduler ────────────────────────────────────────────────────────────
export const scheduleMedicineReminders = async (prescription) => {
  const medicine     = prescription.medicine     || 'Medicine';
  const dosage       = prescription.dosage       || '1 Tablet';
  const frequency    = prescription.frequency    || 'Once daily';
  const duration     = prescription.duration     || '1 day';
  const instructions = prescription.instructions || 'As prescribed';
  const doctorName   = prescription.doctorName   || 'Dr. Sharma';
  const id           = prescription.id;

  const permGranted = await registerForNotificationsAsync();

  const intervalMinutes = parseIntervalMinutes(frequency);
  const days            = parseDurationDays(duration);
  const totalMinutes    = Math.round(days * 24 * 60);
  const totalDoses      = Math.floor(totalMinutes / intervalMinutes);

  const cappedDoses = Math.min(totalDoses, 60);

  const reminders = [];
  const now = new Date();
  let scheduledCount = 0;

  for (let i = 1; i <= cappedDoses; i++) {
    const triggerTime  = new Date(now.getTime() + i * intervalMinutes * 60 * 1000);
    const reminderId   = `${id}_dose_${i}`;
    const notificationBody =
      `Medicine: ${medicine}\nDose: ${dosage}\nInstructions: ${instructions}\nDoctor: ${doctorName}`;

    if (permGranted) {
      try {
        const schedId = await Notifications.scheduleNotificationAsync({
          content: {
            title: '💊 Time to take medicine',
            body: notificationBody,
            data: { reminderId, prescriptionId: id },
            sound: true,
            channelId: 'medicine-reminders',
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: triggerTime,
          },
        });
        console.log(`[Notifications] Successfully scheduled dose ${i} (ID: ${schedId}) at ${triggerTime.toISOString()}`);
        scheduledCount++;
      } catch (err) {
        console.error(`[Notifications] Failed to schedule dose ${i}:`, err.message);
      }
    } else {
      console.warn(`[Notifications] Permission not granted, skipping schedule of dose ${i}`);
    }

    reminders.push({
      id:             reminderId,
      prescriptionId: id,
      medicine,
      dosage,
      instructions,
      doctorName,
      time:           triggerTime.toISOString(),
      status:         'upcoming',
    });
  }

  console.log(`[Notifications] Actually scheduled ${scheduledCount} / ${cappedDoses} reminders (interval: ${intervalMinutes} min, duration: ${days} days)`);
  await saveReminders(reminders);
  return reminders;
};

// ─── Schedule Test Notification ──────────────────────────────────────────────
export const scheduleTestNotification = async () => {
  const permGranted = await registerForNotificationsAsync();
  if (!permGranted) {
    console.error('[Notifications] Cannot schedule test notification: permission denied');
    return false;
  }

  const triggerTime = new Date(Date.now() + 10 * 1000);
  const reminderId = `test_notification_${Date.now()}`;
  const notificationBody = 'Medicine: Paracetamol\nDose: 1 tablet\nInstructions: Take with water\nDoctor: Dr. Sharma';

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 Time to take medicine',
        body: notificationBody,
        data: { reminderId, isTest: true },
        sound: true,
        channelId: 'medicine-reminders',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerTime,
      },
    });
    console.log(`[Notifications] Test notification scheduled successfully! ID: ${id}`);
    return id;
  } catch (err) {
    console.error(`[Notifications] Failed to schedule test notification: ${err.message}`);
    return false;
  }
};

// ─── Cancel all scheduled reminders for a prescription ──────────────────────
export const cancelPrescriptionReminders = async (prescriptionId) => {
  const all = await loadReminders();
  const toCancel = all.filter(r => r.prescriptionId === prescriptionId);
  for (const r of toCancel) {
    try { await Notifications.cancelScheduledNotificationAsync(r.id); } catch (_) {}
  }
  const remaining = all.filter(r => r.prescriptionId !== prescriptionId);
  await AsyncStorage.setItem('@spm_reminders', JSON.stringify(remaining));
};

// ─── Storage helpers ─────────────────────────────────────────────────────────
export const saveReminders = async (newReminders) => {
  const existing = await loadReminders();
  const merged = [...existing, ...newReminders];
  await AsyncStorage.setItem('@spm_reminders', JSON.stringify(merged));
};

export const loadReminders = async () => {
  try {
    const raw = await AsyncStorage.getItem('@spm_reminders');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// ─── Categorise reminders by status ─────────────────────────────────────────
export const getCategorisedReminders = async () => {
  const all = await loadReminders();
  const now = new Date();

  return all.reduce(
    (acc, r) => {
      const t = new Date(r.time);
      if (r.status === 'completed') {
        acc.completed.push(r);
      } else if (t < now) {
        acc.missed.push({ ...r, status: 'missed' });
      } else {
        acc.upcoming.push(r);
      }
      return acc;
    },
    { upcoming: [], missed: [], completed: [] }
  );
};

// ─── Mark a dose as completed ────────────────────────────────────────────────
export const markDoseCompleted = async (reminderId) => {
  const all = await loadReminders();
  const updated = all.map(r =>
    r.id === reminderId ? { ...r, status: 'completed' } : r
  );
  await AsyncStorage.setItem('@spm_reminders', JSON.stringify(updated));
};

