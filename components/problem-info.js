import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

import Button from 'apsl-react-native-button';

// import Spinner from 'react-native-loading-spinner-overlay';

import Spinner from 'react-native-spinkit';

export default class ProblemInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            topic: '',
            visible: false
        }
    }

    loadingToggle() {
        var visible = this.state.visible;
        console.log(`LOADING ON VALUE IS BEFORE ${visible}`);
        console.log('LOADING TOGGLE HAS BEEN REACHED');
        this.setState({visible: !visible});
    }
    // <Spinner visible={this.state.visible} textContent={"Thinking..."} textStyle={{color: '#6c6cb2', fontSize: 16, color: 'black', fontFamily:'Montserrat-Medium'}} />
    loadingDisplay() {
        if (this.state.visible) {
            return (
                <View style= {{height: 50}}>
                   <Spinner style={{marginTop: 10, alignSelf: 'center', justifyContent: 'center'}} isVisible={this.state.visible} size={50} type={'Wave'} color={'#6c6cb2'}/>
                </View>
            )
        }
        return (
            <Button
                style={styles.button}
                textStyle={{fontSize: 18}}
                onPress={() => {
                    this.loadingToggle();
                    this.props.onSubmit(this.state.title, this.state.topic, function(){
                        console.log('CALLBACK HAS BEEN REACHED');
                        // this.loadingToggle();
                    });
                }}>
                <Text style={styles.buttonText}>Save</Text>
            </Button>
        )

    }

    componentWillUnmount() {
        this.loadingToggle();
        console.log('Will Unmount');
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
                {this.loadingDisplay()}
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
