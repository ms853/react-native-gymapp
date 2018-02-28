/*
This functional component will be responsible for handling the navigation 
in my app.
*/
import React from "react";
import { Router, Scene, Actions } from "react-native-router-flux";

//Components 
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CreateWorkoutPlanner from "./components/CreateWorkoutPlanner";

const RouterNav = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar>
                    <Scene key="login" component={Login} initial />
                    <Scene key="register" component={Register}  />
                </Scene>

                <Scene key="main">
                    <Scene 
                    onRight={() => Actions.profile()}
                    rightTitle=" View Profile"
                    key="home" component={Home} title="Home" 
                    
                    />
                    <Scene 
                    onRight={() => Actions.createWorkout()}
                    rightTitle=" Create Workout"
                    key="profile" component={Profile} title="My Profile" />
                    
                    <Scene key="createWorkout" component={CreateWorkoutPlanner} title="Create Your Workout" />
                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterNav;