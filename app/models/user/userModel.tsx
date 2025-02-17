import Preferences from '../user/interfaces/preferences';
import MealPlans from '../user/interfaces/mealPlans';
import Progress from '../user/interfaces/progress';
import FoodWaste from '../user/interfaces/foodWaste';
import BodyDimensions from './interfaces/bodyDimensions';
import Subscription from './interfaces/subscription';

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
    bodyDimensions?: BodyDimensions;
    subscription?: Subscription;
    subscriptionStart: string;
    subscriptionExpiration: string;
    dateOfBirth: string;
    preferences?: Preferences;
    mealPlans?: MealPlans;
    progress?: Progress;
    foodWaste?: FoodWaste;
}

export default FirebaseUser;