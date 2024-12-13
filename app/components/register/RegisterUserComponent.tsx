import React, { useState }  from "react";
import { View, Text, } from "react-native";
import { useTheme } from "@react-navigation/native";
import CustomInput from "../Input/CustomInput";
import { FONTS } from "../../constants/theme";
import { Checkbox } from "react-native-paper";



const RegisterUserComponent = () => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [isChecked, setisChecked] = useState(false);

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
                    // onChangeText={(value: any) => console.log(value)}
                    onChangeText={(value: any) => setemail(value)}
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
                    onChangeText={(value: any) => setpass(value)}
                    value={pass}
                />
                <View>
                    <Checkbox.Item
                    onPress={() => setisChecked(!isChecked)}
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