import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

const SocialBtn = (props : any) => {

    const { onPress } = props;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[{
                backgroundColor: props.color ? props.color : COLORS.primary,
                borderRadius:SIZES.radius_sm,
                borderWidth:2,
                borderColor:colors.border,
                paddingVertical: 17,
                overflow: 'hidden',
                paddingLeft: 35,
                paddingRight: 20,
                height: 55,
                alignItems: 'center',
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'center'
            }, props.rounded && {
                borderRadius: 30,
            }]}
            onPress={onPress}
        >
            <View
                style={[{
                    height:55,
                    // width: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, props.rounded && {
                    borderRadius: 30,
                }]}
            >
                {props.icon}
            </View>
            <Text style={{ ...FONTS.fontMedium,fontSize:14, color: props.textcolor ? colors.card : theme.dark ? COLORS.white : COLORS.text,lineHeight:16}}>{props.text}</Text>
        </TouchableOpacity>
    );
};



export default SocialBtn;