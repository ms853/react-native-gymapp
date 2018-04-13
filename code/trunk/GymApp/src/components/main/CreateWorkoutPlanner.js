import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from "react-native-elements";
//import NumericInput, {calcSize} from 'react-native-numeric-input';
import { Card, CardSection, Input, Button, NumberInput } from "../reusable";


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
                        <NumberInput
                            label="Number of Sets"
                            type="up-down"
                            width={220}
                            height={220}
                            onChangeNumber={value => console.warn(value)}
                        />
                    </CardSection>
                    <CardSection>
                    
                        <NumberInput
                            label="Number of Reps"
                            type="up-down"
                            width={220}
                            height={220}
                            onChangeNumber={value => console.warn(value)}
                            
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