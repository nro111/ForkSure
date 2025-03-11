import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home/Home';
import BottomTab from '../layout/BottomTab';
import Profile from '../Screens/profile/Profile';
import { BottomTabParamList } from './BottomTabParamList';
import SaveJob from '../Screens/SaveJob/SaveJob';
import EditProfile from '../Screens/profile/EditProfile';
import NutritionInputScreen from '../Screens/NutritionalDiary/NutritionInputScreen';
import MealPlanDiscoveryScreen from '../Screens/MealPlan/MealPlanDiscoveryScreen';
// import CameraComponent from '../components/Camera/ReceiptCamera';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName='Dashboard'
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props: any) => <BottomTab {...props} />}
        >
            <Tab.Screen
                name="Dashboard"
                component={HomeScreen}
            />

            <Tab.Screen
                name="EditProfile"
                component={EditProfile}
            />

            <Tab.Screen
                name="NutritionInputScreen"
                component={NutritionInputScreen}
            />

            <Tab.Screen
                name="MealPlanDiscoveryScreen"
                component={MealPlanDiscoveryScreen}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;