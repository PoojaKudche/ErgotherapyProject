import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const PatientLogin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_bigtext}>Hallo!</Text>
        <Text style={styles.header_smalltext}>Guten Tag</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_bigtext}>Wie ist dein Name?</Text>
        <TextInput
          placeholder="Name eingeben"
          placeholderTextColor="grey"
          style={styles.footer_input}></TextInput>
        <TouchableOpacity
          style={styles.btn_submit}
          onPress={() => {
            navigation.navigate("PatientID");
          }}>
          <Text style={styles.btn_text}>SPEICHERN UND WEITER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PatientLogin;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: 450,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#DBDBCC",
    height: 300,
  },
  header_bigtext: {
    fontSize: 38,
    fontWeight: "bold",
  },
  header_smalltext: {
    fontSize: 28,
    fontWeight: "bold",
  },
  footer: {
    width: 450,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    backgroundColor: "#fff",
    height: 800,
    paddingTop: 30,
  },
  footer_bigtext: {
    fontSize: 22,
    fontWeight: "bold",
  },
  footer_input: {
    padding: 20,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    height: 60,
    paddingLeft: 100,
  },
  btn_submit: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 250,
    backgroundColor: "#DBDBCC",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
