import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import Header from '../../layout/Header';

import HeaderStyle1 from '../../components/Headers/HeaderStyle1';
import HeaderStyle2 from '../../components/Headers/HeaderStyle2';
import HeaderStyle3 from '../../components/Headers/HeaderStyle3';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const Headers = () => {

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
                    <Header titleLeft title={'Header Styles'} leftIcon={'back'} />
                </View>
                <ScrollView
                    contentContainerStyle={[GlobalStyleSheet.container,{padding:0}]}
                >
                    <View style={{ paddingVertical: 30 }}>
                        <View style={{ marginBottom: 25 }}>
                            <HeaderStyle1 title={'Home'} />
                        </View>
                        <View style={{ marginBottom: 25 }}>
                            <HeaderStyle2 title={'Home'} />
                        </View>
                        <View style={{ marginBottom: 25 }}>
                            <View
                                style={{
                                    backgroundColor: colors.card,
                                    shadowColor: "rgba(0,0,0,.6)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}
                            >
                                <HeaderStyle3 />
                            </View>
                        </View>
                        <View style={{ marginBottom: 25 }}>
                            <Header titleLeft leftIcon={'back'} title={'Home'} rightIcon={'more'} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Headers;