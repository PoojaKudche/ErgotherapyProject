import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

const Circle2 = (props) => {
  function endGame(number) {
    props.addScr(number);
  }

  return (
    <View style={styles.circle}>
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <Text style={styles.text1}>Daumen</Text>
        <TouchableOpacity onPress={() => endGame("1")}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 120 / 2,
              backgroundColor: "#1818E6",
              marginTop: 250,
            }}></View>
        </TouchableOpacity>

        <Text style={styles.text2}>Zeigefinger</Text>
        <TouchableOpacity onPress={() => endGame("2")}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 120 / 2,
              backgroundColor: "#10A738",
              marginRight: 70,
              marginTop: 40,
            }}></View>
        </TouchableOpacity>

        <Text style={styles.text3}>Mittelfinger</Text>
        <TouchableOpacity onPress={() => endGame("3")}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 120 / 2,
              backgroundColor: "#FB1A1A",
              marginRight: 100,
              marginTop: 60,
            }}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle1: {
    //  flex:1,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#EF4B4C",
    marginRight: 150,
    marginBottom: 50,
    padding: 20,
    alignItems: "center",
  },

  text1: {
    fontWeight: "bold",
    marginTop: 350,
    marginLeft: 60,
  },

  text2: {
    fontWeight: "bold",
    marginTop: 135,
    paddingLeft: 60,
  },

  text3: {
    fontWeight: "bold",
    marginTop: 160,
    paddingLeft: 20,
  },
});

export default Circle2;
