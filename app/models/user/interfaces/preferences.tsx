interface Preferences {
    favorite_recipes: string[]; // Recipe IDs
    disliked_recipes: string[]; // Recipe IDs
    disliked_ingredients: string[]; // Ingredients
    preferred_cuisines: string[]; // Cuisines (e.g., "Mexican")
    flavor_profile: FlavorProfile;
    dietary_preferences: string[]; // Dietary restrictions/preferences
    allergies: string[]; // Allergens
}

interface FlavorProfile {
    spicy: number; // 1-5 scale
    savory: number; // 1-5 scale
    sweet: number; // 1-5 scale
    sour: number; // 1-5 scale
}