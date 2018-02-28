import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const SpinnerLoader = ({ size, style }) => {
  return (
    <View> 
      <ActivityIndicator 
      size={size || 'large'} 
      animating
      style = {style}
      color="#0000ff"
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

export { SpinnerLoader };



