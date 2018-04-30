//This is a reusable spinner component!
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SpinnerLoader = ({ style, color, size }) => {
  return (
    <View style={styles.spinnerStyle}> 
       <ActivityIndicator 
        size={size || 'large'} 
        animating
        style = {style}
        color={color} //default color grey will be used. 
      />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
/*
      <ActivityIndicator 
      size={size || 'large'} 
      animating
      style = {style}
      color="#0000ff"
      />
*/

export { SpinnerLoader }; //Doing this will allow the componenet to be exported through index. 



