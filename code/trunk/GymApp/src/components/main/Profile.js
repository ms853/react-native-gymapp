import React, { Component } from 'react';
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { RkTabView } from 'react-native-ui-kitten';
import { logoutUser } from '../../actions/AuthAction';
import { Card, CardSection, Button } from '../reusable'

class Profile extends Component{
     
    constructor(props){
        super(props)

        //Here the initial states are set to display 
        //the user info.
        this.state = {
            fullName: '',
            email: '',
            gender: '',
            role: '',
            phoneNumber: ''
        };
    }
    
    componentWillMount() {
        //As soon as the component renders the current users 
        //information will fetched from firebase and rendered to the screen.
        this.fetchUserProfile();
       
    }

    //The following method, will read two nodes in the database.
    //If the first snapshot returns null it will then read personal trainer node.
    fetchUserProfile = () => {
        
        var db = firebase.database();
        var auth = firebase.auth();
        var userId = auth.currentUser.uid;

        //Initial variables that will be used to store the profile information 
        var name, email, gender, role, phone; 

        db.ref(`/gym_users/${userId}/user_info`)
        .once('value')
        .then((snapshot) => {
            console.log('snap value => ', snapshot.val()); 
            //Here I am printing the value of the snap data retrieved from the database.  
            //Here I only assign the snapshot value only if it does not return empty.
            if(snapshot.val() == null) {
                console.log("Snapshot value is empty");
            }else{
                 name = snapshot.val().firstName + " " + snapshot.val().surName;
                 email = snapshot.val().email;
                 gender = snapshot.val().gender;
                 role = snapshot.val().role;
                 phone = snapshot.val().phoneNumber;
                //Printing the values to see if the values were successfully retrieved.
                console.log("The values retrieved from firebase are: " 
                + name + "\n" + email + "\n" + gender + '\n' + role + '\n' + phone);
               //Then set all the states in the component.
                this.setState({
                    fullName: name,
                    email: email,
                    gender: gender,
                    role: role,
                    phoneNumber: phone
                });

            }
        }).catch((error) => console.error(error.message)); 

        

        //If Snapshot returns null and name is undefined,
        //read the personal trainer node in the json tree
        if(name == undefined) {
            //var ptID = db.ref().child('personal_trainers').push().key;
            //console.log(ptID);
            db.ref(`/personal_trainers/${userId}`)
            .once('value')
            .then((snapshot) => {
                console.log('snap value => ', snapshot.val()); 
                //Here I am printing the value of the snap data retrieved from the database.  
                //Here I only assign the snapshot value only if it does not return empty.
                if(snapshot.val() == null) {
                    console.log("Snapshot value is empty");
                }else{
                     name = snapshot.val().firstName + " " + snapshot.val().surName;
                     email = snapshot.val().email;
                     gender = snapshot.val().gender;
                     role = snapshot.val().role;
                     phone = snapshot.val().phoneNumber;
                    //Printing the values to see if the values were successfully retrieved.
                    console.log("The values retrieved from firebase are: " 
                    + name + "\n" + email + "\n" + gender + '\n' + role + '\n' + phone);
                   //Then set all the states in the component.
                    this.setState({
                        fullName: name,
                        email: email,
                        gender: gender,
                        role: role,
                        phoneNumber: phone
                    });
    
                }
            }).catch((error) => console.error(error.message));     
    
        }
        // //read the client node in the json tree
        // if(name == undefined) {
        //     db.ref(`/clients/${userId}`)
        //     .once('value')
        //     .then((snapshot) => {
        //         console.log('snap value => ', snapshot.val()); 
        //         //Here I am printing the value of the snap data retrieved from the database.  
        //         //Here I only assign the snapshot value only if it does not return empty.
        //         if(snapshot.val() == null) {
        //             console.log("Snapshot value is empty");
        //         }else{
        //              name = snapshot.val().firstName + " " + snapshot.val().surName;
        //              email = snapshot.val().email;
        //              gender = snapshot.val().gender;
        //              role = snapshot.val().role;
        //              phone = snapshot.val().phoneNumber;
        //             //Printing the values to see if the values were successfully retrieved.
        //             console.log("The values retrieved from firebase are: " 
        //             + name + "\n" + email + "\n" + gender + '\n' + role + '\n' + phone);
        //            //Then set all the states in the component.
        //             this.setState({
        //                 fullName: name,
        //                 email: email,
        //                 gender: gender,
        //                 role: role,
        //                 phoneNumber: phone
        //             });
    
        //         }
        //     }).catch((error) => console.error(error.message));     
        // }
    };
  
    onButtonPress() {
        this.props.logoutUser();
    }
    
    renderButton() {
        //getting the role object from the state object.
        const {role} = this.state; 

        if(role == 'Personal Trainer') {
            return (
                <CardSection>
                    <Button onPress={() => Actions.clients()}>
                        Add Clients
                    </Button> 
                </CardSection>
            );
        } 
    }
 
    render(){
        //ES6 Destructure of states
        const {
            fullName, gender,
            role, phoneNumber,
            email
        } = this.state;

        return(
           
                <View>
                    <ScrollView>
                        <View style={styles.profilePicture}>
                            <Avatar 
                                xlarge
                                //avatarStyle={styles.profilePicture}
                                //iconStyle={styles.profilePicture}
                                rounded
                                //source={{uri: ""}}
                                //onPress={}
                                activeOpacity={0.7}
                            />
                        </View>
                        <View style={styles.profilePicture}>
                            <Text style={styles.profileName}>{fullName}</Text>
                            <Text style={styles.userRole}>Role - {role}</Text>
                        </View>

                        <CardSection>
                            <Text style={styles.text}>Email Address: {email}</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
                        </CardSection>
                        <CardSection>
                            <Button onPress={() => Actions.camera()}>
                                <Text>Change Profile Picture</Text>
                            </Button>
                        </CardSection>
                        <CardSection>
                        <Button onPress={() => Actions.profileEdit()}>
                            <Text>Update Profile Information</Text>
                        </Button>
                        </CardSection>

                        {this.renderButton()}
                        <CardSection>
                            <Button
                            onPress={this.onButtonPress.bind(this)}
                            >Log Out</Button>
                        </CardSection>
                
                    </ScrollView>
                </View>

        );
    }
}

const styles = {

    profilePicture: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    profileName: { 
        fontSize: 30,
        color: '#4682B4',
        fontWeight: 'bold'
        
    },
    userRole: {
        fontSize: 20,
        color: '#4682B4',
        alignItems: 'center'
    },
    
    text: {
        fontSize: 15,
        color: '#000000'
    },
    backgroundStyle: {
        backgroundColor: 'black'
    },
    backgroundImg: {    
        height: '100%',
        width: '100%',
        alignSelf: 'stretch'           
    }
    
};

export default connect(null, {logoutUser})(Profile);