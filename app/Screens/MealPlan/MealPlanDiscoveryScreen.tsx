import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Provider as PaperProvider, Text, TextInput, Button, Card, Chip, Divider, Searchbar, useTheme } from "react-native-paper";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import MealPlan from "../../models/mealPlan/MealPlan";

type MealPlanDiscoveryScreenProps = StackScreenProps<RootStackParamList, 'MealPlanDiscoveryScreen'>;

const MEAL_PLANS: MealPlan[] = [
    {
        id: "1",
        name: "High Protein Plan",
        description: "A meal plan designed for muscle growth and strength.",
        cuisine: "American",
        mealsPerDay: 4,
        tags: ["high-protein", "low-carb"],
        meals: [
            {
                id: "m1",
                name: "Grilled Chicken & Quinoa",
                description: "Lean grilled chicken breast served with quinoa and steamed broccoli.",
                calories: 500,
                protein: 40,
                carbs: 50,
                fats: 10,
                tags: ["high-protein", "low-fat"],
                food: [
                    { id: "f1", name: "Chicken Breast", calories: 200, protein: 35, carbs: 0, fats: 5 },
                    { id: "f2", name: "Quinoa", calories: 150, protein: 5, carbs: 30, fats: 2 },
                    { id: "f3", name: "Broccoli", calories: 50, protein: 5, carbs: 10, fats: 0 }
                ]
            },
            {
                id: "m2",
                name: "Salmon with Asparagus",
                description: "Grilled salmon fillet served with roasted asparagus and olive oil drizzle.",
                calories: 450,
                protein: 38,
                carbs: 30,
                fats: 18,
                tags: ["omega-3", "muscle-recovery"],
                food: [
                    { id: "f4", name: "Salmon Fillet", calories: 250, protein: 30, carbs: 0, fats: 15 },
                    { id: "f5", name: "Asparagus", calories: 50, protein: 5, carbs: 10, fats: 0 },
                    { id: "f6", name: "Olive Oil", calories: 100, protein: 0, carbs: 0, fats: 10 }
                ]
            }
        ]
    },
    {
        id: "2",
        name: "Vegan Weight Loss Plan",
        description: "Plant-based meals for healthy weight loss.",
        cuisine: "Mediterranean",
        mealsPerDay: 3,
        tags: ["vegan", "low-calorie"],
        meals: [
            {
                id: "m3",
                name: "Tofu Stir Fry",
                description: "Stir-fried tofu with mixed vegetables and brown rice.",
                calories: 350,
                protein: 25,
                carbs: 40,
                fats: 8,
                tags: ["vegan", "fiber-rich"],
                food: [
                    { id: "f7", name: "Tofu", calories: 150, protein: 20, carbs: 5, fats: 5 },
                    { id: "f8", name: "Mixed Vegetables", calories: 100, protein: 5, carbs: 20, fats: 1 },
                    { id: "f9", name: "Brown Rice", calories: 100, protein: 5, carbs: 30, fats: 2 }
                ]
            },
            {
                id: "m4",
                name: "Chickpea Salad",
                description: "Fresh chickpea salad with tomatoes, cucumber, and lemon dressing.",
                calories: 280,
                protein: 18,
                carbs: 35,
                fats: 5,
                tags: ["vegan", "low-fat"],
                food: [
                    { id: "f10", name: "Chickpeas", calories: 150, protein: 10, carbs: 25, fats: 3 },
                    { id: "f11", name: "Tomatoes", calories: 50, protein: 2, carbs: 10, fats: 0 },
                    { id: "f12", name: "Cucumber", calories: 30, protein: 1, carbs: 5, fats: 0 }
                ]
            }
        ]
    },
    {
        id: "3",
        name: "Mediterranean Diet",
        description: "Balanced meals with fresh veggies, fish, and olive oil.",
        cuisine: "Mediterranean",
        mealsPerDay: 3,
        tags: ["heart-healthy", "balanced"],
        meals: [
            {
                id: "m5",
                name: "Greek Salad",
                description: "A fresh salad with feta cheese, olives, and olive oil dressing.",
                calories: 300,
                protein: 12,
                carbs: 20,
                fats: 18,
                tags: ["mediterranean", "low-carb"],
                food: [
                    { id: "f13", name: "Feta Cheese", calories: 100, protein: 8, carbs: 2, fats: 10 },
                    { id: "f14", name: "Olives", calories: 50, protein: 0, carbs: 5, fats: 5 },
                    { id: "f15", name: "Lettuce", calories: 20, protein: 2, carbs: 3, fats: 0 }
                ]
            },
            {
                id: "m6",
                name: "Grilled Fish with Couscous",
                description: "Grilled fish fillet served with whole-grain couscous.",
                calories: 400,
                protein: 35,
                carbs: 40,
                fats: 12,
                tags: ["mediterranean", "high-protein"],
                food: [
                    { id: "f16", name: "Grilled Fish", calories: 250, protein: 30, carbs: 0, fats: 10 },
                    { id: "f17", name: "Whole-Grain Couscous", calories: 150, protein: 5, carbs: 40, fats: 2 }
                ]
            }
        ]
    }
];

const MealPlanDiscoveryScreen = ({ navigation }: MealPlanDiscoveryScreenProps) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [mealPlans, setMealPlans] = useState(MEAL_PLANS);

    // Available filter options (Can be dynamic in the future)
    const filters = ["high-protein", "low-carb", "vegan", "low-calorie", "mediterranean", "heart-healthy"];

    // Toggle filter selection
    const toggleFilter = (filter: string) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(filter) ? prevFilters.filter((f) => f !== filter) : [...prevFilters, filter]
        );
    };

    // Filter and search meal plans
    const filteredMealPlans = mealPlans.filter((plan) => {
        return (
            (searchQuery === "" || plan.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedFilters.length === 0 || selectedFilters.some((filter) => plan.tags.includes(filter)))
        );
    });

    return (
        <PaperProvider>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.header, { color: theme.colors.onBackground }]}>Discover Meal Plans</Text>

                {/* Search Bar */}
                <Searchbar
                    placeholder="Search Meal Plans"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchbar}
                />

                {/* Filters */}
                <Text style={[styles.sectionHeader, { color: theme.colors.onBackground }]}>Filters</Text>
                <View style={styles.filterContainer}>
                    {filters.map((filter) => (
                        <Chip
                            key={filter}
                            selected={selectedFilters.includes(filter)}
                            onPress={() => toggleFilter(filter)}
                            style={styles.chip}
                        >
                            {filter}
                        </Chip>
                    ))}
                </View>

                <Divider style={styles.divider} />

                {/* Meal Plans List */}
                <Text style={[styles.sectionHeader, { color: theme.colors.onBackground }]}>Available Meal Plans</Text>
                {filteredMealPlans.map((plan) => (
                    <Card key={plan.id} style={styles.card} onPress={() => navigation.navigate("MealPlanDetailsScreen", { mealPlan: plan })}>
                        <Card.Content>
                            <Text style={styles.cardTitle}>{plan.name}</Text>
                            <Text>{plan.description}</Text>
                            <View style={styles.tagContainer}>
                                {plan.tags.map((tag) => (
                                    <Chip key={tag} style={styles.tag}>{tag}</Chip>
                                ))}
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => console.log(`Added ${plan.name}`)}>Add Plan</Button>
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
        </PaperProvider>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    searchbar: {
        marginBottom: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    chip: {
        margin: 5,
    },
    divider: {
        marginVertical: 15,
        height: 1,
        backgroundColor: "#ccc",
    },
    card: {
        marginBottom: 10,
        backgroundColor: "#fff",
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
    },
    tag: {
        marginRight: 5,
    },
});

export default MealPlanDiscoveryScreen;