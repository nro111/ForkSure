import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import {Feather } from "@expo/vector-icons";
import Button from '../Button/Button';


const WorkingModeData = [
    {
        title:"Work From Office"
    },
    {
        title:"Remote"
    },
    {
        title:"Hybrid"
    },
]

type Props = {
    WorkingModeRef :any
  }
  

const WorkingModeSheet = ({WorkingModeRef} : any) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [activeWorkingMode, setactiveWorkingMode] = useState(WorkingModeData[0])
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
                <Text style={[FONTS.fontSemiBold, { color: colors.text, fontSize: 16 }]}>WorkingMode</Text>
                <TouchableOpacity
                    style={{ height: 38, width: 38, backgroundColor: colors.card, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => WorkingModeRef.current.close()}
                >
                    <Image
                        style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: colors.text }}
                        source={IMAGES.close}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
                {WorkingModeData.map((data, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setactiveWorkingMode(data)}
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
                                },activeWorkingMode === data && {
                                    borderColor:COLORS.primary,
                                    backgroundColor:COLORS.primary
                                }]}
                            >
                                {activeWorkingMode === data &&
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
                    onPress={() => WorkingModeRef.current.close()}
                    title={"Reset Filter"}
                    text={colors.title}
                    color={colors.background}
                />
            </View>
            <View style={{ width: '50%' }}>
                <Button
                    onPress={() => WorkingModeRef.current.close()}
                    title={"Apply"}
                    color={theme.dark ? COLORS.white :COLORS.primary}
                    text={colors.card}
                />
            </View>
            </View>
        </View>
    )
}

export default WorkingModeSheet