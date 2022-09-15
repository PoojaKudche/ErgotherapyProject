import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

const Circle = (props) => {
  const [isGameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(10);

  function endGame(number) {
    props.addScr(number);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => endGame("1")}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: "#EF4B4C",
              marginRight: 70,
              marginTop: 100,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("2")}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              backgroundColor: "#EF4B4C",
              marginRight: 70,
              marginTop: 100,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("3")}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              backgroundColor: "#EF4B4C",
              marginRight: 60,
              marginTop: 100,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("4")}>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              backgroundColor: "#EF4B4C",
              marginRight: 50,
              marginTop: 100,
            }}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => endGame("5")}>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              backgroundColor: "#EF4B4C",
              marginRight: 10,
              marginTop: 100,
            }}></View>
        </TouchableOpacity>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: -300 }}>
        <TouchableOpacity onPress={() => endGame("6")}>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              backgroundColor: "#EF4B4C",
              marginLeft: 10,
              marginBottom: 50,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("7")}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 120 / 2,
              backgroundColor: "#EF4B4C",
              marginLeft: 70,
              marginBottom: 50,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("8")}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              backgroundColor: "#EF4B4C",
              marginLeft: 70,
              marginBottom: 50,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("9")}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: "#EF4B4C",
              marginLeft: 70,
              marginBottom: 50,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => endGame("10")}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              backgroundColor: "#EF4B4C",
              marginLeft: 70,
              marginBottom: 50,
            }}></View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => endGame("15")}
        style={{
          width: 150,
          height: 150,
          borderRadius: 100,
          marginLeft: 40,
          marginTop: 150,
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            backgroundColor: "#0000ff",
          }}></View>
      </TouchableOpacity>

      {/*  {isGameOver && Alert.alert ("Zeit hoch! Ihr Spielstand ist" , `${props.score}`)}  */}
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
});

const mapStateToProps = (state) => {
  return {
    score: state.score,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScore: () => dispatch(addScore()),
  };
};

export default Circle;
