import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TextInput,
  SectionList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
// import { faArrowAltCircleLeft } from "@fortawesome/fontawesome-svg-core";
import * as ScreenOrientation from "expo-screen-orientation";
import { createStackNavigator } from "@react-navigation/stack";
import { ListItem } from "react-native-elements";
import firebase from "firebase/compat";
import Header from "./Header";

const user = firebase.auth().currentUser;

class TherapistHome extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection("patients");
    this.state = {
      isLoading: true,
      userArr: [],
    };
  }
  backButtonFunction() {
    this.props.navigation.goBack();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  search = (searchText) => {
    this.setState({ searchText: searchText });
  };

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      console.log(res);
      const { name, age, id, remarks } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        age,
        id,
        remarks,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
    });
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
          <Text style={styles.header_text}>Ihre Patienten</Text>
        </View>

        <View style={styles.action}></View>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("PatientDetails");
          }}
          style={styles.add_option}
          underlayColor="grey">
          <View style={styles.btnContainer}>
            <Image
              source={require("../assets/adduser.png")}
              style={styles.adduser_icon}
            />
            <Text style={styles.add_option_text}>
              Neuen Patienten hinzufügen
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.action}></View>
        <View style={styles.search_option}>
          <Image
            source={require("../assets/search.png")}
            style={styles.search_icon}
          />
          <TextInput
            style={styles.search_option_text}
            placeholder="Patienten suchen"
            placeholderTextColor="grey"></TextInput>
        </View>
        <ScrollView style={styles.small_container}>
          {this.state.userArr.map((item, i) => {
            return (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {
                  this.props.navigation.navigate("PatientMgmtScreen", {
                    userkey: item.key,
                  });
                }}>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
              </ListItem>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: null,
    height: null,
  },
  header: {
    width: 800,
    flexDirection: "row",
    backgroundColor: "#DBDBCC",
    justifyContent: "center",
    height: 60,
    borderRadius: 40,
    marginTop: 10,
  },
  header_text: {
    fontSize: 20,

    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textAlign: "center",
    marginTop: 15,
  },
  add_option: {
    width: 380,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    height: 30,
    flexDirection: "row",
    marginTop: 10,
  },
  add_option_text: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textAlign: "center",
  },
  search_option: {
    width: 380,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    height: 40,
    marginTop: 30,
  },
  search_option_text: {
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 450,
  },
  action: {
    flexDirection: "row",
    paddingBottom: 5,
  },
  adduser_icon: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 2,
    marginLeft: -50,
  },
  btnContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  search_icon: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 2,
    marginLeft: 20,
  },
  small_container: {
    width: 700,
    marginTop: 20,
  },
  // sectionHeader: {
  //     paddingTop: 5,
  //     paddingLeft: 35,
  //     paddingRight: 10,
  //     paddingBottom: 2,
  //     fontSize: 14,
  //     fontWeight: 'bold',
  //     backgroundColor: 'grey'
  // },
  // item: {
  //     padding: 10,
  //     fontSize: 18,
  //     height: 44,
  //     marginLeft: 30
  // },
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

export default TherapistHome;
