import { 
    ADD_CLIENT, 
    ADD_CLIENT_FAIL, 
    ADD_CLIENT_SUCCESS,
    CLIENT_FORM_INPUT_CHANGED,     
    FETCH_CLIENTS_SUCCESS
} from '../actions/types';
import { Alert } from 'react-native';
import { Actions } from "react-native-router-flux";
import firebase from 'firebase';

//Action method for keeping track of the change in the input value. 
export const clientChanged = ({ prop, value }) => {
    return { 
        type: CLIENT_FORM_INPUT_CHANGED, 
        payload: { prop, value } 
    };
}


//Method for adding a new client
export const addNewClient = ({ firstName, surName, gender, goal, phoneNumber, weight, height}) => {
    //database root reference
    const db = firebase.database();
    const { currentUser } = firebase.auth();
    const ptRef = db.ref().child('personal_trainers/' + currentUser.uid);

    return(dispatch) => {
        dispatch({ type: ADD_CLIENT});
        db.ref('clients/' + currentUser.uid + '/')
        .push({
            firstName, surName, 
            gender, goal, 
            phoneNumber, weight, height
        }).then(() => {
            addClientSuccess(dispatch);
            Alert.alert('My Trainer',
            'Client details have been saved.');
            Actions.clientList();
        }).catch((error) => {
            addClientFail(dispatch);
            Alert.alert('My Trainer says', error);

        });

        //Getting the new client id.
        const clientID = db.ref().child('clients').push().key;
        ptRef.push({
            clientID
        }).then(() => console.log("New Client ID added to the PT node in the database"))
        .catch((error) => alert(error));
        
    };
    

    
};

const addClientSuccess = (dispatch) => {
    return dispatch({ type: ADD_CLIENT_SUCCESS });
};

const addClientFail = (dispatch) => {
    return dispatch({ type: ADD_CLIENT_FAIL });
};

export const fetchClients = () => {
    const db = firebase.database();
    const { currentUser } = firebase.auth(); //the current user (personal trainer) that is currently authenticated.
    return (dispatch) => {
        //Here anytime any data comes across from the reference
        //call the faderal function with the object (snapshot) that 
        //-describes the data. 
        //the '.on' is a persistant promise is a firebase query that listens for changes 
        //to the data and reads it.
        console.log("Current User =>", currentUser.uid);
        db.ref(`/clients/${currentUser.uid}`)
            .on('value', snapshot => {
                //returns an object everytime new value of clients is found in the database.
               dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: snapshot.val() }); 
            });
    };
};