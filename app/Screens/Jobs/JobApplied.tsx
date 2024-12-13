import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';;
import Button from '../../components/Button/Button';
import { IMAGES } from '../../constants/Images';
import { Image } from 'react-native';
import JobCardStyle from '../../components/Card/JobCardStyle';
import {Feather } from "@expo/vector-icons";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useDispatch } from 'react-redux';
import { addTosavejob } from '../../redux/reducer/savejobReducer';

const ApplyData = [
    {
        id:"0",
        title:"Applied Successfully",
        active:true
    },
    {
        id:"1",
        title:"Shortlist",
    },
    {
        id:"2",
        title:"Application Review",
    },
    {
        id:"3",
        title:"Interview",
    },
]

const JobsforData = [
    {
        id:"12",
        title:"User Experience Design Lead",
        image:IMAGES.compnayimage4,
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
        id:"13",
        title:"Quality Assurance (QA) Engineer",
        image:IMAGES.compnayimage5,
        compnay:"Bakeron",
        selery:"8k-12k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        location:"New York City, US",
        days:"5 Day ago",
    },
    {
        id:"14",
        title:"Full-Stack Developer",
        image:IMAGES.compnayimage6,
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"WFH",
        jobpost:"Internship",
        location:"Paris, France",
        days:"5 Day ago",
    },
    {
        id:"15",
        title:"Back-End Developer",
        image:IMAGES.compnayimage7,
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

type JobAppliedScreenProps = StackScreenProps<RootStackParamList, 'JobApplied'>;

const JobApplied = ({ navigation } : JobAppliedScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();

    const addItemTosavejob = (data: any) => {
        dispatch(addTosavejob(data));
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title='JobApplied'
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container]}>
                    <View>
                        {ApplyData.map((data,index) => {
                            return(
                                <View 
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:15,
                                        marginBottom:15
                                    }}
                                >
                                    <View
                                        style={[{
                                            height:16,
                                            width:16,
                                            borderRadius:10,
                                            borderWidth:3,
                                            borderColor:data.active ? '#3CC29C' :colors.background
                                        }]}
                                    />
                                    {data.id === '3' ? 
                                        null
                                    :
                                        <View
                                            style={{
                                                width:2,
                                                height:20,
                                                backgroundColor:data.active ? '#3CC29C' :colors.background,
                                                position:'absolute',
                                                left:7,
                                                top:15
                                            }}
                                        />
                                    }
                                    <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.text,lineHeight:18}}>{data.title}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{marginVertical:10}}>
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
                    <View style={{marginBottom:15}}>
                        <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title }}>Similar Jobs</Text>
                    </View>
                    <View>
                        {JobsforData.map((data,index) => {
                            return(
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
                                        onPress2={() => addItemTosavejob(data)} 
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container]}>
                <View
                    style={{
                        backgroundColor:'#3CC29C',
                        height:48,
                        borderRadius:8,
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        gap:10,
                        paddingHorizontal:20
                    }}
                >
                    <Feather color={COLORS.card} size={20} name='check-circle'/>
                    <Text style={{...FONTS.fontBold,fontSize:15,color:COLORS.card,lineHeight:16}}>Applied Successfully</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default JobApplied