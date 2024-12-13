import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

type ProfessionalDetailsScreenProps = StackScreenProps<RootStackParamList, 'ProfessionalDetails'>;

const ProfessionalDetails = ({ navigation } : ProfessionalDetailsScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [Industry, setIndustry] = useState(userData.ProfessionalDetails?.CurrentIndustry ? userData.ProfessionalDetails.CurrentIndustry : "");
    const [Department, setDepartment] = useState(userData.ProfessionalDetails?.CurrentDepartment ? userData.ProfessionalDetails.CurrentDepartment : "");
    const [RoleCategory, setRoleCategory] = useState(userData.ProfessionalDetails?.CurrentRoleCategory ? userData.ProfessionalDetails.CurrentRoleCategory : "");
    const [JobRole, setJobRole] = useState(userData.ProfessionalDetails?.CurrentJobRole ? userData.ProfessionalDetails.CurrentJobRole : "");

    console.log(Industry);

    const handleProfessionalDetails = async () => {

        if(Industry == "" || Department == "" || RoleCategory == "" || JobRole == ""){
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
                ProfessionalDetails: {
                    CurrentIndustry:Industry,
                    CurrentDepartment:Department,
                    CurrentRoleCategory:RoleCategory,
                    CurrentJobRole:JobRole,
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
                title={'Professional Details'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Industry<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={Industry}
                            onChangeText={(value: any) => setIndustry(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Department<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={Department}
                            onChangeText={(value: any) => setDepartment(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Role Category<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={RoleCategory}
                            onChangeText={(value: any) => setRoleCategory(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Job Role<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={JobRole}
                            onChangeText={(value: any) => setJobRole(value)}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Save"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={handleProfessionalDetails}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfessionalDetails