//import actions for the workout 
//handle updates to state objects based on the action invoked.

import { 
    EX_INPUT_CHANGED, 
    ADD_EXERCISE_SUCCESS, 
    ADD_EXERCISE_FAIL,
    UPDATE_EXERCISE_SUCCESS 
} from '../actions/types';

//Declaring the initial states object
const initialStates = {
    exercise_name: '',
    number_of_sets: 0,
    number_of_reps: 0,
    weight: 0.0, //The weight of equipment
    error: ''
};

export default (state = initialStates, action) => {
    switch(action.type) {
        case EX_INPUT_CHANGED:
            return {...state, [action.payload.prop]: action.payload.value }
        case ADD_EXERCISE_SUCCESS: 
            alert("Your new exercise has been added.");
            return initialStates;
        case ADD_EXERCISE_FAIL:
            return { ...state, initialStates, error: 'Failed to add exercise!' }
        case UPDATE_EXERCISE_SUCCESS:
            return initialStates;
        default:
            return initialStates;
    }
};