import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePrescription = async (prescriptionData) => {
  try {
    const existing = await AsyncStorage.getItem('prescriptions');
    const prescriptions = existing ? JSON.parse(existing) : [];
    
    const newPrescription = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...prescriptionData,
    };
    
    prescriptions.unshift(newPrescription);
    await AsyncStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    return newPrescription;
  } catch (error) {
    console.error('Error saving prescription:', error);
    return null;
  }
};

export const getPrescriptions = async () => {
  try {
    const data = await AsyncStorage.getItem('prescriptions');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};

export const saveUpcomingReminders = async (reminders) => {
  try {
    const existing = await AsyncStorage.getItem('upcomingReminders');
    let upcoming = existing ? JSON.parse(existing) : [];
    upcoming = [...upcoming, ...reminders];
    
    // Sort by time
    upcoming.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    
    await AsyncStorage.setItem('upcomingReminders', JSON.stringify(upcoming));
  } catch (error) {
    console.error('Error saving upcoming reminders:', error);
  }
};

export const getUpcomingReminders = async () => {
  try {
    const data = await AsyncStorage.getItem('upcomingReminders');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return [];
  }
};

export const markReminderTaken = async (reminderId) => {
  try {
    // 1. Get upcoming
    const existing = await AsyncStorage.getItem('upcomingReminders');
    let upcoming = existing ? JSON.parse(existing) : [];
    
    const reminder = upcoming.find(r => r.id === reminderId);
    if (!reminder) return;
    
    // 2. Remove from upcoming
    upcoming = upcoming.filter(r => r.id !== reminderId);
    await AsyncStorage.setItem('upcomingReminders', JSON.stringify(upcoming));
    
    // 3. Add to completed
    const completedData = await AsyncStorage.getItem('completedMedicines');
    let completed = completedData ? JSON.parse(completedData) : [];
    completed.unshift({ ...reminder, takenAt: new Date().toISOString() });
    await AsyncStorage.setItem('completedMedicines', JSON.stringify(completed));
  } catch (error) {
    console.error('Error marking taken:', error);
  }
};

export const markReminderMissed = async (reminderId) => {
  try {
    const existing = await AsyncStorage.getItem('upcomingReminders');
    let upcoming = existing ? JSON.parse(existing) : [];
    
    const reminder = upcoming.find(r => r.id === reminderId);
    if (!reminder) return;
    
    upcoming = upcoming.filter(r => r.id !== reminderId);
    await AsyncStorage.setItem('upcomingReminders', JSON.stringify(upcoming));
    
    const missedData = await AsyncStorage.getItem('missedMedicines');
    let missed = missedData ? JSON.parse(missedData) : [];
    missed.unshift({ ...reminder, missedAt: new Date().toISOString() });
    await AsyncStorage.setItem('missedMedicines', JSON.stringify(missed));
  } catch (error) {
    console.error('Error marking missed:', error);
  }
};

export const getCompletedMedicines = async () => {
  try {
    const data = await AsyncStorage.getItem('completedMedicines');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const getMissedMedicines = async () => {
  try {
    const data = await AsyncStorage.getItem('missedMedicines');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};
