import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Customotp from '../../components/Input/Customotp';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import {Feather } from "@expo/vector-icons";
import { IMAGES } from '../../constants/Images';

type EnterCodeScreenProps = StackScreenProps<RootStackParamList, 'EnterCode'>;

const EnterCode = ({ navigation } : EnterCodeScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
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
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.fontBold, fontSize: 20, color: colors.title, marginBottom: 5 }}>Enter Code</Text>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text }}>An Authentication Code Has Sent To </Text>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:COLORS.primary}}>testing@gmail.com </Text>
                        </View>
                    </View>
                    <View style={[{ alignItems: 'center', marginTop: 30 }]}>
                        <View style={{alignItems:'center',paddingLeft:15}}>
                            <Customotp />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 16, color: colors.text}}>If you don't receive code! </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ForgatPassword')}
                            >
                                <Text style={{ ...FONTS.fontRegular,color:COLORS.primary }}>Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Button
                        title={'Verify and proceed'}
                        onPress={() => navigation.navigate('NewPassword')}
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
        </SafeAreaView>
    )
}

export default EnterCode;