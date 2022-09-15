import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

const KreuzenTesting = ({ navigation, route }) => {
  const { id } = route.params;
  const [testScore, setTestScore] = useState(null);
  const [disable, setDisable] = useState(null);
  const [highScoreTest, setHighScoreTest] = useState(0);

  useEffect(() => {
    const dbRef = firebase.firestore().collection("patients").doc(id);
    dbRef
      .get()
      .then((res) => {
        console.log(res);
        const user = res.data();
        let l = user.test.length;
        console.log(user.test[1]);
        let gameArray = [];
        for (let i = 0; i < user.test.length; i++) {
          console.log(user.test[i].name);
          if (user.test[i].name == "KreuzenBig") {
            gameArray.push(user.test[i]);
          }
        }
        let testArray = [];
        let myconst = 0;
        for (let i = 0; i < user.train.length; i++) {
          if (user.train[i].name == "KreuzenBig") testArray.push(user.train[i]);
        }
        if (testArray && testArray.length > 0) {
          for (let i = 0; i < testArray.length; i++) {
            if (testArray[i] > myconst) {
              myconst = testArray[i];
            }
            console.log(myconst);
            setHighScoreTest(myconst);
          }
        } else {
          myconst = 0;
          console.log(myconst);
          setHighScoreTest(myconst);
        }

        let len = gameArray.length;
        console.log(len);
        console.log(gameArray[len - 1].score);
        console.log(gameArray[len - 1].nextDate);
        setTestScore(gameArray[len - 1].score);
        let startDate = new Date(gameArray[len - 1].date).toLocaleDateString();
        let endDate = new Date(
          gameArray[len - 1].nextDate
        ).toLocaleDateString();
        let currentDate = new Date();
        let formatCurrentDate = currentDate.toLocaleDateString();
        console.log(startDate);
        console.log(startDate < endDate);
        console.log(formatCurrentDate);
        if (formatCurrentDate >= startDate && formatCurrentDate < endDate) {
          setDisable("Testing");
        } else {
          setDisable("Training");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.header_text}>Übung 3 : Kreuzen Level 1</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_text}>Sie beginnen mit dem</Text>
        {/* <Text style={styles.footer_smalltext}>Testing</Text>
        <Text style={styles.para_text}>
          Starten Sie Ihre Übung mit Testen. Der Test erscheint einmal pro Woche
        </Text> */}
        {/* <Text style={styles.footer_disabled_text}>Training</Text>
        <Text style={styles.para_text}>
          Trainieren Sie auf der Grundlage Ihrer Testergebnisse Ihre
          Handfunktion
        </Text> */}
        {disable === "Testing" ? (
          <View>
            <Text style={styles.footer_smalltext}>Training</Text>
            <Text style={styles.para_text}>
              Trainieren Sie auf der Grundlage Ihrer Testergebnisse Ihre
              Handfunktion
            </Text>
            <Text style={styles.para_text}>
              {" "}
              Schneiden Sie so viele Früchte wie möglich mit ihrem Finger durch
            </Text>
            <Image
              source={require("../assets/Kreuzen_game.png")}
              style={styles.img_style}
            />
            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("KreuzenTraining2", {
                  id: id,
                  score: testScore,
                  highScore: highScoreTest,
                });
              }}
              // onPress={() => {
              //   navigation.navigate("ZielenTrainingExercise", { id: id });
              // }}
            >
              <Text style={styles.btn_text}>Hier geht’s zum Train</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.footer_smalltext}>Testing</Text>
            <Text style={styles.para_text}>
              Starten Sie Ihre Übung mit Testen. Der Test erscheint einmal pro
              Monat
            </Text>
            <Text style={styles.para_text}>
              Schneiden Sie so viele Früchte wie möglich mit ihrem Finger durch
            </Text>
            <Image
              source={require("../assets/Kreuzen_game.png")}
              style={styles.img_style}
            />
            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("Kreuzen2", { id: id });
              }}
              // onPress={() => {
              //   navigation.navigate("ZielenTrainingExercise", { id: id });
              // }}
            >
              <Text style={styles.btn_text}>Hier geht’s zum Test</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* {/* <TouchableOpacity
          style={styles.btn_submit}
          onPress={() => {
            navigation.navigate("KreuzenBigExercise", { id: id });
          }}>
          <Text style={styles.btn_text}>Nächste</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={()=>{
            navigation.navigate("Statistics",{id:id});
          }}>
            <Text>Statistics</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default KreuzenTesting;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 65,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#DBDBCC",
    height: 110,
    borderRadius: 40,
  },
  header_text: {
    fontSize: 38,
    fontWeight: "bold",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    backgroundColor: "#fff",
    height: 1200,
    paddingTop: 30,
  },
  footer_text: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  footer_smalltext: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#216869",
    marginLeft: 340,
    marginTop: 10,
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
    marginLeft: 250,
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  para_text: {
    fontSize: 24,
    padding: 20,
    textAlign: "center",
    marginTop: 0,
  },
  footer_disabled_text: {
    fontSize: 22,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#808080",
  },
  btn_back: {
    padding: 20,
  },
  img_style: {
    marginTop: 35,
    borderRadius: 20,
    height: 470,
    width: 670,
    marginLeft: 60,
  },
});
