import { View, Text, Image } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromsavejob } from '../../redux/reducer/savejobReducer';
import Savebtn from '../Savebtn';

type Props = {
    id : string,
    title : string;
    selery : string;
    image ?: any;
    compnay ?: string;
    review ?: string;
    jobtime ?: string;
    jobtype ?: string;
    jobpost ?: string;
    Sent ?: string;
    Rejected ?: string;
    Pending ?: string;
    Accepted ?: string;
    location ?: string;
    witdhfull ?: any;
    jobsforyou ?: any;
    days ?:any;
    onPress ?:any,
    onPress1 ?: (e : any) => void,
    onPress2 ?: (e : any) => void,
}


const JobCardStyle = ({id, title, selery, image, compnay, review, jobtime, jobpost, jobtype, location, days, onPress1, onPress2, onPress,witdhfull,jobsforyou,Sent,Pending,Rejected,Accepted} : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();

    const savejob = useSelector((state:any) => state.savejob.savejob);

    const inSaveJob = () => {
        var temp = [] as any;
        savejob.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromsavejob = () => {
        dispatch(removeFromsavejob(id as any));
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress && onPress()}
        >
            <View
                style={{
                    borderWidth:1,
                    borderColor:colors.border,
                    backgroundColor:colors.card,
                    width:witdhfull ? '100%' :350,
                    padding:20,
                    borderRadius:6
                }}
            >
                {jobsforyou ?
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'flex-start',
                            justifyContent:'space-between',
                            marginBottom:10
                        }}
                    >
                        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                            <View
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:6,
                                    borderWidth:1,
                                    borderColor:colors.border,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}
                            >
                                <Image
                                    style={{
                                        height:26,
                                        width:26,
                                        resizeMode:'contain'
                                    }}
                                    source={image}
                                />
                            </View>
                            <View>
                                <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title}}>{title}</Text>
                                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                    <TouchableOpacity
                                        onPress={onPress1}
                                        activeOpacity={0.5}
                                    >
                                        <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary}}>{compnay}</Text>
                                    </TouchableOpacity>
                                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                        <FontAwesome color={'#FBAD48'} size={14} name='star'/>
                                        <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text}}>{review} Review</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Savebtn
                            onPress={inSaveJob().includes(id) ? removeItemFromsavejob : onPress2}
                            id={id}
                            inSaveJob={inSaveJob}
                        />
                    </View> 
                :
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                        }}
                    >
                        <View>
                            <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title}}>{title}</Text>
                            <TouchableOpacity
                                onPress={onPress1}
                                activeOpacity={0.5}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary}}>{compnay}</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height:40,
                                width:40,
                                borderRadius:6,
                                borderWidth:1,
                                borderColor:colors.border,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Image
                                style={{
                                    height:26,
                                    width:26,
                                    resizeMode:'contain'
                                }}
                                source={image}
                            />
                        </View>
                    </View>
                }
                {jobsforyou ? 
                    null
                :
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingVertical:10
                        }}
                    >
                        <Text style={{...FONTS.fontSemiBold,fontSize:13,color:colors.text}}><Text style={{...FONTS.fontBold,color:COLORS.primary,fontSize:15}}>$ </Text>{selery}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                            <FontAwesome color={'#FBAD48'} size={14} name='star'/>
                            <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text}}>{review}</Text>
                        </View>
                    </View>
                }
                <View 
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        gap:10,
                        paddingVertical:10,
                        paddingBottom:15,
                        borderBottomWidth:1,
                        borderBlockColor:colors.border
                    }}
                >
                    {jobtime ?
                        <View
                            style={{
                                backgroundColor:colors.background,
                                padding:5,
                                paddingHorizontal:10,
                                borderRadius:4,
                            }}
                        >
                            <Text style={{...FONTS.fontSemiBold,fontSize:12,color:colors.title,lineHeight:16}}>{jobtime}</Text>
                        </View>
                        :
                        null
                    }
                    {jobtype ?
                        <View
                            style={{
                                backgroundColor:colors.background,
                                padding:5,
                                paddingHorizontal:10,
                                borderRadius:4,
                            }}
                        >
                            <Text style={{...FONTS.fontSemiBold,fontSize:12,color:colors.title,lineHeight:16}}>{jobtype}</Text>
                        </View>
                        :
                        null
                    }
                    {jobpost ? 
                        <View
                            style={{
                                backgroundColor:colors.background,
                                padding:5,
                                paddingHorizontal:10,
                                borderRadius:4,
                            }}
                        >
                            <Text style={{...FONTS.fontSemiBold,fontSize:12,color:colors.title,lineHeight:16}}>{jobpost}</Text>
                        </View>
                    :
                        null
                    }
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingTop:10
                    }}
                >
                    <View
                        style={{flexDirection:'row',alignItems:'center',gap:5}}
                    >
                        <Image
                            style={{height:14,width:14,resizeMode:'contain',tintColor:colors.text}}
                            source={IMAGES.map}
                        />
                        <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>{location}</Text>
                    </View>
                    <View
                        style={{flexDirection:'row',alignItems:'center',gap:5}}
                    >
                        <Text style={{...FONTS.fontMedium,fontSize:12,color:colors.text,lineHeight:16}}>{days}</Text>
                        {Sent ?
                            <View
                                style={{
                                    backgroundColor:COLORS.primaryLight,
                                    paddingHorizontal:5,
                                    padding:2,
                                    borderRadius:3
                                }}
                            >
                                 <Text style={{...FONTS.fontMedium,fontSize:12,color:COLORS.primary,lineHeight:16}}>{Sent}</Text>
                            </View>
                        : null}
                        {Rejected ?
                            <View
                            style={{
                                backgroundColor:'rgba(243,107,83,0.10)',
                                paddingHorizontal:5,
                                padding:2,
                                borderRadius:3
                            }}
                            >
                                 <Text style={{...FONTS.fontMedium,fontSize:12,color:'#F36B53',lineHeight:16}}>{Rejected}</Text>
                            </View>
                        : null}
                        {Pending ?
                            <View
                                style={{
                                    backgroundColor:'rgba(251,173,72,0.10)',
                                    paddingHorizontal:5,
                                    padding:2,
                                    borderRadius:3
                                }}
                            >
                                 <Text style={{...FONTS.fontMedium,fontSize:12,color:'#FBAD48',lineHeight:16}}>{Pending}</Text>
                            </View>
                        : null}
                        {Accepted ?
                            <View
                                style={{
                                    backgroundColor:'rgba(80,194,156,0.10)',
                                    paddingHorizontal:5,
                                    padding:2,
                                    borderRadius:3
                                }}
                            >
                                 <Text style={{...FONTS.fontMedium,fontSize:12,color:'#3CC29C',lineHeight:16}}>{Accepted}</Text>
                            </View>
                        : null}
                        {jobsforyou ? null :
                            <Savebtn
                                onPress={inSaveJob().includes(id) ? removeItemFromsavejob : onPress2}
                                id={id}
                                inSaveJob={inSaveJob}
                            />
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default JobCardStyle