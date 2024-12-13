import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';

const JobSeekingData = [
    {
        title:"Actively looking for jobs",
        subtitle:"I am currently actively seeking job opportunities and would be happy to participate in an interview.",
    },
    {
        title:"Passively Looking for Jobs",
        subtitle:" am not actively seeking a job at the moment, but I am open to receiving job invitations.",
    },
    {
        title:"Not Looking for Jobs",
        subtitle:"I am not currently seeking a job, so please refrain from sending job invitations.",
    },
]

const ContactUs = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [Active, setActive] = useState(JobSeekingData[0])

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <Header
                title={'Job Seeking Status'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <View style={{ height: 80, width: 80, borderRadius: 30, alignItems: 'center', justifyContent: 'center',backgroundColor:colors.background }}>
                            <Image
                                style={{ height:45, width:35,resizeMode:'contain'}}
                                source={IMAGES.profileuser}
                            />
                        </View>
                        <View style={{paddingHorizontal:25,marginTop:10}}>
                            <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,textAlign:'center'}}>Display your job-seeking status to recruiters and HR professionals.</Text>
                        </View>
                    </View>
                    <View style={{marginTop:30}}>
                        {JobSeekingData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => setActive(data)}
                                    activeOpacity={0.5}
                                    key={index}
                                    style={[{
                                        borderWidth:2,
                                        borderRadius:6,
                                        borderColor:colors.border,
                                        padding:20,
                                        marginBottom:15
                                    },Active === data && {
                                        borderColor:COLORS.primary,
                                        backgroundColor:'rgba(25,103,210,.1)'
                                    }]}
                                >
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:Active === data ? COLORS.primary :colors.title}}>{data.title}</Text>
                                    <Text style={{...FONTS.fontRegular,fontSize:13,color:colors.text,lineHeight:18,marginTop:5}}>{data.subtitle}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUs