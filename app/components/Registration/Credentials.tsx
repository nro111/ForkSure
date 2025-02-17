import React, { useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import RegistrationModel from "../../models/registration/registrationModel";
import CustomInput from "../Input/CustomInput";

interface CredentialsProps {
    onChange: (field: string, value: string) => void;
    registrationModel: RegistrationModel;
    onStepChange: any;
    createProfile: any;
}

const CredentialsComponent = ({
    onChange,
    registrationModel,
    onStepChange,
    createProfile,
}: CredentialsProps) => {
    const [loading, setLoading] = useState(false);

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

            <View>
                <Text
                    style={{
                        ...FONTS.fontMedium,
                        fontSize: 15,
                        marginBottom: 5,
                    }}
                >
                    Email<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("email", text)}
                    value={registrationModel.email}
                />
            </View>

            <View>
                <Text
                    style={{
                        ...FONTS.fontMedium,
                        fontSize: 15,
                        marginBottom: 5,
                    }}
                >
                    Password<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("password", text)}
                    value={registrationModel.password}
                />
            </View>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => onStepChange(3)}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => createProfile(registrationModel)}
            >
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>

        </View>
    );
}

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

export default CredentialsComponent;