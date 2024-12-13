import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import Header from '../../layout/Header';
import { FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
// 
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { useDispatch, useSelector } from 'react-redux';


const TrackorderData = [
    {
        // image: IMAGES.item12,
        title: "Comfort Underwire Bra",
        price: "$80",
        discount: "$95",
        btntitel: "Write Review",
    },

]

const btnData = [
    {
        name:"Yes"
    },
    {
        name:"No"
    }
]

const WriteReview = () => {

    
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [isChecked, setIsChecked] = useState(btnData[0]);

    const navigation = useNavigation();

    const [rating , setRating] = useState(4);
    

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title={"Write Review"}
                leftIcon={"back"}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={[GlobalStyleSheet.container, { flex: 1 }]}>
                    <View
                        style={{
                            padding:20,
                            margin:-15,
                            backgroundColor:theme.dark ? colors.background : '#FAFCFF',
                            borderBottomWidth:1,
                            borderBottomColor:colors.border,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <View
                            style={{
                                height:80,
                                width:80,
                                borderRadius:50,
                                backgroundColor:colors.card,
                                borderWidth:1,
                                borderColor:colors.border,
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:10
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
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:colors.title,marginBottom:2}}>{userData.username}</Text>
                            {userData.jobprofile &&
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text}}>{userData.jobprofile}</Text>
                            }
                            {userData.joblocation.title &&
                                <View
                                    style={{flexDirection:'row',alignItems:'center',gap:5}}
                                >
                                    <Image
                                        style={{height:14,width:14,resizeMode:'contain',tintColor:colors.text}}
                                        source={IMAGES.map}
                                    />
                                    <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>{userData.joblocation.title}</Text>
                                </View>
                            }  
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 30,marginBottom:20 }}>
                        <Text style={{ ...FONTS.fontBold, fontSize: 20, color: colors.title }}>Overall Rating</Text>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color:colors.text, marginTop: 5 }}>Your Average Rating Is {rating}.0</Text>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            {new Array(rating).fill(rating).map((_,index) => {
                                return(
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => setRating(index + 1)}
                                        key={index}
                                        style={{margin:5}}
                                    >
                                        <Image
                                            style={[{height:35,width:35,resizeMode:'contain',zIndex:1,tintColor:'#FFB444'}]}
                                            source={IMAGES.star7}
                                        /> 
                                    </TouchableOpacity>
                                )
                            })}
                            {new Array(5 - rating).fill(5 - rating).map((_,index) => {
                                return(
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        key={index}
                                        onPress={() => setRating(index + rating + 1)}
                                        style={{margin:5}}
                                    >
                                        <Image
                                            style={[{height:35,width:35,resizeMode:'contain',zIndex:1}]}
                                            source={IMAGES.star6}
                                        />    
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title, marginBottom: 5 }}>Write Review</Text>
                        <CustomInput
                             onChangeText={(value: any) => console.log(value)}
                            inputLg
                        />
                    </View>
                </View>
            </ScrollView>
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
                <View style={{ height: 88, backgroundColor: colors.card}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                        <Button
                            onPress={() => navigation.goBack()}
                            title={"Submit Review"}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WriteReview