import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  KeyboardAvoidingView
} from 'react-native';

//Problem info
import ProblemInfo from './problem-info';

//Problem View
import ProblemView from './problem-view';


export default class Problem extends Component {
    static navigationOptions = {
        title: 'Add Detail',
    }

    constructor(props){
        super(props);
        this.state = {
            title: null,
            topic: null
        }
        this.latex = this.props.navigation.state.params.latex; //contains the latex

        this.move = this.props.navigation; //to send html in navigate
    }

    render() {
        return (
            <KeyboardAvoidingView
             behavior="padding"
             style={styles.containerHome}>
                <View style={{width: '100%'}}>
                    <ProblemInfo
                        onSubmit = {(title, topic) => {
                            this.setState({title: title, topic: topic}, function() {
                                //make api call to save to mongo
                                //make axios request to the endpoints. on success, navigate to math view
                                console.log('successfuly received title to be saved: ');
                                console.log(this.state.title);
                                console.log('successfuly received topic to be saved: ');
                                console.log(this.state.topic);
                                console.log('successfuly received latex to be saved: ');
                                console.log(this.latex);
                                fetch('https://ancient-atoll-47438.herokuapp.com/latex', {
                                  method: 'POST',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    title: this.state.title,
                                    topic: this.state.topic,
                                    latex: this.latex
                                })
                                }).then(response => response.json())
                                .then((responseJson) => {
                                    console.log('THE RESPONSE FROM THE SERVER: ');
                                    console.log(responseJson);
                                    // var renderedLatex = JSON.parse(responseJson.problem.renderedLatex);
                                    this.move.navigate('ProblemView', {
                                        title: responseJson.problem.title,
                                        topic: responseJson.problem.topic,
                                        renderedLatex: responseJson.renderedLatex
                                    });
                                }).catch(err => console.error(err));
                            })
                        }}

                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
