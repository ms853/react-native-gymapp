import React, { Component } from 'react';
import { ImageBackground, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Header, CardSection } from "../components/reusable";
import { Actions } from 'react-native-router-flux';
import { RkButton } from "react-native-ui-kitten";

export default class clientListItem extends Component{
   
    _onListItemPress() {
        //Navigate to the employee edit component. 
        Actions.editClient({ client: this.props.client });
    }

    render(){
        //ES6 Destructuring
        const {  textStyle, secondTextStyle } = styles;
        const item  = this.props;
        return (         
            <TouchableWithoutFeedback onPress={this._onListItemPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={textStyle}>{item.firstName}</Text>
                        <Text style={secondTextStyle}>{item.surName}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 22,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    secondTextStyle: {
        fontSize: 22,
        paddingLeft: 15
        //flexDirection: 'row'
    } 
};

//export default Welcome;