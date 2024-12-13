import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import {FontAwesome } from "@expo/vector-icons";
import { COLORS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import {Feather } from "@expo/vector-icons";
import { IMAGES } from '../constants/Images';

type Props = {
    heartwhite ?: any;
    onPress ?: any;
    inSaveJob: any;
    id ?: any;
}

const Savebtn = ({heartwhite,onPress,inSaveJob,id} : Props) => {

    // const [isLike, setIsLike] = useState(false);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <Pressable
            accessible={true}
            accessibilityLabel="Like Btn"
            accessibilityHint="Like this item"
            onPress={() =>  onPress ? onPress() : ""}
            style={{
                height: 20,
                width: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
           {inSaveJob().includes(id) ?
                    <Image
                        style={{height:18,width:18,resizeMode:'contain'}}
                        source={IMAGES.SaveVector}
                    />
                 :
                    <Feather color={colors.text} size={18} name='bookmark'/>
            }
        </Pressable>
    );
};


export default Savebtn;