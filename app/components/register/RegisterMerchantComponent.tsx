import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import CustomInput from "../Input/CustomInput";
import { FONTS } from "../../constants/theme";
import { Checkbox } from "react-native-paper";
import AddressValidationComponent from "../AddressValidation/AddressValidationComponent";

interface RegisterMerchantComponentProps {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onAddressChange: (address: string) => void;
}

const RegisterMerchantComponent: React.FC<RegisterMerchantComponentProps> = ({
    onEmailChange,
    onPasswordChange,
    onAddressChange
  }) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [address, setaddress] = useState("");

  const handleEmailChange = (value: string) => {
    setemail(value);
    onEmailChange(value);
  };

  const handlePasswordChange = (value: string) => {
    setpass(value);
    onPasswordChange(value);
  };

  const handleAddressChange = (value: string) => {
    setaddress(value);
    onAddressChange(value);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.textTitle}>
          {" "}
          Email Address
          <Text style={{ color: "#FF0000" }}>*</Text>
        </Text>
        <CustomInput
          type={"email"}
          onChangeText={handleEmailChange}
          value={email}
        />
      </View>
      <View>
        <Text style={styles.textTitle}>
          Password<Text style={{ color: "#FF0000" }}>*</Text>
        </Text>
        <CustomInput
          type={"password"}
          onChangeText={handlePasswordChange}
          value={pass}
        />
        {/* <View>
                    <Checkbox.Item
                        onPress={() => setisChecked(!isChecked)}
                        position="leading"
                        label="I agree to all Terms and Conditions"
                        color={colors.text}
                        uncheckedColor={colors.text}
                        status={isChecked ? "checked" : "unchecked"}
                        style={styles.checkboxStyle}
                        labelStyle={styles.checkboxLabelStyle}
                    />
                </View>                 */}
      </View>
      <View style={{ marginBottom: 15, marginTop: 15 }}>
        <Text style={styles.textTitle}> Business Address </Text>
        <CustomInput
          type={"address"}
          onChangeText={handleAddressChange}
          value={address}
        />
      </View>
      {/* <View>
                <AddressValidationComponent />
            </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    ...FONTS.fontMedium,
    fontSize: 15,
    marginBottom: 5,
  },
  checkboxStyle: {
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  checkboxLabelStyle: {
    ...FONTS.fontMedium,
    fontSize: 14,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default RegisterMerchantComponent;
