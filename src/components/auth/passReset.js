import React, { Component } from "react";
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Header } from "react-native-elements";
import { Card, CardSection, Input, Button } from '../reusable';
import { Actions } from 'react-native-router-flux';

class passReset extends Component{
    
    render(){
        return(
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
                            label="Enter New Password"
                            placeholder="password"
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
                        <Button>Confirm</Button>
                    </CardSection>
                </Card>
                
            </View>
            
        );
    }
}
export default passReset;