interface Subscription {
    id: number; // Unique subscription ID
    features: string[]; // List of feature flags
    monthlyCost?: number; // Monthly cost in USD
    yearlyCost?: number; // Yearly cost in USD
}
interface BodyDimensions {
    height: string;
    weight: string;
    neckSize: string;
    hipSize: string;
    waistSize: string;
    wristSize: string;
    bicepSize: string;
    chestSize: string;
    thighSize: string;
    calfSize: string;
}

interface TasteProfile {
    topCuisines: string[];
    flavorRanking: string[];
    favoriteFoods: string[];
    favoriteIngredients: string[];   
}

interface FirebaseUser {
    createDateTime: string;
    email: string;
    firstName: string;
    firstTimeUser: boolean;
    gender: string;
    lastLoginDateTime: string;
    lastName: string;
    pushTokenId: string;
    address: string;
    id: string;
    img: string;
    lastUpdatedDateTime: string;
    password: string;
    passwordHash: string;
    phone: string;
    tokenId: string;
    username: string;
    bodyDimensions: BodyDimensions;
    subscription: Subscription;
    subscriptionStart: string;
    subscriptionExpiration: string;
    dateOfBirth: string;
    preferences: Preferences;
    mealPlans: MealPlans;
    progress: Progress;
    foodWaste?: FoodWaste;
}

export default FirebaseUser;