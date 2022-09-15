// import React, { Component } from 'react';

// import Svg, { Line } from 'react-native-svg';

// import {
//     StyleSheet,
//     View,
//     Platform,
//     Text,
//     PanResponder,
//     Image,
//     Dimensions,
// } from 'react-native';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// export default class ConnectDots extends Component {
//     constructor() {
//         super();
//         //initialize state
//         this.panResponder;
//         this.state = {
//             startTouchX: 0,
//             startTouchY: 0,

//             endTouchX: 0,
//             endTouchY: 0,
//         };

//         //panResponder initialization
//         this.panResponder = PanResponder.create({
//             onStartShouldSetPanResponder: (event, gestureState) => true,
//             onStartShouldSetPanResponderCapture: (event, gestureState) => {
//                 this.setState({
//                     startTouchX: event.nativeEvent.locationX.toFixed(2),
//                     startTouchY: event.nativeEvent.locationY.toFixed(2),
//                 });
//             },
//             onMoveShouldSetPanResponder: (event, gestureState) => false,
//             onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
//             onPanResponderGrant: (event, gestureState) => false,
//             onPanResponderMove: (event, gestureState) => { },
//             onPanResponderRelease: (event, gestureState) => {
//                 this.setState({
//                     endTouchX: event.nativeEvent.locationX.toFixed(2),
//                     endTouchY: event.nativeEvent.locationY.toFixed(2),
//                 });
//             },
//         });
//         this.setState({
//             startTouchX: 70,
//             startTouchY: 70,

//             endTouchX: 80,
//             endTouchY: 60,
//         });
//     }
//     render() {
//         return (
//             <View style={styles.MainContainer}>
//                 <View style={styles.childView}>
//                     <Svg height={height} width={width} position="absolute">
//                         <Line
//                             x1={this.state.startTouchX}
//                             y1={this.state.startTouchY}
//                             x2={this.state.endTouchX}
//                             y2={this.state.endTouchY}
//                             stroke="#68B2A0"
//                             strokeWidth="8"
//                         />
//                     </Svg>
//                     <View
//                         style={styles.point1}
//                         {...this.panResponder.panHandlers}
//                     />
//                     <View
//                         style={styles.point2}
//                         {...this.panResponder.panHandlers}
//                     />
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     MainContainer: {
//         flex: 1,
//     },

//     childView: {
//         flex: 1,
//         overflow: 'hidden',
//     },
//     point1: {
//         height: 25,
//         width: 25,
//         marginTop: 65,
//         marginLeft: 30,
//         position: 'absolute',
//         borderRadius: 8,
//         backgroundColor: '#68B2A0',
//     },
//     point2: {
//         height: 25,
//         width: 25,
//         marginTop: 545,
//         marginRight: 30,
//         marginLeft: 150,
//         position: 'absolute',
//         borderRadius: 8,
//         backgroundColor: '#68B2A0',
//     },
// });

import React, { useRef, useState } from 'react';
import { Dimensions, PanResponder, View, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const examplePath = [
    { x: 90, y: 300 },
    { x: 170, y: 45 },
    { x: 250, y: 290 },
    { x: 45, y: 130 },
    { x: 285, y: 130 },
    { x: 90, y: 298 }
];

const GesturePath = ({ path, color }) => {
    const { width, height } = Dimensions.get('window');
    const points = path.map(p => `${p.x},${p.y}`).join(' ');
    return (
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
            <Polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1"
            />
        </Svg>
    );
};

const GestureRecorder = ({ onPathChanged }) => {
    const pathRef = useRef([]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { pathRef.current = [] },
            onPanResponderMove: (event) => {
                pathRef.current.push({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY,
                })
                // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
                onPathChanged([...pathRef.current]);
            },
            onPanResponderRelease: () => { onPathChanged([...pathRef.current]) }
        })
    ).current;

    return (
        <View
            style={StyleSheet.absoluteFill}
            {...panResponder.panHandlers}
        />
    );
}

const ConnectDots = () => {
    const [path, setPath] = useState(examplePath);
    return (
        <View style={StyleSheet.absoluteFill}>
            <GesturePath path={path} color="green" />
            <GestureRecorder onPathChanged={setPath} />
        </View>
    );
}

export default ConnectDots;