import firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { DataSnapshot } from '@firebase/database';
import { Actions } from 'react-native-router-flux';
import { validator } from '../components/validator';
import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, 
    FACEBOOK_LOGIN,
    REG_EMAIL_INPUT_CHANGED,
    REG_PASSWORD_INPUT_CHANGED, 
    PT_CHECKED,
    PT_UNCHECKED,
    REGISTER_UPDATE,
    REGISTER_USER,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SAVE_USER_INFO_SUCCESS
} from "./types";

// -------- Here I have Action Creators which are responsible for handelling the user login -----

//Action creators for handelling authentication (login)
//These two functions are responsible for updating the email and password
//of the user.


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

//Two methods responsible for updating the user input in the signup form. 
export const registerUpdate = ({ prop, value }) => {
    return {
        type: REGISTER_UPDATE,
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


export const regPTChecked = (value) => {
    return {
        type: PT_CHECKED,
        payload: value
    }
}

export const regPTUnChecked = (value) => {
    return {
        type: PT_UNCHECKED,
        payload: value
    }
}


export const registerUser = ({email, password, fname, sname, phone, gender, pTChecked}) => {
    //get currentUser Object
    const db = firebase.database();
   
    //console.log(email);
    return(dispatch) => {
        dispatch({ type: REGISTER_USER });
        console.log("My database ->" + firebase);

        //Create a new user account 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                //user = firebase.auth().currentUser;
                console.log(user);
               // db.ref(`/users/${user.uid}`).push({hi: 'hi'})
                db.ref(`/users/${user.uid}`).push({
                     email, fname, sname, phone, gender, pTChecked 
                })
            })
            .then((user) => registerUserSuccess(dispatch, user))
            .catch((error) => alert(error));   
            
           
    };
};

const registerUserFail = (dispatch) => {
    dispatch({ type: REGISTER_FAIL });
}
  

const registerUserSuccess = (dispatch, user) => {
    console.log('About to register the user!');
   
        dispatch({
            type: REGISTER_SUCCESS, payload: user,
        });
        //console.log("This is the current user ->" + user);
        
        //console.log("This is the current user ->2" + user); 
    
    //Once logged in it will direct me to the main page.
    Actions.main();
};

//method for saving user details once they are authenticated!
// export const saveNewUserDetails = ({ email, fname, sname, phone, gender, pTChecked, role }) =>{
//     console.log("saveNewUserDetails");
    
//     //initialise reference for the database. 
//     const db = firebase.database();

//     return(dispatch) => {
 
//         //debugger;
//         console.log(currentUser.uid);
//         db.ref(`/users/${currentUser.uid}/user_info`).push({ hello: 'hi'})
//         //db.ref(`/users/${currentUser.uid}/user_info`)
//         //.push({ email, fname, sname, phone, gender, pTChecked, role })

//         .then(() => { //here I dispatch the action that has been invoked. 
//             dispatch({type: SAVE_USER_INFO_SUCCESS});
//         }); 
        
//     };
// };


