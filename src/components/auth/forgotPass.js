import React, { Component } from "react";
import { Text, View, Alert } from 'react-native';
import firebase from 'firebase';
import { Header } from "react-native-elements";
import { Card, CardSection, Input, Button } from '../reusable';
import validator from '../validator';
import { Actions } from 'react-native-router-flux';

class forgotPass extends Component{

    constructor(props) {
        super(props)
        state = {
            email: ''
        };
    };
    //This method will render view for the email input
    resetPassword() {
        const auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email)
            .then(() => Alert.alert('My Trainer', "Please check your email, a password reset email has been sent to the email you have provided."))
            .catch((error) => Alert.alert('My Trainer', error.message));
    };


    render() {

        return (
            <View>
                <Header
   
                    centerComponent={{ text: 'Reset Password', 
                    style: { color: '#fff', 
                            fontSize: 20,
                            fontWeight: 'bold'
                     } }}
                     outerContainerStyles={{ backgroundColor: 'black' }}
                        />

                <Card>
                    <CardSection>
                    <Input 
                        label="Email"
                        placeholder="Enter Email Address."
                        value={this.props.email}
                        onChangeText={(email) => this.setState({ email })}              
                    />
                    </CardSection>
                    
                    <CardSection>
                        <Button onPress={this.resetPassword.bind(this)} >Reset Password</Button>
                    </CardSection>
                </Card>
            </View>
        );
    }   
}

export default forgotPass;