import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
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
import { Audio } from "expo-av";
import useInterval from "../helper/useInterval";

const formatNumber = (number) => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

const Timer = ({ navigation, route }) => {
  const { id, name } = route.params;
  const [sound, setSound] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [remainingSecs, setRemainingSecs] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);
  const [scr, setScr] = useState(0);

  const [attempts, setAttempts] = useState(1);
  const [count, setCount] = useState(4);
  const [attempt1, setAttempt1] = useState(null);
  const [attempt2, setAttempt2] = useState(null);
  const [attempt3, setAttempt3] = useState(null);
  const [attempt4, setAttempt4] = useState(null);
  const [average, setAverage] = useState(0);
  const [elements, setElements] = useState(["1", "2", "3"]);
  const [modalVisible, setModalVisible] = useState(false);
  var newArr = [];
  const [counter, setCounter] = useState(0);
  var s = 0;
  var at1;
  var at2;
  var at3;
  var at4;
  var avg;
  const [use, setUser] = useState();

  useEffect(() => {
    Alert.alert(
      "Achtung",
      "Klicken Sie auf Start und versuchen in 60 Sekunden so viele Wiederholungen wie moglich zu schaffen",
      [
        {
          text: "Start",
          onPress: () => {
            setTimeLeft(60);
          },
        },
      ]
    );
    console.log("screen called");
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    changeScreenOrientation();
  }, []);
  async function playSound() {
    console.log("Loading Sound");

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/alarm.mp3")
    );

    setSound(sound);

    console.log("Playing Sound");

    await sound.playAsync();
    setTimeout(() => {
      sound.stopAsync();
    }, 5000);
  }
  useInterval(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
    if (timeLeft == 1) {
      playSound();
    }
    if (timeLeft == 1) {
      if (count >= 0) {
        Alert.alert(
          "Testing Round",
          "Super! Sie haben Runde " +
            attempts +
            " vertig gemacht. Drücken Sie Start, um mit der nächsten Runde fortzufahren. Der Timer startet, wenn Sie auf Start klicken",
          [
            {
              text: "OK",
              onPress: () => {
                playAgain();
              },
            },
          ]
        );
      }
    }
  }, 1000);

  const playAgain = () => {
    if (attempts <= 4) {
      setCount(count - 1);
      console.log("in WHile " + attempts);
      if (attempts == 1) {
        setAttempt1(scr);
        at1 = scr;
        console.log("Attempt 1" + scr);
        setAttempts(attempts + 1);
        setScr(0);
        setTimeLeft(60);
      } else if (attempts == 2) {
        setAttempt2(scr);
        at2 = scr;
        console.log("Attempt 2" + scr);
        setAttempts(attempts + 1);
        setScr(0);
        setTimeLeft(60);
      } else if (attempts == 3) {
        setAttempt3(scr);
        at3 = scr;
        console.log("Attempt 3" + scr);
        setAttempts(attempts + 1);
        setScr(0);
        setTimeLeft(60);
      } else {
        at4 = scr;
        setAttempt4(scr);
        console.log("Attempt 4" + scr);
        setAttempts(attempts + 1);
        avg = (attempt1 + attempt2 + attempt3 + scr) / 4;
        setAverage(avg);
        console.log(avg);

        // Alert.alert(
        //   "Herzlichen Glückwunsch",
        //   `Die Zeit ist abgelaufen! Ihr Spielstand ist: ${avg}`,
        //   [
        //     {
        //       text: "Speichern",
        //       onPress: () => {},
        //     },
        //     {
        //       text: "Abbrechen",
        //       onPress: () => {
        //         navigation.navigate("MotorSkills");
        //       },
        //     },
        //   ]
        // );
      }
      console.log(at1);
      console.log(at2);
      console.log(at3);
      console.log(at4);

      console.log(s);
    } else {
    }
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setRemainingSecs(60);
    setIsActive(false);
  };

  // useEffect(() => {
  //   let interval = null;
  //   console.log(name);
  //   if (isActive && remainingSecs != 0) {
  //     interval = setInterval(() => {
  //       setRemainingSecs((remainingSecs) => remainingSecs - 1);
  //     }, 1000);
  //   } else if (!isActive && remainingSecs !=1) {
  //     clearInterval(interval);
  //   }
  //   else if (remainingSecs == 0){
  //     clearInterval(interval)
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, remainingSecs]);

  const sendData = () => {
    let week = 4;
    let now = new Date();
    now.setDate(now.getDate() + week * 7);
    console.log(now);
    let test = {
      name: name,
      score: Math.round(
        (parseInt(attempt1) +
          parseInt(attempt2) +
          parseInt(attempt3) +
          parseInt(attempt4)) /
          4
      ),
      date: new Date().toLocaleDateString(),
      nextDate: now.toLocaleDateString(),
      attempt1: attempt1,
      attempt2: attempt2,
      attempt3: attempt3,
      attempt4: attempt4,
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
        let testResult = user.test;
        console.log(testResult);
        testResult.push(test);
        let t = {
          exercise: testResult,
        };
        console.log(t);
        const updateDBRef = firebase.firestore().collection("patients").doc(id);
        updateDBRef
          .update({
            test: testResult,
          })
          .then(() => {
            alert("Herzlichen Glückwunsch! Ihr Spielstand ist: " + test.score);
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
      <Text style={styles.boldText}>Restzeit: {timeLeft}</Text>

      {/* <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={reset}
        style={[styles.button, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset </Text>
      </TouchableOpacity> */}

      <TextInput
        style={{
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "black",
          borderStyle: "solid",
          marginTop: 20,
          height: 40,
          width: "45%",
          textAlign: "center",
          borderRadius: 30,
          backgroundColor: "#ffffff",
        }}
        onChangeText={setAttempt1}
        value={attempt1}
        placeholder="Geben Sie Ihre Punktzahl fur den ersten Versuch ein."></TextInput>
      <TextInput
        style={{
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "black",
          borderStyle: "solid",
          marginTop: 10,
          height: 40,
          width: "45%",
          textAlign: "center",
          borderRadius: 30,
          backgroundColor: "#ffffff",
        }}
        onChangeText={setAttempt2}
        value={attempt2}
        placeholder="Geben Sie Ihre Punktzahl fur den zweiten Versuch ein."></TextInput>
      <TextInput
        style={{
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "black",
          borderStyle: "solid",
          marginTop: 10,
          height: 40,
          width: "45%",
          textAlign: "center",
          borderRadius: 30,
          backgroundColor: "#ffffff",
        }}
        onChangeText={setAttempt3}
        value={attempt3}
        placeholder="Geben Sie Ihre Punktzahl fur den dritten Versuch ein."></TextInput>
      <TextInput
        style={{
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "black",
          borderStyle: "solid",
          marginTop: 10,
          height: 40,
          width: "45%",
          textAlign: "center",
          borderRadius: 30,
          backgroundColor: "#ffffff",
        }}
        onChangeText={setAttempt4}
        value={attempt4}
        placeholder="Geben Sie Ihre Punktzahl fur den vierten Versuch ein."></TextInput>
      <TouchableOpacity onPress={sendData}>
        <Text
          style={{
            width: 300,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            borderColor: "black",
            borderWidth: 1,
            marginTop: 60,
            backgroundColor: "#ffffff",
            textAlign: "center",
            paddingTop: 11,
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
          }}>
          Punktzahlen geben
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
    paddingTop: 80,
  },
  button: {
    borderWidth: 10,
    borderColor: "#FB1A1A",
    width: screen.width / 4,
    height: screen.width / 4,
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
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 60,
    backgroundColor: "#ffffff",
  },
  boldText: {
    fontWeight: "900",
    paddingTop: 30,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 30,
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default Timer;
