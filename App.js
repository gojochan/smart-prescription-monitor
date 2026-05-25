import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const navigationRef = createNavigationContainerRef();

const GlobalNavButtons = () => {
  return (
    <View style={styles.globalNavContainer} pointerEvents="box-none">
      <TouchableOpacity 
        style={styles.globalNavBtn} 
        onPress={() => {
          if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.goBack();
          }
        }}
      >
        <Text style={styles.globalNavText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.globalNavBtn} 
        onPress={() => console.log('Temporary Skip pressed')}
      >
        <Text style={styles.globalNavText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        <AppNavigator />
        <GlobalNavButtons />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  globalNavContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 9999,
  },
  globalNavBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  globalNavText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
