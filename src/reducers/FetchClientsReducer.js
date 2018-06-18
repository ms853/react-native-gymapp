/**
 * This reducer handles the action type 
 * that gets client data from db.
 */
//It is also responsible for displaying the change to the data. 
import { FETCH_CLIENTS_SUCCESS } from "../actions/types";

//Empty initial state object whose values wil
//be determined by runtime.
const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CLIENTS_SUCCESS:
            return action.payload; //values fetched from the database. 
        default:
            return state;    
    }
};