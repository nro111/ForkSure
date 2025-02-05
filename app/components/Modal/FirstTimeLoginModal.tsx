import React, { Component, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import Button from "../../components/Button/Button";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import theme, { COLORS, FONTS } from "../../constants/theme";
import CustomInput from "../Input/CustomInput";
import AutocompleteInput from 'react-native-autocomplete-input';
import LiquidSwitch from "../Toggles/LiquidSwitch";
import LiquidTagInput from "../Toggles/LiquidSwitch";
import DynamicTagInput from "../Toggles/LiquidSwitch";

const FirstTimeLoginModal = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [loseWeightChecked, setLoseWeightChecked] = useState(false);
  const [buildMuscleChecked, setBuildMuscleChecked] = useState(false);
  const [feelBetterChecked, setFeelBetterChecked] = useState(false);
  const [sleepMoreChecked, setSleepMoreChecked] = useState(false);
  const [eatHealthierChecked, setEatHealthierChecked] = useState(false);
  const [naturalEnergyChecked, setNaturalEnergyChecked] = useState(false);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [leastFavoriteFoods, setLeastFavoriteFoods] = useState([]);
  const [pass, setpass] = useState("");

  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const changeStep = (step) => {
    console.log(step);
    if (step < 1 || step > 4)
      return;

    setActiveStep(step);
    return (
      <View key={step} style={styles.stepWrapper}>
        <View style={[styles.line, true && styles.activeLine]} />
        <TouchableOpacity style={styles.circleWrapper}>
          <View style={[styles.circle, true && styles.activeCircle]}>
            <Text style={[styles.label, true && styles.activeLabel]}>{step}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.line, true && styles.activeLine]} />
      </View>
    );
  }

  const renderStep = (step) => {
    const isActive = activeStep >= step;
    

    return (
      <View key={step} style={styles.stepWrapper}>
        <View style={[styles.line, isActive && styles.activeLine]} />
        <TouchableOpacity onPress={() => setActiveStep(step)} style={styles.circleWrapper}>
          <View style={[styles.circle, isActive && styles.activeCircle]}>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{step}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.line, isActive && styles.activeLine]} />
      </View>
    );
  };

  const saveAndClose = () => {
    
  }

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <View style={styles.card}>
            <Text
              style={{
                ...FONTS.fontMedium,
                fontSize: 15,
                color: colors.title,
                marginBottom: 5,
              }}
            >
              Lets start with some basic info<Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.card}>
            <Text
              style={{
                ...FONTS.fontMedium,
                fontSize: 15,
                color: colors.title,
                marginBottom: 5,
              }}
            >
              What are your goals?<Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={loseWeightChecked}
                onPress={() => setLoseWeightChecked(!loseWeightChecked)}
              // style={styles.checkbox}
              />
              <Text style={styles.chLabel}>Lose Weight</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={buildMuscleChecked}
                onPress={() => setBuildMuscleChecked(!buildMuscleChecked)}
              // style={styles.checkbox}
              />
              <Text style={styles.chLabel}>Build Muscle</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={feelBetterChecked}
                onPress={() => setFeelBetterChecked(!feelBetterChecked)}
              // style={styles.checkbox}
              />
              <Text style={styles.chLabel}>Feel Better</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={sleepMoreChecked}
                onPress={() => setSleepMoreChecked(!sleepMoreChecked)}
              // style={styles.checkbox}
              />
              <Text style={styles.chLabel}>Sleep More</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={eatHealthierChecked}
                onPress={() => setEatHealthierChecked(!eatHealthierChecked)}
              // style={styles.checkbox}
              />
              <Text style={styles.chLabel}>Eat Healthier</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                checked={naturalEnergyChecked}
                onPress={() => setNaturalEnergyChecked(!naturalEnergyChecked)}
              // style={styles.checkbox}
              />
              <Text style={styles.chLabel}>Have More Natural Energy</Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.card}>
            <Text
              style={{
                ...FONTS.fontMedium,
                fontSize: 15,
                color: colors.title,
                marginBottom: 5,
              }}
            >
              Tell me what your most favorite foods are<Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <DynamicTagInput onTagsChange={function (tags: { text: string; }[]): void {
              console.log(tags);
            } } />
            <Text
              style={{
                ...FONTS.fontMedium,
                fontSize: 15,
                color: colors.title,
                marginBottom: 5,
              }}
            >
              And what your least favorite foods are<Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <DynamicTagInput onTagsChange={function (tags: { text: string; }[]): void {
              console.log(tags);
            } } />
          </View>
        );
      case 4:
        return (
          <View style={styles.card}>
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
                        <Text
              style={{
                ...FONTS.fontMedium,
                fontSize: 15,
                color: colors.title,
                marginBottom: 5,
              }}
            >
              Confirm Password<Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <CustomInput
              type={"password"}
              onChangeText={(value: any) => setpass(value)}
              value={pass}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Finish Profile</Text>
      <View style={styles.stepContainer}>
        {renderStep(1)}
        {renderStep(2)}
        {renderStep(3)}
        {renderStep(4)}
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Back"}
          onPress={() => changeStep(activeStep - 1)}
          color={theme.dark ? COLORS.white : COLORS.primary}
          text={colors.card}
          style={styles.button}
        />
        <Button
          title={"Next"}
          onPress={() => changeStep(activeStep + 1)}
          color={theme.dark ? COLORS.white : COLORS.primary}
          text={colors.card}
          style={styles.button}
        />

        {activeStep === 4 &&
          <Button
            title={"Finish"}
            onPress={() => saveAndClose()}
            color={theme.dark ? COLORS.white : COLORS.primary}
            text={colors.card}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
  chLabel: {
    margin: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginRight: 20
  },
  buttonContainer: {
    flexDirection: 'row', // Make buttons align horizontally
    justifyContent: 'space-around', // Distribute space evenly
    alignItems: 'center', // Align buttons vertically
    padding: 20,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 20
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleWrapper: {
    zIndex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: 'blue',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  activeLabel: {
    color: 'white',
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: 'black',
    zIndex: 0,
  },
  activeLine: {
    backgroundColor: 'blue',
  },
  contentContainer: {
    alignItems: 'center',
  },
  card: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default FirstTimeLoginModal;