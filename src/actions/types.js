//Export all the action types!
//Action types for Login Form!
export const EMAIL_INPUT_CHANGED = "email_changed";
export const PASSWORD_INPUT_CHANGED = "password_changed";
export const LOGIN_USER = "login_user";
export const LOGIN_USER_FAIL = "login_failed";
export const USER_LOGIN_SUCCESS = "login_successful";
export const USER_LOGOUT = "logout_successful";
export const FACEBOOK_LOGIN = "login_with_facebook";

//Action Types for client-side validation. 
export const INVALID_EMAIL = "email_is_invalid";
export const VALID_EMAIL = "email_is_valid";
export const INVALID_PASSWORD = "password_is_invalid";
export const VALID_PASSWORD = "password_is_valid";
export const VALID_NAME = "name_field_valid";
export const INVALID_NAME = "invalid_namefield_field_cannot_be_empty";

//Action Types for invoking action creators for Registration Form
export const REG_UPDATE = "updating_signUp_form_input";
export const REG_EMAIL_INPUT_CHANGED = "signup_email_changed";
export const REG_PASSWORD_INPUT_CHANGED = "signup_password_changed";
export const PT_CHECKED = "pt_checkbox_checked";
export const PT_UNCHECKED = "pt_checkbox_unchecked";
export const REGISTER_NEW_GYM_USER = "registering_new_gym_user";
export const REGISTER_NEW_PT = "registering_new_personal_trainer";
export const REGISTER_NEW_CLIENT = "registering_new_client";
export const REGISTER_NEW_USER_SUCCESS = "successfully_registered_new_user";
export const REGISTER_NEW_USER_FAIL = "registering_new_user_failed";

//Action Types for invoking action creators for Creating and Updating Exercises.
export const EX_INPUT_CHANGED = "create_exercise_input_changed"; 
export const ADD_EXERCISE_SUCCESS = "exercise_added_successfully";
export const ADD_EXERCISE_FAIL = "adding_exercise_failed";
export const FETCH_EXERCISE_SUCCESS = "exercises_successfully_fetched";
export const UPDATE_EXERCISE_SUCCESS= "exercise_information_updated";
export const DELETE_EXERCISE = "exercise_deleted";
