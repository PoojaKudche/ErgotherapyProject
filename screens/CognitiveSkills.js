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

const CognitiveSkills = () => {
  const data = [
    {
      key: "Memory Spiel",
      link: "MemorySpiel",
      src: require("../assets/MemorySpiel.png"),
    },
    {
      key: "Augenübungen",
      link: "Augenübungen",
      src: require("../assets/eye.png"),
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
          item.link !== "" && navigation.navigate(`${item.link}`);
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
        <Text style={styles.header_text}>Wählen Sie die Art des Tests</Text>
      </View>

      <FlatList numColumns={2} data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBDBCC",
    height: 200,
  },
  header_text: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  item: {
    backgroundColor: "#DBDBCD",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 5,
    height: Dimensions.get("window").width / 2, // approximate a square
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
});

export default CognitiveSkills;
