import {Alert} from 'react-native';

import { 
    REG_EMAIL_INPUT_CHANGED, 
    REG_PASSWORD_INPUT_CHANGED,  
    REG_UPDATE,
    REGISTER_NEW_USER,
    REGISTER_NEW_USER_SUCCESS,
    REGISTER_NEW_USER_FAIL,
    VALID_EMAIL,
    INVALID_EMAIL,
    VALID_PASSWORD,
    INVALID_PASSWORD,
    VALID_NAME,
    INVALID_NAME
} from "../actions/types";

//inital state object that contains the initial values of the prop objects
const initialStates = {
    loading: false, //spinner boolean
    user: null,
    error: '',
    firstName: '',
    surName: '',
    gender: 'male' || 'female',
    email: '',
    password: '',
    pTChecked: false,
    phoneNumber: '',
    role: 'Gym User' || 'Personal Trainer'
};

//Now here I will have a switch case inside a federal function, which will handle state updates 
//based on the type of action that is invoked. 
export default (state = initialStates, action) => {
   // console.log(action); //log actions to the console. 

    switch(action.type) {
        case REG_EMAIL_INPUT_CHANGED:
            return {...state, email: action.payload };

        case REG_PASSWORD_INPUT_CHANGED:
            return {...state, password: action.payload }; 
            
        case VALID_EMAIL:
            return {...state, error: '' };    
        
        case INVALID_EMAIL:
            return {...state, error: "Please, the email you have provided is invalid. Email address must be of the following user@mail.com or user12@mail.com." };

        case VALID_PASSWORD:
            return {...state, error: '' };    
        
        case INVALID_PASSWORD:
            return {...state, error: "Please, the password you have provided is invalid. Password must be 8 characters or longer." };    

        case VALID_NAME:
            return {...state, error: '' };

        case INVALID_NAME:
            return {...state, error: 'Name fields cannot be empty, please provide your name.' };    
        
        case REG_UPDATE:
        //props and values get assigned through runtime.
            return {...state, [action.payload.prop]: action.payload.value };

        case REGISTER_NEW_USER:
            return {...state, loading: true};
           
        case REGISTER_NEW_USER_SUCCESS:
            return {...state, ...initialStates, user: action.payload };
        
        case REGISTER_NEW_USER_FAIL:
            Alert.alert("Sign Up Failed");
            return {loading: false};

        default:
            return state;
    }

}