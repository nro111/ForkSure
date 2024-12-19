import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import {Feather } from "@expo/vector-icons";
import Button from '../Button/Button';


const ExperienceData = [
    {
        title:"Entry Level (0-1 year)"
    },
    {
        title:"Early Career (1-3 years)"
    },
    {
        title:"Mid-Level (3-5 years)"
    },
    {
        title:"Advanced Mid-Level (5-7 years)"
    },
    {
        title:"Experienced / Senior (7-10 years)"
    },
]

type Props = {
    ExperienceRef :any
  }
  

const ExperienceSheet = ({ExperienceRef} : any) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [activeExperience, setactiveExperience] = useState(ExperienceData[0])
    return (
        <View style={[GlobalStyleSheet.container, { paddingTop: 0 }]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingVertical: 15,
                    marginHorizontal: -15,
                    paddingHorizontal: 15
                }}
            >
                <Text style={[FONTS.fontSemiBold, { color: colors.text, fontSize: 16 }]}>Experience</Text>
                <TouchableOpacity
                    style={{ height: 38, width: 38, backgroundColor: colors.card, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => ExperienceRef.current.close()}
                >
                    <Image
                        style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: colors.text }}
                        source={IMAGES.close}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
                {ExperienceData.map((data, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setactiveExperience(data)}
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'flex-start',
                                gap:10,
                                marginBottom:8
                            }}
                        >
                            <View
                                style={[{
                                    height:18,
                                    width:18,
                                    borderRadius:4,
                                    borderWidth:2,
                                    borderColor:colors.text,
                                    alignItems:'center',
                                    justifyContent:'center'
                                },activeExperience === data && {
                                    borderColor:COLORS.primary,
                                    backgroundColor:COLORS.primary
                                }]}
                            >
                                {activeExperience === data &&
                                    <Feather color={COLORS.card} size={15} name='check'/>
                                }
                            </View>
                            <Text style={[{ ...FONTS.fontMedium, fontSize: 14, color: colors.text }]}>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row', gap: 10, paddingRight: 10, marginTop: 20,marginBottom:50 }}>
            <View style={{ width: '50%' }}>
                <Button
                    onPress={() => ExperienceRef.current.close()}
                    title={"Reset Filter"}
                    text={colors.title}
                    color={colors.background}
                />
            </View>
            <View style={{ width: '50%' }}>
                <Button
                    onPress={() => ExperienceRef.current.close()}
                    title={"Apply"}
                    color={theme.dark ? COLORS.white :COLORS.primary}
                    text={colors.card}
                />
            </View>
            </View>
        </View>
    )
}

export default ExperienceSheet