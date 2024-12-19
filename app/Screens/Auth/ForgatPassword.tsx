import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import {Feather } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type ForgatPasswordScreenProps = StackScreenProps<RootStackParamList, 'ForgatPassword'>;

const ForgatPassword = ({ navigation } : ForgatPasswordScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 30, paddingTop: 30, flex: 1 }]}>
                    <View style={{ flex: 1 }}>
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
                            <View
                                style={{
                                    height:80,
                                    width:80,
                                    borderRadius:30,
                                    backgroundColor:COLORS.primaryLight,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginVertical:20
                                }}
                            >
                                <Image
                                    style={{
                                        height:50,
                                        width:50,
                                        resizeMode:'contain'
                                    }}
                                    source={IMAGES.authuser}
                                />
                            </View>
                            <View>
                                <Text style={{ ...FONTS.fontBold, fontSize: 20, color: colors.title, marginBottom: 5,textAlign:'center' }}>Forgot Password</Text>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text ,textAlign:'center',paddingHorizontal:20}}>Enter the email associated with your account and
                                    we'll send and email to reset your password</Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 15, marginTop: 30 }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title,marginBottom:5 }}>Email Address<Text style={{ color: '#FF0000' }}>*</Text></Text>
                            <CustomInput
                                 onChangeText={(value: any) => console.log(value)}
                            />
                        </View>
                    </View>
                    <View style={{}}>
                        <Button
                            title={'Send Mail'}
                            onPress={() => navigation.navigate('EnterCode')}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                        <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text }}>Back To </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                <Text style={{
                                    ...FONTS.fontMedium,
                                    fontSize:14,
                                    color:COLORS.primary
                                }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgatPassword;