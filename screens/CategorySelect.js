import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Menu from "./Menu";

const CategorySelect = ({ navigation, route }) => {
  const { id } = route.params;
  const data = [
    // {
    //   key: "Cognitive",
    //   link: "CognitiveSkills",
    //   src: require("../assets/cognitive.png"),
    // },
    {
      key: "Übungen",
      link: "MotorSkills",
      src: require("../assets/motor.png"),
    },
    {
      key: "Hier konnen Sie Ihren Fortschnitt sehen.",
      link: "Statistics",
      src: require("../assets/stats.png"),
    },
  ];

  const Item = ({ item }) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
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
        style={[styles.item]}
        onPress={() => {
          item.link !== "" && navigation.navigate(`${item.link}`, { id: id });
        }}>
        <Text style={[styles.key]}>{item.key}</Text>
        <Image style={[styles.src]} source={item.src} />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <TouchItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.header}>
        <Text style={styles.header_text}>Wählen Sie die Art der Übung</Text>
      </View>

      <FlatList numColumns={1} data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#DBDBCD",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 5,
    height: Dimensions.get("window").width / 2, // approximate a square
    borderRadius: 40,
  },
  src: {
    width: 70,
    height: 70,
    marginBottom: -10,
    marginTop: 10,
  },
  key: {
    fontSize: 20,
  },
  header: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBDBCC",
    height: 100,
    marginTop: "2.5%",
    borderRadius: 40,
  },
  header_text: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});

export default CategorySelect;
