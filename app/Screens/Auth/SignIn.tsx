import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { FONTS, COLORS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import CustomInput from "../../components/Input/CustomInput";
import Button from "../../components/Button/Button";
import SocialBtn from "../../components/Socials/SocialBtn";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { IMAGES } from "../../constants/Images";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { Platform } from "react-native";
import { Alert } from "react-native";
import { auth } from "../../../firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword, } from "firebase/auth";
import Common from "../../constants/common";
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenProps = StackScreenProps<RootStackParamList, "SignIn">;

const SignIn = ({ navigation }: SignInScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    //expoClientId: Constants.manifest.extra.expoClientId,
    androidClientId: "9595583403-oru3geo7ejdaqtirkjv0c4vgnhhtmfl2.apps.googleusercontent.com",
    // iosClientId: Constants.manifest.extra.iosClientId,
    webClientId: "9595583403-sj11puth55of3q0gh821sk1qkod90huh.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
     
      // Firebase sign-in with credential
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
        })
        .catch((error) => {
          console.error("Sign-in error:", error);
        });
    }

    const loadCredentials = async () => {
      const email = await AsyncStorage.getItem('email');
      const pass = await AsyncStorage.getItem('pass')

      setemail(email ?? "")
      setpass(pass ?? "")
    }

    loadCredentials();

  }, [response]);

  const handleLogin = async (type: string) => {
    try {
      if (await email.trim() == "" || await pass.trim() == "") {
          Platform.OS === "android"
            ? ToastAndroid.show("Fill in all the fields!", ToastAndroid.LONG)
            : Alert.alert("Fill in all the fields!");
        return false;
      }
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, pass)
        .then(async (userCredential) => {
          // save user creds on successful login
          await AsyncStorage.setItem('email', email.trim())
          await AsyncStorage.setItem('pass', pass.trim())

          if (userCredential) {
            // console.log("login successful:", userCredential);

            // update push notification token
            //...

            if (type === Common.UserTypes.USER)
              navigation.replace("DrawerNavigation", { screen: "Dashboard" });
            else
              navigation.replace("DrawerNavigation", { screen: "Dashboard" });
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Login Error", error.message);
        });
    } catch (e) {
      console.log(e);
    } finally {
      // hide loading screen
      setLoading(false)
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView>
        <View>
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
                  <View>
                    <Text
                      style={{
                        ...FONTS.fontBold,
                        fontSize: 20,
                        color: colors.title,
                        marginBottom: 5,
                        textAlign: "center",
                      }}
                    >
                      Sign in to your User account
                    </Text>
                    <Text
                      style={{
                        ...FONTS.fontMedium,
                        fontSize: 14,
                        color: colors.text,
                        textAlign: "center",
                      }}
                    >
                      Welcome Back You've Been Missed!
                    </Text>
                  </View>
                </View>
                <View style={{ marginBottom: 15, marginTop: 30 }}>
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
                    onChangeText={(value: any) => setemail(value)}
                    value={email}
                  />
                </View>
                <View style={{ marginBottom: 50 }}>
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
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: -25,
                      right: 0,
                    }}
                    onPress={() => navigation.navigate("ForgatPassword")}
                  >
                    <Text
                      style={{
                        ...FONTS.fontMedium,
                        fontSize: 14,
                        color: COLORS.primary,
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Button
                  title={"Sign in"}
                  onPress={() => handleLogin(Common.UserTypes.USER)}
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
                    onPress={() => promptAsync()}
                    icon={
                      <Image
                        style={{ height: 20, width: 20, resizeMode: "contain"}}
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
                      <FontAwesome
                        name="facebook"
                        size={20}
                        color={colors.title}
                      />
                    }
                    color={colors.card}
                    text={"Sign in with facebook"}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
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
                    Not a member?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("UserSignUp")}
                  >
                    <Text
                      style={{
                        ...FONTS.fontMedium,
                        fontSize: 14,
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      Create an account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
