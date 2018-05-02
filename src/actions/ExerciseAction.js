import { 
    EX_INPUT_CHANGED, 
    ADD_EXERCISE_SUCCESS,
    ADD_EXERCISE_FAIL,
    FETCH_EXERCISE_SUCCESS,
    UPDATE_EXERCISE_SUCCESS,
    DELETE_EXERCISE
} from "../actions/types";
import firebase from 'firebase';
//navigation module
import { Actions } from 'react-native-router-flux';

//Action method for keeping track of the change in the input value. 
export const exerciseChanged = ({ prop, value }) => {
    return { 
        type: EX_INPUT_CHANGED, 
        payload: { prop, value }
    };
};

//Asynchronous function for adding exercise
export const addExercise = ({ exercise_name, weight, number_of_sets, number_of_reps }) => {
    
    const { currentUser } = firebase.auth(); //Extracting current user object from authentication property.
    const db = firebase.database();  //database object, which will be used to write to the database.
    
    //Using syntax from redux thunk just to bypass the requirement of redux-thunk 
    //expecting a retrun of plan object. 
    //here I am returning a federal function. 
    return(dispatch) => {
        //Here the dispatch returns the action which has been invoked. 
        dispatch({ type: ADD_EXERCISE_SUCCESS })
        /**
         * Here I am using the string interpulation to specify the json path,
         * which is where the new data will be stored. 
         * Then the objects are pushed to that path of the database,
         * followed by some error handling if it fails. 
        **/
        db.ref(`/exercises/${currentUser.uid}`)
        //Note that push method creates new unique id to identify each exercise.
        .push({ exercise_name, weight, number_of_sets, number_of_reps })
        //Navigate to exercise list component.
        .then(() =>  Actions.workoutList())
        .catch((error) => {
            addingExerciseFailed(dispatch)
            console.error(error);
        })
    };
};

const addingExerciseFailed = (dispatch) => {
    return { type: ADD_EXERCISE_FAIL };
};

//Asychronous method because here I am making an request 
//-to the database to read the data.
//so redux-thunk funtionality is used here. 
export const fetchExercises = () => {
    const db = firebase.database();
    const { currentUser } = firebase.auth(); //the current user that is currently authenticated in the app.
    return (dispatch) => {
        //Here anytime any data comes across from the reference
        //call the faderal function with the object (snapshot) that 
        //-describes the data. 
        //the '.on' is a persistant promise is a firebase query that listens for changes 
        //to the data and reads it.
        db.ref(`/exercises/${currentUser.uid}`)
            .on('value', snapshot => {
                //returns an object everytime new value is found in the database.
               dispatch({ type: FETCH_EXERCISE_SUCCESS, payload: snapshot.val() }); 
            });
    };
};

//This is the Asychronous action method for updating exercise informaton
//This action creator when called will update the infromation of a specific exercise.
export const updateExercise = ({ exercise_name, weight, number_of_sets, number_of_reps, uid}) => {
    const { currentUser } = firebase.auth();
    const database = firebase.database();

    return(dispatch) => {
        //this reference points to the unique id assigned to the specific exercise in my database.
        database.ref(`/exercises/${currentUser.uid}/${uid}`)
        .set({
            exercise_name: exercise_name,
            weight: weight,
            number_of_sets: number_of_sets,
            number_of_reps: number_of_reps
        }).then(() => {
            dispatch({ type: UPDATE_EXERCISE_SUCCESS })
            Actions.workoutList();
        }).catch((error) => console.error(error));
    };

};

export const deleteExercise = ({ exercise_name, weight, number_of_sets, number_of_reps, uid }) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();

    return(dispatch) => {
        db.ref(`/exercises/${currentUser.uid}/${uid}`)
        .remove()
        .then(() => {
            dispatch({ type: DELETE_EXERCISE});
            Actions.workoutList();
        }).catch((error) => console.error(error));
    };
    
};


