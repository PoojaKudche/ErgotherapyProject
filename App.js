import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  Screen,
  screensEnabled,
  shouldUseActivityState,
} from "react-native-screens";
import PatientLogin from "./screens/PatientLogin";
import TherapistLogin from "./screens/TherapistLogin";
import TherapistDetails from "./screens/TherapistDetails";
import { DrawerContent } from "./screens/DrawerContent";
import { AuthContext } from "./components/context";
import RootStackScreen from "./screens/RootStackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ÜbungsauswahlScreen from "./screens/ÜbungsauswahlScreen";
import PatientMgmtScreen from "./screens/PatientMgmtScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TherapistHome from "./screens/TherapistHome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Nachfahren from "./screens/Nachfahren";
import Maze from "./screens/Maze";
import Menu from "./screens/Menu";

const Drawer = createDrawerNavigator();

const App = () => {
  // const initialLoginState = {
  //   isLoading: true,
  //   emailid: null,
  //   userToken: null

  // const loginReducer = (prevState, action) => {
  //   switch (action.type) {
  //     case 'RETRIEVE_TOKEN':
  //       return {
  //         ...prevState,
  //         userToken: action.token,
  //         isLoading: false
  //       };
  //     case 'LOGIN':
  //       return {
  //         ...prevState,
  //         emailid: action.id,
  //         userToken: action.token,
  //         isLoading: false
  //       };
  //     case 'LOGOUT':
  //       return {
  //         ...prevState,
  //         emailid: null,
  //         userToken: null,
  //         isLoading: false
  //       };
  //     case 'REGISTER':
  //       return {
  //         ...prevState,
  //         emailid: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //   }
  // };

  // const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  // const authContext = React.useMemo(() => ({
  //   tlogin: async (emailid, password) => {
  //     let userToken;
  //     userToken = null;
  //     if (emailid == 'example@gmail.com' && password == 'Abc') {
  //       try {
  //         userToken = 'abcd';
  //         await AsyncStorage.setItem('userToken', userToken)
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     dispatch({ type: 'LOGIN', id: emailid, token: userToken });
  //   },
  //   signOut: async () => {
  //     try {
  //       userToken = 'abcd';
  //       await AsyncStorage.removeItem('userToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     dispatch({ type: 'LOGOUT' });
  //   },

  // }), []);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     let userToken;
  //     userToken = null;
  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     console.log('user token', userToken);
  //     dispatch({ type: 'REGISTER', token: userToken });
  //   }, 1000);
  // }, []);

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
  //       <ActivityIndicator size='large' />
  //     </View>
  //   );
  // }

  return (
    // <AuthContext.Provider value={authContext} >
    <NavigationContainer>
      {/* {loginState.userToken != null ? ( */}
      {/* <Drawer.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          height: 50
        },
        headerTintColor: 'black'
      }} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="TherapistHome" component={TherapistHome} options={{
          headerLeft: () => (
            <Icon name="ios-menu" size={25} onPress={() => {
              navigation.openDrawer()
            }} ></Icon>
          )
        }} />
        <Drawer.Screen name="ÜbungsauswahlScreen" component={ÜbungsauswahlScreen} />
        <Drawer.Screen name="Profil" component={ProfileScreen} />
        <Drawer.Screen name="Feedback" component={FeedbackScreen} />
        <Drawer.Screen name="Patientenmanagement" component={PatientMgmtScreen} />
      </Drawer.Navigator> */}
      {/* ) : */}

      <RootStackScreen></RootStackScreen>
    </NavigationContainer>
    // </AuthContext.Provider >
  );
};

export default App;
