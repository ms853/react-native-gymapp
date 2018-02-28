import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { RkButton } from "react-native-ui-kitten";
import { Header } from "react-native-elements";
import { Card, CardSection, Input, Button } from './reusable';

class Register extends Component{
    render() {
        return (
            <View>
                <Header
                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Create A New Account', 
                    style: { color: '#fff', 
                            fontSize: 20,
                            fontWeight: 'bold'
                            } }}
                />
                <ScrollView>
                <Card>
                    <CardSection>
                        <Input 
                            label="Name"
                            placeholder ="Enter Full Name"
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Email Address"
                            placeholder ="email@mail.com"
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Enter Password"
                            placeholder = "password"
                            secureTextEntry
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="Confirm Password"
                            placeholder="password"
                            secureTextEntry
                        />
                    </CardSection>

                    <CardSection>
                        <Button> Register </Button>
                    </CardSection>

                </Card>
                </ScrollView>
            </View>    
        );
    }
}

const styles = {
    buttonStyle: {
        margin: 10,
        padding: 5,
        borderWidth: 1
    }
};

export default Register;