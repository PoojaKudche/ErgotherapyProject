import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.header_text}>Memory Spiel</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#DBDBCC'
    },
    header_text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
});