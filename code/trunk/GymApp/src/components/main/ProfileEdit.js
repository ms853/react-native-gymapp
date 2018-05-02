import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from "react-native-elements";
import { Card, CardSection, Input, Button } from "../reusable";

class ProfileEdit extends Component{
    render(){
        return(

            <View>
                <Card>
                    <CardSection>
                        <Input 
                            label="Enter Password"
                            placeholder ="e.g. Bench Press"
                        />
                    </CardSection>
                    <CardSection>
                        <Button>Update Email Address</Button>
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="Current Password"
                            placeholder ="enter password"
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="New Password"
                            placeholder ="enter password"
                        />
                    </CardSection>

                    <CardSection>
                        <Button> Update Password </Button>
                    </CardSection>

                </Card>
            </View>
        );
    }
}

export default ProfileEdit;