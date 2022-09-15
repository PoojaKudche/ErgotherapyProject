import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "firebase/compat";
import Menu from "./Menu";

class PatientID extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("patients");
    this.state = {
      id: "",
      isLoading: false,
      iid: "",
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  checkID = () => {
    var BreakException = {};
    let UserMessage = "";
    if (this.state.id === "") {
      alert("Please give the ID");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .get({
          id: this.state.id,
        })
        .then((res) => {
          var enter = true;
          res.forEach((doc) => {
            let u = doc.data();

            if (u.id == this.state.id) {
              UserMessage = "Correct User";
              enter = true;
              console.log(UserMessage);
              this.setState({
                id: "",
                isLoading: false,
                iid: doc.id,
              });

              this.props.navigation.navigate("CategorySelect", {
                id: this.state.iid,
              });
              throw BreakException;
            }
            if (u.id != this.state.id) {
              enter = false;
              console.log("Wrong User");
              UserMessage = "Wrong User!!";
            }
          });
          if (UserMessage == "Wrong User!!" && enter == false) {
            alert(UserMessage);
            this.setState({
              isLoading: false,
            });
          }
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Menu />
        <View style={styles.header}>
          <Text style={styles.header_text}>Hallo!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>Bitte Ihre ID eingeben</Text>
          <TextInput
            placeholder="ID"
            placeholderTextColor="grey"
            style={styles.footer_input}
            value={this.state.id}
            onChangeText={(val) =>
              this.inputValueUpdate(val, "id")
            }></TextInput>
          <TouchableOpacity
            style={styles.btn_submit}
            onPress={() => this.checkID()}>
            <Text style={styles.btn_text}>SPEICHERN UND WEITER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    // width: 1000,
    // height: 800,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    backgroundColor: "#DBDBCC",
    // height: 300,
    height: 80, //to be removed and the above one to be added instead
    borderRadius: 30,
  },
  header_text: {
    fontSize: 35,
    fontWeight: "bold",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 30,
  },
  footer_text: {
    paddingTop: 70,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 40,
  },
  footer_input: {
    width: 350,
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    height: 40,
  },
  btn_submit: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 250,
    backgroundColor: "#ffffff",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
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
});

export default PatientID;
