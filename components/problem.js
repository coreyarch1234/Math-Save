import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  NativeModules,
  PixelRatio,
  KeyboardAvoidingView
} from 'react-native';

//Problem info
import ProblemInfo from './problem-info';

//next to do is the same for difficulty and category. And in return setstate function, make heroku api call
export default class Problem extends Component {
    static navigationOptions = {
        title: <Text style={{fontSize: 20, fontFamily: 'Avenir-Black', fontWeight: '400'}}>Add Detail</Text>
    }

    constructor(props){
        super(props);
        this.state = {
            title: null,
            category: null
        }
        this.latex = this.props.navigation.state.params.latex; //contains the latex
        console.log('LATEX SAVED AND PASSED IN PROPS FROM CAMERA: ');
        console.log(this.props.navigation);
        console.log(this.props.navigation.state);
        console.log(this.props.navigation.state.params);
        console.log(this.props.navigation.state.params.latex);
    }

    render() {
        console.log(this.state.title);
        return (
            <KeyboardAvoidingView
             behavior="padding"
             style={styles.containerHome}>
                <View style={{width: '100%'}}>
                    <ProblemInfo
                        onSubmit = {(title, category) => {
                            this.setState({title: title, category: category}, function() {
                                //make api call to save to mongo
                                //make axios request to the endpoints. on success, navigate to math view
                                console.log('successfuly received title to be saved: ');
                                console.log(this.state.title);
                                console.log('successfuly received category to be saved: ');
                                console.log(this.state.category);
                                console.log('successfuly received latex to be saved: ');
                                console.log(this.latex);
                                fetch('https://ancient-atoll-47438.herokuapp.com/save', {
                                  method: 'POST',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    title: this.state.title,
                                    category: this.state.category,
                                    latex: this.latex
                                  })
                                }).then(response => response.json())
                                .then((responseJson) => {
                                    console.log('THE RESPONSE FROM THE SERVER IS: ');
                                    console.log(responseJson);
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
