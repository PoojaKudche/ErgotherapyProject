/* import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import ÜbungsauswahlScreen from "./ÜbungsauswahlScreen";
import PatientMgmtScreen from "./PatientMgmtScreen";
import FeedbackScreen from "./FeedbackScreen";
import ProfileScreen from "./ProfileScreen";
import TherapistHome from "./TherapistHome";

export default MainTabScreen;

const exerciseStack = createStackNavigator();
const patientmgmtStack = createStackNavigator();
const feedbackStack = createStackNavigator();
const profileStack = createStackNavigator();
const therapHomeStack = createStackNavigator();

const exerciseStackScreen = ({ navigation }) => (
    <exerciseStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerTintColor: 'black'
        }}>
        <exerciseStack.Screen name="ÜbungsauswahlScreen" component={ÜbungsauswahlScreen} options={{
            headerLeft: () => (
                <Ionicons name="ios-menu" size={28} backgroundColor="#fff" onPress={() => {
                    navigation.openDrawer()
                }} ></Ionicons>
            )
        }} >
        </exerciseStack.Screen>
    </exerciseStack.Navigator>
) */