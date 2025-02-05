interface FoodWaste {
    id: string; // Unique ID for the food waste record (e.g., "foodWaste_userId1")
    entries: Record<string, DailyFoodWaste>; // Dynamic date-based food waste data
}

interface DailyFoodWaste {
    totalWasteWeightGrams: number; // Total weight of wasted food in grams
    totalWasteCost: number; // Total cost of wasted food in USD
    unusedIngredients: UnusedIngredient[]; // Details of unused ingredients
    leftoverMeals: LeftoverMeal[]; // Details of leftover meals
}

interface UnusedIngredient {
    ingredientName: string; // Name of the unused ingredient (e.g., "lettuce")
    quantityWasted: number; // Quantity wasted (e.g., 250 grams)
    cost: number; // Cost of the wasted ingredient (USD)
}

interface LeftoverMeal {
    recipeId: string; // Reference to the recipe ID
    portionWasted: number; // Portion wasted (e.g., 0.5 for half of a serving)
    cost: number; // Cost of the wasted portion (USD)
}

export default FoodWaste;