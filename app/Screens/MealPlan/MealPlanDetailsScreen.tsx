import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Provider as PaperProvider, Text, Button, Card, useTheme } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";

type MealPlanDetailsScreenProps = StackScreenProps<RootStackParamList, "MealPlanDetailsScreen">;
type MealPlanDetailsRouteProp = RouteProp<RootStackParamList, "MealPlanDetailsScreen">;

const MealPlanDetailsScreen = ({ navigation }: MealPlanDetailsScreenProps) => {
  const theme = useTheme();
  const route = useRoute<MealPlanDetailsRouteProp>();
  const { mealPlan } = route.params;

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Button icon="arrow-left" onPress={() => navigation.goBack()} style={styles.backButton}>Back</Button>
        
        <Text style={[styles.header, { color: theme.colors.onBackground }]}>{mealPlan.name}</Text>
        <Text>{mealPlan.description}</Text>
        <Text style={styles.section}>Cuisine: {mealPlan.cuisine}</Text>
        <Text style={styles.section}>Meals Per Day: {mealPlan.mealsPerDay}</Text>

        {mealPlan.meals.map((meal, index) => (
          <Card key={index} style={styles.mealCard}>
            <Card.Content>
              <Text style={styles.mealTitle}>{meal.name}</Text>
              <Text>Calories: {meal.calories} | Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fats: {meal.fats}g</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  backButton: { marginBottom: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  section: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  mealCard: { marginTop: 10 },
  mealTitle: { fontSize: 18, fontWeight: "bold" },
});

export default MealPlanDetailsScreen;