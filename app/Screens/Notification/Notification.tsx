import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, SafeAreaView, LayoutAnimation, Image, Text } from 'react-native';
import Header from '../../layout/Header';
import {  ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const NotificationData = [
    {
        image: IMAGES.compnayimage4,
        title: "New Job Opening Alert",
        contant:"New Job Opportunity: web designer at Bakeron",
        time:"2 day ago",
        button:true,
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Remote",
        jobpost:"Internship",
        location:"Noida, India",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage5,
        title: "Job Application Submission Confirmation",
        contant:"We’ve successfully received your application.",
        time:"18 hr ago",
        compnay:"Bakeron",
        selery:"8k-12k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        location:"New York City, US",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage6,
        title: "Shortlisted for an Interview",
        contant:"We’ve successfully received your application.",
        time:"10 hr ago",
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"WFH",
        jobpost:"Internship",
        location:"Paris, France",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage7,
        title: "Job Offer Notification",
        contant:"We’ve successfully received your application.",
        time:"30 min ago",
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        jobpost:"Executive",
        location:"Tokyo, Japan",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage4,
        title: "New Job Opening Alert",
        contant:"New Job Opportunity: web designer at Bakeron",
        time:"2 day ago",
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Remote",
        jobpost:"Internship",
        location:"Noida, India",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage5,
        title: "Job Application Submission Confirmation",
        contant:"We’ve successfully received your application.",
        time:"18 hr ago",
        compnay:"Bakeron",
        selery:"8k-12k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        location:"New York City, US",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage6,
        title: "Shortlisted for an Interview",
        contant:"We’ve successfully received your application.",
        time:"10 hr ago",
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"WFH",
        jobpost:"Internship",
        location:"Paris, France",
        days:"5 Day ago",
    },
    {
        image: IMAGES.compnayimage7,
        title: "Job Offer Notification",
        contant:"We’ve successfully received your application.",
        time:"30 min ago",
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        jobpost:"Executive",
        location:"Tokyo, Japan",
        days:"5 Day ago",
    },
]

type NotificationScreenProps = StackScreenProps<RootStackParamList, 'Notification'>;

const Notification = ({navigation} : NotificationScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;
    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title="Notifications (12)"
                leftIcon={'back'}
                rightIcon2={'search'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    {NotificationData.map((data:any,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => navigation.navigate('JobDetails', {data : data})}
                                key={index}
                                style={{
                                    marginBottom:15,
                                    paddingBottom:15,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.border,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:10,
                                    }}
                                >
                                    <View
                                        style={{
                                            height:50,
                                            width:50,
                                            borderRadius:15,
                                            borderWidth:1,
                                            borderColor:colors.border,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <Image
                                            style={{height:30,width:30,resizeMode:'contain'}}
                                            source={data.image}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title}}>{data.title}</Text>
                                        <Text style={{...FONTS.fontRegular,fontSize:13,color:colors.text,paddingRight:120}}>{data.contant}</Text>
                                    </View>
                                </View>
                                <View style={{position:'absolute',right:0,bottom:15}}>
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text}}>{data.time}</Text>
                                </View>
                                {data.button &&
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('JobDetails', {data : data})}
                                        style={{
                                            borderWidth:1,
                                            borderColor:COLORS.primary,
                                            borderRadius:4,
                                            padding:6,
                                            paddingHorizontal:10,
                                            marginTop:10,
                                            width:100,
                                            marginLeft:60
                                        }}
                                    >
                                        <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary,lineHeight:14}}>Apply for this</Text>
                                    </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notification