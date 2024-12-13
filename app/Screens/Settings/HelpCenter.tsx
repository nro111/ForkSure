import { View, Text, SafeAreaView, ScrollView,Animated, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Feather from 'react-native-vector-icons/Feather';
import QuestionsAccordion from '../../components/Accordion/QuestionsAccordion';


type HelpCenterScreenProps = StackScreenProps<RootStackParamList, 'HelpCenter'>;

const HelpCenter = ({ navigation } : HelpCenterScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const scrollRef = useRef<any>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const onPressTouch = (val : any) => {
        setCurrentIndex(val)
        scrollRef.current?.scrollTo({
            x: SIZES.width * val,
            animated: true,
        });
    }

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <Header
                title={'Help Center'}
                leftIcon={'back'}
                titleLeft
            />
            <View style={[GlobalStyleSheet.container,{padding:0,flex:1}]}>
                <View style={{backgroundColor:theme.dark ? colors.background :'#FAFCFF'}}>
                    <View 
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            height:60,
                            borderBottomWidth:1,
                            borderColor:colors.border,
                            gap:35
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => onPressTouch(0)}
                            style={{height:60,alignItems:'center',justifyContent:'center'}}
                        >
                            <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.text}}>Feedback</Text>
                            {currentIndex === 0 && 
                                <View 
                                    style={{
                                        height:5,
                                        borderTopLeftRadius:5,
                                        borderTopRightRadius:5,
                                        width:105,
                                        backgroundColor:COLORS.primary,
                                        position:'absolute',
                                        bottom:0
                                    }}
                                />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => onPressTouch(1)}
                            style={{height:60,alignItems:'center',justifyContent:'center'}}
                        >
                            <Text style={{...FONTS.fontMedium,fontSize:16,color:colors.text}}>FAQs</Text>
                            {currentIndex === 1 && 
                                <View 
                                    style={{
                                        height:5,
                                        borderTopLeftRadius:5,
                                        borderTopRightRadius:5,
                                        width:68,
                                        backgroundColor:COLORS.primary,
                                        position:'absolute',
                                        bottom:0
                                    }}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={scrollRef}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onMomentumScrollEnd={(e:any) => {
                        if (e.nativeEvent.contentOffset.x.toFixed(0) == SIZES.width.toFixed(0)) {
                            setCurrentIndex(1)
                        } else if (e.nativeEvent.contentOffset.x.toFixed(0) == 0) {
                            setCurrentIndex(0)
                        } else {
                            setCurrentIndex(0)
                        }
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: SIZES.width,flex:1 }}>
                        <View style={{flex:1}}>
                            <View 
                                style={{
                                    padding:25,
                                    paddingBottom:40,
                                    alignItems:'center',
                                    backgroundColor:theme.dark ? colors.background :'#FAFCFF',
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.border
                                }}
                            >
                                <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,marginBottom:5}}>Send Feedback</Text>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,textAlign:'center'}}>Tell us what you love about the app. or what we could be doing better.</Text>
                            </View>
                            <View style={{marginHorizontal:15,marginTop:-25}}>
                                <View
                                    style={{
                                        height:168,
                                        backgroundColor:colors.card,
                                        width:'100%',
                                        borderWidth:2,
                                        borderRadius:6,
                                        borderColor:colors.border,
                                        paddingHorizontal:10
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            ...FONTS.fontMedium,
                                            fontSize:14,
                                            color:colors.text,
                                            padding:10,
                                        }}
                                        placeholder='Enter Feedback'
                                        placeholderTextColor={colors.text}
                                        numberOfLines={1}
                                        multiline
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{height: 88, width: '100%', backgroundColor: colors.card, }}>
                            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0 }]}>
                                <Button
                                    title={"Submit feedback"}
                                    color={theme.dark ? COLORS.white :COLORS.primary}
                                    text={colors.card}
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ width: SIZES.width,flex:1 }}>
                        <View>
                            <View 
                                style={{
                                    padding:25,
                                    paddingBottom:40,
                                    alignItems:'center',
                                    backgroundColor:theme.dark ? colors.background :'#FAFCFF',
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.border
                                }}
                            >
                                <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,marginBottom:5}}>Frequently Asked Questions</Text>
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,textAlign:'center'}}>Here’s a list of frequently asked questions (FAQs) for applying for a job:</Text>
                            </View>
                            <View style={{marginHorizontal:15,marginTop:-25}}>
                                <View
                                    style={{
                                        height:48,
                                        backgroundColor:colors.card,
                                        width:'100%',
                                        borderWidth:2,
                                        borderRadius:6,
                                        borderColor:colors.border,
                                        paddingHorizontal:10
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            ...FONTS.fontMedium,
                                            fontSize:14,
                                            color:colors.text,
                                            padding:10,
                                            paddingRight:30
                                        }}
                                        placeholder='Search keywords'
                                        placeholderTextColor={colors.text}
                                        numberOfLines={1}
                                        multiline
                                    />
                                    <View style={{position:'absolute',right:10,top:10}}>
                                        <Feather color={COLORS.primary} size={20} name='search'/> 
                                    </View>
                                </View>
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{paddingHorizontal:15,paddingTop:15,marginTop:10}}>
                                <QuestionsAccordion />
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default HelpCenter