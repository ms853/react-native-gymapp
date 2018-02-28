import React from "react";
import { View } from "react-native";

const Background = (props) => { 
    return (
        <View style={[styles.containerStyle]}>
            {props.children}
        </View>
    );
}

const styles = {
    containerStyle: {
        
        //flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
        width: null
        //position: 'relative'
    },

    imageStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
};
  

export { Background }

