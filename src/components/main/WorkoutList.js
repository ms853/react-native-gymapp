import React, { Component } from "react";
import { ScrollView, Text, View } from 'react-native';
import { connect } from "react-redux";
import { fetchExercises } from "../../actions/ExerciseAction";

class WorkoutList extends Component{

    componentWillMount() {
        //So as soon as this component will be 
        //rendered to the screen, get all the exercises.
        this.props.fetchExercises();
    }
    
    render() {
        return (
            <ScrollView>
                <View>
                    <Text>Workout List</Text>
                    <Text>Workout List</Text>
                </View>
            </ScrollView>

        );
    }
}

export default connect(null, { fetchExercises })(WorkoutList);