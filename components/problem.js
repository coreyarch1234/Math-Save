import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';

//Problem info
import ProblemInfo from './problem-info';

//Problem View
import ProblemView from './problem-view';


export default class Problem extends Component {
    static navigationOptions = {
        title: 'Add Detail',
        headerLeft: null,
        headerBackTitleStyle: {color: '#6c6cb2'},
        headerStyle: { backgroundColor: '#fefefe' },
        headerTintColor: '#6c6cb2',
        headerTitleStyle: { color: '#484848', fontFamily: 'Montserrat-SemiBold' }
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

    saveDataToLocal(problem) {
        AsyncStorage.getItem('problemArray').then((value) => {
            let valueOfArray = (value === null ? null : JSON.parse(value));
            console.log(`THE VALUE OF THE LOCAL STORAGE PROBLEM ARRAY IS: ${valueOfArray}`);
            if (valueOfArray === null){
                AsyncStorage.setItem('problemArray', JSON.stringify([problem]));
            }else{
                AsyncStorage.setItem('problemArray', JSON.stringify([...valueOfArray, problem]));
            }
        })
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
                                    //SAVE TO LOCAL STORAGE THEN NAVIGATE
                                    var problem = {
                                        title: responseJson.problem.title,
                                        topic: responseJson.problem.topic,
                                        latex: this.latex,
                                        renderedLatex: responseJson.renderedLatex
                                    }
                                    this.saveDataToLocal(problem);

                                    console.log('THE RESPONSE FROM THE SERVER: ');
                                    console.log(responseJson);
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
