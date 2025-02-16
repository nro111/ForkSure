interface RegistrationModel {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    preferred_ingredients: string[]; // Ingredients
    disliked_ingredients: string[]; // Ingredients
    preferred_cuisines: string[]; // Cuisines (e.g., "Mexican")
    disliked_cuisines: string[]; // Cuisines (e.g., "Mexican")
    dietary_preferences: string[]; // Dietary restrictions/preferences
    allergies: string[]; // Allergens
    goals: string[];
    email: string;
    password: string;
    height: string;
    weight: string;
    gender: string;
}

export default RegistrationModel;