import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
//connect function which will connect this react component to redux. 
import { connect }  from 'react-redux';
import firebase from 'firebase';
import { createExercise_Changed, addExercise} from '../../actions/ExerciseAction';
import { Card, CardSection, Input, Button, NumberInput } from "../reusable";


class CreateWorkoutForm extends Component{

    _addExercise() {
        var auth = firebase.auth();
        const { number_of_reps, number_of_sets, exercise_name, weight } = this.props;

        if (auth){
            this.props.addExercise({ exercise_name, weight, number_of_sets, number_of_reps });
        }else{
            console.log("User is not authenticated so exercise cannot be added!");
        }
            
    }
    
    render(){
    
        return(
            <ScrollView>    
                <View>
                    <Card>
                        <CardSection>
                            <Input 
                                label="Exercise Name"
                                placeholder ="e.g. Flat Barbell or Dumbbell Bench Press"
                                onChangeText={value => this.props.createExercise_Changed({ prop: 'exercise_name', value })}                                
                                value={this.props.exercise_name}
                            />
                        </CardSection>

                        <CardSection>
                            <NumberInput
                                label="Weight (Kg)"
                                type="up-down" //by default its plus-minus
                                valueType='real'
                                step={0.5} 
                                width={230}
                                height={180}
                                onChangeNumber={value => this.props.createExercise_Changed({ prop: 'weight', value })}
                                value={this.props.weight}
                            />
                        </CardSection>

                        <CardSection>
                            <NumberInput
                                label="Number of Sets"
                                type="up-down"
                                width={230}
                                height={180}
                                onChangeNumber={value => this.props.createExercise_Changed({ prop: 'number_of_sets', value })}
                                value={this.props.number_of_sets}
                            />
                        </CardSection>
                        
                        <CardSection>
                        
                            <NumberInput
                                label="Number of Reps"
                                type="up-down"
                                width={230}
                                height={180}
                                onChangeNumber={value => this.props.createExercise_Changed({ prop: 'number_of_reps', value })}               
                                value={this.props.number_of_reps}
                            />
                        
                        </CardSection>
                        
                        <CardSection>
                            <Button onPress={this._addExercise.bind(this)}> Add New Exercise </Button>
                        </CardSection>

                    </Card>
                </View>
            </ScrollView>    
        );
    }
}

const mapStateToProps = ({ workout }) => {
    const { exercise_name, number_of_sets, number_of_reps, weight, error } = workout;

    return {
        exercise_name, 
        number_of_sets, 
        number_of_reps,
        weight,
        error
    }
}

export default connect(mapStateToProps, { 
    createExercise_Changed, 
    addExercise 
})(CreateWorkoutForm); //Component that the redux functionality should be applied to.