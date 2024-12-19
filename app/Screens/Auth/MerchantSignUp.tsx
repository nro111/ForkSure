import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { FONTS, COLORS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import CustomInput from "../../components/Input/CustomInput";
import Button from "../../components/Button/Button";
import { Feather } from "@expo/vector-icons";
import SocialBtn from "../../components/Socials/SocialBtn";
import { FontAwesome } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { IMAGES } from "../../constants/Images";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import uuid from "react-native-uuid";
import { Alert } from "react-native";
import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Auth from "../../Service/Auth";
import Common from "../../constants/common";

type SignUpScreenProps = StackScreenProps<RootStackParamList, "MerchantSignUp">;

const MerchantSignUp = ({ navigation }: SignUpScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [isChecked, setisChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const registerUser = async () => {
    let token = Platform.OS === "android" ? "" : "";

    if (email == "" || pass == "") {
      setLoading(false);
      {
        Platform.OS === "android"
          ? ToastAndroid.show("Fill in all the fields!", ToastAndroid.LONG)
          : Alert.alert("Fill in all the fields!");
      }
      return false;
    }
    setLoading(true);
    let merchantData: Merchant = {
      id: uuid.v4(),
      address: "",
      businessType: "",
      createDateTime: "",
      customers: [],
      emailId: email,
      img: "",
      lastLoginDateTime: "",
      lastUpdatedDateTime: "",
      name: "",
      ownerFirstName: "",
      ownerLastName: "",
      password: pass,
      passwordHash: "",
      phone: "",
      promotions: [],
      subscriptionType: "",
      tokenId: "",
      username: ""
    };

    try {
      // Firebase email/password registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      await Auth.registerUser(merchantData, Common.UserTypes.MERCHANT);
      // log user
      console.log("Merchant registered:", user);

      // hide loading graphic
      setLoading(false);

      // navigate to home page
      navigation.navigate("Home");
    } catch (error: any) {
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
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
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
        <View
          style={[
            GlobalStyleSheet.container,
            { paddingHorizontal: 30, paddingTop: 30, flex: 1 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -10,
                left: -10,
              }}
              onPress={() => navigation.goBack()}
            >
              <View style={GlobalStyleSheet.background}>
                <Feather color={COLORS.primary} size={22} name="arrow-left" />
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 30,
                  backgroundColor: COLORS.primaryLight,
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                }}
              >
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain",
                  }}
                  source={IMAGES.authuser}
                />
              </View>
              <View style={{ marginBottom: 35 }}>
                <Text
                  style={{
                    ...FONTS.fontBold,
                    fontSize: 20,
                    color: colors.title,
                    marginBottom: 5,
                    textAlign: "center",
                  }}
                >
                  Create your Merchant account
                </Text>
                <Text
                  style={{
                    ...FONTS.fontMedium,
                    fontSize: 14,
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  Welcome back! Please enter your details
                </Text>
              </View>
            </View>
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
                //onChangeText={(value: any) => console.log(value)}
                onChangeText={(value: any) => setpass(value)}
                value={pass}
              />
              <View>
                <Checkbox.Item
                  onPress={() => setisChecked(!isChecked)}
                  position="leading"
                  label="I agree to all Term, Privacy and Fees"
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
          <View>
            <Button
              title={"Sign Up"}
              onPress={registerUser}
              color={theme.dark ? COLORS.white : COLORS.primary}
              text={colors.card}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 37,
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: colors.border,
                }}
              />
              <Text
                style={{
                  ...FONTS.fontMedium,
                  color: colors.text,
                  marginHorizontal: 15,
                  fontSize: 13,
                }}
              >
                Or continue with
              </Text>
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: colors.border,
                }}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <SocialBtn
                icon={
                  <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={IMAGES.google2}
                  />
                }
                color={colors.card}
                text={"Sign in with google"}
              />
            </View>
            <View>
              <SocialBtn
                icon={
                  <FontAwesome name="facebook" size={20} color={colors.title} />
                }
                color={colors.card}
                text={"Sign in with facebook"}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                Already have and account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text
                  style={{
                    ...FONTS.fontMedium,
                    fontSize: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MerchantSignUp;
