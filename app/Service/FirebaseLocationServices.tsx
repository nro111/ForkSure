import { ref, set } from "firebase/database";
import { database } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { LocationObject } from "expo-location";

async function SaveLocation(location: LocationObject) {

    // Save to Firebase
    const userId = getAuth().currentUser?.uid;
    const locationRef = ref(database, `userLocations/${userId}`);

    await set(locationRef, {
      location,
    });
};

export default {
    SaveLocation,
  };
