import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

import Button from 'apsl-react-native-button';

export default class ProblemInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            category: ''
        }
    }
    render() {
        return (
            <View>
                <View style={styles.title}>
                    <FormLabel>Title</FormLabel>
                    <FormInput onChangeText={(title) => {
                        this.setState({title: title});
                        console.log('title is being edited: ' + title);
                    }}/>
                </View>
                <View style={styles.category}>
                    <FormLabel>Category</FormLabel>
                    <FormInput onChangeText={(category) => {
                        this.setState({category: category});
                        console.log('category is being edited: ' + category);
                    }}/>
                </View>
                <Button
                    style={styles.button}
                    textStyle={{fontSize: 18}}
                    onPress={() => this.props.onSubmit(this.state.title, this.state.category)}>
                    <Text style={styles.buttonText}>Save</Text>
                </Button>
            </View>
        )
    }
}
// <KeyboardAvoidingView
//  behavior="padding"
//  style={{width:'100%'}}>
//     <View style={styles.title}>
//         <FormLabel>Title</FormLabel>
//         <FormInput onChangeText={(title) => {
//             this.setState({title: title});
//             console.log('title is being edited: ' + title);
//         }}/>
//     </View>
//     <View style={styles.category}>
//         <FormLabel>Category</FormLabel>
//         <FormInput onChangeText={(category) => {
//             this.setState({category: category});
//             console.log('category is being edited: ' + category);
//         }}/>
//     </View>
//     <Button
//         style={styles.button}
//         textStyle={{fontSize: 18}}
//         onPress={() => this.props.onSubmit(this.state.title, this.state.category)}>
//         <Text style={styles.buttonText}>Save</Text>
//     </Button>
// </KeyboardAvoidingView>


const styles = {
    title: {
        bottom: 10,
    },
    category: {
        top: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    button: {
        height: 36,
        width: 75,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        top: 25,
        alignSelf: 'center',
        justifyContent: 'center'
  }
}
