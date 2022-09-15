import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import FruitItem from './FruitItem';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

const Fruit1 = (props) => {

    const [isGameOver, setGameOver] = useState(false)
    const [timer, setTimer] = useState(10)
    const [watermelon1, setwatermelon1] = useState(true);
    const [Watermelon2, setWatermelon2] = useState(true); //1. state
    const [watermelon3, setWatermelon3] = useState(true); //1. state
    const [watermelon4, setWatermelon4] = useState(true); //1. state



    function endGame(number) {
        props.addScr(number);



    }

    const onSwipe = (direction, state, fruitName) => {
        console.log(fruitName)
        switch (fruitName) {
            case "watermelon1":
                setwatermelon1(false);
                setWatermelon2(true);
                setWatermelon3(true);
                setWatermelon4(true);
                break;
            case "watermelon2":
                setwatermelon1(true);
                setWatermelon2(false);
                setWatermelon3(true);
                setWatermelon4(true);
                break;
            case "watermelon3":
                setwatermelon1(true);
                setWatermelon2(true);
                setWatermelon3(false);
                setWatermelon4(true);
                break;
            case "watermelon4":
                setwatermelon1(true);
                setWatermelon2(true);
                setWatermelon3(true);
                setWatermelon4(false);
                break;
        }
        // setApple(false);

    }
    // style={{ width: 120, height: 120, borderRadius: 120 / 2, backgroundColor: "#1818E6", marginTop: 60 }}
    const watermelonDefault = require("../assets/fruit/watermelon.png");
    const watermelonOne = require("../assets/fruit/watermelon-1.png");
    const watermelonTwo = require("../assets/fruit/watermelon-2.png");

    // 2. watermelon img
    /* const watermelonDefault = require("../assets/fruit/watermelon.png");
    const watermelonOne = require("../assets/fruit/watermelon-1.png");
    const watermelonTwo = require("../assets/fruit/watermelon-2.png");

    const watermelonDefault = require("../assets/fruit/watermelon.png");
    const watermelonOne = require("../assets/fruit/watermelon-1.png");
    const watermelonTwo = require("../assets/fruit/watermelon-2.png");

    const watermelonDefault = require("../assets/fruit/watermelon.png");
    const watermelonOne = require("../assets/fruit/watermelon-1.png");
    const watermelonTwo = require("../assets/fruit/watermelon-2.png"); */

    return (
        <View style={{ flexDirection: 'row' }}>
            <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state, "watermelon1", endGame("1"))} config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            }} >
                <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                    <FruitItem isSwipped={watermelon1} imgDefault={watermelonDefault} imgOne={watermelonOne} imgTwo={watermelonTwo} fruitName={"watermelon"} />
                </View>
            </GestureRecognizer>


            <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state, "watermelon2", endGame("2"))} config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            }} >
                <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                    <FruitItem isSwipped={Watermelon2} imgDefault={watermelonDefault} imgOne={watermelonOne} imgTwo={watermelonTwo} fruitName={"watermelon"} />
                </View>
            </GestureRecognizer>


            <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state, "watermelon3", endGame("3"))} config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            }} >
                <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                    <FruitItem isSwipped={watermelon3} imgDefault={watermelonDefault} imgOne={watermelonOne} imgTwo={watermelonTwo} fruitName={"watermelon"} />
                </View>
            </GestureRecognizer>


            <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state, "watermelon4", endGame("4"))} config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            }} >
                <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                    <FruitItem isSwipped={watermelon4} imgDefault={watermelonDefault} imgOne={watermelonOne} imgTwo={watermelonTwo} fruitName={"watermelon"} />
                </View>
            </GestureRecognizer>


        </View>



    );
}


const mapStateToProps = state => {
    return {
        score: state.score
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScore: () => dispatch(addScore())
    }
}

export default Fruit1;