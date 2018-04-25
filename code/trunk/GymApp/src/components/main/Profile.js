import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
        var db = firebase.database();
        var auth = firebase.auth();

        if(auth) {
            const { currentUser } = auth;
            db.ref(`/users/${currentUser.uid}/user_info`)
            .once("value", snapshot => {
                var name = snapshot.val().firstName + " " + snapshot.val().surName;
                var email = snapshot.val().email;
                var gender = snapshot.val().gender;
                var role = snapshot.val().role;
                var phone = snapshot.val().phoneNumber;
                //Printing the values to see if the values were successfully retrieved.
                console.log("The values retrieved from firebase are: " 
                + name + "\n" + email + "\n" + gender + '\n' + role + '\n' + phone);
                this.setState({
                    fullName: name,
                    email: email,
                    gender: gender,
                    role: role,
                    phoneNumber: phone
                });
            });
        } else {
            console.log("Failed to retrieve user's values from the database");
        }

    }
  
    onButtonPress() {
        this.props.logoutUser();
    }
    
 
    render(){
        //ES6 Destructure of states
        const {
            fullName, gender,
            role, phoneNumber,
            email
        } = this.state;

        return(
                <View style={styles.backgroundStyle}>
                    <ScrollView>
                            <Avatar 
                                xlarge
                                avatarStyle={styles.profilePicture}
                                iconStyle={styles.profilePicture}
                                rounded
                                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                                //onPress={}
                                activeOpacity={0.7}
                            />
                        <CardSection>
                            <Text>{fullName}</Text>
                        </CardSection>
                        <CardSection>
                            <Text>{email}</Text>
                        </CardSection>
                        <CardSection>
                            <Text>{phoneNumber}</Text>
                        </CardSection>
                        <CardSection>
                        <Button onPress={() => Actions.cameraScene()}>
                            <Text>Change Profile Picture</Text>
                            </Button>
                        </CardSection>
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
    backgroundStyle: {
        backgroundColor: 'black'
    }
    
};

export default connect(null, {logoutUser})(Profile);