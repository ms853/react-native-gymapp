import React, { Component } from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import firebase from 'firebase';
import PhoneInput from 'react-native-phone-input';
import { Card, CardSection, Input, Button } from "../reusable";

class ProfileEdit extends Component{

    constructor(props){
        super(props);

        this.state = { 
            emailAddress: "",
            newPassword: "",
            currentPassword: "",
            firstName: "",
            surName: "",
            phone: ''
        };
    };

    //These methods need work, they partially work
    //In order for this to work properly I need to rewrite the registration function
    changeFirstname = () => {
        var db = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        const { firstName } = this.state;

        db.ref(`gym_users/${userId}/user_info`)
        .push({ firstName: firstName })
            .then(() => Alert.alert('My Trainer', 'Your first name has been changed'))
            .catch((error) => Alert.alert('My Trainer', error.message));

    }
    changeSurname = () => {
        var db = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        const { surName } = this.state;

        db.ref(`gym_users/${userId}/user_info`)
        .push({ surName: surName })
            .then(() => Alert.alert('My Trainer', 'Your surname has been changed'))
            .catch((error) => Alert.alert('My Trainer', error.message));
    }
    changePhoneNumber = () => {
        var db = firebase.database();
        var userId = firebase.auth().currentUser.uid;
        const { phone } = this.state;

        db.ref(`gym_users/${userId}/user_info`)
        .push({ phoneNumber: phone })
            .then(() => Alert.alert('My Trainer', 'Your phone number has been changed'))
            .catch((error) => Alert.alert('My Trainer', error.message));
    }
    
    
    // ==== Methods for updating user credentials === //

    updateEmailAddress = () => {
        
        const { currentPassword } = this.state;

        this.userReauthentication(currentPassword).then(() => {
            //console.log('The email you want to update with is: ', newEmail);
            const user = firebase.auth().currentUser;
            user.updateEmail(this.state.emailAddress).then(() => {
                Alert.alert("My Trainer", "Your email address has been changed.");
                
            }).catch((error) => Alert.alert("My Trainer", error.message + '\n' 
            + "Please, type your current password into the current password field before updating your email."));
        
        }).catch((error) => {
            Alert.alert('My Trainer', error.message);
        });
    }

    //Method for reauthenticating the current user. 
    userReauthentication = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateAndRetrieveDataWithCredential(credentials);
    };

    //responsible for resetting the currently 
    //authenticated users password.
    updateUserPassword() {
        //Destructuring the states 
        const { currentPassword, newPassword } = this.state;
        //Log in the current user. 
        this.userReauthentication(currentPassword).then(() => {
            Alert.alert("My Trainer","Successfully reauthenticated the user!");
        }).catch((error) => Alert.alert("My Trainer", error.message));

        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword)
        .then(() => {
            Alert.alert("My Trainer", "Your password has been changed.");
            
        })
        .catch((error) => Alert.alert("My Trainer", error.message));
    }


    render(){
        
        const { 
            emailAddress, newPassword, currentPassword,
            firstName, surName, phone
        } = this.state;
        
        return(

            <ScrollView>
                <Card>
                    <CardSection>
                        <Input 
                            label="First Name"
                            placeholder ="Enter First Name"
                            value={firstName}
                            onChangeText={value => this.setState({firstName: value})}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.changeFirstname.bind(this)}>Update First Name</Button>
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="Surname"
                            placeholder ="Enter Surname"
                            value={surName}
                            onChangeText={value => this.setState({ surName: value})}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.changeSurname.bind(this)}>Update Surname</Button>
                    </CardSection>
                    
                    <View style={styles.phoneContainerStyle}>
                        <PhoneInput ref={ref => {
                         this.phone = ref;}}  
                         value={phone}
                         onChangePhoneNumber={value => this.setState({ phone: value})}
                         
                         />  
                    </View>
                    <CardSection>
                        <Button onPress={this.changePhoneNumber.bind(this)}>Update Contact Number</Button>
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Current Password"
                            placeholder ="enter current password"
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={(text) => this.setState({ currentPassword: text })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="New Password"
                            placeholder ="enter new password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={(text) => this.setState({ newPassword: text})}
                        />
                    </CardSection>

                    <CardSection>
                        <Button onPress = {this.updateUserPassword.bind(this)}> Update Password </Button>
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="New Email Address"
                            placeholder ="new email address"
                            autoCapitalize="none" 
                            value={emailAddress}                           
                            onChangeText={(text) => this.setState({ emailAddress: text }) }
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.updateEmailAddress}>Change Email Address</Button>
                    </CardSection>
                   
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    textInputStyle: {
        borderWidth: 1, 
        borderColor: "black",
        padding: 10,
        height: 50
    },
    labelStyle: {
        fontSize: 17,
        flex: 1,
        backgroundColor: "white"
    },
    phoneContainerStyle: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
}

export default ProfileEdit;