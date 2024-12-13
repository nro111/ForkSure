import React from "react";
import { View, Text, StyleSheet } from "react-native";

type BusinessIconProps = {
  businessName: string;
};

// Hash function to generate consistent colors
const generateColor = (businessName: string) => {
  const hash = businessName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = ['#FF5733', '#33B5E5', '#FFC107', '#9C27B0', '#FF9800', '#4CAF50'];
  return colors[hash % colors.length];
};

const BusinessIcon = ({ businessName }: BusinessIconProps) => {
  const firstLetter = businessName ? businessName[0].toUpperCase() : '?';
  const backgroundColor = generateColor(businessName);

  return (
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Text style={styles.iconText}>{firstLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circle shape
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default BusinessIcon;
