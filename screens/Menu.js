import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
const Menu = () => {
  return (
    <View style={{ flexDirection: "row", marginTop: 30 }}>
      <Text
        style={{
          fontSize: 33,
          textAlign: "center",
          width: "100%",
          marginTop: "4%",
          backgroundColor: "#ffffff",
          height: "100%",
          paddingTop: 10,
        }}>
        Ihr Therapeut
      </Text>
    </View>
  );
};

export default Menu;
