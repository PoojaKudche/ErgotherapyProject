import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen";
import TherapistLogin from "./TherapistLogin";
import TherapistDetails from "./TherapistDetails";
import PatientLogin from "./PatientLogin";
import ÜbungsauswahlScreen from "./ÜbungsauswahlScreen";
import PatientMgmtScreen from "./PatientMgmtScreen";
import FeedbackScreen from "./FeedbackScreen";
import ProfileScreen from "./ProfileScreen";
import TherapistHome from "./TherapistHome";
import PatientDetails from "./PatientDetails";
import PatientID from "./PatientID";
import PatientWeekDay from "./PatientWeekDay";
import MotorSkills from "./MotorSkills";
import ZielenType from "./ZielenType";
import ZielenTesting from "./ZielenTesting";
import ZielenTestingExercise from "./ZielenTestingExercise";
import ZielenTrainingExercise from "./ZielenTrainingExercise";
import TippenType from "./TippenType";
import TippenTesting from "./TippenTesting";
import TippenTestingExercise from "./TippenTestingExercise";
import KreuzenBigExercise from "./KreuzenBigExercise";
import KreuzenBigSmall from "./KreuzenBigSmall";
import KreuzenType from "./KreuzenType";
import KreuzenTesting from "./KreuzenTesting";
import KreuzenSmallExercise from "./KreuzenSmallExercise";
import KreuzenTesting2 from "./KreuzenTesting2";
import Timer from "./Timer";
import Nachfahren from "./Nachfahren";
import UmdrehenType from "./UmdrehenType";
import TürmeType from "./TürmeType";
import KlötzeType from "./KlötzeType";
import GewindeType from "./GewindeType";
import MemorySpiel from "./MemorySpiel";
import Augenübungen from "./Augenübungen";
import ShapeTrace from "./ShapeTrace";
import ConnectDots from "./ConnectDots";
import CategorySelect from "./CategorySelect";
import CognitiveSkills from "./CognitiveSkills";
import TippenTrainingExercise from "./TippenTrainingExercise";
import TimerTraining from "./TimerTraining";
import MazeMain from "./MazeMain";
import KreuzenBigTraining from "./KreuzenBigTraining";
import KreuzenSmallTraining from "./KreuzenSmallTraining";
import Statistics from "./Statistics";
import Umdrehen2 from "./Umdrehen2";
import Kreuzen2 from "./Kreuzen2";
import KreuzenBig2 from "./KreuzenBig2";
import ZielenTraing2 from "./ZielenTraining2";
import ZielenTraining2 from "./ZielenTraining2";
import TippenTraining2 from "./TippenTraining2";
import KreuzenTraining2 from "./KreuzenTraining2";
import KreuzenSmallTraining2 from "./KreuzenSmallTraining2";
import UmdrehenTraining2 from "./UmdrehenTraining2";
import UmdrehenTraining3 from "./UmdrehenTraining3";
import TurmeTraining2 from "./TurmeTraining2";
import TurmeTraining3 from "./TurmeTraining3";
import KlotzeTraining2 from "./KlotzeTraining2";
import KlotzeTraining3 from "./KlotzeTraining3";
import GewindeTraining2 from "./GewindeTraining2";
import GewindeTraining3 from "./GewindeTraining3";
import Turme2 from "./Turme2";
import Turme3 from "./Turme3";
import Umdrehen3 from "./Umdrehen3";
import Klotze2 from "./Klotze2";
import Klotze3 from "./Klotze3";
import Gewinde2 from "./Gewinde2";
import Gewinde3 from "./Gewinde3";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="Turme2" component={Turme2} />
    <RootStack.Screen name="Turme3" component={Turme3} />
    <RootStack.Screen name="Klotze2" component={Klotze2} />
    <RootStack.Screen name="Klotze3" component={Klotze3} />
    <RootStack.Screen name="Gewinde3" component={Gewinde3} />
    <RootStack.Screen name="Gewinde2" component={Gewinde2} />
    <RootStack.Screen name="Umdrehen3" component={Umdrehen3} />
    <RootStack.Screen name="GewindeTraining2" component={GewindeTraining2} />
    <RootStack.Screen name="GewindeTraining3" component={GewindeTraining3} />

    <RootStack.Screen name="KlotzeTraining2" component={KlotzeTraining2} />
    <RootStack.Screen name="KlotzeTraining3" component={KlotzeTraining3} />
    <RootStack.Screen name="TippenTraining2" component={TippenTraining2} />
    <RootStack.Screen name="UmdrehenTraining2" component={UmdrehenTraining2} />
    <RootStack.Screen name="TurmeTraining2" component={TurmeTraining2} />
    <RootStack.Screen name="TurmeTraining3" component={TurmeTraining3} />
    <RootStack.Screen name="KreuzenTraining2" component={KreuzenTraining2} />
    <RootStack.Screen
      name="KreuzenSmallTraining2"
      component={KreuzenSmallTraining2}
    />
    <RootStack.Screen name="TherapistLogin" component={TherapistLogin} />
    <RootStack.Screen name="UmdrehenTraining3" component={UmdrehenTraining3} />
    <RootStack.Screen name="TherapistDetails" component={TherapistDetails} />
    <RootStack.Screen name="PatientLogin" component={PatientLogin} />
    <RootStack.Screen name="FeedbackScreen" component={FeedbackScreen} />
    <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <RootStack.Screen name="ZielenTraining2" component={ZielenTraining2} />
    <RootStack.Screen name="PatientMgmtScreen" component={PatientMgmtScreen} />
    <RootStack.Screen
      name="ÜbungsauswahlScreen"
      component={ÜbungsauswahlScreen}
    />
    <RootStack.Screen name="MazeMain" component={MazeMain} />
    <RootStack.Screen name="Kreuzen2" component={Kreuzen2} />
    <RootStack.Screen name="KreuzenBig2" component={KreuzenBig2} />
    <RootStack.Screen name="Umdrehen2" component={Umdrehen2} />
    <RootStack.Screen name="TherapistHome" component={TherapistHome} />
    <RootStack.Screen name="PatientDetails" component={PatientDetails} />
    <RootStack.Screen name="PatientID" component={PatientID} />
    <RootStack.Screen name="PatientWeekDay" component={PatientWeekDay} />
    <RootStack.Screen name="MotorSkills" component={MotorSkills} />
    <RootStack.Screen name="ZielenType" component={ZielenType} />
    <RootStack.Screen name="ZielenTesting" component={ZielenTesting} />
    <RootStack.Screen
      name="ZielenTestingExercise"
      component={ZielenTestingExercise}
    />
    <RootStack.Screen name="Statistics" component={Statistics} />
    <RootStack.Screen
      name="ZielenTrainingExercise"
      component={ZielenTrainingExercise}
    />
    <RootStack.Screen name="TippenType" component={TippenType} />
    <RootStack.Screen name="TippenTesting" component={TippenTesting} />
    <RootStack.Screen
      name="TippenTrainingExercise"
      component={TippenTrainingExercise}
    />
    <RootStack.Screen
      name="TippenTestingExercise"
      component={TippenTestingExercise}
    />
    <RootStack.Screen
      name="KreuzenBigExercise"
      component={KreuzenBigExercise}
    />
    <RootStack.Screen name="KreuzenBigSmall" component={KreuzenBigSmall} />
    <RootStack.Screen name="KreuzenType" component={KreuzenType} />
    <RootStack.Screen name="KreuzenTesting" component={KreuzenTesting} />
    <RootStack.Screen
      name="KreuzenSmallExercise"
      component={KreuzenSmallExercise}
    />
    <RootStack.Screen
      name="KreuzenBigTraining"
      component={KreuzenBigTraining}
    />
    <RootStack.Screen
      name="KreuzenSmallTraining"
      component={KreuzenSmallTraining}
    />
    <RootStack.Screen name="KreuzenTesting2" component={KreuzenTesting2} />
    <RootStack.Screen name="Timer" component={Timer} />
    <RootStack.Screen name="TimerTraining" component={TimerTraining} />
    <RootStack.Screen name="Nachfahren" component={Nachfahren} />
    <RootStack.Screen name="UmdrehenType" component={UmdrehenType} />
    <RootStack.Screen name="TürmeType" component={TürmeType} />
    <RootStack.Screen name="KlötzeType" component={KlötzeType} />
    <RootStack.Screen name="GewindeType" component={GewindeType} />
    <RootStack.Screen name="MemorySpiel" component={MemorySpiel} />
    <RootStack.Screen name="Augenübungen" component={Augenübungen} />
    <RootStack.Screen name="ShapeTrace" component={ShapeTrace} />
    <RootStack.Screen name="ConnectDots" component={ConnectDots} />
    <RootStack.Screen name="CategorySelect" component={CategorySelect} />
    <RootStack.Screen name="CognitiveSkills" component={CognitiveSkills} />
  </RootStack.Navigator>
);

export default RootStackScreen;
