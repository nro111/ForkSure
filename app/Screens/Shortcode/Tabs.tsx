import React, { useRef } from 'react';
import { Animated, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import TabButtonStyle1 from '../../components/Tabs/TabButtonStyle1';
import TabButtonStyle2 from '../../components/Tabs/TabButtonStyle2';


const Tabs = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const buttons = ['First', 'Second', 'Third'];
    const scrollX = useRef<any>(new Animated.Value(0)).current;
    const onCLick = i => this.scrollViewHome.scrollTo({ x: i * SIZES.width - 60 });
    const scrollX2 = useRef(new Animated.Value(0)).current;
    const onCLick2 = i => this.scrollViewHome2.scrollTo({ x: i * SIZES.width - 60 });

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.card,
            }}
        >
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
                    <Header title={'Tabs'} titleLeft leftIcon={'back'} />
                </View>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Default Tab</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{ paddingBottom: 15 }}>
                                    <TabButtonStyle1 buttons={buttons} onClick={onCLick} scrollX={scrollX} />
                                </View>
                                <ScrollView
                                    ref={e => (this.scrollViewHome = e)}
                                    horizontal
                                    pagingEnabled
                                    scrollEventThrottle={16}
                                    scrollEnabled={false}
                                    decelerationRate="fast"
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                        { useNativeDriver: false },
                                    )}>
                                    {/* tab 1 */}
                                    <View style={[styles.tabBody]} >
                                        <Text style={{ ...FONTS.font, color: colors.title }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                    {/* tab 2 */}
                                    <View style={[styles.tabBody]} >
                                        <Text style={{ ...FONTS.font, color: colors.title }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                    {/* tab 3 */}
                                    <View style={[styles.tabBody]} >
                                        <Text style={{ ...FONTS.font, color: colors.title }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                            <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                <Text style={{ ...FONTS.h6, color: colors.title }}>Primary Tab</Text>
                            </View>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View style={{ paddingBottom: 15 }}>
                                    <TabButtonStyle2 buttons={buttons} onClick={onCLick2} scrollX={scrollX2} />
                                </View>
                                <ScrollView
                                    ref={e => (this.scrollViewHome2 = e)}
                                    horizontal
                                    pagingEnabled
                                    scrollEventThrottle={16}
                                    scrollEnabled={false}
                                    decelerationRate="fast"
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
                                        { useNativeDriver: false },
                                    )}>
                                    {/* tab 1 */}
                                    <View style={[styles.tabBody]} >
                                        <Text style={{ ...FONTS.font, color: colors.title }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                    {/* tab 2 */}
                                    <View style={[styles.tabBody]} >
                                        <Text style={{ ...FONTS.font, color: colors.title }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                    {/* tab 3 */}
                                    <View style={[styles.tabBody]} >
                                        <Text style={{ ...FONTS.font, color: colors.title }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    tabBody: {
        width: SIZES.width - 60,
    },
})

export default Tabs;