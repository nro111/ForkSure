import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, SafeAreaView, Text, Image, Animated, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Button from '../../components/Button/Button';
import {Feather } from "@expo/vector-icons";
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';


const DATA = [
    {
        title: "Finding Your Perfect Career Path Starts Here!",
        desc: 'Confused looking for updated jobs and let’s see here lots of job listings',
    },
    {
        title: "Finding Your Perfect Career Path Starts Here!",
        desc: 'Confused looking for updated jobs and let’s see here lots of job listings',
    },
    {
        title: "Finding Your Perfect Career Path Starts Here!",
        desc: 'Confused looking for updated jobs and let’s see here lots of job listings',
    },
    {
        title: "Finding Your Perfect Career Path Starts Here!",
        desc: 'Confused looking for updated jobs and let’s see here lots of job listings',
    },
]

type OnbordingScreenProps = StackScreenProps<RootStackParamList, 'Onbording'>;

const Onbording = ({ navigation } : OnbordingScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const scrollRef = useRef<any>();

    const scrollX = useRef(new Animated.Value(0)).current;

    const [sliderIndex , setSliderIndex] = useState(1);

    const onScroll = (val:any) => {
        scrollRef.current?.scrollTo({
            x : SIZES.width * val,
            animated: true,
        });

        setSliderIndex(sliderIndex + 1);
    }

    const onBackScroll = (sliderIndex: number) => {
        if (sliderIndex > 1) {
            scrollRef.current?.scrollTo({
                x: SIZES.width * (sliderIndex - 2), // Going to the previous slide
                animated: true,
            });
            setSliderIndex(sliderIndex - 1);
        }
    };

     // Create an animated value for vertical translation
    const moveAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current; // Start with scale 0

    useEffect(() => {
        Animated.parallel([
            // Animate scale from 0 to 1
            Animated.timing(scaleAnim, {
              toValue: 1, // Scale up to full size
              duration: 500, // Duration for the scaling effect
              useNativeDriver: true,
            }),
            // Loop the left-right movement animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                    toValue: -15, // Move up by 50 units
                    duration: 1500,
                    useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                    toValue: 0, // Move down by 50 units
                    duration: 1500,
                    useNativeDriver: true,
                    }),
                ])
            ),
        ]).start(); // Start both animations together after the delay
    }, [moveAnim, scaleAnim]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <ScrollView contentContainerStyle={{ flexGrow:1 }}>
                <View style={[GlobalStyleSheet.container,{padding:0,flex:1,position:'relative',alignItems:'center'}]}>
                    <View
                        style={{
                            height:812,
                            width:812,
                            borderRadius:600,
                            backgroundColor:colors.background,
                            position:'absolute',
                            bottom:0,
                            overflow:'hidden'
                        }}
                    >
                        <Image
                            //style={{width:'100%',height:null,aspectRatio:1/.570,resizeMode:'contain',position:'absolute',bottom:0}}
                            style={{width:'100%',height:450,resizeMode:'contain',position:'absolute',bottom:0}}
                            source={IMAGES.onboardingpic1}
                        />
                    </View>
                    <View style={{position:'absolute',top:-50,left:25}}>
                        <Animated.Image
                            source={IMAGES.Designertag}
                            style={[
                            styles.image,
                            {
                                transform: [
                                    { translateX: moveAnim }, // Apply the animated horizontal translation
                                    { scale: scaleAnim },     // Apply the scaling effect
                                ],
                                width:82,margin:0,
                            },
                            ]}
                        />
                    </View>
                    <View 
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingHorizontal:20,
                            width:'100%',
                            position:'absolute',
                            top:110
                        }}
                    >
                        <Animated.Image
                            source={IMAGES.ReactDevelopertag}
                            style={[
                            styles.image,
                            {
                                transform: [
                                {
                                    translateY: moveAnim, // Apply the animated translation
                                },
                                { 
                                    scale: scaleAnim 
                                },
                                ],
                            },
                            ]}
                        />
                        <Animated.Image
                            source={IMAGES.Managertag}
                            style={[
                            styles.image,
                            {
                                transform: [
                                {
                                    translateX: moveAnim, // Apply the animated translation
                                },
                                { 
                                    scale: scaleAnim 
                                },
                                ],
                                width:82,marginBottom:30
                            },
                            ]}
                        />
                    </View>
                    <View 
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingHorizontal:20,
                            width:'100%',
                            position:'absolute',
                            bottom:65
                        }}
                    >
                        <Animated.Image
                            source={IMAGES.Developertag}
                            style={[
                            styles.image,
                            {
                                transform: [
                                {
                                    translateX: moveAnim, // Apply the animated translation
                                },
                                { 
                                    scale: scaleAnim 
                                },
                                ],
                                width:89,margin:0
                            },
                            ]}
                        />
                        <Animated.Image
                            source={IMAGES.UXDesignertag}
                            style={[
                            styles.image,
                            {
                                transform: [
                                {
                                    translateY: moveAnim, // Apply the animated translation
                                },
                                { 
                                    scale: scaleAnim 
                                },
                                ],
                                width:102,marginBottom:30,marginRight:20
                            },
                            ]}
                        />
                    </View>
                </View>
                <View style={{backgroundColor:colors.card }}>
                    <ScrollView
                        // contentContainerStyle={{ marginTop: 20 }}
                        ref={scrollRef}
                        horizontal
                        pagingEnabled
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                    >
                        {DATA.map((data, index) => (
                            <View style={[styles.slideItem,Platform.OS === "ios" && {
                                paddingBottom:35
                            }]} key={index}>
                                <View style={{ alignItems: 'center', justifyContent: 'center',paddingHorizontal:30 }}>
                                    <Text style={{ ...FONTS.fontBold,fontSize:24, textAlign: 'center', color: colors.title }}>{data.title}</Text>
                                    <Text style={{ ...FONTS.fontRegular, fontSize: 16, textAlign: 'center', lineHeight: 24, color: colors.text, paddingTop: 10 }}>{data.desc}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={[styles.indicatorConatiner,{gap:30,marginBottom:30}]}>
                        <TouchableOpacity
                            disabled={sliderIndex == 1 ? true : false}
                            onPress={() => onBackScroll(sliderIndex)}
                            style={[styles.iconbtn,{backgroundColor:sliderIndex == 1 ? COLORS.primary :COLORS.primaryLight}]}
                        >
                            <Feather color={sliderIndex == 1 ? COLORS.card :COLORS.primary} size={24} name='arrow-left'/>
                        </TouchableOpacity>
                        <View style={[styles.indicatorConatiner,Platform.OS === "ios" && { 
                            bottom:10
                        }]} pointerEvents="none">
                            {DATA.map((x, i) => (
                                <Indicator i={i} key={i} scrollValue={scrollX} />
                            ))}
                        </View>
                        <TouchableOpacity
                            disabled={sliderIndex == 4 ? true : false}
                            onPress={() => onScroll(sliderIndex)}
                            style={[styles.iconbtn,{backgroundColor:sliderIndex == 4 ? COLORS.primary :COLORS.primaryLight}]}
                        >
                            <Feather color={sliderIndex == 4 ? COLORS.card :COLORS.primary} size={24} name='arrow-right'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:colors.card}]}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 0,marginBottom:10 }}>
                        <Button
                            title={'let’s get Started'}
                            onPress={() => navigation.navigate('SignIn')}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text }}>Already have and account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <Text style={{
                                ...FONTS.fontMedium,
                                fontSize:14,
                                borderBottomWidth: 1,
                                borderBottomColor:COLORS.primary,
                                color:COLORS.primary
                            }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function Indicator({ i, scrollValue } : any) {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const translateX = scrollValue.interpolate({
        inputRange: [-SIZES.width + i * SIZES.width, i * SIZES.width, SIZES.width + i * SIZES.width],
        outputRange: [-20, 0, 20],
    });
    return (
        <View style={[styles.indicator, { backgroundColor:theme.dark ? colors.text : colors.background, }]}>
            <Animated.View
                style={[styles.activeIndicator, { transform: [{ translateX }], backgroundColor:theme.dark ? COLORS.white : COLORS.primary }]}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    slideItem: {
        width: SIZES.width,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop:25,
        paddingBottom: 60,
    },
    slideItem2: {
        width: SIZES.width + 20,
    },
    indicatorConatiner: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    indicator: {
        height: 6,
        width: 6,
        borderRadius: 10,
        marginHorizontal: 5,
        overflow: 'hidden',
    },
    activeIndicator: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },
    iconbtn: {
        height:45,
        width:45,
        borderRadius:50,
        backgroundColor:COLORS.primary,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height:31,
        width:126,
        marginTop:90,
        marginLeft:2
    }

})
export default Onbording;