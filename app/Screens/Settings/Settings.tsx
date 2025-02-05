import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Feather from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Button from '../../components/Button/Button';
import { removeUser } from '../../redux/reducer/user';
import { useDispatch } from 'react-redux';
import Auth from '../../Service/Auth';

const SettingData = [
    {
        image:IMAGES.bell,
        title:"Notification Settings",
        navigate:"NotificationSettings"
    },
    {
        image:IMAGES.lock,
        title:"Password Manager",
        navigate:"ChangePassword"
    },
    {
        image:IMAGES.delete,
        title:"Delete Account",
        action:'Delete Account'
    },
]

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({ navigation } : SettingsScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(removeUser());
        Auth.logout();
        navigation.navigate('Onboarding');
    }

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <Header
                title={'Settings'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container,{paddingTop:20}]}>
                    {SettingData.map((data:any,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => data.action ? handleLogout() : navigation.navigate(data.navigate)}
                                activeOpacity={0.5} 
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                    marginBottom:10,
                                    paddingBottom:15,
                                    borderBottomWidth:index === 2 ? 0: 1,
                                    borderBottomColor:colors.border
                                }}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10,flex:1}}>
                                    <Image
                                        style={{height:20,width:20,tintColor:COLORS.primary}}
                                        source={data.image}
                                    />
                                    <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,lineHeight:16}}>{data.title}</Text>
                                </View>
                                <Feather size={20} color={colors.text} name={'chevron-right'} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                    <Button
                        title={"Withdraw Application"}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings