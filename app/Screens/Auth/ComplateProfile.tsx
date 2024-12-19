import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, ActivityIndicator, ToastAndroid } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import {Feather } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { KeyboardAvoidingView } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
// import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducer/user';
import Auth from '../../Service/Auth';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import { Alert } from 'react-native';

type ComplateProfileScreenProps = StackScreenProps<RootStackParamList, 'ComplateProfile'>;

const ComplateProfile = ({ navigation } : ComplateProfileScreenProps) => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const GenderData = ["Male","Female","Other"]

    const [ActiveGender, setActiveGemder] = useState(userData.Gendertype)

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    
    const [image, setImage] = useState('');
    const [imageUrl] = useState(userData.img);
    const [name , setname] = useState(userData.name);
    const [phonenumber , setphonenumber] = useState(userData.phonenumber);
    const [countryCode, setCountryCode] = useState(userData.countryCode);



    const handleImageSelect = async () => {
        try {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access the media library is required!');
            return;
          }
      
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log("Selected Image URI:", result.assets[0].uri);
          } else {
            console.log("Image selection was cancelled.");
          }
        } catch (e) {
          console.log("Image selection failed:", e);
        }
    };

    const handleGoBackWithImage = async () => {
        if(name == "" || phonenumber == "" || ActiveGender == ""){
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
            let url =  image ? image : imageUrl ? imageUrl : '';
            if (image) {
                console.log("Uploading image from URI:", image); // Log the URI to confirm it's set correctly
                const imageRef = ref(storage, `images/${Date.now()}.jpg`);
                const img = await fetch(image);
                const bytes = await img.blob();
          
                await uploadBytes(imageRef, bytes);
                url = await getDownloadURL(imageRef);
                console.log('Image uploaded successfully! URL:', url);
            }
            let updateData = {
                // img: url,
                name: name,
                Gendertype: ActiveGender,
                phonenumber: phonenumber,
                countryCode: countryCode,
            }

            Auth.updateUser(userData.emailId, updateData)
                .then((user) => {
                    dispatch(updateUser(user));
                    Auth.setAccount(user);
                    setLoading(false);
                    navigation.navigate('LookingFor')
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setLoading(false);
                });
           
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <KeyboardAvoidingView style={{ backgroundColor: colors.card, flex: 1 }}>
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
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 30, paddingTop: 30,flex:1,paddingBottom:30 }]}>
                    <View style={{flex:1}}>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top:-10,
                                left:-10
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <View style={GlobalStyleSheet.background}>
                                <Feather color={COLORS.primary} size={22} name='arrow-left'/>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}}>
                            <View style={{paddingVertical:25,marginTop:30}}>
                                <Text style={{ ...FONTS.fontBold, fontSize: 20, color: colors.title, marginBottom: 5,textAlign:'center' }}>Complete Your Profile</Text>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,textAlign:'center' }}>Rest assured, your personal data is visible only to you. No one else will have access to it.</Text>
                            </View>
                            <View
                                style={{
                                    height:120,
                                    width:120,
                                    borderRadius:100,
                                    backgroundColor:COLORS.primaryLight,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                               <Image
                                    style={{ height:(imageUrl || image) ? 100 :60, width:(imageUrl || image) ? 100:50,borderRadius:(imageUrl || image) ?100 : 0,resizeMode:'contain'}}
                                    source={image ? { uri : image} : imageUrl ? { uri : imageUrl } : IMAGES.profileuser}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={handleImageSelect}
                                activeOpacity={0.5}
                                style={{
                                    backgroundColor:COLORS.primary,
                                    height:22,
                                    borderRadius:4,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    gap:5,
                                    paddingHorizontal:10,
                                    marginTop:-20
                                }}
                            >
                                <Image
                                    style={{
                                        height:12,
                                        width:12,
                                        tintColor:COLORS.white
                                    }}
                                    source={IMAGES.write}
                                />
                                <Text style={{...FONTS.fontBold,fontSize:12,color:COLORS.card}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 15, marginTop: 25 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Name<Text style={{ color: '#FF0000' }}>*</Text></Text>
                            <CustomInput
                                // onChangeText={(value: any) => console.log(value)}
                                onChangeText={(value: any) => setname(value)}
                                value={name}
                            />
                        </View>
                        <View style={{position:'relative'}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Phone Number<Text style={{ color: '#FF0000' }}>*</Text></Text>
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
                                    top:Platform.OS === 'web'? 28 : 32,
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
                        <View style={{marginTop:10}}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Gender<Text style={{ color: '#FF0000' }}>*</Text></Text>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,marginTop:10,paddingHorizontal:20}}>
                                {GenderData.map((data,index) => {
                                    return(
                                        <TouchableOpacity
                                            onPress={() => setActiveGemder(data)}
                                            key={index}
                                            style={[{
                                                borderWidth:2,
                                                padding:10,
                                                borderRadius:6,
                                                borderColor:colors.border,
                                                width:'33.33%',
                                                height:48,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                gap:10
                                            },ActiveGender === data && {
                                                borderColor:COLORS.primary
                                            }]}
                                        >
                                            <View
                                                style={[{
                                                    height:18,
                                                    width:18,
                                                    borderRadius:25,
                                                    borderWidth:2,
                                                    borderColor:colors.border,
                                                    backgroundColor:colors.card,
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                },ActiveGender === data && {
                                                    backgroundColor:COLORS.primary,
                                                    borderColor:COLORS.primary
                                                }]}
                                            >
                                                <View
                                                    style={{
                                                        height:10,
                                                        width:10,
                                                        borderRadius:15,
                                                        backgroundColor:colors.card
                                                    }}
                                                />
                                            </View>
                                            <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,lineHeight:15}}>{data}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                    <View>
                        <Button
                            title={'Complete Profile'}
                            onPress={handleGoBackWithImage}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default ComplateProfile