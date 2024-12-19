import { useFocusEffect, useRoute, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, SectionList, ScrollView, Linking, Alert } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import {  FONTS, COLORS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Header from '../../layout/Header';
import * as Progress from 'react-native-progress';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import moment from 'moment';

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation } : ProfileScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [showcontant, setshowcontant] = useState(false)

    const [progress, setProgress] = useState(0); 

    const { userData } = useSelector((state: any) => state.user);

    const handleOpenPdf = () => {
        Linking.openURL(userData.ResumeCV.uri).catch((error) => 
            console.error("Failed to open PDF in browser:", error)
        );
    };
      

    useEffect(() => 
        {
            let progress = 0;
            
            if (userData?.username) {
                progress += 0.14; 
            }
            if (userData?.jobprofile) {
                progress += 0.10; 
            }
            if (userData?.img) {
                progress += 0.05; 
            }
            if (userData?.AnnualSalary) {
                progress += 0.07; 
            }
            if (userData?.Profilesummary) {
                progress += 0.04; 
            }
            if (userData?.ProfessionalDetails) {
                progress += 0.1; 
            }
            if (userData?.Employment) {
                progress += 0.1; 
            }
            if (userData?.Education) {
                progress += 0.1; 
            }
            if (userData?.JobProjects) {
                progress += 0.1; 
            }
            if (userData?.JobKeySkills) {
                progress += 0.1; 
            }
            if (userData?.ResumeCV) {
                progress += 0.1; 
            }
        
            setProgress(progress);
        }, [userData]
    ); // Run this effect when img or jobprofile changes

    const employmentData =  userData.Employment?.companyName && JSON.parse(userData.Employment?.companyName);

    const educationCourseData =  userData.Education?.Course && JSON.parse(userData.Education?.Course);

    const educationUniversityData =  userData.Education?.University && JSON.parse(userData.Education?.University);

    const educationStartYearData =  userData.Education?.StartYear && JSON.parse(userData.Education?.StartYear);

    const educationEndYearData =  userData.Education?.EndYear && JSON.parse(userData.Education?.EndYear);

    const ProjectStartYearData =  userData.JobProjects?.StartYear && JSON.parse(userData.JobProjects?.StartYear);

    const ProjectEndYearData =  userData.JobProjects?.EndYear && JSON.parse(userData.JobProjects?.EndYear);

    const JobSkillsData =  userData.JobKeySkills?.Skillselected && JSON.parse(userData.JobKeySkills?.Skillselected);

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1, }}>
            <Header
                title='Profile'
                leftIcon2={'menu'}
                titleLeft
                onPress={() => navigation.openDrawer()}
            />
            <View
                style={[GlobalStyleSheet.container,{backgroundColor:theme.dark ? colors.background : '#FAFCFF',borderBottomWidth:1,borderBlockColor:colors.border,padding:20}]}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            gap:10,
                        }}
                    >
                        <View style={{alignItems:'center'}}>
                            <View
                                style={{transform:[{rotate : '180deg'}]}}
                            >
                                <Progress.Circle 
                                    borderWidth={0}
                                    unfilledColor={colors.background}
                                    color={COLORS.primary}
                                    progress={progress} 
                                    size={98} 
                                    thickness={5}
                                    strokeCap={'round'}
                                />
                            </View>
                            {userData.img ? 
                                <View
                                    style={{
                                        height:80,
                                        width:80,
                                        borderRadius:100,
                                        backgroundColor:'#D5E1F2',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        top:9
                                    }}
                                >
                                    <Image 
                                        source={{ uri: userData.img }} 
                                        style={{ width: 80, height: 80,borderRadius:100 }} 
                                    />
                                </View>
                                : 
                                <View
                                    style={{
                                        height:80,
                                        width:80,
                                        borderRadius:100,
                                        backgroundColor:'#D5E1F2',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        position:'absolute',
                                        top:9
                                    }}
                                >
                                    <FontAwesome5 color={COLORS.card} size={40} name='user'/>
                                </View>
                            }
                            <View
                                style={{
                                    backgroundColor:colors.card,
                                    padding:3,
                                    paddingHorizontal:7,
                                    borderRadius:4,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    position:'absolute',
                                    bottom:-5
                                }}
                            >
                                <Text style={{ ...FONTS.fontBold,fontSize:11,color:colors.title,lineHeight:14}}> {Math.round(progress * 100)}%</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{...FONTS.fontBold,fontSize:18,color:colors.title,marginBottom:5}}>{userData.username}</Text>
                            <Text style={{...FONTS.fontMedium,fontSize:14,color:COLORS.primary}}>{userData.jobprofile}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        activeOpacity={0.5}
                    >
                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,]}>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border,}]}>   
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.user4}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:20}}>Basic Details</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileBasicDetails')}
                                    activeOpacity={0.5} 
                                    style={[styles.editbtn,userData.emailId && {right:-15}]}
                                >
                                    {userData.emailId ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.emailId &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:10,
                                        marginTop:10,
                                        marginBottom:8
                                    }]}
                                >
                                    <View style={styles.flex}>
                                        <Feather color={COLORS.primary} size={16} name='mail'/>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:colors.title,lineHeight:16}}>Email</Text>
                                    </View>
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>{userData.emailId}</Text>
                                </View>
                            }
                            {userData.joblocation?.title &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:8
                                    }]}
                                >
                                    <View style={styles.flex}>
                                        <Image
                                            style={[styles.cardimage2]}
                                            source={IMAGES.map}
                                        />
                                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:colors.title,lineHeight:16}}>Location</Text>
                                    </View>
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>{userData.joblocation?.title}</Text>
                                </View>
                            }
                            {userData.phonenumber &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:8
                                    }]}
                                >
                                    <View style={styles.flex}>
                                        <Image
                                            style={[styles.cardimage2]}
                                            source={IMAGES.call}
                                        />
                                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:colors.title,lineHeight:16}}>Phone</Text>
                                    </View>
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>{userData.countryCode}  {userData.phonenumber}</Text>
                                </View>
                            }
                            {userData.YearExperience  && userData.MonthExperience &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:8
                                    }]}
                                >
                                    <View style={styles.flex}>
                                        <Image
                                            style={[styles.cardimage2]}
                                            source={IMAGES.briefcase}
                                        />
                                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:colors.title,lineHeight:16}}>Experience</Text>
                                    </View>
                                    {userData.YearExperience &&
                                        <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>{userData.YearExperience} Year, </Text>
                                    }
                                    {userData.MonthExperience &&
                                        <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>{userData.MonthExperience} Month</Text>
                                    }
                                </View>
                            }
                            {userData.AnnualSalary &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:5
                                    }]}
                                >
                                    <View style={styles.flex}>
                                        <Image
                                            style={[styles.cardimage2]}
                                            source={IMAGES.dollarsign}
                                        />
                                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:colors.title,lineHeight:16}}>Salary</Text>
                                    </View>
                                    <Text style={{...FONTS.fontMedium,fontSize:13,color:colors.text}}>${userData.AnnualSalary}</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border,paddingBottom:userData.Profilesummary ? 20 : 10}]}>   
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.Profilesummary}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:20}}>Profile summary</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Profilesummary')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.Profilesummary && {right:-15}]}
                                >
                                    {userData.Profilesummary ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.Profilesummary &&
                                <View 
                                    style={{
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:10,
                                        marginTop:10,
                                        marginBottom:5
                                    }}
                                >
                                    <Text 
                                        numberOfLines={showcontant ? 0 : 4} 
                                        style={{
                                            ...FONTS.fontMedium,
                                            fontSize:13,
                                            color:colors.text,
                                            lineHeight:18,
                                            paddingRight:10
                                        }}
                                    >{userData.Profilesummary}</Text>
                                    <TouchableOpacity
                                        onPress={() => setshowcontant(!showcontant)}
                                        activeOpacity={0.5}
                                        style={{
                                            position:'absolute',
                                            bottom:-17,
                                            right:0
                                        }}
                                    >
                                        {showcontant ? 
                                        
                                            <Text style={{...FONTS.fontSemiBold,fontSize:13,color:COLORS.primary}}>Read Less</Text>
                                        :
                                            <Text style={{...FONTS.fontSemiBold,fontSize:13,color:COLORS.primary}}>Read More</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border}]}>   
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.ProfessionalDetails}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:18}}>Professional Details</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfessionalDetails')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.ProfessionalDetails && {right:-15}]}
                                >
                                    {userData.ProfessionalDetails ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.ProfessionalDetails?.CurrentIndustry &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:10,
                                        marginTop:10,
                                        marginBottom:8
                                    }]}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>Current  Industry*</Text>
                                    <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary}}>{userData.ProfessionalDetails.CurrentIndustry}</Text>
                                </View>
                            }
                            {userData.ProfessionalDetails?.CurrentDepartment &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:8
                                    }]}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>Current Department*</Text>
                                    <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary}}>{userData.ProfessionalDetails.CurrentDepartment}</Text>
                                </View>
                            }
                            {userData.ProfessionalDetails?.CurrentRoleCategory &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:8
                                    }]}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>Current Role Category*</Text>
                                    <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary}}>{userData.ProfessionalDetails.CurrentRoleCategory}</Text>
                                </View>
                            }
                            {userData.ProfessionalDetails?.CurrentJobRole &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        marginBottom:8
                                    }]}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>Current JobRole*</Text>
                                    <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary}}>{userData.ProfessionalDetails.CurrentJobRole}</Text>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border}]}>   
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.Employment}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:18}}>Employment</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Employment')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.Employment && {right:-15}]}
                                >
                                    {userData.Employment ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.Employment &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        justifyContent:'flex-start',
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:15,
                                        marginTop:10,
                                        marginBottom:8,
                                        gap:15
                                    }]}
                                >
                                    <View
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.border,
                                            backgroundColor:colors.card,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:30,
                                                width:30,
                                                resizeMode:'contain'
                                            }}
                                            source={IMAGES.building}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:15,color:colors.title,lineHeight:16}}>{userData.Employment.CurrentJobTitle}</Text>
                                        {employmentData &&
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary,marginBottom:2}}>{employmentData.label}</Text>
                                        }
                                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{userData.Employment?.JoiningDate}  - </Text>
                                            {userData.Employment?.currentcompany === 'Yes' &&
                                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>Present</Text>
                                            }
                                            {userData.Employment?.EmploymentYearExperience &&
                                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>( {userData.Employment?.EmploymentYearExperience} Year )</Text>
                                            }
                                            {userData.Employment?.EmploymentMonthExperience &&
                                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>( {userData.Employment?.EmploymentMonthExperience} Month )</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border}]}>
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.bookopen}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:16}}>Education</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Education')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.Education && {right:-15}]}
                                >
                                    {userData.Education ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.Education &&
                                <View 
                                    style={[GlobalStyleSheet.flexcenter,{
                                        justifyContent:'flex-start',
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:15,
                                        marginTop:10,
                                        marginBottom:8,
                                        gap:15
                                    }]}
                                >
                                    <View
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.border,
                                            backgroundColor:colors.card,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:30,
                                                width:30,
                                                resizeMode:'contain'
                                            }}
                                            source={IMAGES.Universitybuilding}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:15,color:colors.title,lineHeight:16}}>{educationCourseData.label}</Text>
                                        {educationUniversityData &&
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary,marginBottom:5}}>{educationUniversityData.label}</Text>
                                        }
                                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                            {educationStartYearData &&
                                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{educationStartYearData.label}</Text>
                                            }
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>-</Text>
                                            {educationEndYearData &&
                                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{educationEndYearData.label}</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border}]}>
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.piechart}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:16}}>Projects</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileProjects')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.JobProjects && {right:-15}]}
                                >
                                    {userData.JobProjects ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View>
                                {userData.JobProjects &&
                                    <View 
                                        style={[GlobalStyleSheet.flexcenter,{
                                            alignItems:'flex-end',
                                            borderTopWidth:1,
                                            borderTopColor:colors.border,
                                            paddingTop:15,
                                            marginTop:10,
                                            marginBottom:8,
                                            gap:15
                                        }]}
                                    >
                                        <View>
                                            <Text style={{...FONTS.fontSemiBold,fontSize:15,color:colors.title,lineHeight:16}}>{userData.JobProjects?.ProjectTitle}</Text>
                                            {userData.JobProjects?.Liveurl &&
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                >
                                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary,marginBottom:5}}>{userData.JobProjects?.Liveurl}</Text>
                                                </TouchableOpacity>
                                            }
                                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                {ProjectStartYearData &&
                                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{ProjectStartYearData.label}</Text>
                                                }
                                                <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>-</Text>
                                                {ProjectEndYearData &&
                                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{ProjectEndYearData.label}</Text>
                                                }
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                        >
                                            <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary}}>Visit</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border}]}>
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.grid3}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:18}}>Key Skills</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileSkills')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.JobKeySkills && {right:-15}]}
                                >
                                    {userData.JobKeySkills ? 
                                        <Feather color={COLORS.primary} size={16} name='edit-2'/>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.JobKeySkills &&
                                <View 
                                    style={[{
                                        flexDirection:'row',
                                        flexWrap:'wrap',
                                        alignItems:'center',
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:15,
                                        marginTop:10,
                                        marginBottom:8,
                                        gap:10
                                    }]}
                                >
                                    {JobSkillsData.map((item :any,index:any) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    height:30,
                                                    borderRadius:36,
                                                    paddingHorizontal:15,
                                                    borderWidth:1,
                                                    borderColor:colors.border,
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                }}
                                            >
                                                <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.text}}>{item.label}</Text>
                                            </View>
                                        )
                                    })}
                                    
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{marginBottom:15}}>
                        <View style={[styles.ProfileCard,{borderColor:colors.border}]}>
                            <View style={[GlobalStyleSheet.flexcenter]}>
                                <View style={styles.flex}>
                                    <Image
                                        style={styles.cardimage}
                                        source={IMAGES.filetext}
                                    />
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title,lineHeight:18}}>Resume/CV</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileUploadResume')}
                                    activeOpacity={0.5}
                                    style={[styles.editbtn,userData.ResumeCV && {right:0}]}
                                >
                                    {userData.ResumeCV ? 
                                        <View
                                            style={{
                                                // padding:5,
                                                height:21,
                                                width:65,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                backgroundColor:COLORS.primaryLight,
                                                borderWidth:1,
                                                borderRadius:4,
                                                borderColor:COLORS.primary
                                            }}
                                        >
                                            <Text style={{...FONTS.fontSemiBold,fontSize:12,color:COLORS.primary,lineHeight:16}}>Update</Text>
                                        </View>
                                    :
                                        <View style={{flexDirection:'row'}}>
                                            <Feather color={COLORS.primary} size={16} name='plus'/>
                                            <Text style={[styles.RightText]}>Add</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                            {userData.ResumeCV &&
                                <TouchableOpacity
                                    onPress={handleOpenPdf} 
                                    style={[{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        borderTopWidth:1,
                                        borderTopColor:colors.border,
                                        paddingTop:15,
                                        marginTop:10,
                                        marginBottom:8,
                                        gap:10
                                    }]}
                                >
                                    <View>
                                        <Image
                                            style={{height:45,width:45,resizeMode:'contain'}}
                                            source={IMAGES.pdf}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title}}>{userData.ResumeCV.name}</Text>
                                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>Updated Last:</Text>
                                            <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{moment(userData.ResumeCV.uploadDate).format('DD/MM/YYYY')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ProfileCard:{
        borderWidth:1,
        borderRadius:6,
        borderColor:COLORS.borderColor,
        paddingHorizontal:15,
        padding:10
    },
    flex:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        flex:1
    },
    cardimage:{
        height:20,
        width:20,
        resizeMode:'contain'
    },
    cardimage2:{
        height:16,
        width:16,
        resizeMode:'contain',
        tintColor:COLORS.primary
    },
    RightText:{
        ...FONTS.fontSemiBold,
        fontSize:12,
        color:COLORS.primary,
        lineHeight:16,
        marginLeft:5
    },
    editbtn:{
        height:50,
        width:50,
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        right:0
    }
})

export default Profile