import { View, Text, SafeAreaView, ScrollView, Image, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import JobCardStyle from '../../components/Card/JobCardStyle';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { addTosavejob } from '../../redux/reducer/savejobReducer';


const CompanyData = [
    {
        image:IMAGES.globe,
        title:"Website",
        about:"www.google.com",
    },
    {
        image:IMAGES.map,
        title:"Headquarters",
        about:"Noida, India",
    },
    {
        image:IMAGES.calendar,
        title:"Founded",
        about:"14 July 2005",
    },
    {
        image:IMAGES.vacancyuser,
        title:"Size",
        about:"2500",
    },
    {
        image:IMAGES.dollarsign,
        title:"Revenue",
        about:"10,000 Millions",
    },
]

const JobsforData = [
    {
        id:"8",
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
        id:"9",
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
        id:"10",
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
        id:"11",
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

const UserReviewData = [
    {
        user:"Kim Shine",
        rating:"4.5",
        time:"2 hr ago",
        about:"Offers a close-knit, collaborative environment with great work-life balance. However, career growth is limited due to the company’s size and resource constraints.",
        status : "Newest",
    },
    {
        user:"Avery Thompson",
        rating:"3.0",
        time:"3 days ago",
        about:"Provides a friendly work environment with hands-on customer interaction. The work can be physically demanding, especially during peak seasons, but compensation is fair.",
        status : "Newest",
    },
    {
        user:"Jordan Mitchell",
        rating:"4.0",
        time:"2 month ago",
        about:"Fast-paced and fosters creativity. Deadlines can be intense, and some departments lack structure, but it's perfect for those who thrive in dynamic settings.",
        status : "Oldest",
    },
    {
        user:"Taylor Reynolds",
        rating:"3.5",
        time:"2 year ago",
        about:"Fast-paced and fosters creativity. Deadlines can be intense, and some departments lack structure, but it's perfect for those who thrive in dynamic settings.",
        status : "Oldest",
    },
]

const dropdownData = [
    {
        id:"1",
        lable:"Recent",
        status : "all",
    },
    {
        id:"2",
        lable:"Oldest",
        status : "Oldest",
    },
    {
        id:"3",
        lable:"Newest",
        status : "Newest",
    },
]

const TabViewData = [
    {
        title:"About",
        name: "about"
    },
    {
        title:"Gallery",
        name: "gallery"
    },
    {
        title:"Open Jobs",
        name: "open-jobs"
    },
    {
        title:"Review",
        name: "review"
    },
]

type AboutCompanyScreenProps = StackScreenProps<RootStackParamList, 'AboutCompany'>;

const AboutCompany = ({route, navigation } : AboutCompanyScreenProps)  => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();

    const addItemTosavejob = (data: any) => {
        dispatch(addTosavejob(data));
    }
    const [showcontant, setshowcontant] = useState(false)

    const [show, setshow] = useState(false)

    const [select, setselect] = React.useState(0)

    const [reviewData , setreviewData] = useState(UserReviewData);

    const filterData = (val:any) => {
        if(val === 'all'){
            setreviewData(UserReviewData);
        }else{
            const newArry = UserReviewData.filter(e => e.status === val);
            //console.log(newArry)
            setreviewData(newArry);
        }
    }

    const [activeIndex, setActiveIndex] = useState<any>('about');
    const underlinePosition = useRef(new Animated.Value(0)).current; // Animated value for the underline

    // Animate the underline when activeIndex changes
    const animateUnderline = (index: number) => {
        Animated.timing(underlinePosition, {
            toValue: index * (SIZES.container / 8 ), // Move underline based on the index
            useNativeDriver: false,
            duration: 200
        }).start();
    };

    // useEffect(() => {
    //     animateUnderline(activeIndex); // Trigger animation on active index change
    // }, [activeIndex]);

    // One page ScrollView start

    const [sectionHeights, setSectionHeights] = useState(new Array(TabViewData.length).fill(0));
    const scrollViewRef = useRef<any>(null);

    const handleLayout = (index:any) => (event:any) => {
        const { height } = event.nativeEvent.layout;
        setSectionHeights((prevHeights) => {
        const newHeights = [...prevHeights];
        newHeights[index] = height;
        return newHeights;
        });
    };

    const handleScroll = (event:any) => {
        const { contentOffset } = event.nativeEvent;

        let totalHeight = -20;
        sectionHeights.forEach((height, index) => {
        const sectionStart = totalHeight;
        const sectionEnd = totalHeight + height;

        if (sectionStart <= contentOffset.y && sectionEnd > contentOffset.y) {
            setActiveIndex(TabViewData[index].name);
            animateUnderline(index);
        }

        totalHeight += height; // Update totalHeight for the next section
        });
    };

    const scrollToSection = (index:any) => {
        const offset = sectionHeights.slice(0, index).reduce((acc, height) => acc + height, 0);
        scrollViewRef.current.scrollTo({ y: offset, animated: true });
    };

    // One page ScrollView start End

    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
            <Header
                title={data.compnay}
                leftIcon={'back'}
                titleLeft
                rightIcon6={'Visit'}
            />
            <View
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    height:177,
                    width:'100%',
                    backgroundColor:'red',
                    alignItems:'center',
                    justifyContent:'center',
                    overflow:'hidden'
                }]}
            >
                <Image
                    style={{
                        width:'100%',
                        height:null,
                        aspectRatio:1/1,
                        resizeMode:'contain'
                    }}
                    source={IMAGES.postbanner1}
                />
                <View
                    style={{
                        width:'100%',
                        height:null,
                        aspectRatio:1/1,
                        backgroundColor:'rgba(37,55,77,0.80)',
                        position:'absolute',
                        alignItems:'center',
                        justifyContent:'center',
                        padding:20,
                        left:0,
                        right:0,
                        top:0,
                        bottom:0
                    }}
                >
                    <View
                        style={{
                            backgroundColor:COLORS.card,
                            height:80,
                            width:80,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:15,
                            marginBottom:10
                        }}
                    >
                        <Image
                            style={{height:50,width:50,resizeMode:'contain'}}
                            source={data.image}
                        />
                    </View>
                    <Text style={{...FONTS.fontSemiBold,fontSize:18,color:COLORS.card}}>{data.title}</Text>
                    <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.card}}>IT Technology Solutions</Text>
                </View>
            </View>
            <View
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    height:53,
                    width:'100%',
                    backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                    borderBottomWidth:1,
                    borderBottomColor:colors.border,
                }]}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center' }}>
                        {TabViewData.map((data, index) => {
                            const isActive = data.name == activeIndex;  
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => scrollToSection(index)}
                                    // onPress={() => setActiveIndex(index)}  // Update active index on press
                                    style={{
                                        width: SIZES.container / 8,
                                        height: 53,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...FONTS.fontMedium,
                                            fontSize: 16,
                                            color: isActive ? COLORS.primary : colors.text,  // Change text color based on active state
                                        }}
                                    >
                                        {data.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                        {/* Animated underline */}
                        <Animated.View
                            style={{
                                height: 5,
                                backgroundColor: COLORS.primary,
                                width: SIZES.container / 8,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                position: 'absolute',
                                bottom: 0,
                                left: underlinePosition, // Bind underline position to animated value
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View style={[GlobalStyleSheet.container]}>
                    {TabViewData.map((data,index) => {
                        if(data.name === 'about'){
                            return(
                                <View
                                    key={index}
                                    onLayout={handleLayout(index)} 
                                >
                                    <View style={{borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:25}}>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>About Company</Text>
                                        <Text 
                                            numberOfLines={showcontant ? 0 : 4} 
                                            style={{
                                                ...FONTS.fontMedium,
                                                fontSize:13,
                                                color:colors.text,
                                                lineHeight:18,
                                                paddingRight:25
                                            }}
                                        >When crafting a section about a company, it usually includes key information about its mission, values, history, and overall culture. Here's a template you can use or adapt based on the specific companyA Full-Stack Developer is a versatile professional skilled in both front-end and back-end development, responsible for building, maintaining, and optimizing web applications and software systems. They work across the entire stack of technologies, including client-side (front-end), server-side (back-end), and databases.</Text>
                                        <TouchableOpacity
                                            onPress={() => setshowcontant(!showcontant)}
                                            activeOpacity={0.5}
                                            style={{
                                                position:'absolute',
                                                bottom:5,
                                                left:0
                                            }}
                                        >
                                            {showcontant ? 
                                            
                                                <Text style={{...FONTS.fontSemiBold,fontSize:13,color:COLORS.primary}}>Read Less</Text>
                                            :
                                                <Text style={{...FONTS.fontSemiBold,fontSize:13,color:COLORS.primary}}>Read More</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{borderBottomWidth:1,borderBottomColor:colors.border,marginTop:20}}>
                                        {CompanyData.map((data,index) => {
                                            return(
                                                <View
                                                    key={index}
                                                    style={{
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                        justifyContent:'space-between',
                                                        marginBottom:15
                                                    }}
                                                >
                                                    <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                        <Image
                                                            style={{height:20,width:20,tintColor:COLORS.primary}}
                                                            source={data.image}
                                                        />
                                                        <Text style={{...FONTS.fontSemiBold,fontSize:15,color:colors.title,lineHeight:16}}>{data.title}</Text>
                                                    </View>
                                                    <Text style={{...FONTS.fontRegular,fontSize:15,color:colors.text,lineHeight:16}}>{data.about}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        }else if(data.name === 'gallery'){
                        return(
                            <View  
                                key={index}
                                onLayout={handleLayout(index)} 
                                style={{
                                    paddingVertical:10,
                                    paddingBottom:15,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.border,
                                }}  
                            >
                                <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>Life Of Bakeron</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AboutGalary')}
                                    activeOpacity={0.9}
                                >
                                    <View 
                                        style={{
                                            width:'100%',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            gap:3,
                                            marginBottom:3
                                        }}
                                    >
                                        <View style={{width:'50%'}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:null,
                                                    aspectRatio:1/.5,
                                                    borderRadius:6
                                                }}
                                                source={IMAGES.postbanner1}
                                            />
                                        </View>
                                        <View style={{width:'50%'}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:null,
                                                    aspectRatio:1/.5,
                                                    borderRadius:6
                                                }}
                                                source={IMAGES.postbanner2}
                                            />
                                        </View>
                                    </View>
                                    <View 
                                        style={{
                                            width:'100%',
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            gap:3
                                        }}
                                    >
                                        <View style={{width:'33.33%'}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:null,
                                                    aspectRatio:1/1,
                                                    borderRadius:6
                                                }}
                                                source={IMAGES.postbanner3}
                                            />
                                        </View>
                                        <View style={{width:'33.33%'}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:null,
                                                    aspectRatio:1/1,
                                                    borderRadius:6
                                                }}
                                                source={IMAGES.postbanner4}
                                            />
                                        </View>
                                        <View style={{width:'33.33%'}}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('AboutGalary')}
                                                activeOpacity={0.5}
                                                style={{
                                                    width:'100%',
                                                    height:null,
                                                    aspectRatio:1/1,
                                                    borderRadius:6,
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
                                                        borderRadius:6
                                                    }}
                                                    source={IMAGES.postbanner5}
                                                />
                                                <View
                                                    style={{
                                                        width:'100%',
                                                        height:null,
                                                        aspectRatio:1/1,
                                                        backgroundColor:'rgba(37,55,77,0.50)',
                                                        position:'absolute',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        padding:20,
                                                        left:0,
                                                        right:0,
                                                        top:0,
                                                        bottom:0
                                                    }}
                                                >
                                                    <Text style={{...FONTS.fontBold,fontSize:24,color:COLORS.card}}>20+</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            )
                        }else if(data.name === 'open-jobs'){
                        return(
                            <View 
                                key={index}  
                                onLayout={handleLayout(index)} 
                                style={{
                                    paddingVertical:10,
                                    paddingBottom:20,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.border
                                }}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 18, color: colors.title, }}>Recently Added Jobs</Text>
                                </View>
                                <View style={{paddingTop:15,marginHorizontal:-15}}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{paddingHorizontal:15}}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                                            {JobsforData.map((data,index) => {
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
                                                            jobsforyou
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
                            )
                        }else if(data.name === 'review'){
                        return(
                            <View 
                                key={index} 
                                onLayout={handleLayout(index)} 
                                style={{paddingTop:15}}
                            >
                                <View 
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        paddingBottom:15
                                    }}
                                >
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>Review</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => navigation.navigate('WriteReview')}
                                        >
                                            <Text style={{...FONTS.fontSemiBold,fontSize:13,color:COLORS.primary,lineHeight:14}}>Add Review</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setshow(!show)}
                                            activeOpacity={0.8} 
                                            style={{flexDirection:'row',alignItems:'center',gap:5}}
                                        >
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>{dropdownData[select].lable}</Text>
                                            <Feather size={16} color={colors.text} name={show ? "chevron-up": "chevron-down"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={[{
                                        position:'absolute',
                                        top:50,
                                        right:0,
                                        padding:10,
                                        backgroundColor:theme.dark ? colors.background :colors.card,
                                        borderRadius:12,
                                        borderWidth:1,
                                        borderColor:colors.border,
                                        zIndex:99,
                                        opacity:show ? 1 : 0
                                    }]}
                                >
                                    <View>
                                        {dropdownData.map((data:any,index) => {
                                            return(
                                                <TouchableOpacity
                                                    onPress={() => {setselect(index) ; setshow(!show) ; filterData(data.status)}}
                                                    key={index}
                                                    style={{
                                                        paddingVertical:3,
                                                        paddingHorizontal:15
                                                    }}
                                                >
                                                    <Text style={[{...FONTS.fontMedium,fontSize:13,color:colors.title},select === index && {color:COLORS.primary}]}>{data.lable}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View>
                                    {reviewData.map((data, index ) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    borderWidth:1,
                                                    borderColor:colors.border,
                                                    borderRadius:6,
                                                    padding:15,
                                                    marginBottom:10
                                                }}
                                            >
                                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                                                    <View
                                                        style={{
                                                            padding:5,
                                                            paddingVertical:3,
                                                            borderRadius:4,
                                                            backgroundColor:'rgba(251,173,72,0.20)',
                                                            flexDirection:'row',
                                                            alignItems:'center',
                                                            gap:5,
                                                            marginRight:15
                                                        }}
                                                    >
                                                        <Image
                                                            style={{height:15,width:15,resizeMode:'contain'}}
                                                            source={IMAGES.star4}
                                                        />
                                                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:'#FBAD48',lineHeight:18}}>{data.rating}</Text>
                                                    </View>
                                                    <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title,flex:1}}>{data.user}</Text>
                                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text}}>{data.time}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.title,lineHeight:20}}>{data.about}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                            )
                        }
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutCompany