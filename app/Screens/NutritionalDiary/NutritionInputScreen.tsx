import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button, Switch, Divider, List, PaperProvider, IconButton } from "react-native-paper";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { FoodDrawer } from "../../components/FoodDrawer/FoodDrawer";
import Food from "../../models/foodDiary/food";

type NutritionInputScreenProps = StackScreenProps<RootStackParamList, 'NutritionInputScreen'>;

const NutritionInputScreen = ({ navigation }: NutritionInputScreenProps) => {
    // State: Selected Foods & Nutrition Totals
    const [nutritionTotals, setNutritionTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
    const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
    // State: Hydration & Well-being
    const [hydration, setHydration] = useState("");
    const [wellBeing, setWellBeing] = useState({
        energyLevel: "moderate",
        mood: "neutral",
        stressLevel: "low",
        digestion: "normal",
        appetite: "normal",
        focus: "good",
    });

    // Add food to selected list & update nutrition totals
    const addFood = (food) => {
        setSelectedFoods([...selectedFoods, food]);

        setNutritionTotals({
            calories: nutritionTotals.calories + food.calories,
            protein: nutritionTotals.protein + food.protein,
            carbs: nutritionTotals.carbs + food.carbs,
            fats: nutritionTotals.fats + food.fats,
        });
    };

    // Remove food from the list
    const removeFood = (index: number) => {
        const foodToRemove = selectedFoods[index];

        // Update nutrition totals
        setNutritionTotals({
            calories: nutritionTotals.calories - foodToRemove.calories,
            protein: nutritionTotals.protein - foodToRemove.protein,
            carbs: nutritionTotals.carbs - foodToRemove.carbs,
            fats: nutritionTotals.fats - foodToRemove.fats,
        });

        // Remove item from the list
        const updatedFoods = selectedFoods.filter((_, i) => i !== index);
        setSelectedFoods(updatedFoods);
    };

    // Handle Save Data
    const handleSave = () => {
        Alert.alert("Nutrition Data Saved", "Your daily intake has been recorded.");
        // TODO: Firebase storage logic here
    };

    return (
        <PaperProvider>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Nutritional Intake</Text>

                {/* Selected Foods List */}
                <Text style={styles.sectionHeader}>Selected Foods</Text>
                {selectedFoods.length === 0 ? (
                    <Text style={styles.placeholderText}>No foods added yet.</Text>
                ) : (
                    selectedFoods.map((food, index) => (
                        <View key={index} style={styles.foodItem}>
                            <List.Item
                                title={food.name}
                                description={`Calories: ${food.calories}, Protein: ${food.protein}g`}
                            />
                            <IconButton
                                icon="delete"
                                iconColor="red"
                                size={20}
                                onPress={() => removeFood(index)}
                            />
                        </View>
                    ))
                )}

                {/* Open Food Drawer */}
                <FoodDrawer onSelectFood={addFood} />

                <Divider style={styles.divider} />

                {/* Total Nutrition Display */}
                <Text style={styles.sectionHeader}>Total Nutrition</Text>
                <Text>Calories: {nutritionTotals.calories} kcal</Text>
                <Text>Protein: {nutritionTotals.protein} g</Text>
                <Text>Carbohydrates: {nutritionTotals.carbs} g</Text>
                <Text>Fats: {nutritionTotals.fats} g</Text>

                <Divider style={styles.divider} />

                {/* Hydration Input */}
                <TextInput label="Water Intake (ml)" value={hydration} onChangeText={setHydration} keyboardType="numeric" style={styles.input} />

                <Divider style={styles.divider} />

                {/* Well-being Tracking */}
                <Text style={styles.sectionHeader}>Daily Well-being</Text>
                <TextInput label="Energy Level (low, moderate, high)" value={wellBeing.energyLevel} onChangeText={(text) => setWellBeing({ ...wellBeing, energyLevel: text })} style={styles.input} />
                <TextInput label="Mood (happy, neutral, tired, stressed)" value={wellBeing.mood} onChangeText={(text) => setWellBeing({ ...wellBeing, mood: text })} style={styles.input} />
                <TextInput label="Stress Level (low, moderate, high)" value={wellBeing.stressLevel} onChangeText={(text) => setWellBeing({ ...wellBeing, stressLevel: text })} style={styles.input} />
                <TextInput label="Digestion (normal, bloated, upset stomach)" value={wellBeing.digestion} onChangeText={(text) => setWellBeing({ ...wellBeing, digestion: text })} style={styles.input} />
                <TextInput label="Appetite (low, normal, high)" value={wellBeing.appetite} onChangeText={(text) => setWellBeing({ ...wellBeing, appetite: text })} style={styles.input} />
                <TextInput label="Focus (poor, average, good, great)" value={wellBeing.focus} onChangeText={(text) => setWellBeing({ ...wellBeing, focus: text })} style={styles.input} />

                {/* Save Button */}
                <Button mode="contained" onPress={handleSave} style={styles.button}>
                    Save Data
                </Button>
            </ScrollView>
        </PaperProvider>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    sectionHeader: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
    input: { width: "100%", marginBottom: 10 },
    divider: { marginVertical: 15, height: 1, backgroundColor: "#ccc" },
    button: { marginTop: 20, width: "100%" },
    placeholderText: { color: "#777", textAlign: "center", fontStyle: "italic" },
    foodItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
      },
});

export default NutritionInputScreen;