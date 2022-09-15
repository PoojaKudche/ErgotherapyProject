import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

const GewindeType = ({ navigation, route }) => {
  const { id } = route.params;
  const [testScore, setTestScore] = useState(null);
  const [disable, setDisable] = useState(null);

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
          if (user.test[i].name == "Gewinde") {
            gameArray.push(user.test[i]);
          }
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
        <Text style={styles.header_text}>Übung 8 : Gewinde</Text>
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
              Vorbereitung: Legen Sie die schrauben und Muttern bereit. Alle
              Muttern müssen an einen blauen Rand geschraubt sein.
            </Text>
            <Image
              source={require("../assets/Gewinde1.png")}
              style={styles.img_style}
            />

            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("GewindeTraining2", {
                  id: id,
                  name: "Gewinde",
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
              Monat
            </Text>
            <Text style={styles.para_text}>
              Vorbereitung: Drehen Sie die Mutter von einem blauen Ende zum
              anderen und zurück. Wechseln Sie die Schrauben von groß nach
              klein.
            </Text>
            <Image
              source={require("../assets/Gewinde1.png")}
              style={styles.img_style}
            />

            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("Gewinde2", { id: id, name: "Gewinde" });
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
            navigation.navigate("Timer", { id: id, name: "Gewinde" });
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

export default GewindeType;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
    width: 230,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 80,
    backgroundColor: "#ffffff",
    marginLeft: "32%",
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
    padding: 22,
    textAlign: "center",
  },
  img_style: {
    marginTop: 30,
    borderRadius: 20,
    height: 410,
    width: 410,
    marginLeft: "20%",
  },
});
