import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import BasicInfoComponent from "../../components/Registration/BasicInfo";
import GoalsComponent from "../../components/Registration/Goals";
import CredentialsComponent from "../../components/Registration/Credentials";
import FavoritesComponent from "../../components/Registration/Favorites";
import DislikesComponent from "../../components/Registration/Dislikes";
import RegistrationModel from "../../models/registration/registrationModel"
import FirebaseUser from "../../models/user/userModel";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Auth from "../../Service/Auth";
import Common from "../../constants/common";
import { COLORS } from "../../constants/theme";

type CreateProfileScreenProps = StackScreenProps<RootStackParamList, 'CreateProfileScreen'>;

const CreateProfileScreen = ({ navigation }: CreateProfileScreenProps) => {
    const [loading, setLoading] = useState(false);
    const [currentCreateProfileStep, setCurrentCreateProfileStep] = useState(0);
    const [profileRegistrationData, setProfileRegistrationData] = useState<RegistrationModel>({
        first_name: '',
        last_name: '',
        date_of_birth: new Date().toISOString(),
        preferred_ingredients: [],
        disliked_ingredients: [],
        preferred_cuisines: [],
        disliked_cuisines: [],
        dietary_preferences: [],
        allergies: [],
        goals: [],
        email: '',
        password: '',
        height: '',
        weight: '',
        gender: '',
    });

    const toggleCurrentStep = (currentStep) => {
        setCurrentCreateProfileStep(currentStep);
    }

    // Function to update form data
    const handleFormChange = (field: string, value: string) => {
        setProfileRegistrationData((prev) => ({ ...prev, [field]: value }));
    };

    const createProfile = async () => {
        try {
            setLoading(true);
            // Firebase email/password registration
            const userCredential = await createUserWithEmailAndPassword(auth, profileRegistrationData.email, profileRegistrationData.password);
            const user = userCredential.user;

            let userData: FirebaseUser = {
                address: "",
                createDateTime: new Date().toISOString(),
                email: profileRegistrationData.email,
                firstName: userCredential.user.displayName?.split(" ")[0] ?? "",
                firstTimeUser: true,
                gender: "",
                id: "",
                img: "",
                lastLoginDateTime: new Date().toISOString(),
                lastName: userCredential.user.displayName?.split(" ")[1] ?? "",
                lastUpdatedDateTime: "",
                password: profileRegistrationData.password,
                passwordHash: "",
                phone: "",
                pushTokenId: "",
                tokenId: "",
                username: profileRegistrationData.email,
                bodyDimensions: {
                    height: profileRegistrationData.height,
                    weight: profileRegistrationData.weight,
                    neckSize: "",
                    hipSize: "",
                    waistSize: "",
                    wristSize: "",
                    bicepSize: "",
                    chestSize: "",
                    thighSize: "",
                    calfSize: ""
                },
                subscriptionStart: "",
                subscriptionExpiration: "",
                dateOfBirth: profileRegistrationData.date_of_birth,
                preferences: undefined,
                mealPlans: undefined,
                progress: undefined,
                subscription: undefined
            }

            await Auth.registerUser(userData, Common.UserTypes.USER);

            // log user
            console.log("User registered:", user);

            // hide loading graphic
            setLoading(false);

            // navigate to dashboard page
            navigation.replace("DrawerNavigation", { screen: "Dashboard" });

        } catch (error: any) {
            setLoading(false);
            // error handling
            switch (error.code) {
                case "auth/email-already-in-use":
                    Alert.alert("Error", "This email is already in use.");
                    break;
                case "auth/invalid-email":
                    Alert.alert("Error", "Please enter a valid email address.");
                    break;
                case "auth/weak-password":
                    Alert.alert("Error", "Password should be at least 6 characters.");
                    break;
                default:
                    Alert.alert("Error", error.message);
            }
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,.3)",
                    }}
                >
                    <ActivityIndicator size={"large"} color={COLORS.white} />
                </View>
            ) : null}
            {currentCreateProfileStep === 0 &&
                <BasicInfoComponent
                    onChange={handleFormChange}
                    registrationModel={profileRegistrationData}
                    onStepChange={toggleCurrentStep}
                />
            }
            {currentCreateProfileStep === 1 &&
                <GoalsComponent
                    onChange={handleFormChange}
                    registrationModel={profileRegistrationData}
                    onStepChange={toggleCurrentStep} />
            }
            {currentCreateProfileStep === 2 &&
                <FavoritesComponent
                    onChange={handleFormChange}
                    registrationModel={profileRegistrationData}
                    onStepChange={toggleCurrentStep} />
            }
            {currentCreateProfileStep === 3 &&
                <DislikesComponent
                    onChange={handleFormChange}
                    registrationModel={profileRegistrationData}
                    onStepChange={toggleCurrentStep} />
            }
            {currentCreateProfileStep === 4 &&
                <CredentialsComponent
                    onChange={handleFormChange}
                    registrationModel={profileRegistrationData}
                    onStepChange={toggleCurrentStep} 
                    createProfile={createProfile}/>
            }
        </View>
    )
};
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