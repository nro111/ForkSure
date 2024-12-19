import { View, Text, SafeAreaView, ScrollView, TextInput, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import {Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import JobCardStyle from '../../components/Card/JobCardStyle';
import BottomSheet2 from '../Shortcode/BottomSheet2';
import { useDispatch } from 'react-redux';
import { addTosavejob } from '../../redux/reducer/savejobReducer';

const JobsforData = [
    {
        id:"16",
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
        id:"100",
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
        id:"17",
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
        id:"18",
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

const filterData = [
    {
        title:"Sort",
        navigate:'short'
    },
    {
        title:"Job title",
        navigate:'job'
    },
    {
        title:"Experience",
        navigate:'Experience'
    },
    {
        title:"Location",
        navigate:'Location'
    },
    {
        title:"Salary",
        navigate:'Salary'
    },
    {
        title:"Working Mode",
        navigate:'WorkingMode'
    },
]


type SearchResultsScreenProps = StackScreenProps<RootStackParamList, 'SearchResults'>;

const SearchResults = ({ navigation } : SearchResultsScreenProps) => {

    const theme = useTheme();
    const {colors} : {colors :any } = theme;

    const [active, setactive] = useState(filterData[-1]);

    const sheetRef = useRef<any>();

    const dispatch = useDispatch();

    const addItemTosavejob = (data: any) => {
        dispatch(addTosavejob(data));
    }

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.card,
            }}
        >
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View
                    style={{
                        height:60,
                        flexDirection:'row',
                        alignItems:'center',
                        gap:10,
                        backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                        paddingHorizontal:15
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Feather color={COLORS.primary} size={22} name='arrow-left'/>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        <TextInput
                            style={{
                                ...FONTS.fontMedium,
                                fontSize:14,
                                color:colors.title,
                                height:40,
                                backgroundColor:colors.card,
                                borderRadius:50,
                                borderWidth:1,
                                borderColor:colors.border,
                                paddingHorizontal:25,
                                paddingLeft:45
                            }}
                            placeholder='Web Developer'
                            placeholderTextColor={colors.text}
                        />
                        <View style={{position:'absolute',top:9,left:10}}>
                            <Feather color={COLORS.primary} size={22} name='search'/>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        padding:15,
                        flexDirection:'row',
                        alignItems:'center'
                    }}
                >
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title}}><Text style={{color:COLORS.primary}}>2,170</Text> Results</Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View style={[GlobalStyleSheet.container]}>
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
            <View
                style={{
                    height:50,
                    borderTopWidth:1,
                    borderColor:colors.border,
                    backgroundColor: theme.dark ? colors.background  :'#FAFCFF',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row'
                }}
            >
                <ScrollView 
                    horizontal
                    contentContainerStyle={{paddingHorizontal:15}}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={[GlobalStyleSheet.row,{gap:10,paddingLeft:90}]}>
                        {filterData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => {setactive(data) ; sheetRef.current.openSheet(data.navigate)}}
                                    activeOpacity={0.5}
                                    key={index}
                                    style={[{
                                        padding:10,
                                        paddingVertical:8,
                                        backgroundColor:colors.card,
                                        borderRadius:6,
                                        borderWidth:1,
                                        borderColor:colors.border,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        gap:5,
                                    },active === data && {
                                        borderColor:COLORS.primary
                                    }]}
                                >
                                    <Text style={[{...FONTS.fontSemiBold,fontSize:12,color:colors.text,lineHeight:16},active === data && {color:COLORS.primary}]}>{data.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <View
                    style={[{
                        height:50,
                        borderTopWidth:1,
                        borderColor:colors.border,
                        backgroundColor: theme.dark ? colors.background  :'#FAFCFF',
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'row',
                        paddingHorizontal:10,
                        paddingLeft:15,
                        position:'absolute',
                        left:0
                    }]}
                >
                    <View 
                        style={[{
                            padding:10,
                            paddingVertical:8,
                            backgroundColor:colors.card,
                            borderRadius:6,
                            borderWidth:1,
                            borderColor:colors.border,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            gap:5,
                        },active && {
                            backgroundColor:COLORS.primary
                        }]}
                    >
                        <Image
                            style={{
                                height:14,
                                width:14,
                                tintColor:active ? COLORS.card : COLORS.primary,
                            }}
                            source={IMAGES.filter}
                        />
                        <Text style={[{...FONTS.fontBold,fontSize:12,color:COLORS.primary,lineHeight:16},active && {color:COLORS.card}]}>Filter</Text>
                    </View>
                </View>
            </View>
            <BottomSheet2
                ref={sheetRef}
            />
        </SafeAreaView>
    )
}

export default SearchResults