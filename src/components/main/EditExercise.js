import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card } from "../reusable";
import { RkButton } from 'react-native-ui-kitten';
import _ from 'lodash';
import { exerciseChanged, updateExercise, deleteExercise } from '../../actions/ExerciseAction';
import WorkoutForm from './WorkoutForm';

class EditExercise extends Component{

    componentWillMount() {
        //lodash method for iterating over elements (foreach loop)
        _.each(this.props.exercise, (value, prop) => {
            this.props.exerciseChanged({prop, value});//call action creator method
        });
    }

    _onSave() {
        const { exercise_name, number_of_sets, number_of_reps, weight } = this.props
        
        //Call made to the action creator to update the exercise information
        this.props.updateExercise({ exercise_name, weight, number_of_sets, number_of_reps, uid: this.props.exercise.uid })
        console.log("Here is the exercise id -> ",this.props.exercise.uid);
    }

    _onDelete() {
        const { exercise_name, number_of_sets, number_of_reps, weight } = this.props
        
        //Call made to the action creator to update the exercise information
        this.props.deleteExercise({ exercise_name, weight, number_of_sets, number_of_reps, uid: this.props.exercise.uid })
    }
    
    render(){
        return(

            <ScrollView>
                    <Card>
                        <WorkoutForm />
                        
                        <RkButton rkType="success xlarge"
                        onPress={this._onSave.bind(this)}
                        >
                            Save Changes
                        </RkButton>
                        
                        <RkButton rkType="danger xlarge"
                        onPress={this._onDelete.bind(this)}
                        >
                            Delete Exercise
                        </RkButton>
                    </Card> 
            </ScrollView>
        );
    }
}



const mapStateToProps = (state) => {
    const { exercise_name, number_of_sets, number_of_reps, weight } = state.workout;

    return { exercise_name, number_of_sets, number_of_reps, weight };
};
export default connect(mapStateToProps, { exerciseChanged, updateExercise, deleteExercise })(EditExercise);