import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
// import { LinearGradient } from "expo-linear-gradient";
// import { AuthContext } from '../components/context';
import { useTheme } from "react-native-paper";
import { auth, db } from "../firebase";
import firebase from "firebase/compat";

const TherapistLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return firebase
          .firestore()
          .collection("therapists")
          .doc(userCredentials.user.uid)
          .set({
            email: userCredentials.user.email,
          })
          .then(() => {
            const user = userCredentials.user;
            navigation.navigate("TherapistDetails");
          });
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("TherapistHome");
      })
      .catch((error) => alert(error.message));
  };

  const { colors } = useTheme();

  const updateSecureTextEntry = () => {
    setPassword({
      secureTextEntry: !password.secureTextEntry,
    });
  };

  // const loginHandle = (emailid, password) => {
  //     tlogin(emailid, password);
  // }

  return (
    <KeyboardAvoidingView style={styles.maincontainer} behavior="padding">
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#DBDBCC" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Login</Text>
        </View>

        <Animatable.View
          transition="fadeInUpBig"
          style={[styles.footer, { backgroundColor: colors.background }]}>
          <Text style={[styles.text_footer, { color: colors.text }]}>
            E-Mail-Addresse
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="ihre Emailaddresse"
              placeholderTextColor="#666666"
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {/* {email.check_textInputChange ?
                            <Animatable.View animation="bounceIn" >
                                <Feather
                                    name="check-circle"
                                    color="black"
                                    size={20} />
                            </Animatable.View>
                            : null} */}
          </View>

          <Text
            style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}>
            Passwort
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="ihr passwort"
              placeholderTextColor="#666666"
              secureTextEntry
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {password.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.tlogin,
                {
                  borderColor: "black",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={handleLogin}>
              <Text
                style={[
                  styles.textSubmit,
                  {
                    color: "black",
                  },
                ]}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.tsignup,
                {
                  borderColor: "black",
                  borderWidth: 1,
                  marginTop: 2,
                },
              ]}
              onPress={handleSignUp}>
              <Text
                style={[
                  styles.textSubmit,
                  {
                    color: "black",
                  },
                ]}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TherapistLogin;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#DBDBCC",
    borderRadius: 40,
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 360,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 130,
    paddingVertical: 30,
  },
  text_footer: {
    color: "black",
    fontSize: 18,
    width: 550,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#DBDBCC",
  },
  tlogin: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#ffffff",
  },
  tsignup: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#ffffff",
  },
  button: {
    alignItems: "center",
    marginTop: 70,
  },
  textSubmit: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
