import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const SettingsData = [
    {
        title:"General Notifications",
    },
    {
        title:"Notify when there is job Available",
    },
    {
        title:"Notify when there is Job Invitation",
    },
    {
        title:"App Update",
    },
    {
        title:"Job Status Update ",
    },
]

type NotificationSettingsScreenProps = StackScreenProps<RootStackParamList, 'NotificationSettings'>;

const NotificationSettings = ({ navigation } : NotificationSettingsScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <Header
                title={'Notification Settings'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    {SettingsData.map((data,index) => {
                        const [active , setActive] = useState(false);

                        const offset = useSharedValue(0);
                        const toggleStyle = useAnimatedStyle(() => { 
                            return {
                                transform: [
                                    { 
                                        translateX:  offset.value
                                    }
                                ],
                            };
                        });
                        useEffect(() => {
                            if(active){
                                setActive(true);
                                offset.value = withSpring(15)
                            }
                        },[active])
                        return(
                            <View 
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    marginBottom:10,
                                    paddingBottom:15,
                                    borderBottomWidth:index === 4 ? 0: 1,
                                    borderBottomColor:colors.border
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title}}>{data.title}</Text>
                                <TouchableOpacity
                                    onPress={() => { 
                                        setActive(!active);
                                        if(active){
                                            offset.value = withSpring(0)
                                        }else{
                                            offset.value = withSpring(15)
                                        }
                                    }}
                                    style={[{
                                        height:18,
                                        width:35,
                                        borderRadius:10,
                                        backgroundColor : active ? COLORS.primary : theme.dark ? 'rgba(255,255,255,.15)' : '#e8e9ea',
                                    }]}
                                >
                                    <Animated.View
                                        style={[toggleStyle,{
                                            height:14,
                                            width:14,
                                            borderRadius:14,
                                            backgroundColor:"#fff",
                                            top:2,
                                            left:3,
                                        }]}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Withdraw Application"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NotificationSettings