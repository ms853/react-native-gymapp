import React, { Component } from "react";
import { View, Text, ScrollView, Picker, TouchableOpacity, Alert} from "react-native";
import firebase from 'firebase';
import { connect } from 'react-redux';
import { 
    regEmailChanged, 
    regPasswordChanged, 
    registerUpdate,
    email_validator, 
    password_validator,
    registerNewGymUser,
    registerNewPersonalTrainer
} from '../../actions/AuthAction';
import { Actions } from "react-native-router-flux";
import { Header, CheckBox } from "react-native-elements";
import { RkButton } from 'react-native-ui-kitten';
import { Card, CardSection, Input, SpinnerLoader } from '../reusable';
import PhoneInput from 'react-native-phone-input';

//Redux State Management library will be used for this Class Componenet. 
class Register extends Component{
    
    //Two helper methods for tracking the changes to email and password in form. 
    updateEmail(text) {
        this.props.regEmailChanged(text);
        if(text != ''){
            this.props.email_validator(text);
        }
    }

    updatePassword(text) {
        this.props.regPasswordChanged(text);
        if(text != ''){
            this.props.password_validator(text);
        }
    }

    onRegButtonPress() {
        //Extracting objects from the props passed 
        //down from the reducer to the component. 
        const { 
            email, password, 
            firstName, surName, 
            gender, phoneNumber, role 
        } = this.props;

        console.log("Your Phone->", phoneNumber)
        //call made to the action creator to register the new user.
        //The appropriate method will be invoked based on the role of the user.
        if(role == 'Gym User') {
            this.props.registerNewGymUser({firstName, surName, email, password, phoneNumber, gender, role});
        }
        
        if(role == 'Personal Trainer'){
            this.props.registerNewPersonalTrainer({firstName, surName, email, password, phoneNumber, gender, role});
        }

    }
    
    //Conditional render method for button 
    renderButton() {
        if(this.props.loading) {
            return <SpinnerLoader 
                        size="large" 
                        style = {styles.spinnerStyle}
                        color='white'
                    />;
            
        }else{
            return(   
                <RkButton rkType="xlarge" style={styles.buttonStyle} 
                    onPress={this.onRegButtonPress.bind(this)}>
                 Register 
                </RkButton>
            );
        }
    }
   
    
    render() {
        //ES6 Destructuring of prop objects for form values
        const { 
            error, 
            email, password, 
            firstName, surName, 
            gender, role,
            phoneNumber
        } = this.props;

        const { errorTextStyle } = styles;

        //Returns JSX code which is the UI
        return (
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
                            label="Email Address"
                            placeholder ="email@mail.com"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={this.updateEmail.bind(this)}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Enter Password"
                            placeholder = "password"
                            secureTextEntry
                            value={password}
                            onChangeText={this.updatePassword.bind(this)}
                        />
                    </CardSection>
                    
                    <Text style={ errorTextStyle }>
                        {error}
                    </Text>
                    
                    <CardSection>
                        <Input 
                            label="First Name"
                            placeholder ="Enter First Name"
                            onChangeText={value => this.props.registerUpdate({ prop: "firstName", value})}
                            value={firstName}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label="Surname"
                            placeholder ="Enter Surname"
                            onChangeText={value => this.props.registerUpdate({ prop: "surName", value})}
                            value={surName}
                        />
                    </CardSection>
                    
                    <CardSection>
                        <Text style={styles.textStyle}>What is your gender?</Text>
                    </CardSection>

                    <CardSection>
                    <Picker
                        style={{ flex: 1, margin: 2 }}
                        selectedValue={gender}
                        mode="dropdown"
                        onValueChange={value => this.props.registerUpdate({ prop: "gender", value})}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>    
                    </CardSection>
                    
                    <CardSection>
                        <Text style={styles.textStyle}>Enter Your Phone Number</Text>
                    </CardSection>

                    <View style={styles.phoneContainerStyle}>
                        <PhoneInput ref={ref => {
                         this.phone = ref;}}  
                         onChangePhoneNumber={value => this.props.registerUpdate({ prop: "phoneNumber", value})}
                         value={phoneNumber}
                         />
                        
                    </View>
                    
                    <CardSection> 
                        <Text style={styles.textStyle}>
                        If you are a Personal Trainer, please choose the Personal Trainer role
                        from the choice box below.
                        </Text>
                    </CardSection>

                    <CardSection>
                    <Picker
                        style={{ flex: 1, margin: 2 }}
                        selectedValue={role}
                        onValueChange={value => this.props.registerUpdate({ prop: "role", value})}
                    >
                        <Picker.Item label="Gym User" value="Gym User" />
                        <Picker.Item label="Personal Trainer" value="Personal Trainer" />
                    </Picker>    
                    </CardSection>     
                        {/*calling render button function here.*/}        
                        {this.renderButton()}
                </Card>
                
            </ScrollView>    
        );
    }
}

//Stylesheet object 
const styles = {
    
    textStyle: {
        fontSize: 15
    },

    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    phoneContainerStyle: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },

    errorTextStyle: {
        fontSize: 15,
        color: 'red',
        backgroundColor: 'rgba(255,255,255,1)'
    },

    buttonStyle: {
        margin: 10,
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'black'//'rgba(255,255,255,0.6)'
    },
};

const MapStateToProps = ({ register }) => {
    const { 
        email, 
        password, 
        firstName, 
        surName,
        gender,
        role, 
        error,
        loading,
        phoneNumber 
    } = register;
    
    return {
        email, 
        password, 
        firstName, 
        surName,
        gender,
        role,
        phoneNumber, 
        error,
        loading 
    };
}

export default connect(MapStateToProps, {
    regEmailChanged, 
    regPasswordChanged, 
    registerUpdate,
    email_validator, 
    password_validator,
    registerNewGymUser,
    registerNewPersonalTrainer    
})(Register);