//File responsible for exporting all the different types of reducers in my app.
import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AddWorkoutReducer from "./AddWorkoutReducer";
import RegisterReducer from "./RegisterReducer";
import ExerciseReducer from "./ExerciseReducer";
import AddClientReducer from "./AddClientReducer";

export default combineReducers({
    auth: AuthReducer, //reducer property for authentication
    register: RegisterReducer, //reducer property for registering a new user 
    workout: AddWorkoutReducer, //reducer property for adding exercises
    exercises: ExerciseReducer, //The exercises state will come from exercise reducer.
    client: AddClientReducer //The client states will come from the exercise reducer. 
}); 