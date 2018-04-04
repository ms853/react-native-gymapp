/*
This functional component will be responsible for handling the navigation 
in my app.
*/
import React from "react";
import { Router, Scene, Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

//Components 
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import forgotPass from './components/auth/forgotPass';
import passReset from './components/auth/passReset';
import Home from "./components/main/Home";
import Profile from "./components/main/Profile";
import CameraModal from './components/main/CameraModal'; 
import CreateWorkoutPlanner from "./components/main/CreateWorkoutPlanner";

const tabIcon = ({ iconName }) => {
    return <Icon name="rocket" size={30} color="#900" />;
}

const RouterNav = () => {

    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar>
                    <Scene key="login" component={Login} initial />
                    <Scene key="register" component={Register}  />
                    <Scene key="forgotPass" component={forgotPass} />
                    <Scene key="passReset" component={passReset} />
                </Scene>
                
                 {/* Tab Container */}
                <Scene key="main"
                    tabs={true}
                    tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                    tabBarPosition="bottom"
                > 
                    <Scene key="homePage" title="Home Page" icon={tabIcon}> 
                        <Scene  
                            key="home" 
                            component={Home} 
                            title="Home"
                        />
                    </Scene>
                    
                    <Scene key="CreateWorkout" title="Create Workout" icon={tabIcon}> 
                        <Scene key="createExercise" component={CreateWorkoutPlanner} title="Create Your Workout" />
                    </Scene>
                    
                    <Scene key="profilePage" title="My Profile" icon={tabIcon} >
                            <Scene 
                                key="profile" 
                                component={Profile} 
                                title="My Profile" 
                            />
                    </Scene>
                </Scene>
                <Scene
                    key="cameraModal"
                    title="Camera"
                    component={CameraModal}
                    direction="vertical"
                    
                />

            </Scene>
        </Router>
    );
}

export default RouterNav;