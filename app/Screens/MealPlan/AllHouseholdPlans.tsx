import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { ScrollView } from "react-native-gesture-handler";

type AllHouseholdPlansScreenProps = StackScreenProps<RootStackParamList, 'AllHouseholdMealPlans'>;

const AllHouseholdPlans = ({ navigation }: AllHouseholdPlansScreenProps) => {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        </ScrollView>
    )
}

export default AllHouseholdPlans;