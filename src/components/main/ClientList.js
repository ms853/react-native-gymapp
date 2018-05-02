import React, { Component } from "react";
import { 
    View, Text, ScrollView, 
    FlatList, TouchableOpacity, Alert
} from "react-native";
import firebase from 'firebase';
import { Actions } from "react-native-router-flux";
import { RkButton } from 'react-native-ui-kitten';
import { Card, CardSection } from '../reusable';
import PhoneInput from 'react-native-phone-input';

class ClientList extends Component{
    
    constructor(props) {
        super(props);
    }

    componentWillMount() {}
   
    render() {
        //Returns JSX code which is the UI
        return (
            <ScrollView>
                                        
                    <CardSection>
                        <Text style={styles.textStyle}>What is your gender?</Text>
                    </CardSection>

                    <CardSection>
                        <Text style={styles.textStyle}>Enter Your Phone Number</Text>
                    </CardSection>
                    
                    <CardSection> 
                        <Text style={styles.textStyle}>
                            If you are a Personal Trainer, please choose the Personal Trainer role
                            from the choice box below.
                        </Text>
                    </CardSection>

            </ScrollView>    
        );
    }
}

//Stylesheet object 
const styles = {
    
    textStyle: {
        fontSize: 15
    },

    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    phoneContainerStyle: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },

    errorTextStyle: {
        fontSize: 15,
        color: 'red',
        backgroundColor: 'rgba(255,255,255,1)'
    },

    buttonStyle: {
        margin: 10,
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'black'//'rgba(255,255,255,0.6)'
    },
};


export default ClientList;