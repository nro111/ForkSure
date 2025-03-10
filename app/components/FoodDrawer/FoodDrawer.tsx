import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Searchbar, List, Modal, Portal, Button } from "react-native-paper";
import Food from "../../models/foodDiary/food.tsx";

// Explicitly type FOOD_DATABASE as Food[]
const FOOD_DATABASE: Food[] = [
  { id: "1", name: "Grilled Chicken", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: "2", name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fats: 1.8 },
  { id: "3", name: "Avocado", calories: 234, protein: 3, carbs: 12, fats: 21 },
];

// Explicitly type props
interface FoodDrawerProps {
  onSelectFood: (food: Food) => void;
}

export const FoodDrawer: React.FC<FoodDrawerProps> = ({ onSelectFood }) => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");

  // Filter food database based on search query
  const filteredFoods = FOOD_DATABASE.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Add Food</Button>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ backgroundColor: "white", padding: 20 }}>
          <Searchbar placeholder="Search food" value={query} onChangeText={setQuery} />
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                description={`Calories: ${item.calories} kcal`}
                onPress={() => {
                  onSelectFood(item);
                  setVisible(false);
                }}
              />
            )}
          />
        </Modal>
      </Portal>
    </View>
  );
};
