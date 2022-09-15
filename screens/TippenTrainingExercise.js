import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Circle2 from "../components/Circle2";
import firebase from "firebase/compat";
import useInterval from "../helper/useInterval";

const TippenTrainingExercise = ({ navigation, route }) => {
  const { id, score, highScore } = route.params;
  const [timeLeft, setTimeLeft] = useState(0);
  const [scr, setScr] = useState(0);
  const [elements, setElements] = useState([]);
  useEffect(() => {
    console.log("screen called");
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    changeScreenOrientation();
  }, []);

  //   const [timeLeft, setTimeLeft] = useState(0);
  //   //const [isGameOver, setGameOver] = useState(false);
  //   const [scr, setScr] = useState(0);
  //   const [attempts, setAttempts] = useState(1);
  //   const [count, setCount] = useState(4);
  //   const [attempt1, setAttempt1] = useState(null);
  //   const [attempt2, setAttempt2] = useState(null);
  //   const [attempt3, setAttempt3] = useState(null);
  //   const [attempt4, setAttempt4] = useState(null);
  //   const [average, setAverage] = useState(0);
  //   const [elements, setElements] = useState(["1"]);

  //   var s = 0;
  //   var at1;
  //   var at2;
  //   var at3;
  //   var at4;
  //   var avg;
  const [use, setUser] = useState();

  useInterval(() => {
    // Your custom logic here
    if (timeLeft > 0 && scr != score) {
      setTimeLeft(timeLeft + 1);
    }
  }, 1000);

  const backButtonFunction = () => {
    navigation.goBack();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };

  const addScr = (number) => {
    let copy = [...elements];
    copy.push(number);
    setElements(copy);
    if (copy.length == 3) {
      if (copy[0] == "1" && copy[1] == "2" && copy[2] == "3") {
        setScr(scr + 1);
        copy = [];
        setElements(copy);
      } else {
        copy = [];
        setElements(copy);
      }
    }
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
                name: "Tippen",
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
                name: "Tippen",
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
          mymessage =
            "Wow good going!!Your Goal was achieved in " +
            timeLeft +
            " seconds";
        case 2:
          mymessage =
            "Amazing!!Your Goal was achieved in " + timeLeft + " seconds";
        case 3:
          mymessage =
            "2 days in a row!! Your Goal was achieved in " +
            timeLeft +
            " seconds";
        case 4:
          mymessage =
            "On a roll!! Your Goal was achieved in " + timeLeft + " seconds";
      }
      Alert.alert("Play", mymessage, [
        {
          text: "Play Again",
          onPress: () => {
            let train = {
              name: "Tippen",
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
              name: "Tippen",
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

  //   const onDeleteBTN = () => {
  //     let test = {
  //       name: "Zielen",
  //       score: scr,
  //     };
  //     const dbRef = firebase
  //       .firestore()
  //       .collection("patients")
  //       .doc(this.props.route.params.userkey);
  //     dbRef.get().then((res) => {
  //       const user = res.data();
  //       console.log(user);
  //       setUser(
  //         (use[0] = res.id),
  //         (use[1] = user.name),
  //         (use[2] = user.age),
  //         (use[3] = user.id),
  //         (use[4] = user.remarks),
  //         (use[5] = user.test),
  //         (use[6] = user.train)
  //       );
  //       let testResult = use[5].exercise.append(test);

  //       console.log("Resukt " + testResult);
  //       alert(testResult);
  //       const updateDBRef = firebase.firestore().collection("patients").doc(id);
  //       updateDBRef
  //         .set({
  //           test: testResult,
  //         })
  //         .then(() => {
  //           console.log(testResult);
  //           alert(testResult);
  //         })
  //         .catch((e) => {
  //           print(e);
  //         });
  //       this.alert(" Ihr Ergebnis wird gespeichert");
  //     });
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>
        Restzeit: {timeLeft} Score:{scr}
      </Text>
      {/* <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() => {
          setScr(0);
          setTimeLeft(1);
        }}>
        <Text>Timer Started!</Text>
      </TouchableOpacity> */}
      <Text style={styles.look}></Text>
      <View style={styles.game}>
        <Circle2 addScr={addScr}></Circle2>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={backButtonFunction}>
        <Text>Zurück</Text>
      </TouchableOpacity>
      {scr === score ? checkPlay() : null}
      {/* </TouchableOpacity> */}
      {/* {
                timeLeft === 0 ? Alert.alert(
                    "Alert Title",
                    `Die Zeit ist abgelaufen! Ihr Spielstand ist: ${scr}`,
                    [
                        // {
                        //     text: "Save",
                        //     onPress: () => console.log("Cancel Pressed")
                        // },
                        {
                            text: "Speichern",
                            onPress: this.onDeleteBTN,

                        },
                        {
                            text: "Abbrechen",
                            onPress: () => { navigation.navigate('MotorSkills') }
                        }

                    ]
                ) : null
            } */}
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
    padding: 30,
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    paddingTop: 10,
    flexDirection: "row",
    textAlign: "center",
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

export default TippenTrainingExercise;
