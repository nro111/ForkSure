import React, { useState } from 'react';
import { Pressable } from 'react-native';
import {FontAwesome } from "@expo/vector-icons";
import { COLORS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

type Props = {
    heartwhite ?: any;
    onPress ?: any;
    inSaveJob: any;
    id ?: any;
}

const LikeBtn = ({heartwhite,onPress,inSaveJob,id} : Props) => {

    // const [isLike, setIsLike] = useState(false);

    const theme = useTheme();

    return (
        <Pressable
            accessible={true}
            accessibilityLabel="Like Btn"
            accessibilityHint="Like this item"
            onPress={() =>  onPress ? onPress() : ""}
            style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
           {inSaveJob().includes(id) ?
                 <FontAwesome size={20} color={COLORS.danger} name="heart" />
                 :
                 <FontAwesome size={20} color={'rgba(0,0,0,0.30)'} name="heart" />
            }
        </Pressable>
    );
};


export default LikeBtn;