import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform, ToastAndroid } from 'react-native';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Auth from '../../Service/Auth';
import Common from '../../constants/common';
import FirebaseUser from '../../models/user/userModel';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import RegisterUserComponent from '../../components/register/RegisterUserComponent';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { useTheme } from "@react-navigation/native";

type LoginSignupProps = StackScreenProps<RootStackParamList, "LoginSignup">;

const LoginSignup = ({ navigation }: LoginSignupProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const onGoogleSignup = () => { };
  const onFacebookSignup = () => { };
  const onAppleSignup = () => { };
  const onLogin = () => { navigation.navigate("SignIn") };

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
        firstTimeUser: true,
        gender: "",
        id: "",
        img: "",
        lastLoginDateTime: new Date().toISOString(),
        lastName: userCredential.user.displayName?.split(" ")[1] ?? "",
        lastUpdatedDateTime: "",
        password: pass,
        passwordHash: "",
        phone: "",
        pushTokenId: "",
        tokenId: "",
        username: email,
        bodyDimensions: {
          height: "",
          weight: "",
          neckSize: "",
          hipSize: "",
          waistSize: "",
          wristSize: "",
          bicepSize: "",
          chestSize: "",
          thighSize: "",
          calfSize: ""
        },
        subscriptionStart: "",
        subscriptionExpiration: "",
        dateOfBirth: ""
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

  return (
    <View style={styles.container}>
      {/* Header Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z57bNw58MnUDluPm/img.png' }}
          style={styles.headerImage}
        />
        <LinearGradient
          colors={['rgb(71, 235, 134)', 'rgba(255,255,255,0)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0.08 }}
          style={styles.gradient}
        />
      </View>

      <View style={styles.emailContainer}>
        <View style={{ marginBottom: -20 }}>
          <Text
            style={{
              ...FONTS.fontBold,
              fontSize: 20,
              color: colors.title,
              marginBottom: 40,
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
        onCheckChange={setisChecked} />

      {/* Sign up Button */}
      <TouchableOpacity
        style={styles.emailButton}
        onPress={registerUser}
      >
        <Text style={styles.emailButtonText}>Sign up with email</Text>
      </TouchableOpacity>

      {/* Social Sign up Section */}
      <View style={styles.socialSection}>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or use social sign up</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Buttons */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGoogleSignup}
        >
          <Image
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z57bNw58MnUDluPm/google-l.png' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={onFacebookSignup}
        >
          <Image
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z57bNw58MnUDluPm/facebook.png' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={onAppleSignup}
        >
          <Image
            source={{ uri: 'https://dashboard.codeparrot.ai/api/image/Z57bNw58MnUDluPm/apple-lo.png' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Login Link */}
      <TouchableOpacity onPress={onLogin}>
        <Text style={styles.loginText}>Already have account? Log In</Text>
      </TouchableOpacity>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
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
  imageContainer: {
    width: '100%',
    height: 450,
    position: 'absolute',
  },
  emailContainer: {
    alignItems: 'center',
    marginTop: '70%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  emailButton: {
    width: 180,
    height: 33,
    backgroundColor: '#060606',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  emailButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: '700',
    letterSpacing: 0.29,
  },
  socialSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 15,
  },
  divider: {
    flex: 1,
    height: 0.58,
    backgroundColor: '#d6d6d6',
  },
  dividerText: {
    color: '#e2e2e2',
    fontSize: 9,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    marginHorizontal: 10,
  },
  socialButton: {
    width: 180,
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialIcon: {
    width: 12,
    height: 12,
    marginLeft: 21,
  },
  socialButtonText: {
    color: '#000000',
    fontSize: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: '700',
    letterSpacing: 0.29,
    marginLeft: 8,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
    marginTop: 20,
  },
  homeIndicator: {
    width: 69,
    height: 2.6,
    backgroundColor: '#000000',
    borderRadius: 51,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LoginSignup;

