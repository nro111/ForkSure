import React from 'react';
import { Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { FONTS } from '../../constants/theme';
import BasicLineChart from '../../components/Charts/LineChart';
import BasicBarChart from '../../components/Charts/BarChart';
import BasicPieChart from '../../components/Charts/PieChart';


const Charts = () => {

    const { colors } : {colors : any} = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}
            >
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
                    <Header
                        titleLeft
                        title={'Charts'}
                        leftIcon={'back'}
                    />
                </View>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Line Chart</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <BasicLineChart />
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Bar Chart</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <BasicBarChart />
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Pie Chart</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <BasicPieChart />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Charts;