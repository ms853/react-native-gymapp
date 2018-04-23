//This reducer is responsible for handling the action type which
//retrieves the exercise data from firebase database.
//It is also responsible for displaying the change to the data. 
import { FETCH_EXERCISE_SUCCESS } from "../actions/types";

//Empty initial state object whose values wil
//be determined by runtime.
const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_EXERCISE_SUCCESS:
            return action.payload;
        default:
            return state;    
    }
};