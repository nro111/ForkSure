import { useEffect, useState } from "react";
import * as Location from "expo-location";
import FirebaseLocationServices from '../../Service/FirebaseLocationServices'

const LocationTracker = () => {
  const [setErrorMsg] = useState<string | null>(null);

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log('Location Services Required')
      return false;
    }
    return true;
  };

  const startTracking = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    // save location to firebase
    FirebaseLocationServices.SaveLocation(location);
  };

  useEffect(() => {
    startTracking();
  }, []);

  return null;
};

export default LocationTracker;
