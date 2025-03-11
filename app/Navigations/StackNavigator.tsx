import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { RootStackParamList } from "./RootStackParamList";
import AllHouseholdMealPlans from "../Screens/MealPlan/AllHouseholdPlans";
import MyMealPlan from "../Screens/MealPlan/MyPlan";
import Splash from "../Screens/onbording/Splash";
import DrawerNavigation from "./DrawerNavigation";
import Onboarding from "../Screens/onbording/Onbording";
import ComplateProfile from "../Screens/Auth/ComplateProfile";
import SignIn from "../Screens/Auth/SignIn";
import UserSignUp from "../Screens/Auth/UserSignUp";
import ForgatPassword from "../Screens/Auth/ForgatPassword";
import EnterCode from "../Screens/Auth/EnterCode";
import NewPassword from "../Screens/Auth/NewPassword";
import LookingFor from "../Screens/Auth/LookingFor";
import ExperienceLevel from "../Screens/Auth/ExperienceLevel";
import WorkingModel from "../Screens/Auth/workingModel";
import LookingToObtain from "../Screens/Auth/LookingToObtain";
import Allowlocation from "../Screens/Auth/Allowlocation";
import FindLocation from "../Screens/Auth/FindLocation";
import Home from "../Screens/Home/Home";
import SaveJob from "../Screens/SaveJob/SaveJob";
import Notification from "../Screens/Notification/Notification";
import Allownotification from "../Screens/Notification/Allownotification";
import Search from "../Screens/search/Search";
import SearchResults from "../Screens/search/SearchResults";
import JobDetails from "../Screens/Jobs/JobDetails";
import JobApplied from "../Screens/Jobs/JobApplied";
import AboutCompany from "../Screens/Jobs/AboutCompany";
import AboutGalary from "../Screens/Jobs/AboutGalary";
import EditProfile from "../Screens/profile/EditProfile";
import ProfileBasicDetails from "../Screens/profile/ProfileBasicDetails";
import Profilesummary from "../Screens/profile/Profilesummary";
import ProfessionalDetails from "../Screens/profile/ProfessionalDetails";
import Employment from "../Screens/profile/Employment";
import Education from "../Screens/profile/Education";
import ProfileProjects from "../Screens/profile/ProfileProjects";
import ProfileSkills from "../Screens/profile/ProfileSkills";
import ProfileUploadResume from "../Screens/profile/ProfileUploadResume";
import MyApplication from "../Screens/Jobs/MyApplication";
import MyApplicationStatus from "../Screens/Jobs/MyApplicationStatus";
import ContactUs from "../Screens/Jobs/ContactUs";
import Payment from "../Screens/profile/Payment";
import Messages from "../Screens/Chat/Messages";
import SingleChat from "../Screens/Chat/SingleChat";
import Call from "../Screens/Chat/Call";
import Settings from "../Screens/Settings/Settings";
import NotificationSettings from "../Screens/Settings/NotificationSettings";
import ChangePassword from "../Screens/Settings/ChangePassword";
import HelpCenter from "../Screens/Settings/HelpCenter";
import Language from "../Screens/language/Language";
import WriteReview from "../Screens/profile/WriteReview";
import Components from "../Screens/Shortcode/Components";
import AccordionScreen from "../Screens/Shortcode/Accordion";
import BottomSheet from "../Screens/Shortcode/BottomSheet";
import Buttons from "../Screens/Shortcode/Buttons";
import Inputs from "../Screens/Shortcode/Inputs";
import ActionModals from "../Screens/Shortcode/ActionModals";
import Badges from "../Screens/Shortcode/Badges";
import Datepicker from "../Screens/Shortcode/Datepicker";
import Search2 from "../Screens/Shortcode/Search2";
import Charts from "../Screens/Shortcode/Charts";
import Headers from "../Screens/Shortcode/Headers";
import Footers from "../Screens/Shortcode/Footers";
import TabStyle1 from "../components/Footers/FooterStyle1";
import TabStyle2 from "../components/Footers/FooterStyle2";
import TabStyle3 from "../components/Footers/FooterStyle3";
import TabStyle4 from "../components/Footers/FooterStyle4";
import ListScreen from "../Screens/Shortcode/Lists";
import Pricings from "../Screens/Shortcode/Pricings";
import DividerElements from "../Screens/Shortcode/DividerElements";
import Snackbars from "../Screens/Shortcode/Snakbars";
import Socials from "../Screens/Shortcode/Socials";
import SwipeableScreen from "../Screens/Shortcode/Swipeable";
import Tabs from "../Screens/Shortcode/Tabs";
import Tables from "../Screens/Shortcode/Tables";
import Toggles from "../Screens/Shortcode/Toggles";
import { SafeAreaView } from "react-native";
import Login from "../Screens/Auth/Login";
import CreateProfileScreen from "../Screens/Auth/CreateProfileScreen";
import NutritionInputScreen from "../Screens/NutritionalDiary/NutritionInputScreen";
import MealPlanDiscoveryScreen from "../Screens/MealPlan/MealPlanDiscoveryScreen";
import MealPlanDetailsScreen from "../Screens/MealPlan/MealPlanDetailsScreen";
//import WebViewer from "../components/WebView/ReceiptViewer";

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  
  return (
    <SafeAreaView style={{width:'100%', flex: 1 }}>
      <Stack.Navigator
        //initialRouteName={"splash"}
        initialRouteName={"Onboarding"}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent",flex:1 },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={"MealPlanDetailsScreen"} component={MealPlanDetailsScreen} />
        <Stack.Screen name={"MealPlanDiscoveryScreen"} component={MealPlanDiscoveryScreen} />
        <Stack.Screen name={"NutritionInputScreen"} component={NutritionInputScreen} />
        <Stack.Screen name={"CreateProfileScreen"} component={CreateProfileScreen} />
        <Stack.Screen name={"AllHouseholdMealPlans"} component={AllHouseholdMealPlans} />
        <Stack.Screen name={"MyMealPlan"} component={MyMealPlan} />
        <Stack.Screen name={"splash"} component={Splash} />
        <Stack.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
        <Stack.Screen name={"Onboarding"} component={Onboarding} />
        <Stack.Screen name={"ComplateProfile"} component={ComplateProfile} />
        <Stack.Screen name={"SignIn"} component={SignIn} />
        <Stack.Screen name={"UserSignUp"} component={UserSignUp} />
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"ForgatPassword"} component={ForgatPassword} />
        <Stack.Screen name={"EnterCode"} component={EnterCode} />
        <Stack.Screen name={"NewPassword"} component={NewPassword} />
        <Stack.Screen name={"LookingFor"} component={LookingFor} />
        <Stack.Screen name={"ExperienceLevel"} component={ExperienceLevel} />
        <Stack.Screen name={"workingModel"} component={WorkingModel} />
        <Stack.Screen name={"LookingToObtain"} component={LookingToObtain} />
        <Stack.Screen name={"Allowlocation"} component={Allowlocation} />
        <Stack.Screen name={"FindLocation"} component={FindLocation} />
        <Stack.Screen name={"Dashboard"} component={Home} />
        <Stack.Screen name={"SaveJob"} component={SaveJob} />
        <Stack.Screen name={"Notification"} component={Notification} />
        <Stack.Screen name={"Allownotification"} component={Allownotification} />
        <Stack.Screen name={"Search"} component={Search} />
        <Stack.Screen name={"SearchResults"} component={SearchResults} />
        <Stack.Screen name={"JobDetails"} component={JobDetails} />
        <Stack.Screen name={"JobApplied"} component={JobApplied} />
        <Stack.Screen name={"AboutCompany"} component={AboutCompany} />
        <Stack.Screen name={"AboutGalary"} component={AboutGalary} />
        <Stack.Screen name={"EditProfile"} component={EditProfile} />
        <Stack.Screen name={"ProfileBasicDetails"} component={ProfileBasicDetails} />
        <Stack.Screen name={"Profilesummary"} component={Profilesummary} />
        <Stack.Screen name={"ProfessionalDetails"} component={ProfessionalDetails} />
        <Stack.Screen name={"Employment"} component={Employment} />
        <Stack.Screen name={"Education"} component={Education} />
        <Stack.Screen name={"ProfileProjects"} component={ProfileProjects} />
        <Stack.Screen name={"ProfileSkills"} component={ProfileSkills} />
        <Stack.Screen name={"ProfileUploadResume"} component={ProfileUploadResume} />
        <Stack.Screen name={"MyApplication"} component={MyApplication} />
        <Stack.Screen name={"MyApplicationStatus"} component={MyApplicationStatus} />
        <Stack.Screen name={"ContactUs"} component={ContactUs} />
        <Stack.Screen name={"Payment"} component={Payment} />
        <Stack.Screen name={"Messages"} component={Messages} />
        <Stack.Screen name={"SingleChat"} component={SingleChat} />
        <Stack.Screen name={"Call"} component={Call} />
        <Stack.Screen name={"Settings"} component={Settings} />
        <Stack.Screen name={"NotificationSettings"} component={NotificationSettings} />
        <Stack.Screen name={"ChangePassword"} component={ChangePassword} />
        <Stack.Screen name={"HelpCenter"} component={HelpCenter} />
        <Stack.Screen name={"ChooseLanguage"} component={Language} />
        <Stack.Screen name={"WriteReview"} component={WriteReview} />
        <Stack.Screen name={"Components"} component={Components} />
        <Stack.Screen name={"Accordion"} component={AccordionScreen} />
        <Stack.Screen name={"BottomSheet"} component={BottomSheet} />
        <Stack.Screen name={"Buttons"} component={Buttons} />
        <Stack.Screen name={"Inputs"} component={Inputs} />
        <Stack.Screen name={"ActionModals"} component={ActionModals} />
        <Stack.Screen name={"Badges"} component={Badges} />
        <Stack.Screen name={"Datepicker"} component={Datepicker} />
        <Stack.Screen name={"Search2"} component={Search2} />
        <Stack.Screen name={"Charts"} component={Charts} />
        <Stack.Screen name={"Headers"} component={Headers} />
        <Stack.Screen name={"Footers"} component={Footers} />
        <Stack.Screen name={"TabStyle1"} component={TabStyle1} />
        <Stack.Screen name={"TabStyle2"} component={TabStyle2} />
        <Stack.Screen name={"TabStyle3"} component={TabStyle3} />
        <Stack.Screen name={"TabStyle4"} component={TabStyle4} />
        <Stack.Screen name={"lists"} component={ListScreen} />
        <Stack.Screen name={"Pricings"} component={Pricings} />
        <Stack.Screen name={"DividerElements"} component={DividerElements} />
        <Stack.Screen name={"Snackbars"} component={Snackbars} />
        <Stack.Screen name={"Socials"} component={Socials} />
        <Stack.Screen name={"Swipeable"} component={SwipeableScreen} />
        <Stack.Screen name={"Tabs"} component={Tabs} />
        <Stack.Screen name={"Tables"} component={Tables} />
        <Stack.Screen name={"Toggles"} component={Toggles} />
        {/* <Stack.Screen name="WebViewer" component={WebViewer} /> */}
        
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default StackNavigator;
