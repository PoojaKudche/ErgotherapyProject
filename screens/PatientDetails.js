import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase/compat";
import Header from "./Header";

class PatientDetails extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("patients");
    this.state = {
      name: "",
      age: "",
      id: "",
      remarks: "",
      isLoading: false,
      remark2: "",
      test: "",
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeUser = () => {
    if (
      this.state.name === "" ||
      this.state.age === "" ||
      this.state.id === ""
    ) {
      alert("Please fill all the details");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          name: this.state.name,
          age: this.state.age,
          id: this.state.id,

          remarks: this.state.remarks,
          test: [],
          train: [],
        })
        .then((res) => {
          this.setState({
            name: "",
            age: "",
            id: "",
            remarks: "",
            isLoading: false,
          });
          this.props.navigation.navigate("TherapistHome");
          alert("Patient added successfully!");
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
        <Header navigation={this.props.navigation} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Neuen Patienten hinzufügen</Text>
        </View>
        <TextInput
          placeholder="Name des Patienten eingeben"
          style={styles.nameBox}
          value={this.state.name}
          onChangeText={(val) => this.inputValueUpdate(val, "name")}
        />
        <TextInput
          placeholder="Alter des Patienten eingeben"
          style={styles.ageBox}
          value={this.state.age}
          onChangeText={(val) => this.inputValueUpdate(val, "age")}
        />
        <TextInput
          placeholder="ID eingeben"
          style={styles.idBox}
          value={this.state.id}
          onChangeText={(val) => this.inputValueUpdate(val, "id")}
        />
        <TextInput
          placeholder="Bemerkungen eingeben"
          style={styles.remarkBox}
          value={this.state.remarks}
          onChangeText={(val) => this.inputValueUpdate(val, "remarks")}
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={() => this.storeUser()}>
          <View style={styles.buttonBox}>
            <Text style={styles.submitText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: 800,
    alignItems: "center",
    backgroundColor: "#DBDBCC",
    justifyContent: "center",
    height: 80,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textAlign: "center",
  },
  nameBox: {
    borderWidth: 1,
    height: 50,
    width: 700,
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    marginBottom: 40,
  },
  ageBox: {
    borderWidth: 1,
    height: 50,
    width: 700,
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    marginBottom: 40,
  },
  idBox: {
    borderWidth: 1,
    height: 50,
    width: 700,
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    marginBottom: 40,
  },
  remarkBox: {
    borderWidth: 1,
    height: 500,
    width: 700,
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    borderRadius: 40,
    marginBottom: 40,
  },
  submit: {
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 30,
    width: 250,
    height: 50,
    backgroundColor: "#ffffff",
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textAlign: "center",
    marginTop: 7.5,
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

export default PatientDetails;
