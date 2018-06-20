import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground} from 'react-native';
import Video from "react-native-video";

class WorkoutTutorials extends Component{
    render() {

        // Within your render function, assuming you have a file called
        // "background.mp4" in your project. You can include multiple videos
        // on a single screen if you like.

        

        // // Later to trigger fullscreen
        // this.player.presentFullscreenPlayer()

        // // Disable fullscreen
        // this.player.dismissFullscreenPlayer()

        // // To set video position in seconds (seek)
        // this.player.seek(0)

       
        return (
            <ImageBackground 
                style={styles.imageBackground}
                source={require('../../assets/images/barbell-bodybuild.jpg')}
            >
                <ScrollView>
                    <View>
                        <Text> Workout Tutorials </Text>
                    </View>
                    <Video //source={{uri: "Video1"}}
                        source={require('../../assets/videos/Video1.mp4')}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onEnd={this.onEnd}                      // Callback when playback finishes
                        onError={this.videoError}               // Callback when video cannot be loaded
                        onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
                        onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
                        onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
                        onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
                        onProgress={this.setTime}               // Callback every ~250ms with currentTime
                        onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                        style={styles.backgroundVideo} />                
                        
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
    },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
};

export default WorkoutTutorials;