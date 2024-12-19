import { View, Text, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native';
import CustomInput from '../../components/Input/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';


const EducationData = [
    { label: 'Teacher (K-12)', value: '1' },
    { label: 'College/University Professor', value: '2' },
    { label: 'Educational Administrator (Principal/Dean)', value: '3' },
    { label: 'Curriculum Developer', value: '4' },
    { label: 'School Counselor', value: '5' },
    { label: 'Instructional Designer', value: '6' },
];

const UniversityData = [
    { label: 'Indian Institute of Science (IISc), Bangalore', value: '1' },
    { label: 'Jawaharlal Nehru University (JNU), New Delhi', value: '2' },
    { label: 'Indian Institutes of Technology (IITs)', value: '3' },
    { label: 'University of Delhi (DU), New Delhi', value: '4' },
    { label: 'Banaras Hindu University (BHU), Varanasi', value: '5' },
    { label: 'Indian Institute of Management (IIMs)', value: '6' },
    { label: 'Jadavpur University, Kolkata', value: '7' },
    { label: 'University of Hyderabad, Hyderabad', value: '8' },
    { label: 'Amrita Vishwa Vidyapeetham, Coimbatore', value: '9' },
    { label: 'Manipal Academy of Higher Education (MAHE), Manipal', value: '10' },
];

const CourseData = [
    { label: 'Data Science', value: '1' },
    { label: 'Artificial Intelligence (AI) and Machine Learning (ML)', value: '2' },
    { label: 'Cybersecurity', value: '3' },
    { label: 'Cloud Computing', value: '4' },
    { label: 'Full Stack Web Development', value: '5' },
    { label: 'DevOps', value: '6' },
    { label: 'Blockchain Technology', value: '7' },
    { label: 'Internet of Things (IoT)', value: '8' },
    { label: 'Big Data Analytics', value: '9' },
    { label: 'Mobile App Development', value: '10' },
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

type EducationScreenProps = StackScreenProps<RootStackParamList, 'Education'>;

const Education = ({ navigation } : EducationScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [loading, setLoading] = useState(false);

    const [Education, setEducation] = useState(userData.Education?.Education && JSON.parse(userData.Education?.Education ? userData.Education.Education :""));
    const [University, setUniversity] = useState(userData.Education?.University && JSON.parse(userData.Education?.University ? userData.Education.University :""));
    const [Course, setCourse] = useState(userData.Education?.Course && JSON.parse(userData.Education?.Course ? userData.Education.Course :""));
    const [StartYear, setStartYear] = useState(userData.Education?.StartYear && JSON.parse(userData.Education?.StartYear ? userData.Education.StartYear :""));
    const [EndYear, setEndYear] = useState(userData.Education?.EndYear && JSON.parse(userData.Education?.EndYear ? userData.Education.EndYear :""));


    const handleEducation = async () => {

        if(Education === undefined || University === undefined || Course === undefined || StartYear === undefined){
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
                Education: {
                    Education:JSON.stringify(Education),
                    University:JSON.stringify(University),
                    Course:JSON.stringify(Course),
                    StartYear:JSON.stringify(StartYear),
                    EndYear:JSON.stringify(EndYear),
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
        <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
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
                title={'Education'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Education<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <Dropdown
                            style={[styles.dropdown,{backgroundColor:colors.background}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={EducationData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Education"
                            searchPlaceholder="Search..."
                            value={Education?.value}
                            onChange={(item : any) => {
                                setEducation(item);
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>University/Institute<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <Dropdown
                            style={[styles.dropdown,{backgroundColor:colors.background}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={UniversityData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select University/Institute"
                            searchPlaceholder="Search..."
                            value={University?.value}
                            onChange={(item : any) => {
                                setUniversity(item);
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Course<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <Dropdown
                            style={[styles.dropdown,{backgroundColor:colors.background}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={CourseData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Course"
                            searchPlaceholder="Search..."
                            value={Course?.value}
                            onChange={(item : any) => {
                                setCourse(item);
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Course duration<Text style={{color:'#FF0000'}}>*</Text></Text>
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
                                    onChange={(item : any) => {
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
                                    onChange={(item : any) => {
                                        setEndYear(item);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom:20,borderBottomWidth:1,borderBottomColor:colors.border,paddingBottom:20}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Grade <Text style={{color:colors.text}}>(Optional)</Text></Text>
                        <CustomInput
                            onChangeText={(value: any) => console.log(value)}
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
                        onPress={handleEducation}
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

export default Education