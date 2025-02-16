interface RegistrationModel {
    first_name: String;
    last_name: String;
    date_of_birth: Date;
    preferred_ingredients: String[]; // Ingredients
    disliked_ingredients: String[]; // Ingredients
    preferred_cuisines: String[]; // Cuisines (e.g., "Mexican")
    disliked_cuisines: String[]; // Cuisines (e.g., "Mexican")
    dietary_preferences: String[]; // Dietary restrictions/preferences
    allergies: String[]; // Allergens
    goals: String[];
    email: String;
    password: String;
    height: String;
    weight: Number;
}

export default RegistrationModel;