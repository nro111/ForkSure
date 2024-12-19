import React from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Header from '../../layout/Header';
import PricingStyle1 from '../../components/Pricing/PricingStyle1';
import PricingStyle2 from '../../components/Pricing/PricingStyle2';


const Pricings = () => {

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
                    <Header title={'Pricings'} titleLeft leftIcon={'back'} />
                </View>
                <ScrollView>
                    <View style={{ ...GlobalStyleSheet.container, alignItems: 'center', paddingVertical: 30 }}>
                        <View style={{ marginBottom: 20 }}>
                            <PricingStyle1 />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <PricingStyle2 />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



export default Pricings;