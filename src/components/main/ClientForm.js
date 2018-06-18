import React, { Component } from 'react';
import { Text, View, Picker, ScrollView, } from 'react-native';
import { connect } from "react-redux";
import { clientChanged } from '../../actions/ClientAction';
import { CardSection, NumberInput, Input } from "../reusable";
import PhoneInput from 'react-native-phone-input';

class ClientForm extends Component{
    
    render() {
        const { firstName, surName, gender, phoneNumber, goal, height, weight } = this.props;

        //console.log("LOOK HERE",firstName, surName, gender, phoneNumber, goal, height, weight);
        
        return (
            <ScrollView>
          
                    <CardSection>
                    <Input 
                        label="Client First Name"
                        onChangeText={value => this.props.clientChanged({ prop: 'firstName', value})}
                        value={firstName}
                    /> 
                    </CardSection>

                    <CardSection>
                    <Input 
                        label="Enter Client Surname"
                        onChangeText={value => this.props.clientChanged({prop: 'surName', value})}
                        value={surName}
                        
                    /> 
                    </CardSection>
                    <View style={styles.phoneContainerStyle}>
                            <PhoneInput ref={ref => {
                            this.phone = ref;}}  
                            onChangePhoneNumber={value => this.props.clientChanged({prop: 'phoneNumber', value})}
                            value={phoneNumber}
                            />
                    </View>
                    <CardSection>
                        <Picker
                            style={{ flex: 1, margin: 2 }}
                            selectedValue={gender}
                            mode="dropdown"
                            onValueChange={value => this.props.clientChanged({prop: 'gender', value})}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>    
                    </CardSection>

                    <CardSection>
                    <Input 
                        label="Enter Client Goal"
                        value={goal}
                        onChangeText={value => this.props.clientChanged({prop: 'goal', value})}
                        
                    />
                    </CardSection>
                    <CardSection>
                        <NumberInput
                            label="Weight (Kg)"
                            type="up-down" //by default its plus-minus
                            valueType='real'
                            step={0.5} 
                            width={250}
                            height={170}
                            onChangeNumber={value => this.props.clientChanged({ prop: 'weight', value})}
                            value={weight}
                        /> 
                    </CardSection>
                    <CardSection>
                        <NumberInput
                            label="Height (cm)"
                            type="up-down" //by default its plus-minus
                            valueType='real'
                            step={0.05} 
                            width={250}
                            height={170}
                            onChangeNumber={value => this.props.clientChanged({prop: 'height', value})}
                            value={height}
                        />
                    </CardSection>
         
            </ScrollView>
        );
    }
}

const styles = {
    phoneContainerStyle: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const mapStateToProps = (state) => {
    const { firstName, surName, gender, phoneNumber, goal, height, weight } = state.client;

    return { firstName, surName, gender, phoneNumber, goal, height, weight };
};

export default connect(mapStateToProps, {clientChanged})(ClientForm);
