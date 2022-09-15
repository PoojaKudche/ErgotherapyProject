import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Fruit2 from "../components/Fruit2";
import useInterval from "../helper/useInterval";
import firebase from "firebase/compat";

const KreuzenSmallTraining = ({ navigation, route }) => {
  const { id,score,highScore } = route.params;
  useEffect(() => {
    console.log("screen called");
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    changeScreenOrientation();
  }, []);

  const [timeLeft, setTimeLeft] = useState(0);
  // //const [isGameOver, setGameOver] = useState(false);
  const [scr, setScr] = useState(0);
//   const[timeLeft, setTimeLeft] = useState(0);
//   const [scr, setScr] = useState(0);
//   const [attempts, setAttempts] = useState(1);
//   const [count, setCount] = useState(4);
//   const [attempt1, setAttempt1] = useState(null);
//   const [attempt2, setAttempt2] = useState(null);
//   const [attempt3, setAttempt3] = useState(null);
//   const [attempt4, setAttempt4] = useState(null);
//   const [average, setAverage] = useState(0);

  const [elements, setElements] = useState(["1"]);
//   var s = 0;
//   var at1;
//   var at2;
//   var at3;
//   var at4;
//   var avg;

  const [use, setUser] = useState();

//   useInterval(() => {
//     if (timeLeft > 0) {
//       setTimeLeft(timeLeft - 1);
//     }
//     if (timeLeft == 1) {
//       if (count >= 0) {
//         Alert.alert(
//           "Testing Round",
//           "Great you finished Round " +
//             attempts +
//             " Press ok to continue to the next Round, the timer starts when you click ok",
//           [
//             {
//               text: "OK",
//               onPress: () => {
//                 playAgain();
//               },
//             },
//           ]
//         );
//       }
//     }
//   }, 1000);

useInterval(() => {
    // Your custom logic here
    if (timeLeft > 0 && scr != score) {
      setTimeLeft(timeLeft + 1);
    }
  }, 1000);


//   function doIt() {}
//   const play = () => {
//     setTimeout(doIt, 1000);
//   };

//   const playAgain = () => {
//     if (attempts <= 4) {
//       setCount(count - 1);
//       console.log("in WHile " + attempts);
//       if (attempts == 1) {
//         setAttempt1(scr);
//         at1 = scr;
//         console.log("Attempt 1" + scr);
//         setAttempts(attempts + 1);
//         setScr(0);
//         setTimeLeft(10);
//       } else if (attempts == 2) {
//         setAttempt2(scr);
//         at2 = scr;
//         console.log("Attempt 2" + scr);
//         setAttempts(attempts + 1);
//         setScr(0);
//         setTimeLeft(10);
//       } else if (attempts == 3) {
//         setAttempt3(scr);
//         at3 = scr;
//         console.log("Attempt 3" + scr);
//         setAttempts(attempts + 1);
//         setScr(0);
//         setTimeLeft(10);
//       } else {
//         at4 = scr;
//         setAttempt4(scr);
//         console.log("Attempt 4" + scr);
//         setAttempts(attempts + 1);
//         avg = (attempt1 + attempt2 + attempt3 + scr) / 4;
//         setAverage(avg);
//         console.log(avg);

//         Alert.alert(
//           "Herzlichen Glückwunsch",
//           `Die Zeit ist abgelaufen! Ihr Spielstand ist: ${avg}`,
//           [
//             {
//               text: "Speichern",
//               onPress: () => {
//                 let week = 4;
//                 let now = new Date();
//                 now.setDate(now.getDate() + week * 7);
//                 console.log(now);
//                 let test = {
//                   name: "KreuzenSmall",
//                   score: avg,
//                   date: new Date().toLocaleDateString(),
//                   nextDate: now.toLocaleDateString(),
//                   attempt1: attempt1,
//                   attempt2: attempt2,
//                   attempt3: attempt3,
//                   attempt4: at4,
//                 };
//                 const dbRef = firebase
//                   .firestore()
//                   .collection("patients")
//                   .doc(id);
//                 dbRef
//                   .get()
//                   .then((res) => {
//                     console.log(res);
//                     const user = res.data();
//                     console.log(user);

//                     //   setUser(user.test);
//                     //   console.log(use);
//                     let testResult = user.test;
//                     console.log(testResult);
//                     testResult.push(test);
//                     let t = {
//                       exercise: testResult,
//                     };
//                     console.log(t);
//                     const updateDBRef = firebase
//                       .firestore()
//                       .collection("patients")
//                       .doc(id);
//                     updateDBRef
//                       .update({
//                         test: testResult,
//                       })
//                       .then(() => {
//                         alert("updated");
//                       })
//                       .catch((e) => {
//                         console(e);
//                       });
//                   })
//                   .catch((e) => {
//                     console.log(e);
//                   });
//                 console.log("DOne");
//               },
//             },
//             {
//               text: "Abbrechen",
//               onPress: () => {
//                 navigation.navigate("MotorSkills");
//               },
//             },
//           ]
//         );
//       }
//       console.log(at1);
//       console.log(at2);
//       console.log(at3);
//       console.log(at4);

//       console.log(s);
//     } else {
//     }
//   };


const checkPlay = () => {
  if(timeLeft < highScore){
    Alert.alert(
      "Play",
      "Great new High Score was achieved in  " + timeLeft + " seconds",
      [
        {
          text: "Play Again",
          onPress: () => {
            let train = {
              name: "KreuzenSmall",
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
              name: "KreuzenSmall",
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
  }else{
    let mymessage = "";
    let no = Math.floor((Math.random() * 4) + 1)
    console.log(no)
    switch(no){
      case 1:
        mymessage = "Wow good going!!Your Goal was achieved in " + timeLeft + " seconds"
      case 2:
        mymessage = "Amazing!!Your Goal was achieved in " + timeLeft + " seconds"  
      case 3:
        mymessage = "2 days in a row!! Your Goal was achieved in " + timeLeft + " seconds"
      case 4:
        mymessage = "On a roll!! Your Goal was achieved in " + timeLeft + " seconds"
      }
    Alert.alert(
      "Play",
      mymessage,
      [
        {
          text: "Play Again",
          onPress: () => {
            let train = {
              name: "KreuzenSmall",
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
              name: "KreuzenSmall",
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
  }
  
};


//   const onDeleteBTN = () => {
//     let test = {
//       name: "KreuzenSmall",
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

  const backButtonFunction = () => {
    navigation.goBack();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };

  const addScr = (number) => {
    let copy = [...elements];
    const newArr = elements.filter((el) => el !== number);
    setElements(newArr);

    if (elements.length === 1) {
      setScr(1);
      setElements(["1"]);
      setScr(scr + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>
        Restzeit: {timeLeft} Score:{scr}
      </Text>
      <Text style={styles.look}></Text>
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() => {
          setScr(0);
          setTimeLeft(1);
        }}>
        <Text>Timer Started!</Text>
      </TouchableOpacity>
      <View style={styles.game}>
        <Fruit2 addScr={addScr}></Fruit2>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={backButtonFunction}>
        <Text>Zurück</Text>
      </TouchableOpacity>
      {scr === score ? checkPlay() : null}
      {/* </TouchableOpacity> */}
      {/* {timeLeft === 0
        ? Alert.alert(
            "Alert Title",
            `Die Zeit ist abgelaufen! Ihr Spielstand ist: ${scr}`,
            [
              {
                text: "Speichern",
                onPress: () => console.log("pressed"),
              },
              {
                text: "Abbrechen",
                onPress: () => {
                  navigation.navigate("MotorSkills");
                },
              },
            ]
          )
        : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEDBD0",

    alignItems: "center",
    //justifyContent:'center',
  },
  game: {
    flexDirection: "column",
    // width: 300,
    // flexWrap: 'wrap',
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
    height: 30,
    width: 70,
    backgroundColor: "#68B2A0",
    borderRadius: 2,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default KreuzenSmallTraining;
