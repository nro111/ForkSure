import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { Image } from 'react-native';
import { IMAGES } from '../../constants/Images';
import { LinearGradient } from 'expo-linear-gradient';;
import Button from '../../components/Button/Button';


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


type MyApplicationStatusScreenProps = StackScreenProps<RootStackParamList, 'MyApplicationStatus'>;

const MyApplicationStatus =  ({route, navigation } : MyApplicationStatusScreenProps)  => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView
            style={{backgroundColor:colors.card,flex:1}}
        >
            <Header
                title={'My Application Status'}
                leftIcon={'back'}
                titleLeft
            />
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
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:colors.title,lineHeight:18}}>{data.title}</Text>
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
                                    padding:6,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,lineHeight:16}}>{data.jobtime}</Text>
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
                                    padding:6,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,lineHeight:16}}>{data.jobtype}</Text>
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
                                    padding:6,
                                    paddingHorizontal:15,
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,lineHeight:16}}>{data.jobpost}</Text>
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
                        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                            <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}><Text style={{...FONTS.fontBold,color:COLORS.primary,fontSize:15}}>$ </Text>{data.selery}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                <Image
                                    style={{height:14,width:14,tintColor:COLORS.primary}}
                                    source={IMAGES.map}
                                />
                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>{data.location}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:15}}>
                        {data.Sent ?
                            <View
                                style={{
                                    backgroundColor:COLORS.primaryLight,
                                    paddingHorizontal:10,
                                    padding:5,
                                    borderRadius:5
                                }}
                            >
                                  <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary,lineHeight:16}}>Application {data.Sent}</Text>
                            </View>
                        : null}
                        {data.Rejected ?
                            <View
                            style={{
                                backgroundColor:'rgba(243,107,83,0.10)',
                                paddingHorizontal:10,
                                padding:5,
                                borderRadius:5
                            }}
                            >
                                  <Text style={{...FONTS.fontMedium,fontSize:12,color:'#F36B53',lineHeight:16}}>Application {data.Rejected}</Text>
                            </View>
                        : null}
                        {data.Pending ?
                            <View
                                style={{
                                    backgroundColor:'rgba(251,173,72,0.10)',
                                    paddingHorizontal:10,
                                    padding:5,
                                    borderRadius:5
                                }}
                            >
                                  <Text style={{...FONTS.fontMedium,fontSize:12,color:'#FBAD48',lineHeight:16}}>Application {data.Pending}</Text>
                            </View>
                        : null}
                        {data.Accepted ?
                            <View
                                style={{
                                    backgroundColor:'rgba(80,194,156,0.10)',
                                    paddingHorizontal:10,
                                    padding:5,
                                    borderRadius:5
                                }}
                            >
                                  <Text style={{...FONTS.fontMedium,fontSize:12,color:'#3CC29C',lineHeight:16}}>Application {data.Accepted}</Text>
                            </View>
                        : null}
                    </View>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container]}>
                    <View>
                        <View style={[styles.flex]}>
                            <View style={[styles.clicle,{borderColor:data.Pending ? COLORS.warning : COLORS.success}]}/>
                            <View style={[styles.trackline,{backgroundColor:data.Pending ? colors.background : COLORS.success}]}/>
                            {data.Pending ?
                                <Text style={[styles.trackfont,{color:COLORS.warning}]}>Pending</Text>
                                :
                                <Text style={[styles.trackfont]}>Applied Successfully</Text>
                            }
                        </View>
                        <View style={[styles.flex]}>
                            <View style={[styles.clicle,{borderColor:data.Pending ? colors.background : COLORS.success}]}/>
                            <View style={[styles.trackline,{backgroundColor:data.Pending ? colors.background : COLORS.success}]}/>
                            <Text style={[styles.trackfont,{color:data.Pending ? colors.text : COLORS.success}]}>Shortlist</Text>
                        </View>
                        <View style={[styles.flex]}>
                            <View style={[styles.clicle,{borderColor:data.Rejected ? COLORS.danger :data.Accepted ? COLORS.success :colors.background}]}/>
                            <View style={[styles.trackline,{backgroundColor:data.Accepted ? COLORS.success :colors.background}]}/>
                            {data.Rejected ?
                                <Text style={[styles.trackfont,{color:COLORS.danger}]}>Reject</Text>
                                :
                                <Text style={[styles.trackfont,{color:data.Accepted ? COLORS.success : colors.text}]}>Application Review</Text>
                            }
                        </View>
                        <View style={[styles.flex]}>
                            <View style={[styles.clicle,{borderColor:data.Accepted ? COLORS.success :colors.background}]}/>
                            {data.Accepted ?
                                <Text style={[styles.trackfont,{color:COLORS.success}]}>Interview <Text style={{...FONTS.fontRegular,fontSize:13,color:COLORS.danger}}>(02 Oct 2024 12:00 PM)</Text></Text>
                                :
                                <Text style={[styles.trackfont,{color:colors.text}]}>Interview</Text>
                            }
                        </View>
                    </View>
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
                        title={'Withdraw Application'}
                        onPress={() => {navigation.goBack()}}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex:{
        flexDirection:'row',
        alignItems:'center',
        gap:15,
        marginBottom:15 
    },
    clicle:{
        height:16,
        width:16,
        borderRadius:10,
        borderWidth:3,
        borderColor:COLORS.success
    },
    trackline:{
        width:2,
        height:20,
        backgroundColor:COLORS.success,
        position:'absolute',
        zIndex:-1,
        left:7,
        top:15
    },
    trackfont:{
        ...FONTS.fontSemiBold,
        fontSize:14,
        color:COLORS.success,
        lineHeight:18
    }
})

export default MyApplicationStatus