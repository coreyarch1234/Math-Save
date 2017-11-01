import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

export default class ProblemInfo extends React.Component {

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
                <FormInput onChangeText={(title) => {
                    this.setState({title: title});
                    console.log('title is being edited: ' + title)
                }}/>
                <Button
                        onPress={() => this.props.onSubmit(this.state.title)}
                        color='#ff5c5c'
                        title="Submit"
                />
            </View>
        )
    }
}



const styles = {

}
