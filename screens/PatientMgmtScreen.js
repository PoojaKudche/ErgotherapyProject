import React, { Component } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/core";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import firebase from "firebase/compat";
import { format } from "validate.js";

class PatientMgmtScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      age: "",
      id: "",
      remarks: "",
      isLoading: true,
      test: [],
      train: [],
      score: [],
      date: [],
      nextDate: [],
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.userkey);
    const dbRef = firebase
      .firestore()
      .collection("patients")
      .doc(this.props.route.params.userkey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        let ZielenScore = [];
        let ZielenDate = [];
        let nextDate = [];
        console.log(user);
        for (let i = 0; i < user.test.length; i++) {
          if (user.test[i].name == "Zielen") {
            nextDate.push(user.test[i].nextDate);
          }
        }
        for (let i = 0; i < user.train.length; i++) {
          if (user.train[i].name == "Zielen") {
            ZielenScore.push(user.train[i].score);
            ZielenDate.push(user.train[i].date);
          }
        }
        console.log(ZielenScore);
        console.log(ZielenDate);
        this.setState({
          key: res.id,
          name: user.name,
          age: user.age,
          id: user.id,
          remarks: user.remarks,
          isLoading: false,
          score: ZielenScore,
          date: ZielenDate,
          nextDate: nextDate,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  selectGame(name) {
    const dbRef = firebase
      .firestore()
      .collection("patients")
      .doc(this.props.route.params.userkey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        let lastScore = [];
        let lastDate = [];
        let nextDate = [];
        for (let i = 0; i < user.test.length; i++) {
          if (user.test[i].name == name) {
            nextDate.push(user.test[i].nextDate);
          }
        }
        console.log(user);
        for (let i = 0; i < user.train.length; i++) {
          if (user.train[i].name == name) {
            lastScore.push(user.train[i].score);
            lastDate.push(user.train[i].date);
          }
        }
        console.log(lastScore);
        console.log(lastDate);
        this.setState({
          key: res.id,
          name: user.name,
          age: user.age,
          id: user.id,
          remarks: user.remarks,
          isLoading: false,
          score: lastScore,
          date: lastDate,
          nextDate: nextDate,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("patients")
      .doc(this.state.key);
    updateDBRef
      .update({
        name: this.state.name,
        age: this.state.age,
        id: this.state.id,
        remarks: this.state.remarks,
      })
      .then((docRef) => {
        this.setState({
          isLoading: false,
        });
        // this.props.navigation.navigate("TherapistHome");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteUser() {
    const dbRef = firebase
      .firestore()
      .collection("therapistA")
      .doc(this.props.route.params.userkey);
    dbRef.delete().then((res) => {
      console.log("Item removed from database");
      this.props.navigation.navigate("TherapistHome");
    });
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      "Delete User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteUser() },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    // const data = [
    //   50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
    // ];
    const data = [
      {
        key: "Zielen",
        link: "ZielenType",
        src: require("../assets/Zielen.png"),
      },
      {
        key: "Tippen",
        link: "TippenType",
        src: require("../assets/Tippen.png"),
      },
      {
        key: "KreuzenBig",
        link: "KreuzenType",
        src: require("../assets/Kreuzen.png"),
      },
      // {
      //   key: "KreuzenSmall",
      //   link: "KreuzenType",
      //   src: require("../assets/Kreuzen.png"),
      // },
      // { key: 'Nachfahren', link: 'Nachfahren', src: require('../assets/Nachfahren.png') },
      {
        key: "Umdrehen",
        link: "UmdrehenType",
        src: require("../assets/Umdrehen.png"),
      },
      { key: "Türme", link: "TürmeType", src: require("../assets/Türme.png") },
      {
        key: "Klötze",
        link: "KlötzeType",
        src: require("../assets/Klötze.png"),
      },
      {
        key: "Gewinde",
        link: "GewindeType",
        src: require("../assets/Gewinde.png"),
      },
    ];
    const Item = ({ item }) => {
      const navigation = useNavigation();
      return (
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 2,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
          }}>
          {data.map((item, key) => (
            <TouchItem key={key} item={item} />
          ))}
        </View>
      );
    };

    const TouchItem = ({ item }) => {
      const navigation = useNavigation();
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 0.5,
            height: 40,
            borderRadius: 20,
            marginRight: 30,
          }}
          onPress={() => {
            // item.link !== "" && navigation.navigate(`${item.link}`, { id });
            this.selectGame(item.key);
          }}>
          <Image
            style={{ width: 30, height: 30, marginTop: 5, marginLeft: 10 }}
            source={item.src}
          />
          <Text style={{ padding: 10 }}>{item.key}</Text>
        </TouchableOpacity>
      );
    };

    const renderItem = ({ item }) => {
      return <TouchItem item={item} />;
    };
    const axesSvg = { fontSize: 10, fill: "grey" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 10;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "black",
            marginBottom: 30,
          }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              paddingBottom: 10,
              marginTop: 30,
            }}>
            Patient Statistics
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Text style={styles.textName}>Name</Text>
          <TextInput
            placeholder="Name des Patienten eingeben"
            style={styles.nameBox}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, "name")}
          />
          <Text style={styles.textName}>Age</Text>
          <TextInput
            placeholder="Alter des Patienten eingeben"
            style={styles.ageBox}
            value={this.state.age}
            onChangeText={(val) => this.inputValueUpdate(val, "age")}
          />
          <Text style={styles.textName}>Id</Text>
          <TextInput
            placeholder="ID eingeben"
            style={styles.idBox}
            value={this.state.id}
            onChangeText={(val) => this.inputValueUpdate(val, "id")}
          />
        </View>
        <Text style={styles.textName}>Remark</Text>
        <TextInput
          placeholder="Bemerkungen eingeben"
          style={styles.remarkBox}
          value={this.state.remarks}
          onChangeText={(val) => this.inputValueUpdate(val, "remarks")}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.update}
            onPress={() => this.updateUser()}>
            <View style={styles.buttonBox}>
              <Text style={styles.updateText}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView vertical={true}>
          <View vertical={true} style={{ marginBottom: 10 }}>
            <FlatList
              horizontal={true}
              //keyExtractor={(item) => item.id}
              data={data}
              renderItem={renderItem}
            />
          </View>
          <View
            style={{
              height: 400,
              padding: 20,
              flexDirection: "row",
              backgroundColor: "white",
            }}>
            <YAxis
              data={this.state.score}
              style={{ marginBottom: 100 }}
              formatLabel={(value) => value}
              contentInset={verticalContentInset}
              svg={{
                marginLeft: -3,
                padding: 0,
                translateY: 5,
              }}
            />
            <View style={{ flex: 1, marginLeft: 30, marginRight: 30 }}>
              <LineChart
                style={{ flex: 1 }}
                data={this.state.score}
                contentInset={verticalContentInset}
                svg={{ stroke: "rgb(134, 65, 244)" }}>
                <Grid />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -30, height: 100 }}
                data={this.state.date}
                spacingInner={10}
                formatLabel={(value, index) => this.state.date[index]}
                contentInset={{ left: 40, right: 40 }}
                svg={{
                  kerning: 1,
                  lengthAdjust: "spacing",
                  textLength: 20,
                  scaleX: 1,
                  skewX: -10,
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <View
              style={{ flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
              <Text style={{ marginLeft: 10, fontSize: 20 }}>Goal :</Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
                {this.state.score[this.state.score.length - 1]}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Text style={{ marginLeft: 10, fontSize: 20 }}>Last Date :</Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
                {this.state.date[this.state.date.length - 1]}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Text style={{ marginLeft: 10, fontSize: 20 }}>
                Training Start Date :
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
                {this.state.date[this.state.date.length - 1]}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Text style={{ marginLeft: 10, fontSize: 20 }}>
                Upcoming Test :
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}>
                {this.state.nextDate[this.state.nextDate.length - 1]}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => this.openTwoButtonAlert()}>
              <View style={styles.buttonBox}>
                <Text style={styles.deleteText}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "rgb(219,219,204)",
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  nameBox: {
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    width: 150,
    backgroundColor: "white",
    paddingLeft: 10,
  },
  ageBox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    height: 30,
    width: 150,
    paddingLeft: 10,
  },
  idBox: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 20,
    height: 30,
    width: 150,
    paddingLeft: 10,
  },
  textName: {
    fontSize: 22,
    marginLeft: 50,
    marginRight: 10,
    marginTop: 0,
  },
  remarkBox: {
    marginTop: 10,
    backgroundColor: "white",
    marginLeft: 50,
    borderWidth: 1,
    borderRadius: 50,
    height: 400,
    width: 700,
    paddingLeft: 10,
  },
  update: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 50,
    width: 130,
    height: 40,
    paddingTop: 5,
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  updateText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textAlign: "center",
  },
  delete: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: 10,
    width: 130,
    height: 40,
    marginBottom: 30,
    paddingTop: 5,
  },
  deleteText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textAlign: "center",
  },
});

export default PatientMgmtScreen;
