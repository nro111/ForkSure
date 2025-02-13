import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import BasicInfoComponent from "../../components/Registration/BasicInfo";
import GoalsComponent from "../../components/Registration/Goals";
import CredentialsComponent from "../../components/Registration/Credentials";
import FavoritesComponent from "../../components/Registration/Favorites";
import DislikesComponent from "../../components/Registration/Dislikes";

type CreateProfileScreenProps = StackScreenProps<RootStackParamList, 'CreateProfileScreen'>;

const CreateProfileScreen = ({ navigation }: CreateProfileScreenProps) => {
    const [currentCreateProfileStep, setCurrentCreateProfileStep] = useState(0);

    const toggleCurrentStep = (currentStep) => {
        setCurrentCreateProfileStep(currentStep);
    }

    const createProfile = () => {
        
    }

    return (
        <View style={styles.container}>
            {currentCreateProfileStep === 0 && <BasicInfoComponent />}
            {currentCreateProfileStep === 1 && <GoalsComponent />}
            {currentCreateProfileStep === 2 && <FavoritesComponent />}
            {currentCreateProfileStep === 3 && <DislikesComponent />}
            {currentCreateProfileStep === 4 && <CredentialsComponent />}
            {currentCreateProfileStep < 4 &&
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => toggleCurrentStep(currentCreateProfileStep + 1)}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            }
            {currentCreateProfileStep === 4 &&
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => createProfile()}
                >
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
            }
            {currentCreateProfileStep > 0 &&
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => toggleCurrentStep(currentCreateProfileStep - 1)}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            }
        </View>
    )
}
    ;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(71, 235, 134)',
        alignItems: 'center',
    },
    nextButton: {
        width: 75.14,
        height: 26.8,
        backgroundColor: '#8a47eb',
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 10.05,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        letterSpacing: 0.24,
        lineHeight: 10.05 * 1.245,
    },
});

export default CreateProfileScreen;