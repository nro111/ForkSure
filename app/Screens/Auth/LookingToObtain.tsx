import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS } from '../../constants/theme'
import {Feather } from "@expo/vector-icons";
import Button from '../../components/Button/Button'
import { ScrollView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../Navigations/RootStackParamList'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/reducer/user'
import Auth from '../../Service/Auth'
import { ToastAndroid } from 'react-native';
import { Platform } from 'react-native';
import { Alert } from 'react-native';


const LookingToObtainData = [
    {
        title:"Software Engineer",
    },
    {
        title:"Project Manager",
    },
    {
        title:"Data Analyst",
    },
    {
        title:"Marketing Specialist",
    },
    {
        title:"Human Resources Manager",
    },
    {
        title:"Sales Executive",
    },
    {
        title:"Graphic Designer",
    },
    {
        title:"Customer Support Representative",
    },
    {
        title:"Financial Analyst",
    },
    {
        title:"On Demand",
    },
]

type LookingToObtainScreenProps = StackScreenProps<RootStackParamList, 'LookingToObtain'>;

const LookingToObtain = ({navigation} : LookingToObtainScreenProps) => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state: any) => state.user);

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [loading, setLoading] = useState(false);

    const [jobposition, setjobposition] = useState(userData.jobposition);

    const handlejobposition = async () => {

        if(jobposition == ""){
            setLoading(false);
            {Platform.OS === 'android' ?
                ToastAndroid.show('Fill in all the fields!' , ToastAndroid.LONG)
              :
                Alert.alert('Fill in all the fields!')
            }
            return false;
        }

        setLoading(true);
        try {
            
            let updateData = {
                jobposition: jobposition,
            }
                Auth.updateUser(userData.emailId, updateData)
                .then((user) => {
                    dispatch(updateUser(user));
                    Auth.setAccount(user);
                    setLoading(false);
                    navigation.navigate('Allowlocation')
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setLoading(false);
                });

        } catch (error) {
            console.error('Fill in fields!', error);
        }
    }   

    return (
        <SafeAreaView style={[GlobalStyleSheet.container,{padding:0,flex:1}]}>
             {loading ?
                <View
                    style={{
                        position:'absolute',
                        zIndex:1,
                        height:'100%',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0,0,0,.3)',
                    }}
                >
                    <ActivityIndicator size={'large'} color={COLORS.white}/>
                </View>
                :
                null
            }
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 0, y:.4 }}
                colors={[COLORS.primary, colors.card]}
                style={{
                    flex:1,
                    width:'100%',
                    height:null,
                    padding:15,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        gap:10,
                        height:40,
                        marginVertical:10
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Feather color={COLORS.card} size={22} name='arrow-left'/>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'flex-start',
                            gap:5,
                            flex:1,
                            paddingRight:50
                        }}
                    >
                        <View 
                            style={{
                                height:24,
                                width:24,
                                borderRadius:30,
                                backgroundColor:COLORS.card,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Text style={{...FONTS.fontBold,fontSize:14,color:COLORS.primary,lineHeight:18}}>1</Text>
                        </View>
                        <View
                            style={{
                                height:5,
                                flex:1,
                                backgroundColor:COLORS.card,
                                borderRadius:5
                            }}
                        />
                       <View 
                            style={{
                                height:24,
                                width:24,
                                borderRadius:30,
                                backgroundColor:COLORS.card,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Text style={{...FONTS.fontBold,fontSize:14,color:COLORS.primary,lineHeight:18}}>2</Text>
                        </View>
                        <View
                            style={{
                                height:5,
                                flex:1,
                                backgroundColor:COLORS.card,
                                borderRadius:5
                            }}
                        />
                       <View 
                            style={{
                                height:24,
                                width:24,
                                borderRadius:30,
                                backgroundColor:COLORS.card,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Text style={{...FONTS.fontBold,fontSize:14,color:COLORS.primary,lineHeight:18}}>3</Text>
                        </View>
                        <View
                            style={{
                                height:5,
                                flex:1,
                                backgroundColor:COLORS.card,
                                borderRadius:5
                            }}
                        />
                        <View 
                            style={{
                                height:24,
                                width:24,
                                borderRadius:30,
                                backgroundColor:COLORS.card,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Text style={{...FONTS.fontBold,fontSize:14,color:COLORS.primary,lineHeight:18}}>4</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View
                        style={{
                            backgroundColor:'rgba(255,255,255,0.3)',
                            borderTopLeftRadius:15,
                            borderTopRightRadius:15,
                            paddingTop:10,
                            marginHorizontal:20,
                            flex:1
                        }}
                    >
                        <View
                            style={{
                                backgroundColor:'rgba(255,255,255,0.3)',
                                borderTopLeftRadius:15,
                                borderTopRightRadius:15,
                                paddingTop:10,
                                marginHorizontal:-10,
                                flex:1
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor:colors.card,
                                    padding:20,
                                    borderTopLeftRadius:15,
                                    borderTopRightRadius:15,
                                    marginHorizontal:-10,
                                    flex:1
                                }}
                            >
                                <View style={{padding:20,paddingTop:10}}>
                                    <Text style={{...FONTS.fontBold,fontSize:20,color:colors.title,textAlign:'center',paddingHorizontal:10}}>What position are you looking to obtain?</Text>
                                </View>
                                <ScrollView
                                    contentContainerStyle={{flexGrow:1}} 
                                    showsVerticalScrollIndicator={false}
                                >
                                    <View style={{flex:1}}>
                                        {LookingToObtainData.map((data,index) => {
                                            return(
                                                <TouchableOpacity
                                                    onPress={() => setjobposition(data)}
                                                    key={index}
                                                    style={[{
                                                        padding:15,
                                                        borderWidth:2,
                                                        borderRadius:6,
                                                        borderColor:colors.border,
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                        gap:10,
                                                        marginBottom:15
                                                    },jobposition?.title === data.title && {
                                                        borderColor:COLORS.primary,
                                                        borderRadius:6,
                                                    }]}
                                                >
                                                    <View 
                                                        style={[{
                                                            height:18,
                                                            width:18,
                                                            borderRadius:4,
                                                            borderWidth:2,
                                                            borderColor:colors.border,
                                                            alignItems:'center',
                                                            justifyContent:'center',
                                                        },jobposition?.title === data.title && {
                                                            borderColor:COLORS.primary,
                                                            backgroundColor:COLORS.primary,
                                                            borderRadius:4,
                                                        }]}
                                                    >
                                                        {jobposition?.title === data.title && 
                                                            <Feather color={COLORS.card} size={14} name='check'/>
                                                        }
                                                    </View>
                                                    <Text style={{...FONTS.fontMedium,fontSize:14,color:colors.title,lineHeight:18}}>{data.title}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{paddingHorizontal:15,paddingBottom:10}}>
                    <Button
                        title={'Next'}
                        onPress={handlejobposition}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default LookingToObtain