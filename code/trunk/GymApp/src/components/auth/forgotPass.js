import React, { Component } from "react";
import { Text, View } from 'react-native';
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
            .then((user) => alert("Please check your email, and follow the link to reset your password."))
            .catch((error) => alert(error));
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