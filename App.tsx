import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Route';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import * as Notifications from 'expo-notifications';
import { getExpoPushTokenAsync } from 'expo-notifications';

const App = () => {

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    // Request permission to receive notifications
    const getPushToken = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        // Get Expo push token
        const token = await getExpoPushTokenAsync();
        setExpoPushToken(token.data);
        console.log('Expo Push Token:', token.data);
      } else {
        console.log('Permission for notifications was denied');
      }
    };

    getPushToken();

    // Handle incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received', notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification clicked', response);
    });

    // Clean up subscriptions when the component unmounts
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const [loaded] = useFonts({
    PlusJakartaSansRegular: require('./app/assets/fonts/PlusJakartaSans-Regular.ttf'),
    PlusJakartaSansSemiBold: require('./app/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    PlusJakartaSansBold: require('./app/assets/fonts/PlusJakartaSans-Bold.ttf'),
    PlusJakartaSansMedium: require('./app/assets/fonts/PlusJakartaSans-Medium.ttf'),
    PlusJakartaSansLight: require('./app/assets/fonts/PlusJakartaSans-Light.ttf'),
    PlusJakartaSansExtraBold: require('./app/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <StatusBar style="dark" />
        <Provider store={store}>
          <Routes />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;