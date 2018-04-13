import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Card, CardSection } from "../reusable";


class Home extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
    }

    //This class will be responsible for rendering the appropriate view based on the user role. 
    componentWillMount() {
        const database = firebase.database();
        var auth = firebase.auth(); 
         //Session check to see if the user logged in.
        // //If user is signed in, retrieve their first name! 
            
            if(auth) {

            }else{
                console.log("User's name cannot be retrieved from the database, because user is not authenticated");
            }
    }

    componentDidMount() {
        
        
        
    }   

    render(){
        
        const { containerStyle, content } = homeStyle;
        return(
            <ImageBackground
                source={{uri: "https://cdn.pixabay.com/photo/2015/02/23/20/00/bodybuilder-646482_960_720.jpg"}}
                style={homeStyle.backgroundImg}
            >
                <ScrollView>
                    <View>

                        <Card>
                            <CardSection>
                                <Text>Welcome To My Trainer</Text>
                            </CardSection>
                            <CardSection>
                                <Text>View Workouts </Text>
                            </CardSection>
                            <CardSection>
                                <Text>Welcome To My Trainer</Text>
                            </CardSection>
                            <CardSection>
                                <Text>Welcome To My Trainer</Text>
                            </CardSection>
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
    containerStyle: {
        flex: 1
    },
    content: {
        alignItems: 'center'     
    }
}

export default connect(null, {})(Home);