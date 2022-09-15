//import * as React from 'react';
import React, { useEffect } from "react";

import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';


const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        console.log("screen called")
        async function changeScreenOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

        }
        changeScreenOrientation();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Willkommen</Text>
                <Text style={styles.text_small_header}>bei unserer App</Text>
                <Animatable.Image animation="zoomIn" delay={2000} source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUp">
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('PatientID')}>
                        <LinearGradient colors={['#40798C', '#F6F1D1']} style={styles.btn_login}>
                            <Text style={styles.textLogin}>ICH BIN PATIENT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('TherapistLogin')}>
                        <LinearGradient colors={['#40798C', '#F6F1D1']} style={styles.therap_login}>
                            <Text style={styles.textLogin}>ICH BIN THERAPEUT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

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
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 30,
        width: null,
        fontWeight: 'bold',
        paddingTop: 60,
        marginBottom: -10
    },
    text_header: {
        alignItems: 'center',
        textAlign: "center",
        color: 'black',
        fontWeight: 'bold',
        fontSize: 35,
        margin: 10
    },
    text_small_header: {
        alignItems: 'center',
        textAlign: "center",

        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        margin: 10
    },
    logo: {

        marginTop: 20,
        width: 250,
        maxHeight: 250,

        flex: 1,
    },
    footer: {
        flex: 1,
        backgroundColor: '#DBDBCC',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: -120
    },
    button: {
        backgroundColor: '#68B2A0',
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
        margin: 5
    },
    btn_login: {
        width: 320,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',

        marginTop: 5
    },
    textLogin: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    therap_login: {
        width: 320,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',

        marginBottom: 5
    },
})