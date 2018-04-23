import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
//Function for connecting this react component to redux. 
import { connect }  from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { addExercise} from '../../actions/ExerciseAction';
import { Card, CardSection, Input, Button, NumberInput } from "../reusable";
import WorkoutForm from './WorkoutForm';

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

                    <Card>
                        {/*Here I am passing the prop objects to the reusable component - workout-form
                        which displays the inputs and the relevant form sections.*/}
                        <WorkoutForm { ...this.props } />
                        <CardSection>
                            <Button onPress={this._addExercise.bind(this)}> Add New Exercise </Button>
                        </CardSection>
                        <CardSection>
                            <Button onPress={() => Actions.workoutList()}> View Workout List </Button>
                        </CardSection>
                    </Card>

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
    addExercise 
})(CreateWorkoutForm); //Component that the redux functionality should be applied to.