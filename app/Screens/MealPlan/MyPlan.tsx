import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { ScrollView } from "react-native-gesture-handler";

type MyMealPlanScreenProps = StackScreenProps<RootStackParamList, 'MyMealPlan'>;

const MyMealPlan = ({ navigation } : MyMealPlanScreenProps) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        </ScrollView>
    )
}

export default MyMealPlan;