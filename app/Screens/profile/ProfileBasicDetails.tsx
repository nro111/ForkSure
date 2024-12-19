import { View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator, Pressable, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { TouchableOpacity } from 'react-native';
import {Feather } from "@expo/vector-icons";
import { CountryPicker } from 'react-native-country-codes-picker';
import BottomSheet2 from '../Shortcode/BottomSheet2';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

type ProfileBasicDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProfileBasicDetails'>;

const ProfileBasicDetails =  ({ navigation } : ProfileBasicDetailsScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState(userData.countryCode);

    const sheetRef = useRef<any>();

    const [SelectSalary, setSelectSalary] = useState(userData.AnnualSalary)
    const [phonenumber , setphonenumber] = useState(userData.phonenumber);
    const [YearExperience , setYearExperience] = useState(userData.YearExperience);
    const [MonthExperience , setMonthExperience] = useState(userData.MonthExperience);
    const [email , setemail] = useState(userData.emailId);
    const [joblocation, setjoblocation] = useState(userData.joblocation.title)

    const handleProfileBasicDetails = async () => {

        if(SelectSalary == "" || joblocation == ""){
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
                AnnualSalary: SelectSalary,
                //phonenumber: phonenumber,
                emailId: email,
                MonthExperience:MonthExperience,
                YearExperience:YearExperience
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
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
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
                title={"Basic Details"}
                leftIcon={'back'}
                titleLeft               
            />
            <CountryPicker
                show={show}
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                } }
                onBackdropPress={() => setShow(false)}
                style={{
                    modal: {
                        height: '60%',
                        backgroundColor: colors.card,
                    },
                    textInput: {
                        paddingHorizontal: 12,
                        height: 48,
                        color: colors.title,
                        backgroundColor: colors.bgLight
                    },
                    dialCode: {
                        ...FONTS.fontLg,
                        ...FONTS.fontSemiBold,
                        color: colors.title,
                    },
                    countryName: {
                        ...FONTS.font,
                        ...FONTS.fontSemiBold,
                        color: colors.text,
                    },
                    countryButtonStyles: {
                        height: 50,
                        backgroundColor: colors.cardBg,
                        borderRadius: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderColor,
                        marginBottom: 0,
                    },
                }} lang={''}                                
            />
            <ScrollView
                showsVerticalScrollIndicator={false}

            >
                 <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Email Address<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={email}
                            onChangeText={(value: any) => setemail(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Phone Number<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                             onChangeText={(value: any) => setphonenumber(value)}
                             value={phonenumber}
                             keyboardType="numeric"
                             paddingLeft
                        />
                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingHorizontal:15,
                                backgroundColor:colors.card,
                                height:40,
                                borderRadius:6,
                                position:'absolute',
                                top:Platform.OS === 'web' ? 28:32,
                                left:5,
                                zIndex:99
                            }}
                        >
                            <Text style={{
                                ...FONTS.fontMedium,
                                fontSize:15,
                                color:COLORS.primary,
                            }}>{countryCode}</Text>
                            <Feather style={{marginLeft:2}} color={colors.text} size={16} name="chevron-down"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Location<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={joblocation}
                            onChangeText={(value: any) => setjoblocation(value)}
                            placeholder={'Enter Location'}
                        />
                        <Pressable
                            style={{
                                width:'100%',
                                height:48,
                                zIndex:99,
                                position:'absolute',
                                bottom:0
                            }}
                            onPress={() => navigation.navigate('FindLocation')}
                        />
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
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Annual Salary<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            onChangeText={(value: any) => setSelectSalary(value)}
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
                 </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Save"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={handleProfileBasicDetails}
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

export default ProfileBasicDetails