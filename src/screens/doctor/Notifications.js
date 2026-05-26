import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Replace with original API integration
    // fetch('https://your-api.com/doctor/notifications')
    //   .then(res => res.json())
    //   .then(data => setNotifications(data))
    //   .catch(err => console.error('API Error:', err));
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    Alert.alert('Success', 'All notifications marked as read.');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'checkmark-circle-outline', color: COLORS.secondary, bg: 'rgba(16, 185, 129, 0.08)' };
      case 'warning':
        return { name: 'alert-circle-outline', color: COLORS.danger, bg: 'rgba(239, 68, 68, 0.08)' };
      case 'info':
      default:
        return { name: 'information-circle-outline', color: COLORS.primary, bg: 'rgba(14, 165, 233, 0.08)' };
    }
  };

  const renderItem = ({ item }) => {
    const iconDetails = getIcon(item.type);
    return (
      <View style={[styles.notificationCard, !item.read && styles.unreadCard]}>
        <View style={[styles.iconCircle, { backgroundColor: iconDetails.bg }]}>
          <Ionicons name={iconDetails.name} size={20} color={iconDetails.color} />
        </View>
        <View style={styles.contentCol}>
          <View style={styles.headerRow}>
            <Text style={[styles.notifTitle, !item.read && styles.unreadText]}>{item.title}</Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notifBody}>{item.body}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} 
        title="Notifications" 
        onBackPress={() => navigation.goBack()} 
        rightComponent={
          <TouchableOpacity onPress={markAllRead} style={styles.readAllBtn}>
            <Ionicons name="mail-open-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>All caught up!</Text>
          <Text style={styles.emptySubtitle}>You will receive security and patient transaction alerts here.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  readAllBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  listContent: {
    padding: 24,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  unreadCard: {
    borderColor: 'rgba(14, 165, 233, 0.15)', // Subtle blue background for unread items
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contentCol: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notifTitle: {
    fontSize: SIZES.font + 1,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    paddingRight: 8,
  },
  unreadText: {
    fontWeight: '900',
    color: COLORS.dark,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  notifBody: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    fontWeight: '500',
  },
  notifTime: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: SIZES.large,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Notifications;
