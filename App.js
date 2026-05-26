import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/utils/notifications';
import { View, TouchableOpacity, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const navigationRef = createNavigationContainerRef();

const HIDDEN_SCREENS = ['SplashScreen', 'Onboarding'];

const GlobalNavButtons = ({ currentRoute }) => {
  if (!currentRoute || HIDDEN_SCREENS.includes(currentRoute)) {
    return null;
  }

  const handleBack = () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  };

  const handleSkip = () => {
    if (navigationRef.isReady()) {
      // Skip logic: fallback to RoleSelection for auth flows
      navigationRef.navigate('RoleSelection');
    }
  };

  return (
    <SafeAreaView style={styles.globalNavContainer} pointerEvents="box-none">
      <View style={styles.globalNavInner} pointerEvents="box-none">
        <TouchableOpacity 
          style={styles.globalNavBtn} 
          onPress={handleBack}
        >
          <Text style={styles.globalNavText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.globalNavBtn} 
          onPress={handleSkip}
        >
          <Text style={styles.globalNavText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = React.useState('SplashScreen');

  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer 
        ref={navigationRef}
        onStateChange={() => {
          if (navigationRef.isReady()) {
            setCurrentRoute(navigationRef.getCurrentRoute()?.name);
          }
        }}
      >
        <StatusBar style="auto" />
        <AppNavigator />
        <GlobalNavButtons currentRoute={currentRoute} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  globalNavContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  globalNavInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
  globalNavBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Premium dark glass
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  globalNavText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  }
});
