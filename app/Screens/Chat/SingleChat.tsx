import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS, } from '../../constants/theme';
import { IconButton } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const ChatData = [
    {
        id: '1',
        title: 'Good morning!',
        send: false,
    },
    {
        id: '2',
        title: " I'm looking for a new laptop",
        time: "4.40pm",
        send: false,
    },
    {
        id: '3',
        title: 'Good morning!',
        send: true,
    },
    {
        id: '4',
        title: 'Of course, we have a great selection of laptops.',
        time: "4.50pm",
        send: true,
    },
    {
        id: '5',
        title: "I'll mainly use it for work, so something with good processing power and a comfortable keyboard is essential.",
        time: "4.55pm",
        send: false,
    },
    {
        id: '6',
        title: 'Got it!',
        time: "4.56pm",
        send: true,
    },
    {
        id: '7',
        title: 'We have several options that would suit your needs. Let me show you a few models that match your criteria.',
        time: "4.57pm",
        send: true,
    },
    {
        id: '8',
        title: "I'm looking to spend around $800 to $1,000.",
        time: "4.58pm",
        send: false,
    },
    {
        id: '9',
        title: "That's a good budget.I'll show you a few options within that range. Are you interested in Windows or Mac laptops?",
        time: "4.40pm",
        send: true,
    },
    {
        id: '1',
        title: 'Good morning!',
        send: false,
    },
    {
        id: '2',
        title: " I'm looking for a new laptop",
        time: "4.40pm",
        send: false,
    },
    {
        id: '3',
        title: 'Good morning!',
        send: true,
    },
    {
        id: '4',
        title: 'Of course, we have a great selection of laptops.',
        time: "4.50pm",
        send: true,
    },
    {
        id: '5',
        title: "I'll mainly use it for work, so something with good processing power and a comfortable keyboard is essential.",
        time: "4.55pm",
        send: false,
    },
    {
        id: '6',
        title: 'Got it!',
        time: "4.56pm",
        send: true,
    },
    {
        id: '7',
        title: 'We have several options that would suit your needs. Let me show you a few models that match your criteria.',
        time: "4.57pm",
        send: true,
    },
    {
        id: '8',
        title: "I'm looking to spend around $800 to $1,000.",
        time: "4.58pm",
        send: false,
    },
    {
        id: '9',
        title: "That's a good budget.I'll show you a few options within that range. Are you interested in Windows or Mac laptops?",
        time: "4.40pm",
        send: true,
    },
]

type SingleChatScreenProps = StackScreenProps<RootStackParamList, 'SingleChat'>;

const SingleChat = ({route, navigation } : SingleChatScreenProps) => {

     const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const scrollViewRef = useRef<any>(null);

    const [messageList, setMessageList] = useState(ChatData);
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if(message.length > 0){
            setMessageList([
                ...messageList,
                {
                    id: '0',
                    title: message,
                    time: "4.40pm",
                    send: true,
                },
            ])
            setMessage("");
        }
    }

    return (
        <SafeAreaView style={[GlobalStyleSheet.container,{padding:0, backgroundColor: colors.card, flex: 1, }]}>
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
                <View
                    style={{
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                        justifyContent: 'space-between',
                        borderBottomWidth:1,
                        borderBottomColor:colors.border
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={props => <MaterialIcons name="arrow-back-ios" {...props} />}
                            iconColor={colors.title}
                            size={20}
                        />
                        <View
                            style={{
                                height:40,
                                width:40,
                                borderRadius:6,
                                borderWidth:1,
                                borderColor:colors.border,
                                alignItems:'center',
                                justifyContent:'center',
                                marginRight:15
                            }}
                        >
                            <Image
                                style={{ height:20, width: 20, resizeMode: 'contain' }}
                                source={data.image}
                            />
                        </View>
                        <View>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <View style={{ height: 10, width: 10, borderRadius: 12, backgroundColor: COLORS.success }}></View>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>Online</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Call')}
                        style={{
                            height: 40,
                            width: 40,
                            backgroundColor: COLORS.success,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 15
                        }}
                    >
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            source={IMAGES.call}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[GlobalStyleSheet.container,{flex:1}]}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    ref={scrollViewRef}
                    onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
                >
                    <View style={{ flex: 1 }}>
                        {messageList.map((data:any, index:any) => {
                            return (
                                <View key={index}>
                                    <View
                                        style={[{
                                            width: '75%',
                                            marginBottom: 10,
                                        },
                                        data.send == false
                                            ?
                                            {
                                                marginRight: 'auto',
                                                alignItems: 'flex-start',
                                            }
                                            :
                                            {
                                                marginLeft: 'auto',
                                                alignItems: 'flex-end',
                                            }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                data.send == false
                                                    ?
                                                    {
                                                        backgroundColor: colors.background,
                                                        borderRadius:20,
                                                        borderTopLeftRadius:6,
                                                        borderBottomLeftRadius:6
                                                    }
                                                    :
                                                    {
                                                        backgroundColor: COLORS.primary,
                                                        borderRadius:20,
                                                        borderTopRightRadius:6,
                                                        borderBottomRightRadius:6
                                                    }

                                            ]}
                                        >
                                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: data.send ? COLORS.white :theme.dark ? COLORS.white : COLORS.title, paddingVertical: 10, paddingHorizontal: 10 }}>{data.title}</Text>
                                        </View>
                                        {data.time &&
                                            <Text style={{ ...FONTS.fontXs, ...FONTS.fontRegular, color: COLORS.title, opacity: .4, marginTop: 3 }}>{data.time}</Text>
                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
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
                <View style={{ height: 75, backgroundColor: colors.card, paddingHorizontal: 15,borderTopWidth:1,borderTopColor:colors.border }}>
                    <View 
                        style={{
                            height: 48,
                            width: '100%', 
                            marginTop: 15,
                            backgroundColor:colors.background 
                        }}
                    >
                        <TextInput
                            placeholder='Type Something'
                            placeholderTextColor={COLORS.title}
                            onChangeText={(val) => setMessage(val)}
                            value={message}
                            style={{ ...FONTS.fontRegular, fontSize: 15, paddingLeft: 45, color: COLORS.title,flex:1 }}
                        />
                        <View style={{ position: 'absolute', left: 13, top: 15 }}>
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain', tintColor:COLORS.text }}
                                source={IMAGES.happy}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => sendMessage()}
                            disabled={message.length == 0 ? true : false}
                            style={{ position: 'absolute', top: 12, right: 15 }}
                        >
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain', tintColor:COLORS.primary }}
                                source={IMAGES.send}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SingleChat