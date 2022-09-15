import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

const UmdrehenTraining2 = ({ navigation, route }) => {
  const { id, highScore, score } = route.params;
  const [testScore, setTestScore] = useState(null);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.header_bigtext}>Training : Umdrehen</Text>
      </View>
      <View style={styles.footer}>
        {/* <Text style={{ fontSize: 40, fontWeight: "bold", marginTop: 100 }}>
          Sie haben genau eine Minute Zeit
        </Text> */}
        <Text style={{ fontSize: 24, marginTop: 60, marginLeft: -700 }}>
          Übung
        </Text>
        <Text style={{ fontSize: 24, marginTop: 5 }}>
          Drehen Sie gleich die Unterlegscheiben immer wieder um und zählen Ihre
          Durchgänge.
        </Text>

        <Image
          source={require("../assets/umdrehen_ubung.png")}
          style={styles.img_style}
        />
        <TouchableOpacity
          style={styles.btn_submit}
          onPress={() => {
            navigation.navigate("UmdrehenTraining3", {
              id: id,
              name: "Umdrehen",
              score: score,
            });
          }}>
          <Text style={styles.btn_text}>Hier geht's zum Training</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UmdrehenTraining2;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  header: {
    width: 800,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#DBDBCC",
    height: 110,
    borderRadius: 40,
  },
  header_bigtext: {
    fontSize: 38,
    fontWeight: "bold",
  },
  header_smalltext: {
    fontSize: 28,
    fontWeight: "bold",
  },
  footer: {
    width: 800,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    backgroundColor: "#fff",
    height: 1000,
    paddingTop: 30,
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
    marginLeft: 10,
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  para_text: {
    fontSize: 20,
    padding: 50,
    textAlign: "center",
    marginTop: 20,
  },
  img_style: {
    marginTop: -80,
    borderRadius: 20,
    height: 120,
    width: 280,
  },
  btn_back: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 40,
    backgroundColor: "#ffffff",
    marginLeft: 15,
  },
  img_style: {
    marginTop: 70,
    borderRadius: 20,
    height: 210,
    width: 750,
    marginLeft: 1,
  },
});
