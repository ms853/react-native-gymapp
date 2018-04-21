import React, { Component } from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import { CardSection } from './reusable';

class ExerciseListItem extends Component{
    
    render() {
        const { exercise_name } = this.props.exercise;
        
        return (
            <TouchableWithoutFeedback /**onPress={this.onRowPress.bind(this)}**/>
                <View>
                    <CardSection>
                        <Text style={styles.textStyle}>{exercise_name}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>        
        );
    }
    
}

const styles = {
    textStyle: {
        fontSize: 20,
        paddingLeft: 18
    }
};

export default ExerciseListItem;