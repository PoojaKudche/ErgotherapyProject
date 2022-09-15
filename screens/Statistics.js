import React, { Component, useEffect, useState } from "react";
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
import Header from "./Header";

const Statistics = ({ navigation, route }) => {
  const { id } = route.params;
  const [stat, setStat] = useState({
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
  });

  useEffect(() => {
    const dbRef = firebase.firestore().collection("patients").doc(id);
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
        setStat({
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
  }, []);

  const selectGame = (name) => {
    const dbRef = firebase.firestore().collection("patients").doc(id);
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
        setStat({
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
  };

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
      key: "Kreuzen",
      link: "KreuzenType",
      src: require("../assets/Kreuzen.png"),
    },
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
          selectGame(item.key);
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
  if (stat.isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 30 }}>
      <Header navigation={navigation} />
      <ScrollView vertical={true} style={{ marginTop: 40 }}>
        <View vertical={true} style={{ marginBottom: 20 }}>
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
            data={stat.score}
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
              data={stat.score}
              contentInset={verticalContentInset}
              svg={{ stroke: "rgb(134, 65, 244)" }}>
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -30, height: 100 }}
              data={stat.date}
              spacingInner={10}
              formatLabel={(value, index) => stat.date[index]}
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
              {stat.score[stat.score.length - 1]}
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
              {stat.date[stat.date.length - 1]}
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
              {stat.date[stat.date.length - 1]}
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
              {stat.nextDate[stat.nextDate.length - 1]}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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

export default Statistics;
