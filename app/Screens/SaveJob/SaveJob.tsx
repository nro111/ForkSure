import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { COLORS, FONTS } from '../../constants/theme';
import { IconButton } from 'react-native-paper';
import {Feather } from "@expo/vector-icons";
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import CardStyle1 from '../../components/Card/CardStyle1';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducer/cartReducer';
import { removeFromsavejob } from '../../redux/reducer/savejobReducer';
import JobCardStyle from '../../components/Card/JobCardStyle';
import Header from '../../layout/Header';

const sliderData = [
    {
        title: "All",
        active: true,
    },
    {
        title: "Child",
    },
    {
        title: "Man",
    },
    {
        title: "Woman",
    },
    {
        title: "Dress",
    },
    {
        title: "Sportswear",
    },
]

type SaveJobScreenProps = StackScreenProps<RootStackParamList, 'SaveJob'>;

const SaveJob = ({ navigation } : SaveJobScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const savejob = useSelector((state:any) => state.savejob.savejob);

    const dispatch = useDispatch();

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    }

    const removeItemFromsavejob = (data: any) => {
        dispatch(removeFromsavejob(data));
    }

    const [activeSize1, setActiveSize1] = useState(sliderData[0]);

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title='SaveJob'
                leftIcon2={'menu'}
                titleLeft
                onPress={() => {navigation.goBack(); navigation.openDrawer()}}
            />
            <View style={[GlobalStyleSheet.container,{flex:1}]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 130,flexGrow:1,justifyContent:savejob.length === 0 ? 'center' : null ,alignItems:savejob.length === 0 ? 'center' : null }}
                >
                    <View>
                        {savejob.map((data:any, index:any) => {
                            return (
                                <View
                                    key={index}
                                    style={{marginBottom:15}}
                                >
                                    <JobCardStyle
                                        id={data.id}
                                        image={data.image}
                                        title={data.title}
                                        selery={data.selery}
                                        compnay={data.compnay}
                                        review={data.review}
                                        location={data.location}
                                        days={data.days}
                                        jobpost={data.jobpost}
                                        jobtime={data.jobtime}
                                        jobtype={data.jobtype}
                                        witdhfull
                                        jobsforyou
                                        onPress={() => {navigation.navigate('JobDetails',{data : data})}}
                                        onPress1={() => navigation.navigate('AboutCompany',{data : data})}
                                        onPress2={() => removeItemFromsavejob(data.id)}
                                    />
                                </View>
                            )
                        })}
                        {savejob.length === 0 && 
                               <View
                                    style={{
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginTop:110
                                    }}
                                >
                                    <View
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:60,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            backgroundColor:theme.dark ? 'rgba(255,255,255,0.15)':COLORS.primaryLight,
                                            marginBottom:20,
                                        }}
                                    >
                                        <Feather color={colors.title} size={24} name='bookmark'/>
                                    </View>
                                    <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your SaveJob is Empty!</Text>    
                                    <Text
                                        style={{
                                            ...FONTS.fontSm,
                                            color:colors.text,
                                            textAlign:'center',
                                            paddingHorizontal:40,
                                            marginBottom:30,
                                        }}
                                    >Add Job to you Save and Job now.</Text>
                                </View>
                            }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SaveJob