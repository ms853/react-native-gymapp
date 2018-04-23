import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Card } from "react-native-elements";
import { Button } from '../reusable';


class Home extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
    }

    //This class will be responsible for rendering the appropriate view based on the user role. 
    componentWillMount() {
        var auth = firebase.auth();  //auth variable
        const db = firebase.database(); //database object
         
            if(auth) { //If user is signed in, retrieve their first name! 
                const { currentUser } = firebase.auth(); //get current authenticated user.

                db.ref(`/users/${currentUser.uid}/user_info`) //Database reference including the user id.
                .once("value", snapshot => { //The query type used here is 'once' to listen once for data in the database. 
                    var firstName = snapshot.val().firstName; //This gets the firstName of the user signed in. 
                    this.setState({
                        username: firstName
                    });
                    console.log('LOOK ->', this.state.username);
                });
               
            }else{
                console.log("The user's name cannot be retrieved from the database, because user is not authenticated");
            }
    }


    render(){
        //ES6 Destructuring of style objects. 
        const { containerStyle, content, welcomeTextStyle } = homeStyle;
        return(
            <ImageBackground
                //source={{uri: "https://cdn.pixabay.com/photo/2015/02/23/20/00/bodybuilder-646482_960_720.jpg"}}
                style={homeStyle.backgroundImg}
            >
                <ScrollView>
                    <View>
                        <Text style={welcomeTextStyle}>
                            Welcome To My Trainer {this.state.username}
                        </Text>
                        <Card
                            title="A Guide To Nutrition"
                            image={require('../../assets/images/groceries.jpg')}
                        >
                            <Text>Nutrition Guide</Text>
                            <Button>View Now</Button>
                        </Card> 
                        <Card
                         title="View Workout Tutorials"
                         image={require('../../assets/images/training.jpg')}
                        >
                            <Text>Something</Text>
                            <Button>View Now</Button>
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
        fontSize: 25,
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