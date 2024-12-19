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
  StyleSheet,
  Switch
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
import { Alert } from "react-native";
import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Auth from "../../Service/Auth";
import Common from "../../constants/common";
import FirebaseUser from "../../models/userModel";
import RegisterUserComponent from "../../components/register/RegisterUserComponent";
import RegisterMerchantComponent from "../../components/register/RegisterMerchantComponent";


type SignUpScreenProps = StackScreenProps<RootStackParamList, "UserSignUp">;

const UserSignUp = ({ navigation }: SignUpScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const [isChecked, setisChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const registerUser = async () => {
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

    try {
      // Firebase email/password registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      
      let userData: FirebaseUser = {
        address: "",
        createDateTime: new Date().toISOString(),
        email: email,
        firstName: userCredential.user.displayName?.split(" ")[0] ?? "",
        gender: "",
        id: "",
        img: "",
        lastLoginDateTime: new Date().toISOString(),
        lastName: userCredential.user.displayName?.split(" ")[1] ?? "",
        lastUpdatedDateTime: "",
        password: "Test123!",
        passwordHash: "",
        phone: "",
        pushTokenId: "",
        tokenId: "",
        username: "user1"
      }

      await Auth.registerUser(userData, Common.UserTypes.USER);

      // log user
      console.log("User registered:", user);

      // hide loading graphic
      setLoading(false);

      // navigate to dashboard page
      navigation.replace("DrawerNavigation", { screen: "Dashboard" });
      
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

  // const registerMerchant = async () => {
  //   if (email == "" || pass == "" || address == "") {
  //     setLoading(false);
  //     {
  //       Platform.OS === "android"
  //         ? ToastAndroid.show("Fill in all the fields!", ToastAndroid.LONG)
  //         : Alert.alert("Fill in all the fields!");
  //     }
  //     return false;
  //   }
  //   setLoading(true);    

  //   try {
  //     // Firebase email/password registration
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  //     const user = userCredential.user;
      
  //     let userData: FirebaseUser = {
  //       email: email,
  //       address: address,
  //       firstName: userCredential.user.displayName?.split(" ")[0] ?? "",
  //       lastName: userCredential.user.displayName?.split(" ")[1] ?? "",
  //       gender: "",
  //       pushTokenId: "",
  //       createDateTime: new Date().toISOString(),
  //       lastLoginDateTime: new Date().toISOString(),
  //       id: "",
  //       img: "",
  //       lastUpdatedDateTime: "",
  //       password: "",
  //       passwordHash: "",
  //       phone: "",
  //       tokenId: "",
  //       username: ""
  //     }

  //     await Auth.registerUser(userData, Common.UserTypes.USER);

  //     // log user
  //     console.log("Merchant registered:", user);

  //     // hide loading graphic
  //     setLoading(false);

  //     // navigate to dashboard page
  //     navigation.replace("DrawerNavigation", { screen: "Dashboard" });
      
  //   } catch (error: any) {
  //     // error handling
  //     switch (error.code) {
  //       case "auth/email-already-in-use":
  //         Alert.alert("Error", "This email is already in use.");
  //         break;
  //       case "auth/invalid-email":
  //         Alert.alert("Error", "Please enter a valid email address.");
  //         break;
  //       case "auth/weak-password":
  //         Alert.alert("Error", "Password should be at least 6 characters.");
  //         break;
  //       default:
  //         Alert.alert("Error", error.message);
  //     }
  //   }
  // };

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

              <View style={{ marginBottom: -20 }}>
                <Text
                  style={{
                    ...FONTS.fontBold,
                    fontSize: 20,
                    color: colors.title,
                    marginBottom: 5,
                    textAlign: "center",
                  }}
                >
                  Create user account
                </Text>
              </View>
            </View>
            <RegisterUserComponent 
              onEmailChange={setemail}
              onPasswordChange={setpass}
              onCheckChange={setisChecked}/>

            {/* {!isMerchant ? (
              <RegisterUserComponent 
              onEmailChange={setemail}
              onPasswordChange={setpass}
              onAddressChange={setaddress}/>
            ) : (
              <RegisterMerchantComponent 
                onEmailChange={setemail}
                onPasswordChange={setpass}
                onAddressChange={setaddress}
              />
            )} */}
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
                alignItems: "center",
                //marginTop: 10,
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
                Already have an account?{" "}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default UserSignUp;
