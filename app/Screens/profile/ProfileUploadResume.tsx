import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
// import DocumentPicker from 'react-native-document-picker'
// import storage from '@react-native-firebase/storage';
// import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducer/user';
// import RNFS from 'react-native-fs';
import { IMAGES } from '../../constants/Images';
import moment from 'moment';
import Auth from '../../Service/Auth';
import { ToastAndroid } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { getDatabase, ref as dbRef, update, get } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { storage } from '../../../firebaseConfig';


type ProfileUploadResumeScreenProps = StackScreenProps<RootStackParamList, 'ProfileUploadResume'>;

const ProfileUploadResume = ({ navigation } : ProfileUploadResumeScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;


    const [pdf, setPdf] = useState(userData.ResumeCV || ''); 
    const [pdfUrl, setPdfUrl] = useState(userData.ResumeCV || ''); 
    const [loading, setLoading] = useState(false);

    const handlePdfSelect = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: true,
                // type: 'application/pdf', // Ensure PDF only
            });
    
            console.log('Selected PDF:', result);
    
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedPdf = result.assets[0];
                console.log('Selected PDF Asset:', selectedPdf);
                setPdf(selectedPdf); // Store selected PDF object
            } else {
                console.log('User cancelled the PDF picker');
            }
        } catch (error) {
            console.error('Error picking PDF:', error);
        }
    };
    
    useEffect(() => {
        if (pdf && pdf.uri) {
            setPdfUrl(pdf.uri);
        }
    }, [pdf]);
      
    const handleGoBackWithPdf = async () => {
        if (!pdf || !pdf.uri) {
            setLoading(false);
            ToastAndroid.show('Fill in all the fields!', ToastAndroid.LONG);
            return false;
        }
    
        setLoading(true);
        try {
            let uploadUrl = pdfUrl;
    
            if (pdf) {
                console.log('Uploading PDF...');
                const response = await fetch(pdf.uri);
    
                if (!response.ok) {
                    throw new Error('Failed to fetch PDF');
                }
    
                const blob = await response.blob();
                const fileName = `${Date.now()}_${pdf.name}`;
                const pdfRef = ref(storage, `pdfs/${fileName}`);
    
                await uploadBytes(pdfRef, blob);
                uploadUrl = await getDownloadURL(pdfRef);
                console.log('PDF uploaded successfully!', uploadUrl);
            }
    
            // Firebase update data
            const updateData = {
                ResumeCV: {
                    uri: uploadUrl,
                    name: pdf.name,
                    uploadDate: Date.now(),
                }
            };

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
            console.error('Error in PDF upload or Firebase update:', error);
            setLoading(false);
        }
    };


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
                title={'Resume/CV'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{paddingBottom:10}}>
                        <Text style={{...FONTS.fontMedium,fontSize:15,color:colors.title}}>Upload resume/cv</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handlePdfSelect}
                        activeOpacity={0.5}
                        style={{
                            width:'100%',
                            padding:20,
                            backgroundColor:colors.background,
                            borderRadius:6,
                            alignItems:'center',
                            justifyContent:'center',
                            gap:10
                        }}
                    >   
                         <AntDesign color={COLORS.primary} name="upload" size={40} />
                         <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text}}>Browse File</Text>
                    </TouchableOpacity>
                </View>
                <View style={[GlobalStyleSheet.container]}>
                    {pdfUrl &&
                        <TouchableOpacity
                            style={[{
                                flexDirection:'row',
                                alignItems:'center',
                                borderTopWidth:1,
                                borderTopColor:colors.border,
                                paddingTop:15,
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
                                <Text style={{...FONTS.fontSemiBold,fontSize:14,color:colors.title}}>{pdfUrl.name}</Text>
                                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>Updated Last:</Text>
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:14}}>{moment(pdfUrl.uri).format('DD/MM/YYYY')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Save"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={handleGoBackWithPdf}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileUploadResume