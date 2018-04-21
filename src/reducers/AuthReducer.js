/**
 * To Do:
 * First import all the action types
 * Then create a initial state variable, which will store the initial states
 * -which are the states such as the user input which will be updated.
 * Switch case to determine which initial state will be updated based on the action type. 
 */
import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    FACEBOOK_LOGIN
 } from "../actions/types";
 

const initialState = {
    email: '',
    password: '',
    user: null,
    loading: false, //boolean for spinner
    error: ''
};

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
        
        case LOGIN_USER_FAIL:
            alert('Invalid Email or Password!');
            return { ...state, email: '', password: '', error: 'Invalid Input! Check your email or password.', 
            loading: false,
        };
        
        case USER_LOGOUT: 
            alert('You have logged out!');
            return { ...state, user: action.payload };
        
        case FACEBOOK_LOGIN:
            return {...state, user: action.payload };    
            
        default:
            return state;
    }
}