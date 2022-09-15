import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Feather';

class ÜbungsauswahlScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ÜbungsauswahlScreen</Text>
            </View>
        );
    }
}

export default ÜbungsauswahlScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const exerciseStack = createStackNavigator();

const exerciseStackScreen = ({ navigation }) => (
    <exerciseStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerTintColor: 'black'
        }}>
        <exerciseStack.Screen name="ÜbungsauswahlScreen" component={ÜbungsauswahlScreen} options={{
            headerLeft: () => (
                <Icon name="menu" style={{ paddingLeft: 10 }} size={28} onPress={() => {
                    navigation.openDrawer()
                }} />
            )
        }} >
        </exerciseStack.Screen>
    </exerciseStack.Navigator>
);