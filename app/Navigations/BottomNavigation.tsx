import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/Home';
import BottomTab from '../layout/BottomTab';
import Profile from '../Screens/profile/Profile';
import { BottomTabParamList } from './BottomTabParamList';
import SaveJob from '../Screens/SaveJob/SaveJob';
// import CameraComponent from '../components/Camera/ReceiptCamera';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName='Dashboard'
            screenOptions={{
                headerShown : false
            }}
            tabBar={(props:any) => <BottomTab {...props}/>}
        >
            <Tab.Screen 
                name="Dashboard" 
                component={HomeScreen} 
            />

            <Tab.Screen 
                name="Profile" 
                component={Profile} 
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;