import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { FONTS } from '../../constants/theme';
import { useTheme } from "@react-navigation/native";

type OnboardingProps = StackScreenProps<RootStackParamList, "Onboarding">;

const Onboarding = ({ navigation }: OnboardingProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

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
          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("CreateProfileScreen")}
          >
            <Text style={styles.buttonText}>Lets get started!</Text>
          </TouchableOpacity>
          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
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

export default Onboarding;