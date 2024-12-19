import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { COLORS ,FONTS,} from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import Button from '../../components/Button/Button'
import { IMAGES } from '../../constants/Images'
import { StackScreenProps } from '@react-navigation/stack'
import Feather from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../../Navigations/RootStackParamList'
import Header from '../../layout/Header'

const selectData = [
  {
    image:IMAGES.flags1,
    title:"English"
  },
  {
    image:IMAGES.flags2,
    title:"Hindi"
  },
  {
    image:IMAGES.flags3,
    title:"French"
  },
  {
    image:IMAGES.flags4,
    title:"Germany"
  },
  {
    image:IMAGES.flags5,
    title:"Italian"
  },
  {
    image:IMAGES.flags6,
    title:"Thai"
  },
  {
    image:IMAGES.flags7,
    title:"Chinese"
  },
  {
    image:IMAGES.flags8,
    title:"Urdu"
  },
  {
    image:IMAGES.flags9,
    title:"Polish"
  },
  {
    image:IMAGES.flags10,
    title:"Canadian"
  },
  {
    image:IMAGES.flags11,
    title:"Danish"
  },
  {
    image:IMAGES.flags12,
    title:"Japanese"
  },
  {
    image:IMAGES.flags13,
    title:"Dutch"
  },
  {
    image:IMAGES.flags14,
    title:"Turkish"
  },
]

type ChooseLanguageScreenProps = StackScreenProps<RootStackParamList, 'ChooseLanguage'>;

const ChooseLanguage = ({navigation} : ChooseLanguageScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors : any} = theme;

  const [Select, setSelect] = useState(selectData[0]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.card}}>
        <Header
            title={'Language'}
            leftIcon={'back'}
            titleLeft
        />
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={[GlobalStyleSheet.container,]}>
                <View style={[GlobalStyleSheet.row,{marginTop:20}]}>
                    {selectData.map((data,index) => {
                        return(
                        <View style={[GlobalStyleSheet.col50, { marginBottom: 15 }]} key={index}>
                            <TouchableOpacity
                                onPress={() => setSelect(data)}
                                activeOpacity={0.5} 
                                style={[{
                                height:45,
                                width:'100%',
                                borderWidth:2,
                                borderColor:COLORS.primaryLight,
                                borderRadius:8,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                paddingHorizontal:10
                                },Select === data && {
                                borderColor:COLORS.primary
                                }]}
                            >
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                    <Image
                                        style={{height:22,width:28,borderRadius:6}}
                                        source={data.image}
                                    />
                                    <Text style={[FONTS.fontMedium,{fontSize:15,color:colors.title}]}>{data.title}</Text>
                                </View>
                                <View style={{height:20,width:20,backgroundColor:Select === data ? COLORS.primary:COLORS.primaryLight,borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                                    <Feather size={14} color={Select === data ? COLORS.card :theme.dark ? COLORS.title:COLORS.card} name={'check'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    })}
                </View>
                <TouchableOpacity style={{alignItems:'center',marginTop:5}}>
                    <Text style={[FONTS.fontRegular,{fontSize:16,color:COLORS.primary,textDecorationLine:'underline',textDecorationColor:COLORS.primary}]}>More Language</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <View style={{ height: 88, width: '100%', backgroundColor: colors.card, }}>
            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 20, paddingTop: 0,paddingBottom:0 }]}>
                <Button
                    title={"Save"}
                    color={theme.dark ? COLORS.white :COLORS.primary}
                    text={colors.card}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ChooseLanguage;