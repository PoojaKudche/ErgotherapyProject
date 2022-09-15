import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

const KlötzeType = ({ navigation, route }) => {
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
        console.log(l);
        let gameArray = [];
        for (let i = 0; i < user.test.length; i++) {
          if (user.test[i].name == "Klotze") {
            gameArray.push(user.test[i]);
          }
        }
        let testArray = [];
        let myconst = 0;
        for (let i = 0; i < user.train.length; i++) {
          if (user.train[i].name == "Klotze") testArray.push(user.train[i]);
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
        <Text style={styles.header_text}>Übung 7 : Klötze</Text>
      </View>
      <View style={styles.footer}>
        {disable === "Testing" ? (
          <View>
            <Text style={styles.footer_smalltext}>Training</Text>
            <Text style={styles.para_text}>
              Trainieren Sie auf der Grundlage Ihrer Testergebnisse Ihre
              Handfunktion
            </Text>
            <Text style={styles.para_text}>
              Vorbereitung: Legen Sie bitte 10 Unterlegscheiben vor sich auf dem
              Tisch bereit.
            </Text>
            <Image
              source={require("../assets/klotze.png")}
              style={styles.img_style}
            />

            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("KlotzeTraining2", {
                  id: id,
                  name: "Klotze",
                  score: testScore,
                });
              }}
              // onPress={() => {
              //   navigation.navigate("ZielenTrainingExercise", { id: id });
              // }}
            >
              <Text style={styles.btn_text}>Fertig</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.footer_smalltext}>Testing</Text>
            <Text style={styles.para_text}>
              Starten Sie Ihre Übung mit Testen. Der Test erscheint einmal pro
              Woche
            </Text>
            <Text style={styles.para_text}>
              Vorbereitung: Legen Sie bitte 10 Unterlegscheiben vor sich auf dem
              Tisch bereit.
            </Text>
            <Image
              source={require("../assets/klotze.png")}
              style={styles.img_style}
            />
            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("Klotze2", { id: id, name: "Klotze" });
              }}
              // onPress={() => {
              //   navigation.navigate("ZielenTrainingExercise", { id: id });
              // }}
            >
              <Text style={styles.btn_text}>Fertig</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* <TouchableOpacity
          style={styles.btn_submit}
          onPress={() => {
            navigation.navigate("Timer", { id: id, name: "Klotze" });
          }}>
          <Text style={styles.btn_text}>Nächste</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.btn_back}
          onPress={() => {
            navigation.navigate("MotorSkills");
          }}>
          <Text style={styles.btn_text}>Zurück</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default KlötzeType;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  header: {
    width: 800,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#DBDBCC",
    height: 120,
    borderRadius: 40,
  },
  header_text: {
    fontSize: 38,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    backgroundColor: "#fff",
    height: 1100,
    paddingTop: 30,
    width: "100%",
  },
  footer_text: {
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
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
    marginTop: 80,
    backgroundColor: "#ffffff",
    marginLeft: "30%",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  para_text: {
    fontSize: 24,
    padding: 30,
    textAlign: "center",
  },

  btn_back: {
    padding: 5,
    textAlign: "center",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 50,
    backgroundColor: "#ffffff",
  },
  img_style: {
    marginTop: 15,
    borderRadius: 20,
    height: 410,
    width: 780,
  },
});
