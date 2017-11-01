import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

export default class Problem extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            category: '',
            difficulty: ''
        }
    }
    render() {
        return (
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={(title) => console.log('title is being edited: ' + title)}/>
                <FormValidationMessage>Enter a valid title</FormValidationMessage>
            </View>
        )
    }
}



const styles = {

}
