import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Route';
import { Provider } from 'react-redux';
import store from './app/redux/store';

const App = () =>{

	const [loaded] = useFonts({
      PlusJakartaSansRegular : require('./app/assets/fonts/PlusJakartaSans-Regular.ttf'),
      PlusJakartaSansSemiBold: require('./app/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
      PlusJakartaSansBold : require('./app/assets/fonts/PlusJakartaSans-Bold.ttf'),
      PlusJakartaSansMedium : require('./app/assets/fonts/PlusJakartaSans-Medium.ttf'),
      PlusJakartaSansLight : require('./app/assets/fonts/PlusJakartaSans-Light.ttf'),
      PlusJakartaSansExtraBold: require('./app/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
	});  

	if(!loaded){
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
                <Routes/>
              </Provider>
        </SafeAreaView>
		</SafeAreaProvider>
	);
};

export default App;
