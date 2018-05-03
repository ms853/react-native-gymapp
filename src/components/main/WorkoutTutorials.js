import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground} from 'react-native';
import Video from "react-native-video";

class WorkoutTutorials extends Component{
    render() {
        return (
            <ImageBackground 
                style={styles.imageBackground}
                source={require('../../assets/images/barbell-bodybuild.jpg')}
            >
                <ScrollView>
                    <View>
                        <Text> Workout Tutorials </Text>
                    </View>
                    <Video />
                </ScrollView>
            </ImageBackground>    
        );
    }
}

const styles = {
    imageBackground: {
        width: '100%',
        height: '100%',
        alignSelf: 'stretch' 
    }

};

export default WorkoutTutorials;