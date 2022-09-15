import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import FruitItem from "./FruitItem";

const Fruit2 = (props) => {
  const [isGameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(10);
  const [apple, setApple] = useState(true);
  const [watermelon, setWatermelon] = useState(true); //1. state
  const [strawberry, setStrawberry] = useState(true); //1. state
  const [peach, setPeach] = useState(true); //1. state

  function endGame(number) {
    props.addScr(number);
  }

  const onSwipe = (direction, state, fruitName) => {
    console.log(fruitName);
    switch (fruitName) {
      case "apple":
        setApple(false);
        setWatermelon(true);
        setStrawberry(true);
        setPeach(true);
        break;
      case "watermelon":
        console.log("from wm");
        setApple(true);
        setWatermelon(false);
        setStrawberry(true);
        setPeach(true);
        break;
      case "banana":
        console.log("from wm");
        setApple(true);
        setWatermelon(true);
        setStrawberry(false);
        setPeach(true);
        break;
      case "peach":
        console.log("from wm");
        setApple(true);
        setWatermelon(true);
        setStrawberry(true);
        setPeach(false);
        break;
    }
    // setApple(false);
  };
  // style={{ width: 120, height: 120, borderRadius: 120 / 2, backgroundColor: "#1818E6", marginTop: 60 }}
  const imgDefault = require("../assets/fruit/apple.png");
  const imgOne = require("../assets/fruit/apple-1.png");
  const imgTwo = require("../assets/fruit/apple-2.png");

  // 2. watermelon img
  const watermelonDefault = require("../assets/fruit/watermelon.png");
  const watermelonOne = require("../assets/fruit/watermelon-1.png");
  const watermelonTwo = require("../assets/fruit/watermelon-2.png");

  const strawberryDefault = require("../assets/fruit/strawberry.png");
  const strawberryOne = require("../assets/fruit/strawberry-1.png");
  const strawberryTwo = require("../assets/fruit/strawberry-2.png");

  const peachDefault = require("../assets/fruit/peach.png");
  const peachOne = require("../assets/fruit/peach-1.png");
  const peachTwo = require("../assets/fruit/peach-2.png");

  return (
    <View style={{ flexDirection: "row" }}>
      <GestureRecognizer
        onSwipe={(direction, state) =>
          onSwipe(direction, state, "apple", endGame("1"))
        }
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}>
        <View style={{ flexDirection: "row", marginLeft: 35 }}>
          <FruitItem
            isSwipped={apple}
            imgDefault={imgDefault}
            imgOne={imgOne}
            imgTwo={imgTwo}
          />
        </View>
      </GestureRecognizer>

      <GestureRecognizer
        onSwipe={(direction, state) =>
          onSwipe(direction, state, "watermelon", endGame("2"))
        }
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}>
        <View style={{ flexDirection: "row", marginLeft: 35 }}>
          <FruitItem
            isSwipped={watermelon}
            imgDefault={watermelonDefault}
            imgOne={watermelonOne}
            imgTwo={watermelonTwo}
            fruitName={"watermelon"}
          />
        </View>
      </GestureRecognizer>

      <GestureRecognizer
        onSwipe={(direction, state) =>
          onSwipe(direction, state, "banana", endGame("3"))
        }
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}>
        <View style={{ flexDirection: "row", marginLeft: 35 }}>
          <FruitItem
            isSwipped={strawberry}
            imgDefault={strawberryDefault}
            imgOne={strawberryOne}
            imgTwo={strawberryTwo}
            fruitName={"strawberry"}
          />
        </View>
      </GestureRecognizer>

      <GestureRecognizer
        onSwipe={(direction, state) =>
          onSwipe(direction, state, "peach", endGame("4"))
        }
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}>
        <View style={{ flexDirection: "row", marginLeft: 35 }}>
          <FruitItem
            isSwipped={peach}
            imgDefault={peachDefault}
            imgOne={peachOne}
            imgTwo={peachTwo}
            fruitName={"peach"}
          />
        </View>
      </GestureRecognizer>
    </View>
  );
};
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

export default Fruit2;
