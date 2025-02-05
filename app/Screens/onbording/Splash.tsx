import { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native"
import Auth from "../../Service/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducer/user";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { COLORS, FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { IMAGES } from "../../constants/Images";

type SplashScreenProps = StackScreenProps<RootStackParamList, 'splash'>;

const Splash = ({navigation}: SplashScreenProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async () => {
        let tempData = await Auth.getAccount();

        let data = JSON.parse(tempData as any);

        console.log(data);

        if(data != null){
            dispatch(setUser(data));

            if(data.name == "" || data.Gendertype == "" || data.phonenumber == "" || data.countryCode  == ""){
                navigation.navigate('ComplateProfile')
            }else if(data.jobType == ""){
                navigation.navigate('LookingFor')
            }else if(data.jobExperienceLevel == ""){
                navigation.navigate('ExperienceLevel')
            }else if(data.jobworkingmodel == ""){
                navigation.navigate('workingModel')
            }else if(data.jobposition == ""){
                navigation.navigate('LookingToObtain')
            }else if(data.joblocation == ""){
                navigation.navigate('Allowlocation')
            }else{
                navigation.navigate('DrawerNavigation',{screen : 'Home'})
            }
        }else{
            navigation.navigate('Onboarding')
        }
    }
    return(
        <SafeAreaView style={{backgroundColor:COLORS.background,flex:1}}>
            <View style={[GlobalStyleSheet.container,{alignItems:'center',justifyContent:'center',flex:1}]}>
                <Image
                    style={{
                        height:150,
                        width:150,
                        resizeMode:'contain',
                        borderRadius:150
                    }}
                    source={IMAGES.logo}
                />
                <Text style={{...FONTS.fontMedium,fontSize:13,color:COLORS.text,position:'absolute',bottom:10}}>Version 1.0</Text>
            </View>
        </SafeAreaView>
    )
}

export default Splash;