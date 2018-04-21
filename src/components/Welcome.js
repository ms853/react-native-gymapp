import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';
import { Header } from "../components/reusable";
import { Actions } from 'react-native-router-flux';
import { RkButton } from "react-native-ui-kitten";
class Welcome extends Component{
    render(){
        //ES6 Destructuring
        const { logo, backgroundImage, buttonSyle, containerStyle, buttonView } = styles;

        return(
            <ImageBackground
                source={require('../assets/images/barbell-bodybuild.jpg')}
                style={backgroundImage} 
            >        
                <View style={containerStyle}>
                      
                    <Text style={ logo }> My Trainer </Text>
                        
                    <View style={buttonView}>
                        <RkButton rkType='xlarge' onPress={() => Actions.auth()}>Login</RkButton>
                    </View>
                    <Text>Profile!</Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor: '#F8F8FF',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 20,
        margin: 20,
        marginBottom: 30
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'stretch'
    },
    containerStyle: {
        alignItems: 'center'
    },
    buttonView: {
        alignItems: 'center',
        margin: 50,
        marginBottom: 0,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    buttonSyle: {}    
});

export default Welcome;