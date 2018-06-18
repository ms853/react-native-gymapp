/**
 * To Do:
 * First import all the action types
 * Then create a initial state variable, which will store the initial states
 * -which are the states such as the user input which will be updated.
 * Switch case to determine which initial state will be updated based on the action type. 
 */
import { Alert } from 'react-native';
import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    FACEBOOK_LOGIN,
    INVALID_EMAIL,
    VALID_EMAIL,
    VALID_PASSWORD,
    INVALID_PASSWORD
 } from "../actions/types";
 

const initialState = {
    email: '',
    password: '',
    user: null,
    loading: false, //boolean for spinner
    error: '',
    validate: true
};

//validation methods
// const validateEmail = (state) => {
//     if(state.email)
// }

export default (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        //Each time I am returning a new state object.
        case EMAIL_INPUT_CHANGED:
            return {...state, email: action.payload };

        case PASSWORD_INPUT_CHANGED: 
            return {...state, password: action.payload };
        case LOGIN_USER:
        //set loading to true will display the spinner
            return {...state, error: '', loading: true }; 
        
        case USER_LOGIN_SUCCESS: 
            return { ...state, ...initialState, user: action.payload };

        case VALID_EMAIL: 
            return { ...state, error: '', validate: false};

        case INVALID_EMAIL: 
            return {...state, error: "Please, the email you have provided is invalid. Email address must be of the following user@mail.com or user12@mail.com.", validate: true};

        case VALID_PASSWORD: 
            return { ...state, error: ''};

        case INVALID_PASSWORD: 
            return {...state, error: "Please, the password you have provided is invalid. Password must be 8 characters or longer."};
        
        case LOGIN_USER_FAIL:
            Alert.alert('Invalid Email or Password!');
            return { ...state, password: '', error: 'The email or password you have entered is invalid. Please try again.', 
            loading: false,
        };

        case USER_LOGOUT: 
            Alert.alert('You have logged out!');
            return { ...state, user: action.payload };
        
        case FACEBOOK_LOGIN:
            return {...state, user: action.payload };    
            
        default:
            return state;
    }
}