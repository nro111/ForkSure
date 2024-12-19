import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import {Feather } from "@expo/vector-icons";
import Button from '../../components/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';;
import JobCardStyle from '../../components/Card/JobCardStyle';
import { useDispatch } from 'react-redux';
import { addTosavejob } from '../../redux/reducer/savejobReducer';


const RecommendJobData = [
    {
        id:"19",
        title:"User Experience Design Lead",
        image:IMAGES.compnayimage1,
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Remote",
        jobpost:"Director",
        location:"Noida, India",
        days:"5 Day ago",
    },
    {
        id:"20",
        title:"Front-End Developer",
        image:IMAGES.compnayimage2,
        compnay:"Bakeron",
        selery:"8k-12k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        jobpost:"Internship",
        location:"Noida, India",
        days:"5 Day ago",
    },
    {
        id:"21",
        title:"Back-End Developer",
        image:IMAGES.compnayimage3,
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Remote",
        jobpost:"Executive",
        location:"Noida, India",
        days:"5 Day ago",
    },
]

const SearchData = [
    {
        title: "UI/UX Designer",
    },
    {
        title: "DevOps Engineer",
    },
    {
        title: "Software Engineer",
    },
]

type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;

const Search = ({ navigation } : SearchScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();

    const addItemTosavejob = (data: any) => {
        dispatch(addTosavejob(data));
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <View style={[GlobalStyleSheet.container, { paddingBottom: 10, }]}>
                <View
                    style={{height:40,flexDirection:'row',alignItems:'center',gap:15}}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:colors.background,
                            borderRadius:50
                        }}
                    >
                        <Feather color={COLORS.primary} size={22} name='arrow-left'/>
                    </TouchableOpacity>
                    <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,lineHeight:22}}>Search Job</Text>
                </View>
                <View style={{marginVertical:10,marginTop:15}}>
                    <TextInput
                        style={{
                            ...FONTS.fontRegular,
                            fontSize:16,
                            color:colors.title,
                            paddingHorizontal:15,
                            paddingLeft:40,
                            height:45,
                            borderBottomWidth:2,
                            borderBottomColor:colors.border
                        }}
                        placeholder={'Job Title, keywords, or company'}
                        placeholderTextColor={colors.text}
                    />
                    <View style={{position:'absolute',left:10,top:15}}>
                        <Image
                            style={{height:18,width:18,resizeMode:'contain'}}
                            source={IMAGES.compnayimage3}
                        />
                    </View>
                </View>
                <View style={{marginVertical:10}}>
                    <TextInput
                        style={{
                            ...FONTS.fontRegular,
                            fontSize:16,
                            color:colors.title,
                            paddingHorizontal:15,
                            paddingLeft:40,
                            height:45,
                            borderBottomWidth:2,
                            borderBottomColor:colors.border
                        }}
                        placeholder={'Job Location'}
                        placeholderTextColor={colors.text}
                    />
                    <View style={{position:'absolute',left:10,top:15}}>
                        <Image
                            style={{height:20,width:20,resizeMode:'contain'}}
                            source={IMAGES.authlocation}
                        />
                    </View>
                </View>
                <View style={{marginVertical:20}}>
                    <Button
                        title='Search Jobs'
                        color={theme.dark ? COLORS.white: COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.navigate('SearchResults')}
                    />
                </View>
                <View>
                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title }}>Most Search</Text>
                </View>
                <View style={{marginHorizontal:-15}}> 
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 20 ,paddingHorizontal:15}}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 10 }}>
                            {SearchData.map((data:any, index:any) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Products')}
                                        activeOpacity={0.7}
                                        key={index}
                                        style={{
                                            flexDirection:'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap:5,
                                            height: 38,
                                            borderWidth:1,
                                            borderRadius:6,
                                            borderColor:colors.border,
                                            marginTop: 10,
                                            paddingHorizontal:15,
                                            paddingVertical: 5,
                                        }}>
                                        <Feather color={COLORS.primary} size={18} name='search'/>
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color:colors.title,lineHeight:16 }}>{data.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={{marginVertical:20}}>
                    <LinearGradient
                        colors={['rgba(25,103,210,0)','rgba(25,103,210,0.10)']}
                        style={{
                            borderRadius:6,
                            borderWidth:1,
                            borderColor:colors.border,
                            padding:20,
                            paddingTop:10,
                            overflow:'hidden'
                        }}
                    >
                        <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,paddingRight:15}}>Boost Your Interview Success with JobBoard Team Tips</Text>
                        <View style={{width:'42%',marginTop:15}}>
                            <Button
                                title='Start Preparing'
                                size={'sm'}
                            />
                        </View>
                        <View style={{position:'absolute',right:10,top:-20}}>
                            <Image
                                style={{
                                    width:150,
                                    resizeMode:'contain'
                                }}
                                source={IMAGES.banneruser}
                            />
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{ ...FONTS.fontSemiBold, fontSize: 18, color: colors.title, }}>Recommend Job</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('SearchResults')}
                        >
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:COLORS.primary, }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop:15,marginHorizontal:-15}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal:15}}
                        >
                             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                                {RecommendJobData.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
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
                                                onPress={() => {navigation.navigate('JobDetails',{data : data})}}
                                                onPress1={() => navigation.navigate('AboutCompany',{data : data})}
                                                onPress2={() => addItemTosavejob(data)}
                                            />
                                        </View>
                                    )
                                })}
                             </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Search