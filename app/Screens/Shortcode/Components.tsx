import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import ListItem from '../../components/list/ListItem';
import { IMAGES } from '../../constants/Images';
import { COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const accordionIco = require('../../assets/images/icons/accordion.png');
const bottomSheet = require('../../assets/images/icons/bottomSheet.png');
const modal = require('../../assets/images/icons/modal.png');
const chart = require('../../assets/images/icons/chart.png');
const divider = require('../../assets/images/icons/divider.png');
const badge = require('../../assets/images/icons/badge.png');
const input = require('../../assets/images/icons/input.png');
const list = require('../../assets/images/icons/list.png');
const pricing = require('../../assets/images/icons/pricing.png');
const share = require('../../assets/images/icons/share.png');
const tabs = require('../../assets/images/icons/tabs.png');
const table = require('../../assets/images/icons/table.png');
const toggle = require('../../assets/images/icons/toggle.png');



const Components = (props : any ) => {

    const { colors } : {colors : any} = useTheme();

    const ComponentData = [
        {
            icon: accordionIco,
            title: "Accordions List",
            navigate: 'Accordion',
        },
        {
            icon: bottomSheet,
            title: "Bottom Sheets",
            navigate: 'BottomSheet',
        },
        {
            icon: modal,
            title: "Modal Box",
            navigate: 'ActionModals',
        },
        {
            icon: accordionIco,
            title: "Button Styles",
            navigate: 'Buttons',
        },
        {
            icon: badge,
            title: "Badges",
            navigate: 'Badges',
        },
        {
            icon: IMAGES.datepicker,
            title: "Date Picker",
            navigate: 'Datepicker',
        },
        {
            icon: IMAGES.search2,
            title: "Search",
            navigate: 'Search2',
        },
        {
            icon: chart,
            title: "Charts",
            navigate: 'Charts',
        },
        {
            icon: accordionIco,
            title: "Header Styles",
            navigate: 'Headers',
        },
        {
            icon: accordionIco,
            title: "Footer Menu Styles",
            navigate: 'Footers',
        },
        {
            icon: input,
            title: "Inputs",
            navigate: 'Inputs',
        },
        {
            icon: list,
            title: "List Styles",
            navigate: 'lists',
        },
        {
            icon: pricing,
            title: "Pricing Pack",
            navigate: 'Pricings',
        },
        {
            icon: divider,
            title: "Seprators",
            navigate: 'DividerElements',
        },
        {
            icon: accordionIco,
            title: "Snackbars",
            navigate: 'Snackbars',
        },
        {
            icon: share,
            title: "Social",
            navigate: 'Socials',
        },
        {
            icon: accordionIco,
            title: "Swipeable",
            navigate: 'Swipeable',
        },
        {
            icon: tabs,
            title: "Tabs",
            navigate: 'Tabs',
        },
        {
            icon: table,
            title: "Table",
            navigate: 'Tables',
        },
        {
            icon: toggle,
            title: "Toggle",
            navigate: 'Toggles',
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.card,
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
                        leftIcon={'back'}
                        titleLeft
                        title={'Components'}
                    />
                </View>
                <ScrollView 
                    contentContainerStyle={[GlobalStyleSheet.container,{padding:0, paddingBottom: 15, paddingTop: 15 }]} 
                    showsVerticalScrollIndicator={false}
                >
                    {ComponentData.map((data:any, index:any) => {
                        return (
                            <ListItem
                                icon={
                                    <Image
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: COLORS.primary,
                                            resizeMode: 'contain',
                                        }}
                                        source={data.icon}
                                    />
                                }
                                title={data.title}
                                onPress={() => props.navigation.navigate(data.navigate)}
                                key={index}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Components;