import React, { useState } from 'react'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
// import Button from '../../components/Button/Button';
// import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Feather from 'react-native-vector-icons/Feather';
import Auth from '../../Service/Auth';
// import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/reducer/user';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { View, ScrollView, StyleSheet, Alert, SafeAreaView, Image, TouchableOpacity, Platform, ActivityIndicator, ToastAndroid } from "react-native";
import { Text, TextInput, Switch, Button, Avatar } from "react-native-paper";


type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({ navigation } : EditProfileScreenProps) => {
  // User Profile State
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, City, Country",
    notifications: {
      push: true,
      email: false,
    },
  });

  // Handle field changes
  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  // Handle notification toggle
  const handleToggle = (type: "push" | "email") => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [type]: !profile.notifications[type],
      },
    });
  };

  // Handle Save Profile
  const handleSave = () => {
    Alert.alert("Profile Updated", "Your changes have been saved successfully.");
    // Add Firebase update function here if needed
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Avatar */}
      <Avatar.Icon size={100} icon="account" style={styles.avatar} />

      {/* First Name */}
      <TextInput
        label="First Name"
        value={profile.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
        style={styles.input}
      />

      {/* Last Name */}
      <TextInput
        label="Last Name"
        value={profile.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
        style={styles.input}
      />

      {/* Email */}
      <TextInput
        label="Email"
        value={profile.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {/* Phone */}
      <TextInput
        label="Phone"
        value={profile.phone}
        onChangeText={(text) => handleChange("phone", text)}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Address */}
      <TextInput
        label="Address"
        value={profile.address}
        onChangeText={(text) => handleChange("address", text)}
        style={styles.input}
      />

      {/* Notifications */}
      <View style={styles.switchContainer}>
        <Text>Push Notifications</Text>
        <Switch
          value={profile.notifications.push}
          onValueChange={() => handleToggle("push")}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>Email Notifications</Text>
        <Switch
          value={profile.notifications.email}
          onValueChange={() => handleToggle("email")}
        />
      </View>

      {/* Save Button */}
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Profile
      </Button>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#6200ea",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
});

export default EditProfile