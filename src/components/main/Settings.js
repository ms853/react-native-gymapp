import React, {Component} from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import firebase from 'firebase';
import PhoneInput from 'react-native-phone-input';
import { Card, CardSection, Input, Button } from '../reusable';

export default class Settings extends Component{
    
    constructor(props){
        super(props);

        this.state = { 
           pushNotification: false,
           subs_status: false,
           newPassword: "",
           currentPassword: "",
           emailAddress: ""
        };
    };

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

        const { currentPassword, newPassword, emailAddress } = this.state;
        
        return(

            <ScrollView>

                    <View style={styles.subsStyle}>
                        <CardSection>
                            <Text>Subscription</Text>
                        </CardSection>
                        <CardSection>
                            <Button>Manage Your Subscription</Button>
                        </CardSection>
                    </View>

                    <View style={styles.subsStyle}>
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
                            <Button onPress={this.updateUserPassword.bind(this)}>Change Password</Button>
                        </CardSection>
                    </View>

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
                        <Button onPress={this.updateEmailAddress.bind(this)}>Change Email Address</Button>
                    </CardSection>

                    <View style={styles.subsStyle}>
                        <CardSection>
                        <Text>Terms and Conditions </Text>
                        </CardSection>
                        <CardSection>
                            <Text>Privacy</Text> 
                        </CardSection>
                        <CardSection>
                            <Text>About Developer</Text>
                        </CardSection>
                    </View>
                    
            </ScrollView>
        );
    }
}

const styles = {
    subsStyle: {
        paddingTop: 20,
        marginBottom: 20,
        //borderColor: "black",
    },
    textStyle: {
        fontSize: 15
    },
    phoneContainerStyle: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
};