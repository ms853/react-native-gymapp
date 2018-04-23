import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
//connect function which will connect this react component to redux. 
import { connect }  from 'react-redux';
import firebase from 'firebase';
import { exerciseChanged } from '../../actions/ExerciseAction';
import { Card, CardSection, Input, Button, NumberInput } from "../reusable";


class WorkoutForm extends Component{
    
    render(){
    
        return(
 
                <View>
                        <CardSection>
                            <Input 
                                label="Exercise Name"
                                placeholder ="e.g. Flat Barbell or Dumbbell Bench Press"
                                onChangeText={value => this.props.exerciseChanged({ prop: 'exercise_name', value })}                                
                                value={this.props.exercise_name}
                            />
                        </CardSection>

                        <CardSection>
                            <NumberInput
                                label="Weight (Kg)"
                                type="up-down" //by default its plus-minus
                                valueType='real'
                                step={0.5} 
                                width={250}
                                height={170}
                                onChangeNumber={value => this.props.exerciseChanged({ prop: 'weight', value })}
                                value={this.props.weight}
                            />
                        </CardSection>

                        <CardSection>
                            <NumberInput
                                label="Number of Sets"
                                type="up-down"
                                width={250}
                                height={170}
                                onChangeNumber={value => this.props.exerciseChanged({ prop: 'number_of_sets', value })}
                                value={this.props.number_of_sets}
                            />
                        </CardSection>
                        
                        <CardSection>
                        
                            <NumberInput
                                label="Number of Reps"
                                type="up-down"
                                width={250}
                                height={170}
                                onChangeNumber={value => this.props.exerciseChanged({ prop: 'number_of_reps', value })}               
                                value={this.props.number_of_reps}
                            />
                        
                        </CardSection>            
                </View>
               
        );
    }
}


const mapStateToProps = ( state ) => {
    const { exercise_name, number_of_sets, number_of_reps, weight, error } = state.workout;

    return {
        exercise_name, 
        number_of_sets, 
        number_of_reps,
        weight,
        error
    }
}

export default connect(mapStateToProps, { 
    exerciseChanged, 
     
})(WorkoutForm); //Component that the redux functionality should be applied to.