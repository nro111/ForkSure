import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { COLORS, FONTS} from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import CustomInput from '../Input/CustomInput';
import Button from '../Button/Button';
import ButtonOutline from '../Button/ButtonOutline';
import { IMAGES } from '../../constants/Images';


const PaymentAccordion = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections: any) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const SECTIONS = [
        {
            icon: IMAGES.dollar,
            title: 'Cash on Delivery(Cash/UPI)',
            content: 'Carry on your cash payment..\nThanx!',
        },
        {
            icon: IMAGES.payment,
            title: 'Google Pay/Phone Pay/BHIM UPI',
            content: 'Your UPI ID Will be encrypted and is\n100% safe with us.',
            component: true
        },
        {
            icon: IMAGES.folder,
            title: 'Payments/Wallet',
            payment: true
        },
        {
            icon: IMAGES.bank,
            title: 'Netbanking',
            netbanking: true,
        },
    ];

    const AccordionHeader = (item:any, _:any, isActive:any) => {

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 15
            }}>
                <Image
                    style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        tintColor: COLORS.danger,
                        marginRight: 10,
                    }}
                    source={item.icon}
                />
                <Text style={[FONTS.fontMedium, { fontSize: 14, color: colors.title, flex: 1 }]}>{item.title}</Text>
                <View
                    style={{
                        borderWidth: 1,
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                        borderColor: theme.dark ? COLORS.white : COLORS.borderColor,
                        backgroundColor:colors.card,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View style={[{
                        width: 14,
                        height: 14,
                        backgroundColor: colors.card,
                        borderRadius: 50
                    }, isActive == true && {
                        backgroundColor: colors.title
                    }]}></View>
                </View>
            </View>
        )
    }

    const AccordionBody = (item:any, _:any, isActive:any) => {
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor: theme.dark ? COLORS.white : COLORS.borderColor,
                paddingVertical: 10,
                paddingHorizontal: 15
            }}>
                {item.component ?

                    <View>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title, marginBottom: 5 }}>Link via UPI</Text>
                        <CustomInput
                            onChangeText={(value: any) => console.log(value)}
                            placeholder={"Enter your UPI ID"}
                            background  
                        />
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title={"Continue"}
                                color={theme.dark ? COLORS.white :COLORS.primary}
                                text={colors.card}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, marginLeft: 10 }}>
                            <Image
                                style={{ height: 24, width: 24, resizeMode: 'contain' }}
                                source={IMAGES.shieldcheck}
                            />
                            <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>{item.content}</Text>
                        </View>
                    </View>
                    :
                    item.payment ?
                        <View>
                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title, marginBottom: 5 }}>Link Your Wallet</Text>
                            <CustomInput
                                onChangeText={(value: any) => console.log(value)}
                                placeholder={"+91"}
                                background
                                keyboardType={'phone-pad'}
                            />
                            <View style={{ marginTop: 10, marginBottom: 5 }}>
                                <Button
                                    title={"Continue"}
                                    color={theme.dark ? COLORS.white :COLORS.primary}
                                    text={colors.card}
                                />
                            </View>
                        </View>
                        :
                        item.netbanking ?
                            <View style={{ marginVertical: 10 }}>
                                <ButtonOutline
                                    color={COLORS.primary}
                                    title={"Netbanking"}
                                />
                            </View>
                            :
                            <Text style={[FONTS.fontSm, { color: colors.text, lineHeight: 20 }]}>{item.content}</Text>
                }
            </View>
        )
    }

    return (
        <>
            <Accordion
                sections={SECTIONS}
                duration={300}
                sectionContainerStyle={{
                    backgroundColor:colors.background,
                    marginBottom: 15,
                    //paddingHorizontal: 20,
                }}
                activeSections={activeSections}
                onChange={setSections}
                touchableComponent={TouchableOpacity}
                renderHeader={AccordionHeader}
                renderContent={AccordionBody}
            />
        </>
    );
};

export default PaymentAccordion