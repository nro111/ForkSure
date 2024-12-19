import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../Service/Auth';
import { updateUser } from '../../redux/reducer/user';
import { Platform } from 'react-native';
import { Alert } from 'react-native';


type ProfilesummaryScreenProps = StackScreenProps<RootStackParamList, 'Profilesummary'>;

const Profilesummary = ({ navigation } : ProfilesummaryScreenProps) => {

    const dispatch = useDispatch();
    
    const { userData } = useSelector((state: any) => state.user);


    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [text, settext] = useState(userData.Profilesummary);

    const handleTextChange = (value :any) => {
        if (value.length <= 1000) {
            settext(value); // Only update text if it's 1000 characters or less
        }
      };

    const [loading, setLoading] = useState(false);

    const handleProfileBasicDetails = async () => {

        if(text == ""){
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
                Profilesummary:text
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
                title={'Profile summary'}
                titleLeft
                leftIcon={'back'}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container]}>
                    <View style={{ marginBottom: 15}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Profile summary<Text style={{color:'#FF0000'}}>*</Text></Text>
                        <CustomInput
                            onChangeText={handleTextChange}
                            value={text}
                            maxLength={1000}
                            inputXl
                        />
                        <View style={{marginTop:5}}>
                            <Text style={{...FONTS.fontRegular,fontSize:13,color:colors.text,textAlign:'right'}}>{text.length}/1000</Text>
                        </View>
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
        </SafeAreaView>
    )
}

export default Profilesummary