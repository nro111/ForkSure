import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import {Feather } from "@expo/vector-icons";
import { IMAGES } from '../../constants/Images';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native';

const AboutGalaryData = [
    {
        image:IMAGES.postbanner1,
    },
    {
        image:IMAGES.postbanner2,
    },
    {
        image:IMAGES.postbanner3,
    },
    {
        image:IMAGES.postbanner4,
    },
    {
        image:IMAGES.postbanner5,
    },
]

const AboutGalary = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={[GlobalStyleSheet.container,{
                padding:0,
                flex:1,
                backgroundColor:COLORS.title
            }]}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[GlobalStyleSheet.background,{backgroundColor:COLORS.title,left:15,top:15}]}
            >
                <Feather name="arrow-left" size={24} color={COLORS.card} />
            </TouchableOpacity>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:150
                    }}
                >
                    <Swiper
                        autoplay={true}
                        autoplayTimeout={3}
                        height={'auto'}
                        dotStyle={{
                            height: 6,
                            width: 6,
                            backgroundColor:COLORS.card,
                            opacity:.2
                        }}
                        activeDotStyle={{
                            height: 6,
                            width: 6,
                            backgroundColor:COLORS.card,
                        }}
                        paginationStyle={{bottom:10}}
                    >
                        {AboutGalaryData.map((data, index) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        width:'100%',
                                        height:null,
                                        aspectRatio:1/1,
                                        backgroundColor:COLORS.background,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        overflow:'hidden'
                                    }}
                                >
                                    <Image
                                        style={{
                                            width:'100%',
                                            height:null,
                                            aspectRatio:1/1,
                                            resizeMode:'contain',

                                        }}
                                        source={data.image}
                                    />
                                </View>
                            )
                        })}
                    </Swiper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutGalary