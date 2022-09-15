import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import colorStyles from '../../styles/colorStyles'
import Svg, {
    Text as SvgText,
    Path,
} from 'react-native-svg';
import simplifySvgPath from '@luncheon/simplify-svg-path';

export default class ShapeTrace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPath: null,
            points: []
        }
    }

    createSVGPath(points) {
        if (points.length > 1) {
            try {
                return simplifySvgPath(points, {
                    precision: 5,
                    tolerance: 1,
                });
            } catch (error) {
                console.log(error);
            }
        } else if (points.length === 1) {
            return `M${points[0][0]},${points[0][1]} L${points[0][0]},${points[0][1]}`;
        }
        return '';
    }

    getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    render() {
        return (
            <View style={styles.container} >
                <Svg style={styles.contentContainer} height='100%' width='100%' fill="#000000" >
                    <SvgText fill="#FFFFFF" x="50%" y="75%" textAnchor="middle" fontSize="512"
                        onMoveShouldSetResponder={() => false}
                        onStartShouldSetResponder={() => false}
                        onMoveShouldSetPanResponder={() => true}
                        onResponderMove={(e) => {
                            console.log(e.nativeEvent)
                            this.state.points.push([e.nativeEvent.locationX, e.nativeEvent.locationY]);
                            this.setState({ currentPath: this.createSVGPath(this.state.points, 1, true) });
                        }}
                        onResponderRelease={() => {
                            this.setState({ points: [], currentPath: null })

                        }}
                        onLayout={(e) => {
                            console.log(e.currentTarget)
                        }}
                    >{this.getRandomString(1)}</SvgText>
                    <Path
                        d={this.state.currentPath}
                        fill="none"
                        stroke="#68B2A0"
                        strokeWidth={5}
                        opacity={1}
                    />
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#808080',
        flexDirection: 'column',
    },
    contentContainer: {
        position: "absolute",
        top: 0, left: 0,
        right: 0, bottom: 0,
    }
})