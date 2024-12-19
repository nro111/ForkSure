import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  TextInput,
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
import Animated, {
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

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

  const handleLogin = async () => {
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

            // if (type === Common.UserTypes.USER)
            //   navigation.replace("DrawerNavigation", { screen: "Dashboard" });
            // else
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
    <View style={styles.container}>
      <StatusBar /*style="light"*/ />
      <Image
        style={styles.backgroundImage}
        source={require("../../assets/images/background.png")}
      />

      {/* Lights */}
      <View style={styles.lightsContainer}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("../../assets/images/light.png")}
          style={styles.lightImageLarge}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require("../../assets/images/light.png")}
          style={styles.lightImageSmall}
        />
      </View>

      {/* Title and form */}
      <View style={styles.formContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            style={styles.titleText}
          >
            Sign in to Account
          </Animated.Text>
        </View>

        {/* Form */}
        <View style={styles.inputContainer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={styles.inputBox}
          >
            <TextInput placeholder="Email" value={email} placeholderTextColor={"gray"} />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={[styles.inputBox, styles.inputMargin]}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              value={pass}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            style={styles.buttonContainer}
          >
            <TouchableOpacity style={styles.loginButton}  onPress={() => handleLogin()}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={styles.signupContainer}
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push("Dashboard")}>
              <Text style={styles.signupText}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  backgroundImage: {
    height: "30%",
    width: "100%",
    position: "absolute",
  },
  lightsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
  },
  lightImageLarge: {
    height: 225,
    width: 90,
  },
  lightImageSmall: {
    height: 160,
    width: 65,
    opacity: 0.75,
  },
  formContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 120,
  },
  titleText: {
    color: "#38BDF8",
    fontWeight: "bold",
    letterSpacing: 1.5,
    fontSize: 20,
  },
  inputContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    gap: 16,
  },
  inputBox: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 5,
    borderRadius: 10,
    width: "90%",
  },
  inputMargin: {
    marginBottom: 12,
  },
  buttonContainer: {
    width: "100%",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#38BDF8",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#0284C7",
  },
});

export default SignIn;
