import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MotorSkills from "./MotorSkills";
import { useNavigation } from "@react-navigation/core";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase/compat";
const screen = Dimensions.get("window");

const formatNumber = (number) => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

const TimerTraining = ({ navigation, route }) => {
  const { id, name, score } = route.params;
  const [remainingSecs, setRemainingSecs] = useState(0);
  // const [attempt1, setAttempt1] = useState(null);
  // const [attempt2, setAttempt2] = useState(null);
  // const [attempt3, setAttempt3] = useState(null);
  // const [attempt4, setAttempt4] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    console.log(name);
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  const sendData = () => {
    let week = 4;
    let now = new Date();
    now.setDate(now.getDate() + week * 7);
    console.log(now);
    let test = {
      name: name,
      date: new Date().toLocaleDateString(),
      score: remainingSecs,
    };
    const dbRef = firebase.firestore().collection("patients").doc(id);
    dbRef
      .get()
      .then((res) => {
        console.log(res);
        const user = res.data();
        console.log(user);

        //   setUser(user.test);
        //   console.log(use);
        let testResult = user.train;
        console.log(testResult);
        testResult.push(test);
        let t = {
          exercise: testResult,
        };
        console.log(t);
        const updateDBRef = firebase.firestore().collection("patients").doc(id);
        updateDBRef
          .update({
            train: testResult,
          })
          .then(() => {
            alert("updated");
          })
          .catch((e) => {
            console(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("DOne");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={reset}
        style={[styles.button, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset </Text>
      </TouchableOpacity>

      {/* <TextInput
        onChangeText={setAttempt1}
        value={attempt1}
        placeholder="Enter your attempt's Score"></TextInput> */}

      <TouchableOpacity onPress={sendData}>
        <Text
          style={{
            borderRadius: 30,
            borderColor: "black",
            borderWidth: 1,
            marginTop: 60,
            backgroundColor: "#ffffff",
            width: 300,
            height: 50,
            textAlign: "center",
            paddingTop: 11,
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
          }}>
          Save Scores
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn_submit}
        onPress={() => {
          navigation.navigate("MotorSkills");
        }}>
        <Text style={styles.btn_text}>Zurück</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6E0EA",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: "#FB1A1A",
    width: screen.width / 3,
    height: screen.width / 3,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 45,
    color: "#FB1A1A",
  },
  timerText: {
    color: "#07121B",
    fontSize: 90,
    marginBottom: 20,
  },
  buttonReset: {
    marginTop: 20,
    borderColor: "#1818E6",
  },
  buttonTextReset: {
    color: "#1818E6",
  },
  btn_submit: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 60,
    backgroundColor: "#ffffff",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default TimerTraining;
