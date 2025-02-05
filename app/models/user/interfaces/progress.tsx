interface Progress {
    [date: string]: DailyProgress; // Date as key
}

interface DailyProgress {
    calories_logged: number; // Total calories consumed
    hydration: Hydration;
    macros: Macros;
    nutrient_intake: NutrientIntake;
    energy_levels: EnergyLevels;
    mood_tracking: MoodTracking;
    sleep_tracking: SleepTracking;
    weight_tracking: Record<string, number>; // Date as key, weight in lbs
    recovery_scores: RecoveryScores;
    budget: Budget;
    streaks: Streaks;
    daily_goals: DailyGoals;
}

interface Hydration {
    total_ml: number; // Total water consumed (ml)
    goal_ml: number; // Daily hydration goal (ml)
}

interface Macros {
    protein_g: number;
    carbs_g: number;
    fats_g: number;
}

interface NutrientIntake {
    vitamins: Vitamins;
    minerals: Minerals;
}

interface Vitamins {
    vitamin_a_mcg: number;
    vitamin_c_mg: number;
    vitamin_d_mcg: number;
    vitamin_e_mg: number;
    vitamin_b12_mcg: number;
    folate_mcg: number;
}

interface Minerals {
    iron_mg: number;
    calcium_mg: number;
    magnesium_mg: number;
    zinc_mg: number;
    potassium_mg: number;
    sodium_mg: number;
}

interface EnergyLevels {
    morning: string; // "high", "moderate", or "low"
    afternoon: string;
    evening: string;
}

interface MoodTracking {
    morning: string; // e.g., "happy"
    afternoon: string;
    evening: string;
}

interface SleepTracking {
    hours_slept: number; // Total hours slept
    sleep_quality: string; // e.g., "good", "poor"
    comments: string; // Additional notes
}

interface RecoveryScores {
    sleep_quality_score: number; // 0-100
    hydration_score: number; // 0-100
    nutrition_score: number; // 0-100
    energy_level_score: number; // 0-100
    stress_level_score: number; // 0-100
    muscle_recovery: string; // "good", "moderate", or "poor"
    comments: string;
}

interface Budget {
    total_spent: number; // Total spending for the day (USD)
    waste_cost: number; // Cost of wasted food (USD)
    savings_from_swaps: number; // Savings from substitutions (USD)
    grocery_budget_goal: number; // Daily grocery budget goal (USD)
    remaining_budget: number; // Remaining budget (USD)
}

interface Streaks {
    meal_planning_streak: number; // Consecutive days
    budget_goal_streak: number; // Consecutive days
}

interface DailyGoals {
    hydration_goal_met: boolean;
    calorie_goal_met: boolean;
    meal_plan_followed: boolean;
    comments: string; // Additional notes
}

export default Progress;