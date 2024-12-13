import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import JobCardStyle from '../../components/Card/JobCardStyle';
import { useDispatch } from 'react-redux';
import { addTosavejob } from '../../redux/reducer/savejobReducer';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const SlideData = [
    {
        title:"Applied Jobs",
        navigate:'all',
    },
    {
        title:"Recruiter Actions",
        navigate:'Sent',
    },
    {
        title:"Accepted",
        navigate:'Accepted',
    },
    {
        title:"Rejected",
        navigate:'Rejected',
    },
]

const JobsforData = [
    {
        id:"012",
        title:"User Experience Design Lead",
        image:IMAGES.compnayimage4,
        compnay:"Bakeron",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Remote",
        jobpost:"Internship",
        location:"Noida, India",
        Sent:"Sent",
        status:"Sent",
    },
    {
        id:"013",
        title:"Quality Assurance (QA) Engineer",
        image:IMAGES.compnayimage5,
        compnay:"PowerZone",
        selery:"8k-12k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        location:"New York City, US",
        Rejected:"Rejected",
        status:"Rejected"
    },
    {
        id:"014",
        title:"Full-Stack Developer",
        image:IMAGES.compnayimage6,
        compnay:"JobZilla",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"WFH",
        jobpost:"Internship",
        location:"Paris, France",
        Pending:"Pending",
        status:"Sent",
    },
    {
        id:"015",
        title:"Back-End Developer",
        image:IMAGES.compnayimage7,
        compnay:"JobBoard",
        selery:"14k-18k Lacs P.A",
        review:"4.7",
        jobtime:"Full-Time",
        jobtype:"Hybrid",
        jobpost:"Executive",
        location:"Tokyo, Japan",
        Accepted:"Accepted",
        status:"Accepted",
    },
]

type MyApplicationScreenProps = StackScreenProps<RootStackParamList, 'MyApplication'>;

const MyApplication = ({ navigation } : MyApplicationScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [Active, setActive] = useState(SlideData[0])

    const dispatch = useDispatch();

    const addItemTosavejob = (data : any) => {
        dispatch(addTosavejob(data));
    }

    const [Application, setApplication] = useState(JobsforData)
    const [activeFilter, setActiveFilter] = useState('all'); // Track active filter

    const filterData = (val:any) => {
        setActiveFilter(val); // Update active filter when a filter is selected
        if(val === 'all'){
            setApplication(JobsforData);
        }else{
            const newArry = JobsforData.filter(e => e.status === val);
            setApplication(newArry);
        }
    }

    return (
        <SafeAreaView
            style={{backgroundColor:colors.card,flex:1}}
        >
            <Header
                title={'My Application'}
                leftIcon={'back'}
                titleLeft
            />
            <View style={[GlobalStyleSheet.container]}>
                <View style={{flexDirection:'row',alignItems:'center',gap:10,marginHorizontal:-15}}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal:15}}
                    >
                        {SlideData.map((data,index) =>{
                            return(
                                <TouchableOpacity
                                    onPress={() => {filterData(data.navigate) ; setActive(data)}}
                                    style={[{
                                        height:40,
                                        borderRadius:36,
                                        borderWidth:1,
                                        borderColor:colors.border,
                                        paddingHorizontal:15,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginRight:10
                                    },Active === data && {
                                        borderColor:COLORS.primary,
                                    }]} 
                                    key={index}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:Active === data ? COLORS.primary :colors.text,lineHeight:16}}>{data.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView> 
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View>
                        {Application.map((data,index) => {
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
                                        jobpost={data.jobpost}
                                        jobtime={data.jobtime}
                                        jobtype={data.jobtype}
                                        Sent={data.Sent}
                                        Pending={data.Pending}
                                        Accepted={data.Accepted}
                                        Rejected={data.Rejected}
                                        witdhfull
                                        jobsforyou
                                        onPress={() => {navigation.navigate('MyApplicationStatus',{data : data})}}
                                        onPress1={() => navigation.navigate('AboutCompany',{data : data})}
                                        onPress2={() => addItemTosavejob(data)} 
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyApplication