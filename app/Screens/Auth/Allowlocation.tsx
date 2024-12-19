import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, SafeAreaView, ScrollView, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Button from '../../components/Button/Button';
//import axios from 'axios';

type AllowlocationScreenProps = StackScreenProps<RootStackParamList, 'Allowlocation'>;

const Allowlocation = ({navigation} : AllowlocationScreenProps) => {

    const [location, setLocation] = useState<any>(null);
    //const [locationName, setLocationName] = useState<any>('');

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                title: 'Location Access Required',
                message: 'This app needs to access your location',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
                buttonNeutral: 'Ask Me Later'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Permission granted, navigate to next page
                navigation.navigate('DrawerNavigation',{screen : 'Home'})
            } else {
                console.log('Location permission denied');
            }
            //return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;  // On iOS, the permission check is not needed in the same way.
    };

    // Get current location coordinates
    const getCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;

        Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            //getLocationName(latitude, longitude);
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };


    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <SafeAreaView style={[GlobalStyleSheet.container,{flex:1,backgroundColor:colors.card}]}>
            <ScrollView
                contentContainerStyle={{flexGrow:1}}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        flex:1
                    }}
                >
                    <View
                        style={{
                            height:120,
                            width:120,
                            borderRadius:100,
                            backgroundColor:colors.background,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Image
                            style={{
                                height:80,
                                width:80,
                                resizeMode:'contain'
                            }}
                            source={IMAGES.userlocation}
                        />
                    </View>
                    <View style={{alignItems:'center',paddingHorizontal:10,marginVertical:15}}>
                        <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,marginBottom:10}}>What is your Location?</Text>
                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,textAlign:'center'}}>Start your job search today by finding nearby positions.</Text>
                    </View>
                    <View style={{width:'100%',paddingHorizontal:10}}>
                        <Button
                            title={'Allow Location Access'}
                            onPress={getCurrentLocation}
                            //onPress={() =>  navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FindLocation')}
                        style={{
                            paddingVertical:15
                        }}
                    >
                        <Text style={{...FONTS.fontRegular,fontSize:16,color:COLORS.primary}}>Enter location Manually</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Allowlocation;