import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import CustomInput from '../../components/Input/CustomInput';
import BottomSheet2 from '../Shortcode/BottomSheet2';
import {Feather } from "@expo/vector-icons";
import Button from '../../components/Button/Button';
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import { IMAGES } from '../../constants/Images';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

const CurrentCompanyNameData = [
    { label: 'JobBoard Solutions',image:IMAGES.compnayimage1, value: '1' },
    { label: 'Bakeron Info Solution',image:IMAGES.compnayimage2, value: '2' },
    { label: 'PowerZone Solutions',image:IMAGES.compnayimage3, value: '3' },
    { label: 'JobZilla Info Solution',image:IMAGES.compnayimage4, value: '4' },
];


type EmploymentScreenProps = StackScreenProps<RootStackParamList, 'Employment'>;

const Employment = ({ navigation } : EmploymentScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;
    
    const sheetRef = useRef<any>();
    
    const YesNoData = ["Yes","No"]
    
    const EmploymentType = ["Full-Time","Internship"]
    
    const NoticePeriod = ["15 Days","1 Month","2 Month","3 Month","Serving Notice Period"]

    const [loading, setLoading] = useState(false);
    
    const [currentcompany, setcurrentcompany] = useState(userData.Employment?.currentcompany ? userData.Employment.currentcompany : "");

    const [employmentType, setemploymentType] = useState(userData.Employment?.employmentType ? userData.Employment.employmentType : "");
    
    const [noticeperiod, setnoticeperiod] = useState(userData.Employment?.noticeperiod ? userData.Employment.noticeperiod : "");

    const [SelectSalary, setSelectSalary] = useState(userData.Employment?.EmploymentAnnualSalary ? userData.Employment.EmploymentAnnualSalary : "");

    const [YearExperience , setYearExperience] = useState(userData.Employment?.EmploymentYearExperience ? userData.Employment.EmploymentYearExperience :"");

    const [MonthExperience , setMonthExperience] = useState(userData.Employment?.EmploymentMonthExperience ? userData.Employment.EmploymentMonthExperience :"");

    const [JoiningDate, setJoiningDate] = useState(userData.Employment?.JoiningDate ? userData.Employment.JoiningDate : "");

    const [JobTitle, setJobTitle] = useState(userData.Employment?.CurrentJobTitle ? userData.Employment.CurrentJobTitle :"")

    // const [companyLogo , setCompanyLogo] = useState(userData.Employment?.companyLogo);

    const [companyName, setCompanyName] = useState(userData.Employment?.companyName && JSON.parse(userData.Employment?.companyName ? userData.Employment.companyName :""));
    
    const handleEmployment = async () => {
        if(currentcompany == "" || employmentType == "" || noticeperiod == "" || SelectSalary == "" ||  JoiningDate == "" || JobTitle == "" || companyName == undefined){
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
                Employment: {
                    currentcompany:currentcompany,
                    employmentType:employmentType,
                    noticeperiod:noticeperiod,
                    EmploymentAnnualSalary:SelectSalary,
                    EmploymentYearExperience:YearExperience,
                    EmploymentMonthExperience:MonthExperience,
                    JoiningDate:JoiningDate,
                    CurrentJobTitle:JobTitle,
                    companyName: JSON.stringify(companyName),
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
                title={'Employment'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Is this your current company<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:5}}>
                            {YesNoData.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        onPress={() => setcurrentcompany(data)}
                                        key={index}
                                        style={[{
                                            height:40,
                                            paddingHorizontal:20,
                                            borderWidth:1,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderRadius:30,
                                            borderColor:colors.text
                                        },currentcompany === data && {
                                            borderColor:COLORS.primary,
                                            backgroundColor:COLORS.primaryLight
                                        }]}
                                    >
                                        <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,lineHeight:16},currentcompany === data && {color:COLORS.primary}]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Employment Type<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:5}}>
                            {EmploymentType.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        onPress={() => setemploymentType(data)}
                                        key={index}
                                        style={[{
                                            height:40,
                                            paddingHorizontal:20,
                                            borderWidth:1,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderRadius:30,
                                            borderColor:colors.text
                                        },employmentType === data && {
                                            borderColor:COLORS.primary,
                                            backgroundColor:COLORS.primaryLight
                                        }]}
                                    >
                                        <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,lineHeight:16},employmentType === data && {color:COLORS.primary}]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Experience<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10}}>
                            <View style={{flex:1}}>
                                <CustomInput
                                     value={YearExperience}
                                     onChangeText={(value: any) => setYearExperience(value)}
                                     placeholder={'Year'}
                                     keyboardType={'numeric'}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <CustomInput
                                     value={MonthExperience} 
                                     onChangeText={(value: any) => setMonthExperience(value)}
                                     placeholder={'Month'}
                                     keyboardType={'numeric'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Company Name<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <SelectCountry 
                            style={[styles.dropdown,{backgroundColor:colors.background}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            imageStyle={styles.imageStyle}
                            data={CurrentCompanyNameData}
                            search                            
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            imageField="image"
                            placeholder="Current Company Name"
                            searchPlaceholder="Search..."
                            value={companyName?.value}
                            onChange={(item : any) => {
                                setCompanyName(item);
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Joining Date<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={JoiningDate}
                            onChangeText={(value: any) => setJoiningDate(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Job Title<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={JobTitle}
                            onChangeText={(value: any) => setJobTitle(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Annual Salary<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            onChangeText={(value: any) => console.log(value)}
                            paddingLeft
                            editable={false}
                            value={SelectSalary}
                        />
                        <TouchableOpacity
                            onPress={() => sheetRef.current.openSheet('Setsalary')}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center',
                                gap:5,
                                paddingHorizontal:22,
                                backgroundColor:colors.card,
                                height:40,
                                borderRadius:6,
                                position:'absolute',
                                top:Platform.OS === 'web' ? 28:32,
                                left:5
                            }}
                        >
                            <Text style={{...FONTS.fontMedium,fontSize:15,color:COLORS.primary,lineHeight:16}}>$</Text>
                            <Feather style={{marginLeft:2}} color={colors.text} size={16} name="chevron-down"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 15,borderBottomWidth:1,paddingBottom:15,borderColor:colors.border}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Notice Period<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:10,marginTop:5}}>
                            {NoticePeriod.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        onPress={() => setnoticeperiod(data)}
                                        key={index}
                                        style={[{
                                            height:40,
                                            paddingHorizontal:20,
                                            borderWidth:1,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderRadius:30,
                                            borderColor:colors.text
                                        },noticeperiod === data && {
                                            borderColor:COLORS.primary,
                                            backgroundColor:COLORS.primaryLight
                                        }]}
                                    >
                                        <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,lineHeight:16},noticeperiod === data && {color:COLORS.primary}]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
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
                        onPress={handleEmployment}
                    />
                </View>
            </View>
            <BottomSheet2
                ref={sheetRef}
                setSelectSalary={setSelectSalary}
            />
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
    imageStyle: {
        height:24,
        width:24,
        marginRight:10
    }
  });


export default Employment