import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import {  FONTS, COLORS } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const MessagesData = [
    {
        image: IMAGES.compnayimage4,
        title: "JobBoard Network",
        message: "Fri",
        time: "2 Min"
    },
    {
        image: IMAGES.compnayimage5,
        title: "Sophia Martinez",
        message: "2 Hours",
        time: "Sun",
    },
    {
        image: IMAGES.compnayimage6,
        title: "William Thompson",
        message: "2 Min",
        time: "7 Aug 2023",
    },
    {
        image: IMAGES.compnayimage7,
        title: "Mon",
        message: "Text me!",
        time: "Tus",
    },
    {
        image: IMAGES.compnayimage4,
        title: "JobBoard Network",
        message: "Fri",
        time: "2 Min"
    },
    {
        image: IMAGES.compnayimage5,
        title: "Sophia Martinez",
        message: "2 Hours",
        time: "Sun",
    },
    {
        image: IMAGES.compnayimage6,
        title: "William Thompson",
        message: "2 Min",
        time: "7 Aug 2023",
    },
    {
        image: IMAGES.compnayimage7,
        title: "Mon",
        message: "Text me!",
        time: "Tus",
    },
]

type MessagesScreenProps = StackScreenProps<RootStackParamList, 'Messages'>;

const Messages = ({ navigation } : MessagesScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title={"Messages"}
                leftIcon={'back'}
                rightIcon2={'search'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[GlobalStyleSheet.container, {}]}>

                    {MessagesData.map((data:any, index:any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SingleChat',{data : data })}
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                    paddingBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <View
                                        style={{
                                            height:40,
                                            width:40,
                                            borderRadius:6,
                                            borderWidth:1,
                                            borderColor:colors.border,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <Image
                                            style={{ height:30, width: 30, resizeMode: 'contain' }}
                                            source={data.image}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ ...FONTS.fontSemiBold, fontSize: 15, color: colors.title }}>{data.title}</Text>
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.text }}>{data.message}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ ...FONTS.fontRegular, fontSize: 13, color:colors.text }}>{data.time}</Text>
                                </View>
                                {data.hasstory ?

                                    <View style={{ height: 16, width: 16, borderRadius: 15, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, left: 62 }}>
                                        <View style={{ height: 12, width: 12, borderRadius: 12, backgroundColor: COLORS.success }}></View>
                                    </View>

                                    : null}
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Messages