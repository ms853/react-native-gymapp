import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

const SpinnerLoader = ({ style, color, size, type }) => {
  return (
    <View> 
      <Spinner 
        style={style}
        color={color}
        size={size}
        type={type}
      />
    </View>
  );
};

// const styles = {
//   spinnerStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// };
/*
      <ActivityIndicator 
      size={size || 'large'} 
      animating
      style = {style}
      color="#0000ff"
      />
*/

export { SpinnerLoader };



