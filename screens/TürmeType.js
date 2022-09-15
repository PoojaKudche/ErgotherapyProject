import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

const TürmeType = ({ navigation, route }) => {
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
          if (user.test[i].name == "Turme") {
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
        <Text style={styles.header_text}>Übung 6 : Turme</Text>
      </View>
      <View style={styles.footer}>
        {/* <Text style={styles.footer_text}>
          Stapeln Sie jeweils die gleichgroßen Gefäße aufeinander und stellen
          Sie dann wieder nebeneinander ab.{" "}
        </Text>
        <Text style={styles.para_text}>
          Machen Sie die Übung so oft wie möglich in einer Minute
        </Text>
        <Text style={styles.para_text}>
          Starten Sie die Uhr, wenn Sie bereit sind
        </Text> */}
        {disable === "Testing" ? (
          <View>
            <Text style={styles.footer_smalltext}>Training</Text>
            <Text style={styles.para_text}>
              Trainieren Sie auf der Grundlage Ihrer Testergebnisse Ihre
              Handfunktion
            </Text>
            <Text style={styles.para_text}>
              Vorbereitung: Stellen Sie die jeweils gleichgroßen Dosen
              aufeinander ab.
            </Text>
            <Image
              source={require("../assets/turme.png")}
              style={styles.img_style}
            />

            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("TurmeTraining2", {
                  id: id,
                  name: "Turme",
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
              Vorbereitung: Stellen Sie die jeweils gleichgroßen Dosen
              aufeinander ab.
            </Text>
            <Image
              source={require("../assets/turme.png")}
              style={styles.img_style}
            />
            <TouchableOpacity
              style={styles.btn_submit}
              onPress={() => {
                navigation.navigate("Turme2", { id: id, name: "Turme" });
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
            navigation.navigate("Timer", { id: id, name: "Turme" });
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

export default TürmeType;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
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
    height: 1013,
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
    marginTop: 70,
    backgroundColor: "#ffffff",
    marginLeft: "35%",
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
    marginTop: 10,
    borderRadius: 20,
    height: 470,
    width: 680,
    marginLeft: 55,
  },
});
