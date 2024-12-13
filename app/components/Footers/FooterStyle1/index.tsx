import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../../../layout/Header';
import CustomNavigation from './CustomNavigation';
import { Platform, SafeAreaView, View } from 'react-native';

import { useTheme } from '@react-navigation/native';

const Home = () => {
    return (
        <>
        </>
    )
}
const Market = () => {
    return (
        <>
        </>
    )
}
const Change = () => {
    return (
        <>
        </>
    )
}
const Wallet = () => {
    return (
        <>
        </>
    )
}
const Profile = () => {
    return (
        <>
        </>
    )
}

const Tab = createBottomTabNavigator();

const TabStyle1 = () => {

    const { colors } : {colors : any} = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View
                style={[{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 5,
                }, Platform.OS === "ios" && {
                    backgroundColor: colors.card,
                }]}
            >
                <Header title={'Footer Style 1'} titleLeft leftIcon={'back'} />
            </View>
            <Tab.Navigator
                tabBar={props => <CustomNavigation {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Change"
            >
                <Tab.Screen
                    name="Home"
                    component={Home}

                />
                <Tab.Screen
                    name="Markets"
                    component={Market}
                />
                <Tab.Screen
                    name="Change"
                    component={Change}
                />
                <Tab.Screen
                    name="Wallet"
                    component={Wallet}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};



export default TabStyle1;