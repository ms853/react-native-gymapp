import React, { Component } from "react";
import { Text, View, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { RkButton } from "react-native-ui-kitten";
import { Card, CardSection, Input, SpinnerLoader, Button } from "./reusable";

class Nutrition extends Component {
    
   
    render() {
        
        //ES6 Destructuring     
        const { 
            containerStyle, 
            backgroundImg, 
            content, 
            logo, 
            inputContainer,
            linkStyle
            } = styles;
        //require('../assets/images/barbell-bodybuild.jpg')
        return(
        <ImageBackground

            source={{ uri: 'https://cdn.pixabay.com/photo/2016/11/19/12/43/barbell-1839086_960_720.jpg'}} 
            style={ backgroundImg }>
            <ScrollView>
                <View style={ content }>
                           
                        <View>
                            
                            <CardSection>
                                <Text>Nutrition Page!</Text>
                            </CardSection>
                            
                            <CardSection>

                            </CardSection>

                        </View>
                   
                </View>        
                </ScrollView>
        </ImageBackground>
        
        );
    }
}

const styles = StyleSheet.create({ 
    backgroundImg: {    
        height: '100%',
        width: '100%',
        alignSelf: 'stretch'           
    
    },
    containerStyle: {
        flex: 1
    },
    content: {
        alignItems: 'center'     
    },
    logo: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor: '#F8F8FF',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 20,
        marginBottom: 30
    },
    inputContainer: {
        margin: 40,
        marginBottom: 0,
        padding: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    buttonStyle: {
        margin: 10,
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkStyle: {
        fontSize: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: 55
    }
});

//Map state to props function 
//the property (i.e. email) comes from the reducer
// const mapStateToProps = ({ auth }) => {
//     const { email, password, loading, error } = auth;
    
//     return {
//         email,
//         password,
//         loading, 
//         error
//     };
// };

export default connect(null, {})(Nutrition);