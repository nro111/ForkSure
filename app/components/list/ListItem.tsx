import React from 'react';
import { Text, View, Image } from 'react-native';
import {Feather } from "@expo/vector-icons";
import Ripple from 'react-native-material-ripple';
import { SIZES, FONTS, COLORS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

const ListItem = (props) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <View>
            <Ripple
                onPress={() => props.onPress()}
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 15,
                    height: 48,
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: SIZES.radius,

                }}
            >
                {props.icon ?
                    <View style={{
                        height: 30,
                        width: 30,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                    }}>
                        {props.icon}

                    </View>
                    :
                    null
                }

                <Text style={{ ...FONTS.fontMedium, fontSize:15, color: colors.title, flex: 1 }}>{props.title}</Text>
                <Feather style={{ opacity: .8 }} color={colors.text} name={'chevron-right'} size={20} />
            </Ripple>
        </View>
    )
}

export default ListItem;