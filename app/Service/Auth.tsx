import AsyncStorage from '@react-native-async-storage/async-storage';
import { database, auth } from '../../firebaseConfig';
import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { Platform, ToastAndroid,Alert } from 'react-native';
import User from '../models/userModel';

async function getAccount() {
  return await AsyncStorage.getItem('account');
}

async function setAccount(data: any) {
  return await AsyncStorage.setItem('account', JSON.stringify(data));
}

async function logout() {
  return await AsyncStorage.removeItem('account');
}

async function userLogin(email:string, password:string){
  try {

    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Create a query for users with the specified email
    const usersRef = ref(database, "users");
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));

    // Fetch data once
    const snapshot = await get(emailQuery);
    if (snapshot.exists()) {
      // Check if any retrieved user's password matches
      let userFound = null;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.password === password) {
          userFound = userData;
        }
      });

      if (userFound) {
        {Platform.OS === 'android' ? 
          ToastAndroid.show('Login Successfully!' , ToastAndroid.LONG)  
        :
          Alert.alert('Login Successfully!')
        }
        return userFound; // Successfully authenticated user
      } else {
        {Platform.OS === 'android' ?
            ToastAndroid.show('Invalid password!' , ToastAndroid.LONG)
          :
            Alert.alert('Invalid password!')
        }
        return null;
      }
    } else {
      {Platform.OS === 'android' ?
        ToastAndroid.show('Invalid email!' , ToastAndroid.LONG)
        :
          Alert.alert('Invalid email!')
      }
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

async function registerUser(user: any, accountType: string){
  try {
    // Step 1: Check if the user already exists
    const usersRef = ref(database, accountType);
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(user.email));

    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      {Platform.OS === 'android' ?
          ToastAndroid.show('User already exists with this email.', ToastAndroid.LONG)
        :
          Alert.alert('User already exists with this email.')
      }
      return { success: false, message: "User already exists." };
    } else {
      // Generate a unique ID for the new user
      const newUserRef = push(usersRef); 

      // Save user data to Firebase
      await set(newUserRef, user); 

      return true;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Error during registration", error };
  }
};

async function updateUser(email:string, updates:any) {
  try {
    // Find the user by email
    const usersRef = ref(database, "users");
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));
    
    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      // Loop through matching records (assuming one user per email)
      let userKey = null;
      snapshot.forEach((childSnapshot) => {
        userKey = childSnapshot.key; // Get the user's unique key
      });

      if (userKey) {
        const userRef = ref(database, `users/${userKey}`);
        
        // Update the fields specified in the 'updates' object
        await update(userRef, updates);
        
        console.log("User data updated successfully:", updates);
        return await fetchUser(userKey, "user");

      } else {
        console.log("User not found.");
        return { success: false, message: "User not found" };
      }
    } else {
      console.log("No user found with this email.");
      return { success: false, message: "No user found with this email" };
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return { success: false, message: "Error updating user data", error };
  }
};

async function fetchUser(email:string, type:string) {
  try {
    // Find the user by email
    const usersRef = ref(database, type);
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));
    
    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      let userData = null;
      snapshot.forEach((childSnapshot) => {
        userData = childSnapshot.val();        
      });
      return userData;
    } else {
      console.log("User data not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching updated user data:", error);
    return null;
  }
};

async function updateUserDetails(pushToken: string) {
  const uid = auth.currentUser?.uid

  // Step 1: Check if the user already exists
  const userRef = ref(database, `users/${uid}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    await update(userRef, { pushToken });
  } else {
    console.log("User not found.");
  }
}

export default {
  logout,
  getAccount,
  setAccount,
  userLogin,
  registerUser,
  updateUser,
  fetchUser,
  updateUserDetails
};