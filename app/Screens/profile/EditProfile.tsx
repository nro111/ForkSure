import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Feather from 'react-native-vector-icons/Feather';
import Auth from '../../Service/Auth';
// import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducer/user';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';


type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({ navigation } : EditProfileScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const GenderData = ["Male","Female","Other"]

    const [ActiveGender, setActiveGender] = useState(userData.Gendertype)

    const [jobposition, setjobposition] = useState(userData.jobposition?.title);

    const [jobprofile, setjobprofile] = useState(userData.jobprofile);

    const [ProfileHeadline, setProfileHeadline] = useState(userData.ProfileHeadline);

    const [loading, setLoading] = useState(false);

    //console.log(userData);

    const [image, setImage] = useState('');
    const [imageUrl] = useState(userData.img);

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
        
        //console.log(ProfileHeadline, jobprofile, "====");

        if(jobprofile == "" || ProfileHeadline == "" || ActiveGender == ""){
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
                img: url,
                Gendertype: ActiveGender,
                ProfileHeadline: ProfileHeadline,
                jobprofile:jobprofile,
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
                console.error('Image upload failed:', error);
            }
    };

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
                title={"Introduction"}
                leftIcon={'back'}
                titleLeft               
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <View style={{ height: 120, width: 120, borderRadius: 150, alignItems: 'center', justifyContent: 'center',backgroundColor:colors.background }}>
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
                                padding:5,
                                paddingHorizontal:7,
                                borderRadius:4,
                                borderWidth:1,
                                borderColor:colors.border,
                                position:'absolute',
                                bottom:-6,
                                flexDirection:'row',
                                alignItems:'center',
                                gap:5
                            }}
                        >
                            <Feather color={COLORS.card} size={12} name='edit-3'/>
                            <Text style={{...FONTS.fontBold,fontSize:12,color:COLORS.card,lineHeight:16}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 15, marginTop: 30 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Full Name <Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={userData.username}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Job Profile <Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                             onChangeText={(value: any) => setjobprofile(value)}
                             value={jobprofile}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Profile Headline <Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={ProfileHeadline}
                            onChangeText={(value: any) => setProfileHeadline(value)}
                            inputLg
                        />
                    </View>
                    <View style={{marginBottom:10}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Gender<Text style={{ color: '#FF0000' }}>*</Text></Text>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,marginTop:10,paddingHorizontal:20}}>
                            {GenderData.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        onPress={() => setActiveGender(data)}
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
                    <View style={{ marginBottom: 15 }}>
                    <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Current Position <Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            value={jobposition}
                            onChangeText={(value: any) => setjobposition(value)}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Update"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={handleGoBackWithImage}
                        // disabled={!imageUrl}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile