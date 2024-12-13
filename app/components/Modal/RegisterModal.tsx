import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES } from '../../constants/theme';
import CustomInput from '../Input/CustomInput';
import CustomButton from '../CustomButton';

const RegisterModal = ({close} : any) => {

    const { colors } : {colors : any} = useTheme();

    return (
        <>
            <View
                style={{
                    backgroundColor:colors.card,
                    maxWidth:330,
                    width:'100%',
                    paddingHorizontal:20,
                    paddingVertical:20,
                    borderRadius:SIZES.radius,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingBottom:15,
                        marginBottom:20,
                        borderBottomWidth:1,
                        borderBottomColor:colors.border,
                    }}
                >
                    <Text style={{flex:1,...FONTS.h6,color:colors.title}}>Register</Text>
                    <TouchableOpacity
                        onPress={() => close(false)}
                        style={{
                            height:32,
                            width:32,
                            borderRadius:32,
                            backgroundColor:colors.background,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Feather size={20} color={colors.title} name="x"/>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom:15}}>
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:4}}>Username</Text>
                    <CustomInput  
                        placeholder={'Type Username Here'}
                        onChangeText={(value:any)=> console.log(value)}
                    />
                </View>
                <View style={{marginBottom:15}}>
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:4}}>Email</Text>
                    <CustomInput  
                        placeholder={'Type Email Here'}
                        onChangeText={(value:any)=> console.log(value)}
                    />
                </View>
                <View style={{marginBottom:25}}>
                    <Text style={{...FONTS.font,color:colors.title,marginBottom:4}}>Password</Text>
                    <CustomInput
                        type="password" 
                        placeholder={'Type Password Here'}
                        onChangeText={(value:any)=> console.log(value)}
                    />
                </View>
                <CustomButton
                    title={'Register'}
                />
            </View>
        </>
    );
};



export default RegisterModal;