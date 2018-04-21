import _ from 'lodash'; 
import React, { Component } from "react";
import { ScrollView, ListView, Text, View } from 'react-native';
import { connect } from "react-redux";
import { fetchExercises } from "../../actions/ExerciseAction";
import ExerciseListItem from '../ExerciseListItem';

class WorkoutList extends Component{

    componentWillMount(){
        //So as soon as this component will be 
        //rendered to the screen, get all the exercises.
        this.props.fetchExercises();

        //Attempting to create the datasource with the initial props.
        this.createDataSource(this.props);
        console.log("LOOK HERE ->", this.props);
    }
  

    componentWillReceiveProps(nextProps) {
        /**
         * This method receives the next set of props (the new props) 
         * that this component will be rendered with.
         * this.props is still the old props.
        **/
       //Attempting to create new data source, with new props
       this.createDataSource(nextProps);
    }
    
    //Helper method for creating the ListView with the props. 
    createDataSource({ exercises }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(exercises);
    }

    //function responsible for rendering a single row
    renderRow(exercise) {
        return <ExerciseListItem  exercise={exercise}/> 
    }
    
    render() {
        //checking if it works.
        console.log(this.props);

        return (
            <ScrollView>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}  
                    renderRow={this.renderRow}    
                />
            </ScrollView>

        );
    }
}


const mapStateToProps = state => {
    //console.log(state.exercises);
    
    const exercises = _.map(state.exercises, (val, uid) => {
        //the _.map function from the lodash library
        //converts the exercise objects into an array.
        
        return { ...val, uid }; 
    });

    return { exercises }; //retrun new array object. 
    //console.log(state.exercises);
};

export default connect(mapStateToProps, { fetchExercises })(WorkoutList);