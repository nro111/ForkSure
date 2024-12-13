import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';

const CheckoutItems = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [itemQuantity, setItemQuantity] = useState(14);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
                style={{
                    height: 30,
                    width: 30,
                    backgroundColor:colors.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Feather size={14} color={colors.title} name='minus' />
            </TouchableOpacity>
            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title, width: 30, textAlign: 'center' }}>{itemQuantity}</Text>
            <TouchableOpacity
                onPress={() => setItemQuantity(itemQuantity + 1)}
                style={{
                    height: 30,
                    width: 30,
                    backgroundColor:colors.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Feather size={14} color={colors.title} name='plus' />
            </TouchableOpacity>
        </View>
    )
}

export default CheckoutItems