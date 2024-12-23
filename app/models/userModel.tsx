interface Subscription {
    id: string;
    
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

interface FirebaseUser {
    createDateTime: string;
    email: string;
    firstName: string;
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
    subscription: string;
    subscriptionStart: string;
    subscriptionExpiration: string;
    dateOfBirth: string;
}

export default FirebaseUser;