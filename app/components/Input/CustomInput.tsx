import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { FONTS, SIZES } from '../../constants/theme';

const CustomInput = (props : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [passwordShow, setPasswordShow] = useState(true);

    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    return (
        <>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
                {props.icon &&
                    <View style={{
                        position: 'absolute',
                        height: 48,
                        width: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        //top:16,
                    }}>
                        {props.icon && props.icon}
                    </View>
                }
                <TextInput
                    secureTextEntry={props.type === "password" ? passwordShow : false}
                    style={[{
                        ...FONTS.fontMedium,
                        fontSize: 16,
                        height: 48,
                        color: colors.title,
                        paddingVertical: 12,
                        backgroundColor:props.background ? colors.card : colors.input,
                        borderRadius:SIZES.radius,
                        paddingHorizontal: 15,
                    },props.paddingLeft &&{
                        paddingLeft: 100,
                    },
                     props.icon && {
                        paddingLeft: 50,
                    }, props.inputXl && {
                        height: 250,
                        // paddingVertical: 18,
                    }, props.inputLg && {
                        height: 98,
                        // paddingVertical: 18,
                    }, props.inputSm && {
                        paddingVertical: 7,
                        height: 45,
                    }, props.inputRounded && {
                        borderRadius: 30,
                    }, props.inputBorder && {
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderRadius: 0,
                        backgroundColor: colors.card,
                    }]}
                    placeholderTextColor={colors.text}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    multiline={props.inputLg || props.inputXl}
                    keyboardType={props.keyboardType}
                    editable={props.editable}
                    maxLength={props.maxLength}
                />
                {props.type === "password" &&
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Password"
                        accessibilityHint="Password show and hidden"
                        onPress={() => handndleShowPassword()}
                        style={styles.eyeIcon}>
                        <Feather color={theme.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'} size={18} name={passwordShow ? 'eye-off' : 'eye'} />
                    </TouchableOpacity>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    eyeIcon: {
        position: 'absolute',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        zIndex: 1,
        top: 0,
    }
})

export default CustomInput;