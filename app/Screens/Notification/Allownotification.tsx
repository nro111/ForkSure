import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { Image } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { TouchableOpacity } from 'react-native';

type AllownotificationScreenProps = StackScreenProps<RootStackParamList, 'Allownotification'>;

const Allownotification = ({navigation} : AllownotificationScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
                <View style={[GlobalStyleSheet.container,{justifyContent:'center',alignItems:'center',flex:1}]}>
                    <View
                        style={{
                            height:120,
                            width:120,
                            borderRadius:100,
                            backgroundColor:colors.background,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Image
                            style={{
                                height:60,
                                width:60,
                                resizeMode:'contain'
                            }}
                            source={IMAGES.bell3}
                        />
                    </View>
                    <View style={{alignItems:'center',paddingHorizontal:30,marginVertical:15}}>
                        <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,marginBottom:10,textAlign:'center'}}>Do tou want to turn on notification?</Text>
                        <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.text,textAlign:'center',lineHeight:18}}>Activate notifications now to receive important updates about your job search directly on your phone!</Text>
                    </View>
                    <View style={{width:'100%',paddingHorizontal:20}}>
                        <Button
                            title={'Allow Notification'}
                            onPress={() => navigation.navigate('Notification')}
                            color={theme.dark ? COLORS.white :COLORS.primary}
                            text={colors.card}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            paddingVertical:15
                        }}
                    >
                        <Text style={{...FONTS.fontRegular,fontSize:16,color:COLORS.primary}}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Allownotification