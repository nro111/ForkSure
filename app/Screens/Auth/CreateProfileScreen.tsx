import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type CreateProfileScreenProps = StackScreenProps<RootStackParamList, 'CreateProfileScreen'>;

const CreateProfileScreen = ({ navigation } : CreateProfileScreenProps) => {
    return (
        <View>
            
        </View>
    )
}

export default CreateProfileScreen;