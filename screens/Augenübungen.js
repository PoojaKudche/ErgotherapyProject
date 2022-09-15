import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Dimensions, Animated, Background } from 'react-native';
import BouncingBall from '../components/BouncingBall';

export default class Augenübungen extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         startValue: new Animated.ValueXY(0, 0),
    //         endValue: 150,
    //         duration: 5000,
    //     };
    // }

    // componentDidMount() {

    //     // this.position = new Animated.ValueXY(0, 0)
    //     // Animated.sequence([
    //     //     Animated.spring(this.position, {
    //     //         toValue: { x: 300, y: 500 },
    //     //         useNativeDriver: false
    //     //     }),
    //     //     Animated.spring(this.position, {
    //     //         toValue: { x: 300, y: 500 },
    //     //         useNativeDriver: false
    //     //     }),

    //     // ])
    //     Animated.sequence([
    //         Animated.timing(this.state.startValue, {
    //             toValue: this.state.endValue,
    //             duration: this.state.duration,
    //             useNativeDriver: true,
    //         }),
    //         Animated.timing(this.state.startValue, {
    //             toValue: 290,
    //             duration: this.state.duration,
    //             useNativeDriver: true,
    //         }),
    //     ]).start();
    // }

    render() {

        return (
            // <View style={styles.container}>

            //     {/* <Animated.View style={this.position.getLayout()}>
            //         <View style={[styles.square,
            //         {
            //             transform: [
            //                 {
            //                     translateX: this.state.startValue.x,
            //                     translateY: this.state.startValue.y,
            //                 },
            //             ],
            //         },
            //         ]}></View>
            //     </Animated.View> */}

            //     <Animated.View
            //         style={[
            //             styles.square,
            //             {
            //                 transform: [
            //                     {
            //                         translateX: this.state.startValue.x
            //                     },
            //                     {
            //                         translateY: this.state.startValue.y,
            //                     },
            //                 ],
            //             },
            //         ]}
            //     />
            <View style={styles.container}>
                <BouncingBall
                    amount={1}
                    animationDuration={5000}
                    minSpeed={100}
                    maxSpeed={200}
                    minSize={40}
                    maxSize={100}
                    // imageBall={require('../assets/bouncing_ball.png')}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                />
            </View>
            // </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#68B2A0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // square: {
    //     backgroundColor: '#000000',
    //     height: 35,
    //     width: 35,
    //     position: 'absolute'
    // }

});