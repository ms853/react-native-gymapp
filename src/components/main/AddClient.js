import React, { Component } from 'react';
import { Text, View, Picker, ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PhoneInput from 'react-native-phone-input';
import firebase from 'firebase';
import { Card, CardSection, Input, Button, NumberInput, SpinnerLoader } from '../reusable';
import { RkButton } from 'react-native-ui-kitten';

//This component is only available to the Personal Trainer!
class AddClient extends Component{
    
    constructor(props) {
        super(props);

        //Initial State Objects
        this.state = {

            phoneNumber: '',
            firstName: '',
            surName: '',
            goal: '',
            height: 0, 
            weight: 0,
            gender: 'Male' || 'Female',
            loading: false,
            error: ''

        }
    }

    //Event handlers which I have created to 
    //handle textinput in the form.
    handleFirstName = (typedText) => {
        this.setState({
            firstName: typedText
        });
    };

    handleSurName = (typedText) => {
        this.setState({
            surName: typedText
        });
    };

    handlePhoneInput = (typedText) => {
        this.setState({
            phoneNumber: typedText
        });
    };

    handleGoalInput = (typedText) => {
        this.setState({
            goal: typedText
        });
    }

    handleGenderInput = (typedText) => {
        this.setState({
            gender: typedText
        });
    }

    handleWeightInput = (typedNumber) => {
        this.setState({
            weight: typedNumber
        });
    }

    handleHeightInput = (typedNumber) => {
        this.setState({
            height: typedNumber
        });
    }

    
    addNewClient = ({ firstName, surName, gender, goal, phoneNumber, height, weight }) => {
        const { currentUser } = firebase.auth();
        const clientPath = firebase.database().ref(`clients/${currentUser.uid}/`)
       
        var newClientInfo = {
            firstName: firstName, 
            surName: surName, 
            gender: gender, 
            goal: goal, 
            phoneNumber: phoneNumber, 
            height: height, 
            weight: weight
        };
        //Push the new data.
        clientPath.push({
            newClientInfo
        }).then(() => {
            Alert.alert('My Trainer',
            'Client details have been saved.');
            Actions.clientList();
            
        })
        .catch((error) => alert(error.message));
        
        //New push key for the new data 
        const newClientID = firebase.database().ref().child('clients').push().key;
        //Object for updating the personal trainer node.
        var updates = {};
        updates['/personal_trainers/' + currentUser.uid + '/' + newClientID] = newClientInfo;
        console.log('LOOK ->', updates);

        //method returned here, simultateously updates both client and personal trainer
        //nodes with the new data. 
        return firebase.database().ref().update(updates)
    };

    onAddNewClient() {

        const { 
            firstName, 
            surName, 
            phoneNumber,
            height, weight, gender, goal
        } = this.state;
        
        //method call to add clients
        this.addNewClient({ firstName, surName, gender, goal, phoneNumber, height, weight });
        return this.setState({
            firstName: '', 
            surName: '', 
            gender: '', goal: '', 
            phoneNumber: '', 
            height: 0, weight: 0
        });
    };

    renderButton() {
        
        if(this.props.loading) {
            return <SpinnerLoader 
                        size="large" 
                        color='#0000ff'
                    />;
        }else{
            return (
                <View style={styles.buttonStyle}>
                    <RkButton
                        rkType="xlarge"
                        onPress={this.onAddNewClient.bind(this)}>
                        Add Client 
                    </RkButton>
                </View>
            );
             
        }
    }

    render(){
        const { 
            firstName, 
            surName, 
            phoneNumber,
            height, weight, gender, goal
        } = this.state;

        return(
           
            <ScrollView>
                <Card>
                    <CardSection>
                    <Input 
                        label="Client First Name"
                        
                        onChangeText={this.handleFirstName.bind(this)}
                        value={firstName}
                    /> 
                    </CardSection>

                    <CardSection>
                    <Input 
                        label="Enter Client Surname"
                        
                        onChangeText={this.handleSurName.bind(this)}
                        value={surName}
                    /> 
                    </CardSection>
                    <View style={styles.phoneContainerStyle}>
                            <PhoneInput ref={ref => {
                            this.phone = ref;}}  
                            onChangePhoneNumber={this.handlePhoneInput.bind(this)}
                            value={phoneNumber}
                            />
                    </View>
                    <CardSection>
                        <Picker
                            style={{ flex: 1, margin: 2 }}
                            selectedValue={gender}
                            mode="dropdown"
                            onValueChange={this.handleGenderInput.bind(this)}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>    
                    </CardSection>

                    <CardSection>
                    <Input 
                        label="Enter Client Goal"
                        value={goal}
                        onChangeText={this.handleGoalInput.bind(this)}
                        
                    />
                    </CardSection>
                    <CardSection>
                        <NumberInput
                            label="Weight (Kg)"
                            type="up-down" //by default its plus-minus
                            valueType='real'
                            step={0.5} 
                            width={250}
                            height={170}
                            onChangeNumber={this.handleWeightInput.bind(this)}
                            value={weight}
                        /> 
                    </CardSection>
                    <CardSection>
                        <NumberInput
                            label="Height (cm)"
                            type="up-down" //by default its plus-minus
                            valueType='real'
                            step={0.05} 
                            width={250}
                            height={170}
                            onChangeNumber={this.handleHeightInput.bind(this)}
                            value={height}
                        />
                    </CardSection>    

                        {this.renderButton()}          
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    phoneContainerStyle: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        paddingTop: 10,
        marginBottom: 20
    }
};

export default AddClient;