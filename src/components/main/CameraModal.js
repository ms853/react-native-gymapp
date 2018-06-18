'use strict';
import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Camera, { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { RkButton } from 'react-native-ui-kitten';

class CameraModal extends Component {
   
    takePicture = async function() {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options)
          console.log(data.uri);
        }
    };

    render() {
        
        //Extracting the style properties from the styles object. 
        const { preview, containerStyle, capture } = styles; 

        return(

            <View style={containerStyle}>
               
                {/*React-Native Camera Component*/}
                        <RNCamera
                            ref={ref => {
                            this.camera = ref;
                            }}
                            style = {preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}
                        />
                        
                        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                            <RkButton
                                onPress={this.takePicture.bind(this)}
                                style = {capture}
                            >
                                <Text style={{fontSize: 14}}> TAKE A PICTURE </Text>
                            </RkButton>
                        </View>
            </View>
        );
    }
        
 
     
};

//Styling for the camera component 
const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
};

export default CameraModal;