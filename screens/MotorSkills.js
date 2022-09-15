import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import Header from "./Header";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/core";

const MotorSkills = ({ route, navigation }) => {
  const { id } = route.params;

  useEffect(() => {
    console.log("screen called");
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    changeScreenOrientation();
  }, []);

  const data = [
    { key: "Zielen", link: "ZielenType", src: require("../assets/Zielen.png") },
    { key: "Tippen", link: "TippenType", src: require("../assets/Tippen.png") },
    // {
    //   key: "Kreuzen",
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
    { key: "Klötze", link: "KlötzeType", src: require("../assets/Klötze.png") },
    {
      key: "Gewinde",
      link: "GewindeType",
      src: require("../assets/Gewinde.png"),
    },
    {
      key: "Maze",
      link: "Nachfahren",
      src: require("../assets/Gewinde.png"),
    },
    // {
    //   key: "Kreuzen Level 1",
    //   link: "KreuzenTesting",
    //   src: require("../assets/Kreuzen.png"),
    // },
    {
      key: "Kreuzen",
      link: "KreuzenTesting2",
      src: require("../assets/Kreuzen.png"),
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
          item.link !== "" && navigation.navigate(`${item.link}`, { id });
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
      <Header navigation={navigation} />

      {/* </SafeAreaView><View style={styles.container} > */}
      <View style={styles.header}>
        <Text style={styles.header_text}>Wählen Sie die Art des Tests</Text>
      </View>

      <FlatList
        numColumns={2}
        //keyExtractor={(item) => item.id}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBDBCC",
    height: 110,
    borderRadius: 40,
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
});

export default MotorSkills;

// import TippenType from "./TippenType";
// import KreuzenBigSmall from "./KreuzenBigSmall";
//import { render } from "react-dom";
//  import ReactDOM from "react-dom";

//export default function App(){

// const data = [{ name: 'Zielen', id: '1' },
// { name: 'Tippen', id: '2' },
// { name: 'Kreuzen', id: '3' },
// { name: 'Nachfahren', id: '4' },
// { name: 'Umdrehen', id: '5' },
// { name: 'Türme', id: '6' },
// { name: 'Klötze', id: '7' },
// { name: 'Gewinde', id: '8' }];

// const formatData = (data, numColumns) => {
//     const numberOfFullRows = Math.floor(data.length / numColumns);

//     let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
//     while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
//         data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//         numberOfElementsLastRow++;
//     }

//     return data;
// };

// const Item = ({ item }) => {

//     const navigation = useNavigation();
//     return (

//         <View style={styles.container}>
//             <TouchableOpacity style={[styles.item]} onPress={() => { navigation.navigate('ZielenType') }} >
//                 <Text style={[styles.key]}>Zielen</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('TippenType') }} >
//                 <Text style={[styles.key]} >Tippen</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('KreuzenBigSmall') }} >
//                 <Text style={styles.key} >Kreuzen</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { }} >
//                 <Text style={styles.key} >Gewinde</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { }} >
//                 <Text style={styles.key} >Umdrehen</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { }} >
//                 <Text style={styles.key} >Türme</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { }} >
//                 <Text style={styles.key} >Klötze</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('Nachfahren') }} >
//                 <Text style={styles.key} >Nachfahren</Text>
//             </TouchableOpacity>
//         </View>

//     );
// }

// const MotorSkills = () => {

//     const renderItem = ({ item }) => {

//         return (

//             <Item
//                 item={item}

//             />
//         );
//     };

//     return (
//         <View style={styles.container}>
//             {/* </SafeAreaView><View style={styles.container} > */}
//                             <View style={styles.header} >
//                                 <Text style={styles.header_text} >Wählen Sie die Art des Tests</Text>
//                           </View>

//             <FlatList
//                 numColumns= {2}
//                 //keyExtractor={(item) => item.id}
//                 data={data}
//                 renderItem={renderItem}

//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {

//        flex:1

// },
// header: {
//     width: 450,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#DBDBCC',
//     height: 200,
//     paddingLeft: 30,

// },
// header_text: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     textAlign: "center",
//     marginRight: 80,
//     marginTop: 30
//     },
//     item: {
//         backgroundColor: '#DBDBCD',
//         justifyContent: 'center',
//         alignItems: "center",

//         margin: 5,

//         height: Dimensions.get('window').width / 2, // approximate a square

//     },
//     key: {
//         fontSize: 20,

//      },

// });

// export default MotorSkills;

// useEffect(() => {
//     console.log("screen called")
//     async function changeScreenOrientation() {
//         await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

//     }
//     changeScreenOrientation();
// }, []);

//const MotorSkills = ({ navigation }) => {

//export default class App extends React.Component {

// renderItem = ({ item, index }) => {
//     console.log({ item })
//     return (
//         <View style={styles.item}>
//             <Text style={styles.itemText}>{item.key}</Text>
//         </View>

//     );
// };

// const MotorSkills = ({ navigation, itemText }) => {
//     <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ZielenType') }} >
//   <Text style={styles.itemText} >{data.key}</Text>
// </TouchableOpacity>
// }

// const renderItem = ({ item, index }) => {

//     return (
//         <View style={styles.container} >
//             <View style={styles.header} >
//                 <Text style={styles.header_text} >Wählen Sie die Art des Tests</Text>
//             </View>

//             <FlatList
//                 data={data}
//                 style={styles.container}
//                 numColumns={2}
//                 renderItem={ renderItem }
//                     // <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ZielenType') }} >
//                     //     <Text style={styles.itemText} >Zielen</Text>

//                     // </TouchableOpacity>

//             />
//         </View >
//     );
