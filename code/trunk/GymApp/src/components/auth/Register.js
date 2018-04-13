import React, { Component } from "react";
import { View, Text, ScrollView, Picker, TouchableOpacity } from "react-native";
import firebase from 'firebase';
import { Actions } from "react-native-router-flux";
import { Header, CheckBox } from "react-native-elements";
import { Card, CardSection, Input, Button, SpinnerLoader } from '../reusable';

class Register extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            surName: '',
            phone: '',
            role: 'Gym User' || 'Personal Trainer',
            email: '',
            password: '',
            pTChecked: false,
            gender: 'male' || 'female',
            error: '',
            loading: false,
            
            
        };

    };
    
    //Method responsible for creating the users account. 
    onRegButtonPress(){

        //Destructuring all the necessary objects from the state object.     
        const { 
            email, 
            password, 
            role, 
            phone, 
            gender,
            pTChecked, 
            surName, 
            firstName 
        } = this.state;

        //create the firebase object
        const auth = firebase.auth();
        const db = firebase.database();
       
        //Here create the new user. 
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => console.log("Successfully created new account for " + auth))
        .catch((error) => alert(error))
        //Here a check is done to see if the user is authenticated!
        .then(() => {
            const { currentUser } = firebase.auth();
            if(auth) {
                db.ref(`/users/${currentUser.uid}`).set({
                    email: email, firstName: firstName, surName: surName, phone: phone, 
                    gender: gender, personalTrainer: pTChecked,
                    role: role
               })
            } else {
                alert("User is not authenticated, user information cannot be saved!");
            }
        })
        //Save user details!
        .then(() => Actions.main())
        .catch((error) => alert(error));
        
    }
    
    _isPTChecked(){
        const { pTChecked, role } = this.state;

                this.setState({
                    pTChecked: !pTChecked,
                    role: 'Personal Trainer'
                });

                alert("You are a: " + this.state.role);
  
    };
    

    render() {
        return (
            <View>
                <ScrollView>
                <Header
   
                    centerComponent={{ text: 'Create A New Account', 
                    style: { color: '#fff', 
                            fontSize: 20,
                            fontWeight: 'bold'
                            } }}
                            outerContainerStyles={{ backgroundColor: 'black' }}        
                />
                
                <Card>
                    <CardSection>
                        <Input 
                            label="Firstname"
                            placeholder ="Enter Firstname"
                            value={this.state.firstName}
                            onChangeText={firstName => this.setState({ firstName })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Surname"
                            placeholder ="Enter Surname"
                            value={this.state.surName}
                            onChangeText={surName => this.setState({ surName })}
                        />
                    </CardSection>
                    
                    <CardSection>
                        <Text style={styles.textStyle}>What is your gender?</Text>
                    </CardSection>

                    <CardSection>
                    <Picker
                        style={{ flex: 1, margin: 10 }}
                        selectedValue={this.state.gender}
                        onValueChange={gender => this.setState({ gender })}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>    
                    </CardSection>
                    
                    <CardSection>
                        <Input 
                            label="Enter Phone Number"
                            placeholder="(+44) 7..."
                            value={this.state.phone}
                            onChangeText={phone => this.setState({ phone })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Email Address"
                            placeholder ="email@mail.com"
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Enter Password"
                            placeholder = "password"
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </CardSection>

                    <CardSection> 
                        <Text style={styles.textStyle}>If you are a Personal Trainer, please tick the box.</Text>
                    </CardSection>     
                    <CardSection>
                        <CheckBox 
                            title="Personal Trainer"
                            checked={this.state.pTChecked}
                            onIconPress={() => this._isPTChecked()}
                        /> 

                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onRegButtonPress.bind(this)}> Register </Button>
                    </CardSection>
                </Card>
                
                </ScrollView>
            </View>    
        );
    }
}

//Stylesheet object 
const styles = {
    textStyle: {
        fontSize: 15
    }
};


export default Register;