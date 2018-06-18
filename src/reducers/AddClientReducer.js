import { 
    CLIENT_FORM_INPUT_CHANGED, 
    ADD_CLIENT, 
    ADD_CLIENT_SUCCESS, 
    ADD_CLIENT_FAIL,
    PHONE_CHANGED,
    GOAL_CHANGED,
    FNAME_CHANGED,
    SNAME_CHANGED 
} from '../actions/types';
import { Alert } from 'react-native';

//state object that holds all of the initial values 
//of the state
const initialStates = {

    firstName: '',
    surName: '',
    gender: 'Male' || 'Female',
    goal: '',
    phoneNumber: '',
    weight: 0,
    height: 0,
    loading: false,
    error: ''
};

export default (state = initialStates, action) => {
    
    switch(action.type){

        case CLIENT_FORM_INPUT_CHANGED:
            return {...state, [action.payload.prop]: action.payload.value };

        case ADD_CLIENT:
            return {...state, loading: true };

        case ADD_CLIENT_SUCCESS:
            Alert.alert("Your new client has been saved successfully.");
            return {...state, ...initialStates };

        case ADD_CLIENT_FAIL: 
            return {...state, error: 'Failed to add the new client.', loading: false};

        default:
            return state;            
    }
};