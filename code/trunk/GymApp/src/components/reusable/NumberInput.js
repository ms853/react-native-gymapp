import React from "react";
import { View, Text } from "react-native";
import NumericInput, { calcSize } from "react-native-numeric-input";

//Functional component for numeric inputs. 
//the calcSize variable is responsible for a responsive layout.
const NumberInput = ({ label, type, value, onChangeNumber, height, width, style }) => { 
    
    const { containerStyle, labelStyle } = styles;
    return (
        <View style={containerStyle}>
            
            <Text style={labelStyle}>{label}</Text>

            <NumericInput 
                type={type} 
                value={value} 
                onChange={onChangeNumber}
                totalWidth={calcSize(width)} 
                totalHeight={calcSize(height)} 
                iconStyle={style}
            />
        
        </View>
    );
}

const styles = {
    
    containerStyle: {
        
        height: 80,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'

    },
    
    labelStyle: {
        fontSize: 17,
        flex: 1
    },

    imageStyle: {

    }
};
  

export { NumberInput };

