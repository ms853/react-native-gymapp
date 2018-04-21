//File responsible for exporting all the different types of reducers in my app.
import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AddWorkoutReducer from "./AddWorkoutReducer";
import ExerciseReducer from "./ExerciseReducer";

export default combineReducers({
    auth: AuthReducer, //reducer property for authentication
    workout: AddWorkoutReducer, //reducer property for adding exercises
    exercises: ExerciseReducer //The exercises state will come from exercise reducer.
}); 