import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  WebView
} from 'react-native';

import HTML from 'react-native-render-html';
import layoutHTML from '../helpers/latex';

import Button from 'apsl-react-native-button';

//next to do is the same for difficulty and topic. And in return setstate function, make heroku api call
export default class ProblemView extends Component {
    static navigationOptions = {
        title: 'Review'
    }

    constructor(props){
        super(props);
        this.state = {
            title: null,
            topic: null
        }
        this.move = this.props.navigation;


        this.renderedLatex = this.props.navigation.state.params.renderedLatex; //contains the latex
        this.title = this.props.navigation.state.params.title;
        this.topic = this.props.navigation.state.params.topic;
        console.log('THE TITLE IS: ');
        console.log(this.title);
        console.log('THE TOPIC IS: ');
        console.log(this.topic);
    }

    render() {
        return (
            <View>
                <View style={styles.webView}>
                    <WebView
                      source={{html: layoutHTML(this.title, this.topic, this.renderedLatex)}}
                   />
                </View>

            </View>
        )
    }
}

// <Button
//     style={styles.button}
//     textStyle={{fontSize: 18}}
//     onPress={() =>  this.move.navigate('Camera')}>
//     <Text style={styles.buttonText}>Capture Another Problem</Text>
// </Button>
const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    webView: {
        bottom: 10
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        // alignSelf: 'center',
        // textAlign: 'center'
    },
    button: {
        height: 36,
        width: 75,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        // top: 5,
        // alignSelf: 'center',
        // justifyContent: 'center'
  }
});
