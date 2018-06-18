import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card, CardSection } from "../reusable";
import ClientForm from "./ClientForm";
import { RkButton } from "react-native-ui-kitten";
import _ from "lodash";
import { connect } from "react-redux";
import { clientChanged } from "../../actions/ClientAction";

class EditClient extends Component{

    componentWillMount() {
        console.log(this.props.client);
        _.each(this.props.client, (value, prop) => {
            this.props.clientChanged({prop, value});
        })
    }

    /**/
    render() {
        return (
            <ScrollView>
                <Card>
                    <ClientForm />
                </Card>
                <View style={styles.buttonStyle}>
                    <RkButton rkType="xlarge success">Save Changes</RkButton>
                </View>
                
                <View style={styles.buttonStyle}>
                    <RkButton rkType="xlarge danger">Remove Client</RkButton>
                </View> 
            </ScrollView>    
        );
    }    
}       

const styles = {
    buttonStyle: {
        paddingTop: 10,
        marginBottom: 5
    }
};

const mapStateToProps = (state) => {
    const { firstName, surName, gender, phoneNumber, goal, height, weight } = state.client;

    return { firstName, surName, gender, phoneNumber, goal, height, weight };
};

export default connect(mapStateToProps, { clientChanged })(EditClient);