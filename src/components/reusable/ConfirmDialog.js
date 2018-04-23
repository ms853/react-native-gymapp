//This is a reusable component which I will use 
//-to render a modal UI component 
import React from 'react';
import { Text, Modal, TouchableHighlight, View } from "react-native";
import { CardSection } from './CardSection'; //A Cycical dependency exeption can happen if I import from ../reuable/index

const ConfirmDialog = ({ message, onRequest, vibility, transparent, animationType }) => {

}

export { ConfirmDialog };