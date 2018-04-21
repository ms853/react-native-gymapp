import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Header } from "react-native-elements";
import { Card, CardSection, Input, Button } from "./reusable";
import CreateWorkoutForm from './CreateWorkoutForm';

class EditExercise extends Component{
    
    render(){
        return(

            <View>
                <Card>
                    <CreateWorkoutForm />
                    <CardSection>

                    </CardSection>

                    <CardSection>
                       
                    </CardSection>
                    <CardSection>
                       
                    </CardSection>

                    <CardSection>
                       
                    </CardSection>

                </Card>
            </View>
        );
    }
}

export default connect(null, {})(EditExercise);