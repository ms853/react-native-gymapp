//Export all the action types!
//Action types for authentication (Login)!
export const EMAIL_INPUT_CHANGED = "email_changed";
export const PASSWORD_INPUT_CHANGED = "password_changed";
export const LOGIN_USER = "login_user";
export const LOGIN_USER_FAIL = "login_failed";
export const USER_LOGIN_SUCCESS = "login_successful";
export const USER_LOGOUT = "logout_successful";
export const FACEBOOK_LOGIN = "login_with_facebook";

//Action Types for client-side validation. 
//export const VALIDATE_EMAIL = "validating_email";
export const INVALID_EMAIL = "email_is_invalid";
export const VALID_EMAIL = "email_is_valid";
export const INVALID_PASSWORD = "password_is_invalid";
export const VALID_PASSWORD = "password_is_valid";
//Action Types variables for recording exercises
export const EX_INPUT_CHANGED = "create_exercise_input_changed";
//export const ADD_EXERCISE = "adding_exercise";
export const ADD_EXERCISE_SUCCESS = "exercise_added_successfully";
export const ADD_EXERCISE_FAIL = "adding_exercise_failed";
export const FETCH_EXERCISE_SUCCESS = "exercises_successfully_fetched";
export const UPDATE_EXERCISE_SUCCESS= "exercise_information_updated";
export const DELETE_EXERCISE = "exercise_deleted";