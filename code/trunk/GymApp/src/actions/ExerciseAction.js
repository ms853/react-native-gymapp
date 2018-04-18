import { 
    EX_INPUT_CHANGED, 
    ADD_EXERCISE,
    ADD_EXERCISE_SUCCESS,
    ADD_EXERCISE_FAIL
} from "../actions/types";
import firebase from 'firebase';
//navigation module
import { Actions } from 'react-native-router-flux';

//Action method for keeping track of the change in the input value. 
export const createExercise_Changed = ({ prop, value }) => {
    return { 
        type: EX_INPUT_CHANGED, 
        payload: { prop, value }
    };
};

//Asynchronous function for adding exercise
export const addExercise = ({ exercise_name, numSets, numReps }) => {
    //Extracting current user object from authentication property.
    const { currentUser } = firebase.auth(); 
    const db = firebase.database(); //database object, which will be used to write to the database. 

    return(dispatch) => {
        db.ref(`/user/${currentUser.uid}/exercises`)
        .set({ 
            exerciseName: exercise_name, 
            numberOfSets: numSets, 
            numberOfReps: numReps 
        })
        .then(() => {
            dispatch({ type: ADD_EXERCISE_SUCCESS })
                
        }).catch((error) => {
            dispatch({ type: ADD_EXERCISE_FAIL})
            alert(error);
        })
    };
};


const addingExerciseFailed = () => {
    return { type: ADD_EXERCISE_FAIL };
};

const addingExerciseSuccess = () => {
    return { type: ADD_EXERCISE_SUCCESS };
}