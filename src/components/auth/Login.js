import React, { Component } from "react";
import { Text, View, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { emailAltered, passwordAltered, loginUser, facebookLogin } from '../../actions/AuthAction';
import { RkButton } from "react-native-ui-kitten";
import { Card, CardSection, Input, SpinnerLoader, Button } from "../reusable";


class Login extends Component {
    
   
    //Event handlers will have action creators which will handle the user input update. 
    onEmailChanged(text) {
        this.props.emailAltered(text);
       
    }

    onPasswordChanged(text) {
        //calling the action creator from  
        this.props.passwordAltered(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        //call the action creator.
        this.props.loginUser({ email, password });
    }

    buttonRender() {
        if(this.props.loading) {
            return <SpinnerLoader 
            size={40} 
            style = {styles.spinnerStyle}
            type={'Circle'}
            color={'white'}
            />;
            
        }else{
            return(
                   
                    <RkButton rkType='xlarge'
                        style={styles.buttonStyle}    
                            onPress={this.onButtonPress.bind(this)}
                            >
                                Login
                     </RkButton>
            );
        }
    }

    //Facebook Authentication 
    _loginFB() {
        this.props.facebookLogin();
    }

     
    render() {
        
        //ES6 Destructuring     
        const { 
            containerStyle, 
            backgroundImg, 
            content, 
            logo, 
            inputContainer,
            linkStyle,
            errorTextStyle
            } = styles;
        //require('../assets/images/barbell-bodybuild.jpg')
        return(
        <ImageBackground

            source={{ uri: 'https://cdn.pixabay.com/photo/2016/11/19/12/43/barbell-1839086_960_720.jpg'}} 
            style={ backgroundImg }>
            <ScrollView>
                <View style={ content }>
                    
                    <Text style={ logo }> My Trainer </Text>          
                    
                    
                        <View style={ inputContainer }>
                            
                            <CardSection>
                                <Input 
                                label="Email"
                                placeholder="email@mail.com"
                                onChangeText={this.onEmailChanged.bind(this)}
                                value={this.props.email}
                                />
                            </CardSection>
                            
                            <CardSection>
                            <Input
                            label="Password"
                            placeholder="enter password"
                            secureTextEntry={true}
                            onChangeText={this.onPasswordChanged.bind(this)}
                            value={this.props.password}
                            />
                            </CardSection>
                            <CardSection>
                                <Button onPress={this._loginFB.bind(this)}>Login with Facebook</Button>
                            </CardSection>
                            <CardSection>
                                <Text>Don't have an account? </Text>    
                                <TouchableOpacity onPress={() => Actions.register()}>
                                    <Text style={linkStyle}> Create An Account </Text>
                                </TouchableOpacity>
                            </CardSection>
                            <CardSection>
                                
                                <TouchableOpacity onPress={() => Actions.forgotPass()}>
                                    <Text style={linkStyle}>Forgot your password?</Text>
                                </TouchableOpacity>
                            </CardSection>
                            <CardSection>
                            <Text style={ errorTextStyle }>
                                {this.props.error}
                            </Text>
                            </CardSection>
                                {this.buttonRender()} 
                                  
                        </View>
                   
                </View>        
                </ScrollView>
        </ImageBackground>
        
        );
    }
}

const styles = StyleSheet.create({ 
    backgroundImg: {    
        height: '100%',
        width: '100%',
        alignSelf: 'stretch'           
    
    },
    containerStyle: {
        flex: 1
    },
    content: {
        alignItems: 'center'     
    },
    logo: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor: '#F8F8FF',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 20,
        marginBottom: 30
    },
    inputContainer: {
        margin: 25,
        marginBottom: 0,
        padding: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    buttonStyle: {
        margin: 10,
        padding: 5,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        //color: 'blue',
        //backgroundColor: 'rgba(255,255,255,0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: 55
    }, 
    errorTextStyle: {
        fontSize: 17,
        alignSelf: 'center',
        color: 'red'
    }
});

//Map state to props function 
//the property (i.e. email) comes from the reducer
const mapStateToProps = ({ auth }) => {
    const { email, password, loading, error } = auth;
    
    return {
        email,
        password,
        loading, 
        error
    };
};

export default connect(mapStateToProps, { 
    emailAltered, 
    passwordAltered,
    loginUser,
    facebookLogin 
})(Login);