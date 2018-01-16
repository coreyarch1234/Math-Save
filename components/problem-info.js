import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

import Button from 'apsl-react-native-button';

import Spinner from 'react-native-loading-spinner-overlay';

export default class ProblemInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            topic: '',
            visible: false
        }
    }

    toggleLoading() {
        const { visible } = this.state;
        this.setState({ visible: !visible });
        setInterval(() => {
            this.setState({
              visible: !this.state.visible
            });
        }, 3000);
    }

    loadingOrSave(){
        if (this.state.visible){
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
            )
        }else{
            return (
                <Button
                    style={styles.button}
                    textStyle={{fontSize: 18}}
                    onPress={() => {
                        this.toggleLoading();
                        this.props.onSubmit(this.state.title, this.state.topic);
                    }}>
                    <Text style={styles.buttonText}>Save</Text>
                </Button>
            )
        }
    }

    render() {
        return (
            <View>
                <View style={styles.title}>
                    <FormLabel>Subject (Ex: Algebra, Calculus)</FormLabel>
                    <FormInput onChangeText={(title) => {
                        this.setState({title: title});
                        console.log('title is being edited: ' + title);
                    }}/>
                </View>
                <View style={styles.topic}>
                    <FormLabel>Topic (Ex: Derivatives, Integrals)</FormLabel>
                    <FormInput onChangeText={(topic) => {
                        this.setState({topic: topic});
                        console.log('topic is being edited: ' + topic);
                    }}/>
                </View>
                {this.loadingOrSave()}
            </View>
        )
    }
}


const styles = {
    detailsContainer: {
    },
    title: {
        bottom: 10,
    },
    topic: {
        top: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        height: 36,
        width: 75,
        backgroundColor: '#6c6cb2',
        borderColor: '#6c6cb2',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        top: 25,
        alignSelf: 'center',
        justifyContent: 'center'
  }
}
