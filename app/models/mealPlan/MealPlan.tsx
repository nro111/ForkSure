import Meal from "./Meal";

interface MealPlan {
    id: string;
    name: string;
    description: string;
    cuisine: string;
    mealsPerDay: number;
    tags: string[];
    meals: Meal[];
  }

  export default MealPlan;