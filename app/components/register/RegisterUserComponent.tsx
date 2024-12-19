import React, { useState } from "react";
import { View, Text, } from "react-native";
import { useTheme } from "@react-navigation/native";
import CustomInput from "../Input/CustomInput";
import { FONTS } from "../../constants/theme";
import { Checkbox } from "react-native-paper";

interface RegisterUserComponentProps {
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onCheckChange: (isChecked: boolean) => void;
}

const RegisterUserComponent: React.FC<RegisterUserComponentProps> = ({
    onEmailChange,
    onPasswordChange,
    onCheckChange
}) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [isChecked, setisChecked] = useState(false);

    const handleEmailChange = (value: string) => {
        setemail(value);
        onEmailChange(value);
    };

    const handlePasswordChange = (value: string) => {
        setpass(value);
        onPasswordChange(value);
    };

    const handleCheckedChange = (value: boolean) => {
        setisChecked(value);
        onCheckChange(value);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 15 }}>
                <Text
                    style={{
                        ...FONTS.fontMedium,
                        fontSize: 15,
                        color: colors.title,
                        marginBottom: 5,
                    }}
                >
                    Email Address<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    type={"email"}
                    onChangeText={handleEmailChange}
                    value={email}
                />
            </View>
            <View>
                <Text
                    style={{
                        ...FONTS.fontMedium,
                        fontSize: 15,
                        color: colors.title,
                        marginBottom: 5,
                    }}
                >
                    Password<Text style={{ color: "#FF0000" }}>*</Text>
                </Text>
                <CustomInput
                    type={"password"}
                    onChangeText={handlePasswordChange}
                    value={pass}
                />
                <View>
                    <Checkbox.Item
                        onPress={() => handleCheckedChange}
                        position="leading"
                        label="I agree to all Terms and Conditions"
                        color={colors.text}
                        uncheckedColor={colors.text}
                        status={isChecked ? "checked" : "unchecked"}
                        style={{
                            paddingHorizontal: 0,
                            paddingVertical: 5,
                        }}
                        labelStyle={{
                            ...FONTS.fontMedium,
                            fontSize: 14,
                            color: colors.text,
                            textAlign: "left",
                        }}
                    />
                </View>
            </View>
        </View>
    )
}


export default RegisterUserComponent;