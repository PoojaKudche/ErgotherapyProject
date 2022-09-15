import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';

const PatientWeekDay = ({ navigation }) => {

    const [selectedWeek, setSelectedWeek] = useState();
    const [selectedDay, setSelectedDay] = useState();

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Text style={styles.header_text} >Hier können Sie Ihre Woche, Ihren Tag und Ihre Übung auswählen </Text>
            </View>
            <View style={styles.footer} >
                <Text style={styles.footer_text} >Woche</Text>
                <Picker
                    style={{ height: 60, width: 130 }}
                    selectedValue={selectedWeek}
                    onValueChange={(itemValue, itemIndex) => setSelectedWeek(itemValue)}
                >
                    <Picker.Item label="Week 1" value="week1" />
                    <Picker.Item label="Week 2" value="week2" />
                    <Picker.Item label="Week 3" value="week3" />
                    <Picker.Item label="Week 4" value="week4" />
                </Picker>
                <Text style={styles.footer_text} >Tag</Text>
                <Picker
                    style={{ height: 60, width: 130 }}
                    selectedValue={selectedDay}
                    onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
                >
                    <Picker.Item label="Day 1" value="day1" />
                    <Picker.Item label="Day 2" value="day2" />
                    <Picker.Item label="Day 3" value="day3" />
                    <Picker.Item label="Day 4" value="day4" />
                    <Picker.Item label="Day 5" value="day5" />
                    <Picker.Item label="Day 6" value="day6" />
                    <Picker.Item label="Day 7" value="day7" />
                </Picker>
                <TouchableOpacity style={styles.btn_submit} onPress={() => { navigation.navigate('CategorySelect') }} >
                    <Text style={styles.btn_text} >Nächste</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default PatientWeekDay;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width: null,
        justifyContent: 'center',
        marginTop: 0,
        backgroundColor: '#DBDBCC',
        height: 300,
        padding: 20,
        paddingBottom: 10,
        alignItems: 'center'
    },
    header_text: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    footer: {
        width: 400,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 0,
        backgroundColor: '#fff',
        height: 600,
        padding: 10
    },
    footer_text: {
        color: 'black',
        fontSize: 18,
        width: 300
    },
    btn_submit: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 180,
        backgroundColor: '#DBDBCC'
    },
    btn_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
});