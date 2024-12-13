import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { IMAGES } from '../../constants/Images';
import {Feather } from "@expo/vector-icons";


const SalaryData = [
    {
        title:"150,000"
    },
    {
        title:"200,000"
    },
    {
        title:"120,000"
    },
    {
        title:"110,000"
    },
    {
        title:"150,000"
    },
    {
        title:"100,000"
    },
]

type Props = {
    SetsalaryRef :any
    setSelectSalary : any
}
  

const SetsalarySheet = ({SetsalaryRef, setSelectSalary  } : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;
    
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
                <Text style={[FONTS.fontSemiBold, { color: colors.text, fontSize: 16 }]}>Annual Salary</Text>
                <TouchableOpacity
                    style={{ height: 38, width: 38, backgroundColor: colors.card, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => SetsalaryRef.current.close()}
                >
                    <Image
                        style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: colors.text }}
                        source={IMAGES.close}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
                {SalaryData.map((data, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {setSelectSalary(data.title) ; SetsalaryRef.current.close()}}
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'flex-start',
                                gap:10,
                                marginBottom:8
                            }}
                        >
                            <Feather color={COLORS.title} size={18} name='arrow-right'/>
                            <Text style={[{ ...FONTS.fontMedium, fontSize: 16, color: colors.text },setSelectSalary === data && {color:COLORS.primary}]}>{data.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default SetsalarySheet;