import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform, useWindowDimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import {FONTS, COLORS } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { LinearGradient } from 'expo-linear-gradient';;
import Button from '../../components/Button/Button';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { addTosavejob, removeFromsavejob } from '../../redux/reducer/savejobReducer';
import { IconButton } from 'react-native-paper';
import Savebtn from '../../components/Savebtn';

const keyData = [
    {
        title:"Build responsive, user-friendly interfaces using technologies like HTML, CSS, JavaScript, and frameworks such as React, Angular, or Vue.js."
    },
    {
        title:"Ensure web design is optimized for smartphones, tablets, and desktops."
    },
    {
        title:"Collaborate with UX/UI designers to implement visual and interactive elements."
    },
    {
        title:"Develop server-side logic using programming languages like Node.js, Python, Ruby, PHP, or Java."
    },
    {
        title:"Handle server, application, and database management."
    },
    {
        title:"Design RESTful APIs or GraphQL to communicate between the client-side and back-end systems."
    },
    {
        title:"Work with both relational databases (e.g., MySQL, PostgreSQL) and NoSQL databases (e.g., MongoDB)."
    },
    {
        title:"Utilize version control systems like Git for collaboration and code management."
    },
]

const SkillsData = [
    {
        Technologies: "Front-End",
        Skills:"HTML, CSS, JavaScript, React.js, Vue.js, Angular."
    },
    {
        Technologies: "Back-End",
        Skills:"Node.js, Python, Ruby, Java, PHP."
    },
    {
        Technologies: "Databases",
        Skills:"MySQL, PostgreSQL, MongoDB, Redis"
    },
    {
        Technologies: "Version Control",
        Skills:" Git, GitHub, GitLab."
    },
    {
        Technologies: "Deployment",
        Skills:"Docker, Kubernetes, AWS, Azure, Jenkins."
    },
    {
        Technologies: "APIs",
        Skills:"REST, GraphQL."
    },
    {
        Technologies: "Testing",
        Skills:"Jest, Mocha, Selenium."
    },
]

const bannerData = [
    {
        image:IMAGES.dollarsign,
        title:"14k-18k Lacs P.A"
    },
    {
        image:IMAGES.briefcase,
        title:"5 to 7 Year Experience "
    },
    {
        image:IMAGES.vacancyuser,
        title:"7 Vacancy"
    },
    {
        image:IMAGES.map,
        title:"Tokyo, Japan"
    },
]


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

const ReviewData = [
    {
        title:"5 Star",
        ratingwitdh:0,
    },
    {
        title:"4 Star",
        ratingwitdh:50,
    },
    {
        title:"3 Star",
        ratingwitdh:100,
    },
    {
        title:"2 Star",
        ratingwitdh:150,
    },
    {
        title:"1 Star",
        ratingwitdh:200,
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

type JobDetailsScreenProps = StackScreenProps<RootStackParamList, 'JobDetails'>;

const JobDetails = ({route, navigation } : JobDetailsScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

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

    const dispatch = useDispatch();

    const addItemTosavejob = (data: any) => {
        dispatch(addTosavejob(data));
    }

    const savejob = useSelector((state:any) => state.savejob.savejob);

    const inSaveJob = () => {
        var temp = [] as any;
        savejob.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromsavejob = (data: any) => {
        dispatch(removeFromsavejob(data));
    }

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'first', title: 'About' },
        { key: 'second', title: 'Company' },
        { key: 'Three', title: 'Review' },
    ]);

    const FirstRoute = () => (
        <ScrollView contentContainerStyle={{paddingBottom:20,paddingTop:20}} showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyleSheet.container,{paddingVertical:0}]}>
                <View style={{borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:15}}>
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>About the role</Text>
                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text,lineHeight:18}}>A Full-Stack Developer is a versatile professional skilled in both front-end and back-end development, responsible for building, maintaining, and optimizing web applications and software systems. They work across the entire stack of technologies, including client-side (front-end), server-side (back-end), and databases. Here's an overview of the role:</Text>
                </View>
                <View style={{marginTop:10,borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:10}}>
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>Key Responsibilities</Text>
                    {keyData.map((data,index) => {
                        return(
                            <View 
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'flex-start',
                                    gap:10,
                                    marginBottom:10,
                                    paddingRight:40
                                }}
                            >
                                <View
                                    style={{height:6,width:6,borderRadius:4,backgroundColor:colors.text,marginTop:6}}
                                />
                                <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text,lineHeight:18}}>{data.title}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{marginTop:10,borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:10}}>
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>Key Responsibilities</Text>
                    {SkillsData.map((data,index) => {
                        return(
                            <View 
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'flex-start',
                                    gap:5,
                                    marginBottom:10,
                                    paddingRight:100
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.primary,lineHeight:18}}>{data.Technologies}:</Text>
                                <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text,lineHeight:18}}>{data.Skills}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{marginVertical:20}}>
                    <LinearGradient
                        colors={['rgba(25,103,210,0)','rgba(25,103,210,0.10)']}
                        style={{
                            borderRadius:6,
                            borderWidth:1,
                            borderColor:colors.border,
                            padding:15,
                            paddingBottom:5,
                            overflow:'hidden'
                        }}
                    >
                        <View>
                            {bannerData.map((data,index) => {
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            gap:10,
                                            marginBottom:10
                                        }}
                                    >
                                        <Image
                                            style={{height:16,width:16,resizeMode:'contain',tintColor:COLORS.primary}}
                                            source={data.image}
                                        />
                                        <Text style={{...FONTS.fontMedium,fontSize:13,color:index === 2 ? COLORS.primary :colors.text}}>{data.title}</Text>
                                    </View> 
                                )
                            })}
                        </View>
                        <View style={{position:'absolute',right:10,top:-30}}>
                            <Image
                                style={{
                                    width:80,
                                    resizeMode:'contain',
                                    opacity:.10
                                }}
                                source={IMAGES.banneruser2}
                            />
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>
    );
      
    const SecondRoute = () => (
        <ScrollView contentContainerStyle={{paddingBottom:20,paddingTop:20}} showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyleSheet.container,{paddingVertical:0}]}>
                <View style={{borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:15}}>
                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,marginBottom:10}}>About Company</Text>
                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text,lineHeight:18}}>When crafting a section about a company, it usually includes key information about its mission, values, history, and overall culture. Here's a template you can use or adapt based on the specific company:</Text>
                </View>
                <View style={{marginTop:20}}>
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
        </ScrollView>
    );

    const ThreeRoute = () => (
        <ScrollView contentContainerStyle={{paddingBottom:20,paddingTop:20}} showsVerticalScrollIndicator={false}>
            <View style={[GlobalStyleSheet.container,{paddingVertical:0}]}>
                <View
                    style={{
                        borderWidth:1,
                        borderColor:colors.border,
                        borderRadius:6,
                        padding:10,
                        paddingRight:15,
                        flexDirection:'row',
                        alignItems:'center',
                        marginBottom:15
                    }}
                >
                    <View 
                        style={{
                            width:'50%',
                            alignItems:'center',
                            justifyContent:'center',
                            paddingVertical:5
                        }}
                    >
                        <Text style={{...FONTS.fontBold,fontSize:45,color:colors.title,lineHeight:50}}>4.5<Text style={{...FONTS.fontSemiBold,fontSize:16}}>/5</Text></Text>
                        <Text style={{...FONTS.fontRegular,fontSize:13,color:colors.text}}>2.7k Review</Text>
                        <Image
                            style={{resizeMode:'contain',width:120,height:24,marginTop:5}}
                            source={IMAGES.reviewrating}
                        />
                    </View>
                    <View
                        style={{
                            width:'50%',
                            alignItems:'center',
                            paddingVertical:5
                        }}
                    >
                        {ReviewData.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:10,
                                        marginBottom:10
                                    }}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:15}}>{data.title}</Text>
                                    <View
                                        style={{
                                            height:8,
                                            borderRadius:5,
                                            flex:1,
                                            backgroundColor:colors.background,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            overflow:'hidden'
                                        }}
                                    >
                                        <View
                                            style={{
                                                width:'100%',
                                                height:8,
                                                borderRadius:5,
                                                marginRight:data.ratingwitdh,
                                                backgroundColor:'#FBAD48',
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
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
                        top:210,
                        right:10,
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
        </ScrollView>
    );
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        Three:ThreeRoute,
    });

    const renderLabel = ({ route, focused }: any) => (
        <Text 
            style={{ 
                // fontFamily: focused ? 'PlusJakartaSans-ExtraBold' : 'PlusJakartaSans-Medium', 
                fontFamily: 'PlusJakartaSans-Medium', 
                color: focused ? COLORS.primary : colors.text,
                fontSize:16,
                paddingHorizontal:5,
            }}
        >
          {route.title}
        </Text>
      );
    

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <View
                style={{
                    height:60,
                    backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                    borderBottomWidth:1,
                    borderBottomColor:colors.border

                }}
            >
                 <View style={[GlobalStyleSheet.container, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop:10,
                    paddingLeft:0
                    // padding:0
                }]}
                >
                    <IconButton
                        onPress={() => navigation.goBack()}
                        icon={props => <Feather name="arrow-left" {...props} />}
                        iconColor={colors.text}
                        size={20}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title,lineHeight:18 ,textAlign: 'left'}}>Job Details</Text>
                    </View>
                    <Savebtn 
                        onPress={() => inSaveJob().includes(data.id) ? removeItemFromsavejob(data.id) : addItemTosavejob(data)}
                        id={data.id}
                        inSaveJob={inSaveJob}
                    />
                </View>
            </View>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <View
                    style={{
                        padding:20,
                        backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                        borderBottomWidth:2,
                        borderBottomColor:colors.border
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            gap:15
                            //justifyContent:'space-between',
                        }}
                    >
                        <View
                            style={{
                                height:60,
                                width:60,
                                borderRadius:6,
                                borderWidth:1,
                                borderColor:colors.border,
                                backgroundColor:colors.card,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Image
                                style={{
                                    height:40,
                                    width:40,
                                    resizeMode:'contain'
                                }}
                                source={data.image}
                            />
                        </View>
                        <View>
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:colors.title,lineHeight:18,paddingRight:15}}>{data.title}</Text>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate('AboutCompany',{data : data})}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary}}>{data.compnay}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            gap:10,
                            paddingVertical:20
                        }}
                    >
                        {data.jobtime ? 
                            <View
                                style={{
                                    borderRadius:6,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    backgroundColor:colors.card,
                                    padding:5,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Text style={{...FONTS.fontSemiBold,fontSize:12,color:colors.title,lineHeight:16}}>{data.jobtime}</Text>
                            </View>
                        :
                            null
                        }
                        {data.jobtype ? 
                            <View
                                style={{
                                    borderRadius:6,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    backgroundColor:colors.card,
                                    padding:5,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Text style={{...FONTS.fontSemiBold,fontSize:12,color:colors.title,lineHeight:16}}>{data.jobtype}</Text>
                            </View>
                        :
                            null
                        }
                        {data.jobpost ? 
                            <View
                                style={{
                                    borderRadius:6,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    backgroundColor:colors.card,
                                    padding:5,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Text style={{...FONTS.fontSemiBold,fontSize:12,color:colors.title,lineHeight:16}}>{data.jobpost}</Text>
                            </View>
                        :
                            null
                        }
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}
                    >
                        <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}><Text style={{...FONTS.fontBold,color:COLORS.primary,fontSize:15}}>$ </Text>{data.selery}</Text>
                        <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.primary}}>{data.days}</Text>
                    </View>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flex:1}}
            >
                <View 
                    style={[
                        GlobalStyleSheet.container,
                        {
                            padding:0,
                            borderBottomWidth:1,
                            borderColor:colors.border,
                            flex:1,
                            height:53,
                            backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                            //paddingHorizontal:15
                        }
                    ]}
                >
                    <TabView
                        //style={{height:400}}
                        renderTabBar={props => (
                            <TabBar
                                {...props}
                                activeColor={COLORS.primary}
                                inactiveColor={colors.text}
                                indicatorStyle={{ backgroundColor: COLORS.primary,height:5,borderTopLeftRadius:5,borderTopRightRadius:5,}}
                                scrollEnabled={true}
                                tabStyle={{ width:125 }} // Dynamically adjust width
                                style={{ 
                                    backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                                    elevation : 5,
                                    paddingVertical:0,
                                    height:53,
                                }}
                                renderLabel={renderLabel}
                            />
                        )}
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                    />
                </View>
            </ScrollView>
            <LinearGradient
                colors={['rgba(255,255,255,0.0)','rgba(255,255,255,0.10)']} 
                style={{ 
                    height: 90, 
                    width: '100%', 
                }}
            >
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, padding: 0 }]}>
                    <Button
                        color={theme.dark ? COLORS.white : COLORS.primary}
                        text={colors.card}
                        title={'Apply This Job'}
                        onPress={() => {navigation.navigate('JobApplied')}}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default JobDetails