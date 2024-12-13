import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import ThemeBtn from '../components/ThemeBtn';
import { IMAGES } from '../constants/Images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import {  useSelector } from 'react-redux';

const navItem = [
    {
        icon: IMAGES.components,
        name: "Components",
        navigate: "Components",
    },
    {
        icon: IMAGES.search,
        name: "Search Jobs",
        navigate: "Search",
    },
    {
        icon: IMAGES.save,
        name: "Saved Jobs",
        navigate: "SaveJob",
    },
    {
        icon: IMAGES.document,
        name: "My Application",
        navigate: "MyApplication",
    },
    {
        icon: IMAGES.eye,
        name: "Job Seeking Status",
        navigate: "ContactUs",
    },
    {
        icon: IMAGES.chat,
        name: "Chat For help",
        navigate: 'Messages',
    },
    {
        icon: IMAGES.globe,
        name: "Language",
        navigate: 'ChooseLanguage',
    },
    {
        icon: IMAGES.settings,
        name: "Settings",
        navigate: 'Settings',
    },
    {
        icon: IMAGES.bell,
        name: "Notifications",
        navigate: "Allownotification",
    },
    {
        icon: IMAGES.helpcircle,
        name: "Help Center",
        navigate: 'HelpCenter',
    },
]

const Sidebar = ({navigation} : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [progress, setProgress] = useState(0); // Example progress (24%)

    const { userData } = useSelector((state: any) => state.user);

    useEffect(() => {
        let progress = 0;
        
        if (userData?.username) {
            progress += 0.14; 
        }
        if (userData?.jobprofile) {
            progress += 0.10; 
        }
        if (userData?.img) {
            progress += 0.05; 
        }
        if (userData?.AnnualSalary) {
            progress += 0.07; 
        }
        if (userData?.Profilesummary) {
            progress += 0.04; 
        }
        if (userData?.ProfessionalDetails) {
            progress += 0.1; 
        }
        if (userData?.Employment) {
            progress += 0.1; 
        }
        if (userData?.Education) {
            progress += 0.1; 
        }
        if (userData?.JobProjects) {
            progress += 0.1; 
        }
        if (userData?.JobKeySkills) {
            progress += 0.1; 
        }
        if (userData?.ResumeCV) {
            progress += 0.1; 
        }
    
        setProgress(progress);
    }, [userData]
    ); // Run this effect when img or jobprofile changes

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.card,borderTopRightRadius:30,borderBottomRightRadius:30 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View
                        style={{
                            paddingTop: 50,
                            paddingHorizontal:-10,
                            marginHorizontal:15,
                            borderBottomWidth: 1,
                            borderColor: colors.border,
                            paddingBottom: 20,
                            marginBottom: 15,
                            alignItems: 'flex-start',
                        }}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between'
                            }}
                        >
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    gap:10,
                                    flex:1
                                }}
                            >
                                <View style={{alignItems:'center'}}>
                                    <View
                                        style={{transform:[{rotate : '180deg'}]}}
                                    >
                                            <Progress.Circle 
                                                borderWidth={0}
                                                unfilledColor={colors.background}
                                                color={COLORS.primary}
                                                progress={progress} 
                                                size={56} 
                                                thickness={4}
                                                strokeCap={'round'}
                                            />
                                    </View>
                                    {userData.img ? 
                                        <View
                                            style={{
                                                height:44,
                                                width:44,
                                                borderRadius:50,
                                                backgroundColor:'#D5E1F2',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                position:'absolute',
                                                top:6
                                            }}
                                        >
                                            <Image 
                                                source={{ uri: userData.img }} 
                                                style={{ width: 40, height: 40,borderRadius:50 }} 
                                            />
                                        </View>
                                        : 
                                        <View
                                            style={{
                                                height:44,
                                                width:44,
                                                borderRadius:50,
                                                backgroundColor:'#D5E1F2',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                position:'absolute',
                                                top:6
                                            }}
                                        >
                                            <FontAwesome5 color={COLORS.card} size={25} name='user'/>
                                        </View>
                                    }
                                    <View
                                        style={{
                                            backgroundColor:colors.card,
                                            padding:1,
                                            paddingHorizontal:5,
                                            borderRadius:4,
                                            borderWidth:1,
                                            borderColor:colors.border,
                                            position:'absolute',
                                            bottom:0
                                        }}
                                    >
                                        <Text style={{ ...FONTS.fontBold,fontSize:9,color:colors.title,lineHeight:12}}> {Math.round(progress * 100)}%</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{...FONTS.fontBold,fontSize:15,color:colors.title,marginBottom:2}}>{userData.username}</Text>
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary}}>{userData.jobprofile}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditProfile')}
                                activeOpacity={0.5}
                            >
                                <Feather color={COLORS.primary} size={16} name='edit-2'/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', right: 0, top: 20 }}>
                            <ThemeBtn />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {navItem.map((data, index) => {
                            return (
                                <TouchableOpacity
                                    //onPress={() => {data.navigate && navigation.navigate(data.navigate); navigation.closeDrawer()}}
                                    onPress={() => {
                                        data.navigate == "Account" ?
                                            navigation.navigate('BottomNavigation', { screen: data.navigate })
                                            :data.navigate === "SaveJob" ? 
                                            navigation.navigate('BottomNavigation', { screen: data.navigate })
                                            :
                                            data.navigate && navigation.navigate(data.navigate);
                                        //navigation.closeDrawer()
                                    }}
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        paddingVertical: 14,
                                    }}
                                >
                                    <View style={{ marginRight: 15 }}>
                                        <Image
                                            style={{ height: 18, width: 18, resizeMode: 'contain', tintColor:COLORS.primary }}
                                            source={data.icon}
                                        />
                                    </View>
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title }}>{data.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <View
                        style={{
                            paddingHorizontal: -15,
                            marginHorizontal:15,
                            paddingTop:10,
                            paddingVertical: 15,
                            marginTop: 10,
                            borderTopWidth: 1,
                            borderTopColor: colors.border
                        }}
                    >
                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.text }}>Version 1.0.0</Text>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Sidebar;