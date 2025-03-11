import Food from "../foodDiary/food";

interface Meal {
    id: string;
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    tags: string[];
    food: Food[];
  }

  export default Meal;