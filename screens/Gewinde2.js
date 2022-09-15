import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

const Gewinde2 = ({ navigation, route }) => {
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.header_bigtext}>Testing : Gewinde</Text>
      </View>
      <View style={styles.footer}>
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          Übung: Stellen Sie gleich jeweils die obere Dose nach unten und die
          untere Dose oben darauf.
        </Text>
        <Image
          source={require("../assets/Gewinde3.png")}
          style={styles.img_style}
        />
        <Text style={{ fontWeight: "bold", marginTop: 60, fontSize: 25 }}>
          Zählen Sie wie viele Durchgänge Sie geschraubt haben!
        </Text>

        <TouchableOpacity
          style={styles.btn_submit}
          onPress={() => {
            navigation.navigate("Gewinde3", { id: id, name: "Gewinde" });
          }}>
          <Text style={styles.btn_text}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Gewinde2;

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
    height: 1100,
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
    marginTop: 50,
    borderRadius: 20,
    height: 410,
    width: 780,
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
});
