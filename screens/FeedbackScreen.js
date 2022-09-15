import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class FeedbackScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FeedbackScreen</Text>
            </View>
        );
    }
}

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});