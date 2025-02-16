interface Subscription {
    id: number; // Unique subscription ID
    features: string[]; // List of feature flags
    monthlyCost?: number; // Monthly cost in USD
    yearlyCost?: number; // Yearly cost in USD
}

export default Subscription;