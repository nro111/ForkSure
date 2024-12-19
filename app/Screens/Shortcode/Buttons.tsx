import React from 'react';
import { Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {Feather } from "@expo/vector-icons";
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import ButtonLight from '../../components/Button/ButtonLight';
import ButtonOutline from '../../components/Button/ButtonOutline';
import Badge from '../../components/Badge/Badge';


const Buttons = () => {

    const theme = useTheme()
    const { colors } : {colors : any} = theme;

    return (
        <>
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
                        <Header
                            titleLeft
                            title={'Buttons'}
                            leftIcon={'back'}
                        />
                    </View>
                    <ScrollView>
                        <View style={GlobalStyleSheet.container}>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Classic Button</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <Button
                                            title={'Primary'}
                                            color={COLORS.primary}
                                        />
                                        <Button
                                            color={COLORS.secondary}
                                            text={COLORS.title}
                                            title={'Secondary'}
                                        />
                                        <Button
                                            color={COLORS.danger}
                                            title={'Danger'}
                                        />
                                        <Button
                                            color={COLORS.success}
                                            title={'Success'}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Rounded Button</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <Button
                                            title={'Primary'}
                                            btnRounded
                                            color={COLORS.primary}
                                        />
                                        <Button
                                            color={COLORS.secondary}
                                            btnRounded
                                            text={COLORS.title}
                                            title={'Secondary'}
                                        />
                                        <Button
                                            color={COLORS.danger}
                                            btnRounded
                                            title={'Danger'}
                                        />
                                        <Button
                                            color={COLORS.success}
                                            btnRounded
                                            title={'Success'}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Icon With Button</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <Button
                                            title={'Primary'}
                                            btnRounded
                                            color={COLORS.primary}
                                            icon={<Feather size={24} color={COLORS.primary} name={'arrow-right'} />}
                                        />
                                        <Button
                                            color={COLORS.secondary}
                                            btnRounded
                                            text={COLORS.title}
                                            icon={<Feather size={24}  color={COLORS.secondary} name={'arrow-right'} />}
                                            title={'Secondary'}
                                        />
                                        <Button
                                            color={COLORS.danger}
                                            btnRounded
                                            icon={<Feather size={24}  color={COLORS.danger} name={'arrow-right'} />}
                                            title={'Danger'}
                                        />
                                        <Button
                                            color={COLORS.success}
                                            btnRounded
                                            icon={<Feather size={24} color={COLORS.success} name={'arrow-right'} />}
                                            title={'Success'}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Full Width Button</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={{ gap: 8 }}>
                                        <Button
                                            title={'Primary'}
                                            color={COLORS.primary}
                                        />
                                        <Button
                                            title={'Primary'}
                                            btnRounded
                                            color={COLORS.primary}
                                        />
                                        <Button
                                            title={'Primary'}
                                            btnRounded
                                            fullWidth
                                            color={COLORS.primary}
                                            icon={<Feather size={24} color={COLORS.primary} name={'arrow-right'} />}
                                        />

                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Button Light</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <ButtonLight
                                            title={'Primary'}
                                        />
                                        <ButtonLight
                                            text={COLORS.title}
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                        />
                                        <ButtonLight
                                            color={COLORS.danger}
                                            title={'Danger'}
                                        />
                                        <ButtonLight
                                            color={COLORS.success}
                                            title={'Success'}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Button Outline</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <ButtonOutline
                                            color={COLORS.primary}
                                            title={'Primary'}
                                        />
                                        <ButtonOutline
                                            text={COLORS.card}
                                            color={COLORS.secondary}
                                            title={'Secondary'}
                                        />
                                        <ButtonOutline
                                            color={COLORS.danger}
                                            title={'Danger'}
                                        />
                                        <ButtonOutline
                                            color={COLORS.success}
                                            title={'Success'}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.borderColor }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Badge Button</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <Button
                                            title={'Notification'}
                                            badge={() => <Badge rounded color={colors.card} title={'8'} />}
                                            color={colors.title}
                                            text={colors.card}
                                        />
                                        <ButtonOutline
                                            title={'Cart'}
                                            text={colors.title}
                                            color={colors.title}
                                            badge={() => <Badge rounded color={colors.title} title={'2'} />}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow, { backgroundColor: colors.card }]}>
                                <View style={[GlobalStyleSheet.cardHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={{ ...FONTS.h6, color: colors.title }}>Button Size</Text>
                                </View>
                                <View
                                    style={GlobalStyleSheet.cardBody}
                                >
                                    <View style={[GlobalStyleSheet.row, { gap: 8 }]}>
                                        <Button
                                            size={'sm'}
                                            title={'Small'}
                                            color={colors.title}
                                            text={colors.card}
                                        />
                                        <Button
                                            title={'Medium'}
                                            color={colors.title}
                                            text={colors.card}
                                        />
                                        <Button
                                            size={'lg'}
                                            title={'Large'}
                                            color={colors.title}
                                            text={colors.card}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Buttons;