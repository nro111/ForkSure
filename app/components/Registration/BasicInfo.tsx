import React, { useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import RegistrationModel from "../../models/registration/registrationModel";
import CustomInput from "../Input/CustomInput";

interface BasicInfoProps {
    onChange: (field: string, value: string) => void;
    registrationModel: RegistrationModel;
}

const BasicInfoComponent = ({
    onChange,
    registrationModel }: BasicInfoProps
) => {
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
                    First Name<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("first_name", text)}
                    value={registrationModel.first_name}
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
                    Last Name<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("last_name", text)}
                    value={registrationModel.last_name}
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
                    Date of Birth<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("date_of_birth", text)}
                    value={registrationModel.date_of_birth}
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
                    Gender<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("gender", text)}
                    value={registrationModel.gender}
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
                    Height<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("height", text)}
                    value={registrationModel.height}
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
                    Weight<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    onChangeText={(text) => onChange("weight", text)}
                    value={registrationModel.weight}
                />
            </View>
        </View>
    );
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

export default BasicInfoComponent;