import React from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';

import ListItem from '../../components/list/ListItem';
import { GlobalStyleSheet } from '../../constants/StyleSheet';



const Footers = (props : any )=> {

    const FooterData = [
        {
            title: "Footer Style 1",
            navigate: 'TabStyle1',
        },
        {
            title: "Footer Style 2",
            navigate: 'TabStyle2',
        },
        {
            title: "Footer Style 3",
            navigate: 'TabStyle3',
        },
        {
            title: "Footer Style 4",
            navigate: 'TabStyle4',
        },
    ]

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
                    <Header title={'Footer styles'} titleLeft leftIcon={'back'} />
                </View>
                <ScrollView
                    contentContainerStyle={[GlobalStyleSheet.container,{padding:0,paddingBottom: 15, paddingTop: 15}]} 
                >
                    {FooterData.map((data, index) => {
                        return (
                            <ListItem
                                key={index}
                                title={data.title}
                                onPress={() => props.navigation.navigate(data.navigate)}
                            />
                        )
                    })}
                    {/* <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={GlobalStyleSheet.cardBody}>
                                <ListStyle1 onPress={() => props.navigation.navigate('TabStyle1')} arrowRight title={'Footer Style 1'} />
                                <ListStyle1 onPress={() => props.navigation.navigate('TabStyle2')} arrowRight title={'Footer Style 2'} />
                                <ListStyle1 onPress={() => props.navigation.navigate('TabStyle3')} arrowRight title={'Footer Style 3'} />
                                <ListStyle1 onPress={() => props.navigation.navigate('TabStyle4')} arrowRight title={'Footer Style 4'} />
                            </View>
                        </View>
                    </View> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



export default Footers;