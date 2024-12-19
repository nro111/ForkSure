import { View, Text, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

const EducationRoleData = [
    { label: 'Data Scientist', value: '1' },
    { label: 'AI/ML Engineer', value: '2' },
    { label: 'Cybersecurity Analyst', value: '3' },
    { label: 'Cloud Solutions Architect', value: '4' },
    { label: 'Full Stack Developer', value: '5' },
    { label: 'DevOps Engineer', value: '6' },
];

const StartYearData = [
    { label: 'July 2016', value: '1' },
    { label: 'July 2017', value: '2' },
    { label: 'July 2018', value: '3' },
    { label: 'July 2019', value: '4' },
    { label: 'July 2020', value: '5' },
    { label: 'July 2021', value: '6' },
    { label: 'July 2022', value: '7' },
    { label: 'July 2023', value: '8' },
    { label: 'July 2024', value: '9' },
];

const EndYearData = [
    { label: 'Current', value: '0' },
    { label: 'July 2016', value: '1' },
    { label: 'July 2017', value: '2' },
    { label: 'July 2018', value: '3' },
    { label: 'July 2019', value: '4' },
    { label: 'July 2020', value: '5' },
    { label: 'July 2021', value: '6' },
    { label: 'July 2022', value: '7' },
    { label: 'July 2023', value: '8' },
    { label: 'July 2024', value: '9' },
];

type ProfileProjectsScreenProps = StackScreenProps<RootStackParamList, 'ProfileProjects'>;

const ProfileProjects = ({ navigation } : ProfileProjectsScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;
    
    const [ProjectTitle, setProjectTitle] = useState(userData.JobProjects?.ProjectTitle ? userData.JobProjects.ProjectTitle : "");
    const [Liveurl, setLiveurl] = useState(userData.JobProjects?.Liveurl ? userData.JobProjects.Liveurl : "");
    const [ProjectDescription, setProjectDescription] = useState(userData.JobProjects?.ProjectDescription ? userData.JobProjects.ProjectDescription : "");
    const [EducationRole, setEducationRole] = useState(userData.JobProjects?.EducationRole && JSON.parse(userData.JobProjects?.EducationRole ? userData.JobProjects.EducationRole :""));
    const [StartYear, setStartYear] = useState(userData.JobProjects?.StartYear && JSON.parse(userData.JobProjects?.StartYear ? userData.JobProjects.StartYear :""));
    const [EndYear, setEndYear] = useState(userData.JobProjects?.EndYear && JSON.parse(userData.JobProjects?.EndYear ? userData.JobProjects.EndYear :""));
    
    const handleJobProjects = async () => {
        console.log(ProjectTitle,EducationRole,StartYear,EndYear);
        if(ProjectTitle == "" || Liveurl == "" || EducationRole == undefined || StartYear == undefined || EndYear == undefined){
            setLoading(false);
            {Platform.OS === 'android' ?
                ToastAndroid.show('Fill in all the fields!' , ToastAndroid.LONG)
              :
                Alert.alert('Fill in all the fields!')
            }
            return false;
        }
        setLoading(true);
        try {
            let updateData = {
                JobProjects: {
                    ProjectTitle:ProjectTitle,
                    Liveurl:Liveurl,
                    ProjectDescription:ProjectDescription,
                    EducationRole:JSON.stringify(EducationRole),
                    StartYear:JSON.stringify(StartYear),
                    EndYear: JSON.stringify(EndYear),
                }
            }
            Auth.updateUser(userData.emailId, updateData)
                .then((user) => {
                    dispatch(updateUser(user));
                    Auth.setAccount(user);
                    setLoading(false);
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Fill in fields!', error);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            {loading ?
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        height:'100%',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
                :
                null
            }
            <Header
                title={'Projects'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Project Title</Text>
                        <CustomInput
                            value={ProjectTitle}
                            onChangeText={(value: any) => setProjectTitle(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Role</Text>
                        <Dropdown
                            style={[styles.dropdown,{backgroundColor:colors.background}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={EducationRoleData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Role"
                            searchPlaceholder="Search..."
                            value={EducationRole?.value}
                            onChange={item => {
                                setEducationRole(item);
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Live URL</Text>
                        <CustomInput
                            value={Liveurl}
                            onChangeText={(value: any) => setLiveurl(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Project duration</Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10}}>
                            <View style={{flex:1}}>
                                <Dropdown
                                    style={[styles.dropdown,{backgroundColor:colors.background}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={StartYearData}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Start Year"
                                    searchPlaceholder="Search..."
                                    value={StartYear?.value}
                                    onChange={item => {
                                        setStartYear(item);
                                    }}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Dropdown
                                    style={[styles.dropdown,{backgroundColor:colors.background}]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={EndYearData}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select End Year"
                                    searchPlaceholder="Search..."
                                    value={EndYear?.value}
                                    onChange={item => {
                                        setEndYear(item);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom:20,borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:20}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Project Description </Text>
                        <CustomInput
                            value={ProjectDescription}
                            onChangeText={(value: any) => setProjectDescription(value)}
                            inputLg
                        />
                    </View>
                    {/* <View style={{marginBottom:15}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                height:48,
                                borderWidth:1,
                                borderRadius:8,
                                borderColor:colors.border,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center',
                                gap:5
                            }}
                        >
                            <Feather color={COLORS.primary} size={18} name='plus'/>
                            <Text style={{...FONTS.fontBold,fontSize:15,color:COLORS.primary,lineHeight:18}}>Add More</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Save"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={handleJobProjects}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 48,
        backgroundColor:COLORS.background,
        paddingHorizontal:10,
        borderRadius:6
    },
    placeholderStyle: {
        color:COLORS.text,
        fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
  });

export default ProfileProjects