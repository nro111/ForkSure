import React, { useState } from "react";
import 'react-native-get-random-values';
import { View, Text, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressValidationComponent = () => {
    const [address, setAddress] = useState("");
    const [validated, setValidated] = useState(false);

  return (
    <View style={styles.container}>
      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        placeholder="Enter Business Address"
        onPress={(data, details = null) => {
          // Update state with selected address
          setAddress(data.description);
          setValidated(false);
        }}
        query={{
          key: "AIzaSyCi-LcFua4tTjLm9RUMKDiZLwFkuoRovqQ",
          language: "en",
        }}
        styles={{
          textInput: styles.input,
        }}
      />

      {address ? (
        <Text style={styles.addressText}>Selected Address: {address}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  success: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
  addressText: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
});

export default AddressValidationComponent;
