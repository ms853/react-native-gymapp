import React, { Component } from 'react';
import { Text, View, Picker, ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PhoneInput from 'react-native-phone-input';
import { clientChanged, addNewClient } from '../../actions/ClientAction';
import { Card, CardSection, Input, Button, NumberInput, SpinnerLoader } from '../reusable';
import ClientForm from './ClientForm';


//This component is only available to the Personal Trainer!
//Component is using redux functionality
class AddClient extends Component{
    
 
    onAddNewClient() {
        const { 
            firstName, 
            surName, 
            phoneNumber,
            height, weight, gender, goal
        } = this.props;  

        //method call to add the new client
        this.props.addNewClient({ firstName, surName, gender, goal, phoneNumber, height, weight });
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
                    <Button
                        //rkType="xlarge"
                        onPress={this.onAddNewClient.bind(this)}>
                        Add Client 
                    </Button>
                </View>
            );
             
        }
    }

    render(){
        const { 
            firstName, 
            surName, 
            phoneNumber,
            height, weight, gender, goal, 
            error
        } = this.props;

        return(
           
            <ScrollView>
                {/*Here is the client form which is a resuable component*/}
                <ClientForm { ...this.props } />
                    <Text style={ styles.errorTextStyle }>
                        {error}
                    </Text>
                    
                        {this.renderButton()} 
               
                    <View style={styles.buttonStyle}>
                        <Button
                            onPress={() => Actions.clientList()}>
                            View Clients 
                        </Button>
                    </View>    

                                 
              
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
        marginBottom: 5
    },
    errorTextStyle: {
        fontSize: 15,
        color: 'red',
        backgroundColor: 'rgba(255,255,255,1)'
    },
};

const mapStateToProps = ({ client }) => {
    
    const { 
        error, firstName, surName, 
        phoneNumber, gender, loading, 
        goal, weight, height
    } = client;

    return {
        error, firstName, 
        surName, phoneNumber,
        gender, loading, goal,
        weight, height
    };
};

export default connect(mapStateToProps, {
    clientChanged, addNewClient
})(AddClient);