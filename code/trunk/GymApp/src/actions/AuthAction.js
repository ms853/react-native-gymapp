import firebase from 'firebase';
import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { DataSnapshot } from '@firebase/database';
import { Actions } from 'react-native-router-flux';

//Import Action Types 
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
    INVALID_PASSWORD,
    REG_UPDATE,
    REG_EMAIL_INPUT_CHANGED,
    REG_PASSWORD_INPUT_CHANGED,
    REGISTER_NEW_GYM_USER,
    REGISTER_NEW_PT,
    REGISTER_NEW_USER_FAIL,
    REGISTER_NEW_USER_SUCCESS,
    VALID_NAME,
    INVALID_NAME,
    REGISTER_NEW_CLIENT
} from "./types";


//Action Creator Functions for validating user credentials.
export const email_validator = (text) => {
    emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    //Using middleware redux-thunk to satisfy the requirement of redux action creators.
    return(dispatch) => {

            if(emailValid.test(text)){
                dispatch({ type: VALID_EMAIL });
                console.log('Correct user input');
            }else{
                dispatch({ type: INVALID_EMAIL });
                
            }
    };
}

export const password_validator = (text) => {
    passCheck = /(?=.{8,})/ //Password string must be at least 8 characters long or longer.

    //Using middleware redux-thunk to satisfy the requirement of redux action creators.
    return(dispatch) => {

            if(passCheck.test(text)){
                dispatch({ type: VALID_PASSWORD });
                console.log('Correct user input');
            }else{
                dispatch({ type: INVALID_PASSWORD });
                
            }
    };
}


//These two functions are responsible for updating the email and password
//of the user.
export const emailAltered = (text) => {
    
    return  {
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
        .catch(() => loginUserFail(dispatch));
            
    };
};


export const logoutUser = (user, dispatch) => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        dispatch({ type: USER_LOGOUT, payload: user });
        firebase.auth().signOut()
        //prints the current user's email that logged out 
        .then(console.log('The user logged out is =>' + currentUser.email));  
        //Return to login page.
        Actions.login();
    };
    
};

//Helper function to help us dispatch the actions 
// - both login failure and a successful login. 
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
}
  

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: USER_LOGIN_SUCCESS, payload: user,
    });
    //Once logged in it will direct me to the main page.
    Actions.main();
};

//Social/Third Party authentication with Facebook
export const facebookLogin = (dispatch, user) => {
    
    return (dispatch) => {
        dispatch({ type: FACEBOOK_LOGIN, payload: user});
        try{
            const authResult =  LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (authResult.isCancelled) {
                throw new Error('User cancelled login request.')
            }
            console.log(`Login success with premissions: ${authResult.grantedPermissions.toString()}`);
            
            //Here I will get the access tocken
            const data = AccessToken.getCurrentAccessToken();

            if(!data) {
                throw new Error("Something went wrong getting the access token");
            }

            // //create a new facebook credential
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            //Login with the new credential
            const currentUser = firebase.auth().signInWithCredential(credential);
           
            
            console.info(JSON.stringify(currentUser.toJson()));
            
            //Once logged in it will direct me to the main page.
            Actions.main();

        } catch(e) {
            alert(e);
        }
        
        
    };
};


// ----- Here are action creators that will handle the registration of the user. -------

//THIS FUNCTION NEEDS WORK 
//Name for validating fields.
export const check_name_fields = (text) => {
    
    return(dispatch) => {
        if(type == VALID_NAME){
            return dispatch({ type: VALID_EMAIL });
        } else 
            if( type == INVALID_NAME) {
                return dispatch({ type: INVALID_NAME });
        }
    };
}

//Here are two methods responsible for updating the user input in the signup form. 
export const registerUpdate = ({ prop, value }) => {
    return {
        type: REG_UPDATE,
        //Returns a key interpulation - values determined through runtime.
        payload: { prop, value }
    };
};

export const regEmailChanged = (text) => {
    
    return {
        type: REG_EMAIL_INPUT_CHANGED,
        payload: text
    };
};

export const regPasswordChanged = (text) => {
    return {
        type: REG_PASSWORD_INPUT_CHANGED,
        payload: text
    };
};


//Action creator for registering new user
export const registerNewPersonalTrainer = ({ firstName, surName, email, password, phoneNumber, gender, role }) => {
    var auth = firebase.auth();

    return(dispatch) => {
        dispatch({ type: REGISTER_NEW_GYM_USER });
        
        //Create new user 
        auth.createUserWithEmailAndPassword(email,password)
        .then((user) => signupSuccess(dispatch, user))
        .catch((error) => {
            signupFail(dispatch);
            Alert.alert(error.message);
        })
        .then(() => {
            if(auth) {
               // const { currentUser } = auth;
                //user = currentUser.email;
                //Save New Gym Users Details.
                savePTDetails({ firstName, surName, email, phoneNumber, gender, role });
                Alert.alert("Hello, your details have been saved successfully");
            }else{
                console.log("Details were not saved because user is not authenticated!");
            }
        }).then(() => Actions.main())
        .catch((error) => alert(error.message));
        
    };
};

export const registerNewGymUser = ({ firstName, surName, email, password, phoneNumber, gender, role }) => {
    const auth = firebase.auth();

    return(dispatch) => {
        dispatch({ type: REGISTER_NEW_PT });
        
        //Create new user 
        auth.createUserWithEmailAndPassword(email,password)
        .then((user) => signupSuccess(dispatch, user))
        .catch((error) => {
            signupFail(dispatch);
            Alert.alert(error.message);
        })
        .then(() => {
            if(auth) {
                //const { currentUser } = auth;
                //user = currentUser.email;
                //Save New Gym Users Details.
                saveGymUserDetails({ firstName, surName, email, phoneNumber, gender, role });
                Alert.alert("Hello, your details have been saved successfully");
            }else{
                console.log("Details were not saved because user is not authenticated!");
            }
        }).then(() => Actions.main())
        .catch((error) => alert(error.message));
        
    };
};


//Action creators returning action objects respectively based on the outcome 
//of the signup. 
const signupSuccess = (dispatch, user) => {
    dispatch({ 
        type: REGISTER_NEW_USER_SUCCESS, 
        payload: user
    });
};

const signupFail = (dispatch) => {
    dispatch({ type: REGISTER_NEW_USER_FAIL });
};


const saveGymUserDetails = ({ firstName, surName, email, phoneNumber, gender, role}) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();

    db.ref(`gym_users/${currentUser.uid}/user_info`)
    .set({
        firstName: firstName,
        surName: surName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        role: role
    }).catch((error) => alert(error.message));
};

const savePTDetails = ({ firstName, surName, email, phoneNumber, gender, role }) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    //Get the new push key as the client id
    //var clientId = db.ref().child('clients').push().key(); 

    db.ref(`personal_trainers/${currentUser.uid}`)
    .set({
        firstName: firstName,
        surName: surName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        role: role
    }).catch((error) => alert(error.message));
    
};






