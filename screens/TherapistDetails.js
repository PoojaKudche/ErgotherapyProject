import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { useTheme } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import firebase from "firebase/compat";
import { auth } from "../firebase";


class TherapistDetails extends Component {

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('therapists');
        this.state = {
            fname: '',
            lname: '',
            practice: '',
            title: '',
            emailid: '',
            isLoading: false,
        };
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }


    storeTherapist = () => {
        if (this.state.title === '' || this.state.fname === '' || this.state.lname === '' || this.state.practice === '' || this.state.emailid === '') {
            alert('Please fill all the details')
        } else {
            this.setState({
                isLoading: true,
            });

            this.dbRef.add({
                fname: this.state.fname,
                lname: this.state.lname,
                practice: this.state.practice,
                title: this.state.title,

            }).then((res) => {
                this.setState({
                    fname: '',
                    lname: '',
                    practice: '',
                    title: '',
                    isLoading: false,
                });
            })

            this.props.navigation.navigate('TherapistHome')
            alert('Details added successfully!')

            // .catch((err) => {
            //     console.error("Error found: ", err);
            //     this.setState({
            //         isLoading: false,
            //     });
            // });

        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Hallo!</Text>
                    <Text style={styles.text_small_header}>Bitte geben Sie Ihre Daten ein</Text>
                </View>
                <Animatable.View style={styles.footer} transition="fadeInUp">
                    <Text style={styles.text_footer} >Anrede</Text>
                    <TextInput
                        style={styles.placeholder_text}
                        placeholder="Anrede"
                        placeholderTextColor="#666666"
                        onChangeText={(val) => this.inputValueUpdate(val, 'title')}
                    />
                    <Text style={styles.text_footer} >Vorname</Text>
                    <View style={styles.action}>
                    </View>
                    <TextInput
                        style={styles.placeholder_text}
                        placeholder="Ihre Vorname"
                        placeholderTextColor="#666666"
                        onChangeText={(val) => this.inputValueUpdate(val, 'fname')}
                    />
                    <Text style={styles.text_footer} >Nachname</Text>
                    <View style={styles.action}>
                    </View>
                    <TextInput
                        style={styles.placeholder_text}
                        placeholder="Ihre Nachname"
                        placeholderTextColor="#666666"
                        onChangeText={(val) => this.inputValueUpdate(val, 'lname')}
                    />
                    <Text style={styles.text_footer} >Praxis</Text>
                    <View style={styles.action}>
                    </View>
                    <TextInput
                        style={styles.placeholder_text}
                        placeholder="Ihre Praxis"
                        placeholderTextColor="#666666"
                        onChangeText={(val) => this.inputValueUpdate(val, 'practice')}
                    />
                    <Text style={styles.text_footer} >Email Addresse</Text>
                    <View style={styles.action}>
                    </View>
                    <TextInput
                        style={styles.placeholder_text}
                        placeholder="Ihre Email Addresse"
                        placeholderTextColor="#666666"
                        onChangeText={(val) => this.inputValueUpdate(val, 'emailid')}
                    />
                    <View style={styles.button} >
                        <TouchableOpacity style={styles.further_btn} onPress={() => this.storeTherapist()}>
                            <Text style={styles.textSubmit} >SPEICHERN UND WEITER</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBDBCC',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    header: {
        flex: 1,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
        width: null,
        fontWeight: 'bold',
        paddingTop: 60,
        textAlign: "center"
    },
    text_header: {
        alignItems: 'center',
        justifyContent: 'center',

        color: 'black',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: "center"
    },
    text_small_header: {
        alignItems: 'center',

        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: "center",
        margin: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 130,
        paddingVertical: 30
    },
    text_footer: {
        color: 'black',
        fontSize: 18,
        width: 300
    },
    action: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    placeholder_text: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 9,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    button: {
        alignItems: "center",
        marginTop: 200
    },
    further_btn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: -140,
        backgroundColor: '#DBDBCC'

    },
    textSubmit: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default TherapistDetails;