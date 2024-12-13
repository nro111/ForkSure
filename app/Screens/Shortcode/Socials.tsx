import React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import {FontAwesome } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS,} from '../../constants/theme';
import Header from '../../layout/Header';
import SocialBtn from '../../components/Socials/SocialBtn';

import { IMAGES } from '../../constants/Images';

const Socials = () => {

    const { colors } : {colors : any} = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <View
                    style={[{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: .1,
                        shadowRadius: 5,
                    }, Platform.OS === "ios" && {
                        backgroundColor: colors.card,
                    }]}
                >
                    <Header title={'Socials'} titleLeft leftIcon={'back'} />
                </View>
                <ScrollView>
                    <View style={{ ...GlobalStyleSheet.container }}>
                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Social Button</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{ gap: 8 }}>
                                    <SocialBtn
                                        icon={<Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={IMAGES.google2} />}
                                        color={colors.background}
                                        text={'Sign in with google'}
                                    />
                                    <SocialBtn
                                        icon={<FontAwesome name='apple' size={20} color={COLORS.title} />}
                                        color={colors.background}
                                        text={'Sign in with apple'}
                                    />
                                    <SocialBtn
                                        icon={<Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={IMAGES.facebook} />}
                                        color={colors.background}
                                        text={'Sign in with facebook'}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Social Button Rounded</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{ gap: 8 }}>

                                    <SocialBtn
                                        icon={<Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={IMAGES.google2} />}
                                        color={colors.background}
                                        rounded
                                        text={'Sign in with google'}
                                    />
                                    <SocialBtn
                                        icon={<FontAwesome name='apple' size={20} color={COLORS.title} />}
                                        color={colors.background}
                                        rounded
                                        text={'Sign in with apple'}
                                    />
                                    <SocialBtn
                                        icon={<Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={IMAGES.facebook} />}
                                        rounded
                                        color={colors.background}
                                        text={'Sign in with facebook'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Socials;