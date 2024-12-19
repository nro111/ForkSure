import React, { useState } from 'react';
import { LayoutAnimation, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../../layout/Header';
import SwipeBox from '../../components/SwipeBox';

import { IMAGES } from '../../constants/Images';


const SwipeData = [
    {
        image: IMAGES.compnayimage1,
        title: "New Job Opening Alert",
        date: "15 July 2023"
    },
    {
        image: IMAGES.compnayimage2,
        title: "Job Application Submission",
        date: "15 July 2023"
    },
    {
        image: IMAGES.compnayimage2,
        title: "Shortlisted for an Interview",
        date: "15 July 2023"
    },
    {
        image: IMAGES.compnayimage2,
        title: "Job Offer Notification",
        date: "15 July 2023"
    },
]
const SwipeableScreen = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [lists, setLists] = useState(SwipeData);

    const deleteItem = (index: any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.card,
        }}>
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
                    <Header
                        leftIcon={'back'}
                        title={'Swipeable'}
                        titleLeft
                    />
                </View>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ paddingTop: 5 }}>
                            {lists.map((data, index) => {
                                return (
                                    <View
                                        key={index}
                                    >
                                        <SwipeBox data={data} theme={theme} colors={colors} handleDelete={() => deleteItem(index)} />
                                        <View
                                            style={{
                                                height: 1,
                                                width: '100%',
                                                backgroundColor: colors.border,
                                            }}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </GestureHandlerRootView>
            </View>
        </SafeAreaView>
    );
};

export default SwipeableScreen;
