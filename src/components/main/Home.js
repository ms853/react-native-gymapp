import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Card } from "react-native-elements";
import { Button, CardSection } from '../reusable';


class Home extends Component{
    
    
    constructor(){
        super();
        this.state = {
            username: '',
            useRole: ''
        };
    }
        

    //This class will be responsible for rendering the appropriate view based on the user role. 
    componentWillMount() {
        this.fetchUserName();
                        
    }
  
    
    sessionState() { //Check the state of the user if they are authenticated
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            console.log('user is logged out!');
            }
    });
    }

    fetchUserName() {
        var auth = firebase.auth();  //auth variable
        const db = firebase.database(); //database object
        var name;
       
        var userId = firebase.auth().currentUser.uid;
        db.ref(`/gym_users/${userId}/user_info`)
        .once('value')
        .then((snap) => {
            console.log('snap value => ', snap.val()); //Here I am printing the value of the snap data retrieved from the database.  
            //Here I only assign the snapshot value only if it does not return empty.
            if(snap.val() == null) {
                console.log("Snapshot value is empty");
            }else{
                name = snap.val().firstName || 'Anonymous';
                
                console.log('LOOK ->',name);
                this.setState({ username: name });
            }
           
        }).catch((error) => console.error(error.message));

        //If the name is not defined I proceed to read the from the personal trainer node. 
        if(name == undefined){
            firebase.database().ref(`/personal_trainers/${userId}`)
            .once('value')
            .then((snap) => {
                console.log('snap value => ', snap.val());  
                if(snap.val() == null){
                    console.log("Snapshot value is empty");
                }else{
                    name = snap.val().firstName || 'Anonymous';
                    this.setState({ username: name });
                }
                
            })
            .catch((error) => console.error(error.message));
        }

        //If the name is not defined I proceed to read the from the clients node. 
        // if(name == undefined){
        //     firebase.database().ref(`/clients/${userId}`)
        //     .once('value')
        //     .then((snap) => {
        //         console.log('snap value => ', snap.val());  
        //         if(snap.val() == null){
        //             console.log("Snapshot value is empty");
        //         }else{
        //             name = snap.val().firstName || 'Anonymous';
        //             this.setState({ username: name });
        //         }
                
        //     })
        //     .catch((error) => console.error(error.message));
        // }
    }
   
    render(){
        //ES6 Destructuring of style objects. 
        const { containerStyle, content, welcomeTextStyle } = homeStyle;
        return(
            <ImageBackground
                source={require('../../assets/images/man.jpg')}
                style={homeStyle.backgroundImg}
            >
                <ScrollView>
                    <View>
                        <CardSection>
                        <Text style={welcomeTextStyle}>
                            Hello {this.state.username}, 
                            Welcome To My Trainer!
                        </Text>
                        </CardSection>
                        <Card
                            title="Create Your Workouts"
                            image={require('../../assets/images/exercise.jpg')}
                        >
                            <Text>
                                Click here to start customising your workout plan, by adding the weights,  
                                number of sets and repetitions. Train like never before! 
                            </Text>
                            
                            <Button onPress={() => Actions.workout()}>
                                Start Now
                            </Button>
                        </Card> 
                        
                        <Card
                            title="A Guide To Nutrition"
                            image={require('../../assets/images/groceries.jpg')}
                        >
                            <Text>Nutrition Guide</Text>
                            
                            <Button onPress={() => Actions.nutrition()}>
                                View Now
                            </Button>
                        </Card> 
                        <Card
                         title="Watch Workout Tutorials"
                         image={require('../../assets/images/training.jpg')}
                        >
                            <Text>
                                Get started with workout videos that allow you to 
                                learn useful tips and advice on how to train, how to perform an exercise,
                                and much more.
                            </Text>
                            
                            <Button
                            onPress={() => Actions.tutorials()}
                            >
                            View Now
                            </Button>
                        </Card>

                    </View>
                </ScrollView>      
            </ImageBackground>
        );
    }
}

const homeStyle = {
    backgroundImg: {    
        height: '100%',
        width: '100%',
        alignSelf: 'stretch'           
    },
    welcomeTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        
    },
    containerStyle: {
        flex: 1
    },
    content: {
        alignItems: 'center'     
    }
}

export default connect(null, {})(Home);