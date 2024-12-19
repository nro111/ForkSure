import React from 'react'
import { View, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants/theme'

const Badge = ({ title, color, style, rounded, size, text } : any) => {
    return (
        <View
            style={[{
                paddingHorizontal: 8,
                paddingVertical: 5,
                backgroundColor: color ? color : COLORS.primary,
                height: 22,
                alignItems:'center',
                borderRadius: SIZES.radius_lg,
            }, style && {
                ...style,
            }, rounded && {
                borderRadius: 30,
            }, size === "md" && {
                paddingHorizontal: 10,
                paddingVertical: 6,
                height: 26
            }, size === "lg" && {
                paddingHorizontal: 16,
                paddingVertical: 4,
                height: 32
            }]}
        >
            <Text style={[
                {
                    ...FONTS.fontXs,
                    color: COLORS.white,
                    lineHeight:13
                },
                (color === COLORS.light || color === COLORS.white || text === COLORS.title) && {
                    color: COLORS.title
                },
                size === "md" && {
                    fontSize: 13,
                },
                size === "lg" && {
                    fontSize: 15,
                    lineHeight: 20,
                }
            ]}>{title}</Text>
        </View>
    )
}

export default Badge