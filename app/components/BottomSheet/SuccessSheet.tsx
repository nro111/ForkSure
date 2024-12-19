import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constants/theme';

type SuccessSheetProps = {
    headerText: string
    bodyText: string
    messageSuccess: boolean
}

const SuccessSheet = ({
    headerText,
    bodyText,
    messageSuccess
  }: SuccessSheetProps) => {

    const {colors} = useTheme();

    return (
        <View style={{alignItems:'center',paddingHorizontal:35,paddingVertical:20}}>
            <View
                style={{
                    alignItems:'center',
                    justifyContent:'center',
                    marginBottom:15,
                    marginTop:10,
                }}
            >
                <View
                    style={{
                        height:80,
                        width:80,
                        opacity:.2,
                        backgroundColor:COLORS.success,
                        borderRadius:80,
                    }}
                />
                <View
                    style={{
                        height:65,
                        width:65,
                        backgroundColor: messageSuccess ? COLORS.success : COLORS.danger, 
                        borderRadius:65,
                        position:'absolute',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <Feather size={32} color={COLORS.white} name={messageSuccess ? "check" : "x"}/>
                </View>
            </View>
            <Text style={{...FONTS.h4,color:colors.title,marginBottom:8}}>{headerText}</Text>
            <Text style={{...FONTS.font,color:colors.text,textAlign:'center'}}>{bodyText}</Text>
        </View>
    );
};


export default SuccessSheet;