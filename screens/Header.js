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
import * as ScreenOrientation from "expo-screen-orientation";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  const backButtonFunction = () => {
    navigation.goBack();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };
  return (
    <View style={{ flexDirection: "row", width: "100%", marginBottom: 10 }}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginTop: 10, marginLeft: 20 }}
        onPress={backButtonFunction}>
        <FontAwesome5
          style={{}}
          name="arrow-alt-circle-left"
          size={35}
          color="black"
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 250,
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}>
        Ihre Theraput
      </Text>
    </View>
  );
};

export default Header;
