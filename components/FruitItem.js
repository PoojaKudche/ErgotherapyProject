import React, {useState } from 'react';
import { View, Image} from 'react-native';

const fruitItem = (props) => {

    return (
            <View style={{ width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: "#FEDBD0", marginTop: 60, padding: 25 }} >
            { props.isSwipped ? <Image source={props.imgDefault} /> : (
            <View style={{flexDirection: 'row'}}>
            <Image source={props.imgOne}  style={{marginLeft: -40}}/>
            <Image source={props.imgTwo}  style={props.fruitName == "watermelon" ? {marginLeft: -40} : {marginLeft: 0}} />
             </View>
            ) } 
            </View>


    );
}






export default fruitItem;