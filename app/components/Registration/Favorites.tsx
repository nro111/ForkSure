import React, { useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import RegistrationModel from "../../models/registration/registrationModel";
import CustomInput from "../Input/CustomInput";

interface FavoritesProps {
    onChange: (field: string, value: string) => void;
    registrationModel: RegistrationModel;
}

const FavoritesComponent = ({
    onChange,
    registrationModel
}: FavoritesProps) => {
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
                    dietary_preferences<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("dietary_preferences", text)}
                    value={registrationModel.dietary_preferences}
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
                    preferred_cuisines<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("preferred_cuisines", text)}
                    value={registrationModel.preferred_cuisines}
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
                    preferred_ingredients<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("preferred_ingredients", text)}
                    value={registrationModel.preferred_ingredients}
                />
            </View>
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

export default FavoritesComponent;