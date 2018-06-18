import React, { Component } from "react";
import { 
    View, Text, ScrollView, 
    ListView, FlatList, TouchableWithoutFeedback, Alert
} from "react-native";
import { connect } from "react-redux";
import { fetchClients } from '../../actions/ClientAction';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";
import { RkButton } from 'react-native-ui-kitten';
import { Card, CardSection } from '../reusable';
import ClientListItem from "../Welcome";

class ClientList extends Component{
    
    componentWillMount() {
        this.props.fetchClients();
    }

    _onListItemPress(client) {
        //Navigate to the employee edit component. 
        
        Actions.editClient({ client: this.props.client });
    }

    // renderRow({ client }) {
    //     return <ClientListItem  client={client}/>;
    // }
    
    render() {
        console.log('this here -> ', this.props);
        //Returns JSX code which is the UI
        return (
            
            <ScrollView>                   
                <FlatList 
                    data={this.props.clientData}
                    renderItem={({ item }) => (
                        //item has access to all the attributes in the form. 
                    <TouchableWithoutFeedback onPress={item => this._onListItemPress(item)}>
                        <View>
                            <CardSection>
                                <Text style={styles.textStyle}>{item.firstName}</Text>
                                <Text style={styles.secondTextStyle}>{item.surName}</Text>
                            </CardSection>
                        </View>
                    </TouchableWithoutFeedback>
                    )}
                />
            </ScrollView>    
        );
    }
}

/*

*/

const styles = {

    textStyle: {
        fontSize: 22,
        paddingLeft: 10,
        flexDirection: 'row'
    },

    secondTextStyle: {
        fontSize: 22,
        paddingLeft: 15
    } 
};

const mapStateToProps = state => {
    const clientData = _.map(state.clients, (value, uid) => ({
        ...value,
        key: uid //here I am setting the key to the uid in order for it to be rendered in the flatlist. 
    }));
    return { clientData };
 };

export default connect(mapStateToProps, { fetchClients })(ClientList);