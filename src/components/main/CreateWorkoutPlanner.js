import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from "react-native-elements";
import { Card, CardSection, Input, Button } from "../reusable";

class CreateWorkoutPlanner extends Component{
    render(){
        return(

            <View>
                <Card>
                    <CardSection>
                        <Input 
                            label="Workout Title"
                            placeholder ="e.g. Bench Press"
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Number of Sets"
                            placeholder ="enter number of sets"
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="Number of Repetitions"
                            placeholder ="e.g. 8 reps"
                        />
                    </CardSection>

                    <CardSection>
                        <Button onPress={()=> console.warn("Execise Added To Workout List")}> Add Exercise </Button>
                    </CardSection>

                </Card>
            </View>
        );
    }
}

export default CreateWorkoutPlanner;