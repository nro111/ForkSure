import React from 'react'
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { SIZES } from '../../constants/theme';

const Customotp = () => {

    const { colors } : {colors : any} = useTheme();

    return (
        <View style={{alignItems:'center'}}>
            <OTPTextInput 
                tintColor={colors.background}
                inputCount={4}
                textInputStyle={{
                    borderBottomWidth:0,
                    height:48,
                    width:48,
                    borderRadius:SIZES.radius,
                    backgroundColor:colors.input,
                    color:colors.title,
                }}
                
            />
        </View>
    )
}

export default Customotp