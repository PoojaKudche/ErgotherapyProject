import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from "react-native-orientation-locker";
import * as ScreenOrientation from "expo-screen-orientation";
import Circle from "../components/Circle";
import useInterval from "../helper/useInterval";
import firebase from "firebase/compat";

const ZielenTrainingExercise = ({ navigation, route }) => {
  const { id, score, highScore } = route.params;
  const [timeLeft, setTimeLeft] = useState(0);
  //const [isGameOver, setGameOver] = useState(false);
  const [scr, setScr] = useState(0);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    Alert.alert(
      "Achtung",
      "Klicken Sie auf Start und versuchen in 60 Sekunden so viele Wiederholungen wie moglich zu schaffen",
      [
        {
          text: "Start",
          onPress: () => {
            setTimeLeft(1);
          },
        },
      ]
    );
  }, []);
  useInterval(() => {
    // Your custom logic here
    if (timeLeft > 0 && scr != score) {
      setTimeLeft(timeLeft + 1);
    }
  }, 1000);
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
  changeScreenOrientation();

  const backButtonFunction = () => {
    navigation.goBack();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };

  const addScr = (number) => {
    let copy = [...elements];

    copy.push(number);

    setElements(copy);

    if (number == "15" && copy[1] == "15" && copy[0] != "15") {
      copy = [];
      setElements([]);

      setScr(scr + 1);
    }

    if (copy.length > 2) {
      copy = [];

      setElements([]);
    }
  };

  const restScr = () => {
    setTimeLeft(0);
    setScr(0);
  };

  const checkPlay = () => {
    if (timeLeft < highScore) {
      Alert.alert(
        "Play",
        "Great new High Score was achieved in  " + timeLeft + " seconds",
        [
          {
            text: "Play Again",
            onPress: () => {
              let train = {
                name: "Zielen",
                score: timeLeft,
                date: new Date().toLocaleDateString(),
              };
              const dbRef = firebase.firestore().collection("patients").doc(id);
              dbRef
                .get()
                .then((res) => {
                  console.log(res);
                  const user = res.data();
                  console.log(user);

                  //   setUser(user.test);
                  //   console.log(use);
                  let testResult = user.train;
                  console.log(testResult);
                  testResult.push(train);
                  let t = {
                    exercise: testResult,
                  };
                  console.log(t);
                  const updateDBRef = firebase
                    .firestore()
                    .collection("patients")
                    .doc(id);
                  updateDBRef
                    .update({
                      train: testResult,
                    })
                    .then(() => {
                      alert("Score Recorded");
                      restScr;
                    })
                    .catch((e) => {
                      console(e);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
              console.log("DOne");
            },
          },
          {
            text: "Go Back",
            onPress: () => {
              let train = {
                name: "Zielen",
                score: timeLeft,
                date: new Date().toLocaleDateString(),
              };
              const dbRef = firebase.firestore().collection("patients").doc(id);
              dbRef
                .get()
                .then((res) => {
                  console.log(res);
                  const user = res.data();
                  console.log(user);

                  //   setUser(user.test);
                  //   console.log(use);
                  let testResult = user.train;
                  console.log(testResult);
                  testResult.push(train);
                  let t = {
                    exercise: testResult,
                  };
                  console.log(t);
                  const updateDBRef = firebase
                    .firestore()
                    .collection("patients")
                    .doc(id);
                  updateDBRef
                    .update({
                      train: testResult,
                    })
                    .then(() => {
                      alert("Score Recorded");
                      restScr;
                    })
                    .catch((e) => {
                      console(e);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
              console.log("DOne");
              backButtonFunction();
            },
          },
        ]
      );
    } else {
      let mymessage = "";
      let no = Math.floor(Math.random() * 4 + 1);
      console.log(no);
      switch (no) {
        case 1:
          mymessage = "Super! Sie haben " + timeLeft + " Sekunden gebraucht.";
        case 2:
          mymessage = "Sehr gut. Diesmal waren es" + timeLeft + "Sekunden.  ";
        case 3:
          mymessage =
            "2 Tage hintereinander!! Ihr Ziel wurde erreicht in" +
            timeLeft +
            "Sekunden";
        case 4:
          mymessage =
            "Super! Sie haben nur " + timeLeft + " Sekunden gebraucht.";
      }
      Alert.alert("Play", mymessage, [
        {
          text: "Play Again",
          onPress: () => {
            let train = {
              name: "Zielen",
              score: timeLeft,
              date: new Date().toLocaleDateString(),
            };
            const dbRef = firebase.firestore().collection("patients").doc(id);
            dbRef
              .get()
              .then((res) => {
                console.log(res);
                const user = res.data();
                console.log(user);

                //   setUser(user.test);
                //   console.log(use);
                let testResult = user.train;
                console.log(testResult);
                testResult.push(train);
                let t = {
                  exercise: testResult,
                };
                console.log(t);
                const updateDBRef = firebase
                  .firestore()
                  .collection("patients")
                  .doc(id);
                updateDBRef
                  .update({
                    train: testResult,
                  })
                  .then(() => {
                    alert("Score Recorded");
                    restScr;
                  })
                  .catch((e) => {
                    console(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
            console.log("DOne");
          },
        },
        {
          text: "Go Back",
          onPress: () => {
            let train = {
              name: "Zielen",
              score: timeLeft,
              date: new Date().toLocaleDateString(),
            };
            const dbRef = firebase.firestore().collection("patients").doc(id);
            dbRef
              .get()
              .then((res) => {
                console.log(res);
                const user = res.data();
                console.log(user);

                //   setUser(user.test);
                //   console.log(use);
                let testResult = user.train;
                console.log(testResult);
                testResult.push(train);
                let t = {
                  exercise: testResult,
                };
                console.log(t);
                const updateDBRef = firebase
                  .firestore()
                  .collection("patients")
                  .doc(id);
                updateDBRef
                  .update({
                    train: testResult,
                  })
                  .then(() => {
                    alert("Score Recorded");
                    restScr;
                  })
                  .catch((e) => {
                    console(e);
                  });
              })
              .catch((e) => {
                console.log(e);
              });
            console.log("DOne");
            backButtonFunction();
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>
        Restzeit: {timeLeft} Score:{scr}
      </Text>
      <Text style={styles.look}></Text>
      {/* <TouchableOpacity
        style={{
          marginBottom: 30,
          borderWidth: 2,
          borderColor: "black",
          borderStyle: "solid",
          marginTop: 10,
          height: 20,
        }}
        onPress={() => {
          setScr(0);
          setTimeLeft(1);
        }}>
        <Text>Timer Started!</Text>
      </TouchableOpacity> */}
      <View style={styles.game}>
        <Circle addScr={addScr}></Circle>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={backButtonFunction}>
        <Text style={{ fontWeight: "bold" }}>Zurück</Text>
      </TouchableOpacity>
      {scr === score ? checkPlay() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6E0EA",
    alignItems: "center",
  },
  game: {
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
  },
  boldText: {
    fontWeight: "900",
    paddingTop: 30,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 30,
  },
  backButton: {
    height: 50,
    width: 120,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    marginTop: -220,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 1,
  },
  backButtonText: {
    justifyContent: "center",
    alignItems: "center",
  },
});

// const mapStateToProps = state => {
//     return {
//         score: state.score
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         resetScore: () => dispatch(resetScore())
//     }
// }

export default ZielenTrainingExercise;
