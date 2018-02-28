import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    USER_LOGIN_SUCCESS 
} from "./types";

//Action Creators for handelling authentication.
export const emailAltered = (text) => {
    return {
        type: EMAIL_INPUT_CHANGED,
        payload: text
    };
};

export const passwordAltered = (text) => {
    return {
        type: PASSWORD_INPUT_CHANGED,
        payload: text
    };
};


export const loginUser = ({ email, password }) => {
    //Here is the firebase authentication call
    return(dispatch) => {

        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(user => loginUserSuccess(dispatch, user));
        })
        .catch(() => loginUserFail(dispatch));
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
}
  
//Helper function to help us dispatch the action
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: USER_LOGIN_SUCCESS, payload: user
    });

    //Once logged in it will direct me to the main page.
    Actions.main();
};