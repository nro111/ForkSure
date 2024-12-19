import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

type Props = {
    title : string,
    onPress ?: any,
    color ?: any,
    style ?: object,
    size ?: any,
    text ?: string,
    btnRounded ? :any,
    disabled ? :any,
    badge ?:any,
    icon ?: any,
    fullWidth ?:any,  
    outline ?:any,  
    height ?:any,  

}

const Button = ({ title, color, onPress,disabled, style, size, badge, btnRounded, text, icon, fullWidth, outline, height } : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={.8}
            onPress={() => onPress && onPress()}
            style={[{
                height:48,
                paddingHorizontal: 25,
                paddingVertical: 13,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: btnRounded ? 30 : 8,
                backgroundColor: color ? color : outline ? colors.card : COLORS.primary,
                borderWidth: outline ? 1 : null,
                borderColor: theme.dark ? COLORS.white : outline ? colors.borderColor : null,
            }, size === 'sm' && {
                paddingHorizontal: 10,
                paddingVertical: 5,
                height: height ? 46 : 35,
            }, size === 'lg' && {
                paddingHorizontal: 35,
                paddingVertical: 16,
                height: 58,
            }, icon && {
                paddingLeft: 65,
                paddingRight: fullWidth ? 65 : 25,
            }, style && { ...style }]}
        >
            {icon &&
                <View style={{
                    height: 48,
                    width: 48,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: outline ? colors.title : COLORS.white,
                    borderWidth: outline ? 0 : 2,
                    borderColor: color ? color : outline ? '' : COLORS.primary,
                    position: 'absolute',
                    left: 0,

                }}>
                    {icon}
                </View>
            }
            <Text style={[
                {
                    ...FONTS.fontBold,
                    fontSize: 15,
                    textAlign: outline ? null : 'center',
                    color: text ? text : outline ? colors.title : COLORS.white,
                    lineHeight: 22,
                }, size === 'sm' && {
                    ...FONTS.fontSemiBold,
                    fontSize: 13,
                    lineHeight:14
                }, size === 'lg' && {
                    fontSize: 18,
                }, outline && {
                    ...FONTS.fontMedium
                }
            ]}>{title}</Text>
            {badge &&
                <View style={{ marginVertical: -4, marginLeft: 8 }}>
                    {badge()}
                </View>
            }
        </TouchableOpacity>
    );
};


export default Button;