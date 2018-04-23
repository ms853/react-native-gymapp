import React, { Component } from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import { CardSection } from './reusable';
import { Actions } from 'react-native-router-flux';

class ExerciseListItem extends Component{
    
    _onListItemPress() {
        //Navigate to the employee edit component. 
        Actions.editExercise({ exercise: this.props.exercise });
    }
    render() {
        const { exercise_name, weight } = this.props.exercise;
        
        return (
            <TouchableHighlight onPress={this._onListItemPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.textStyle}>{exercise_name}</Text>
                        <Text style={styles.secondTextStyle}>{weight} Kg</Text>
                    </CardSection>
                </View>
            </TouchableHighlight>        
        );
    }
    
}

const styles = {
    textStyle: {
        fontSize: 22,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    secondTextStyle: {
        fontSize: 22,
        paddingLeft: 15
        //flexDirection: 'row'
    }
};

export default ExerciseListItem;