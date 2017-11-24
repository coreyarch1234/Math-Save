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
        title: 'Problem',
        headerLeft: null
    }

    constructor(props){
        super(props);
        this.state = {

        }

        this.move = this.props.navigation;

        this.renderedLatex = this.props.navigation.state.params.renderedLatex; //contains the latex
        this.title = this.props.navigation.state.params.title;
        this.topic = this.props.navigation.state.params.topic;
    }

    render() {
        return (

            <View style={styles.containerHome}>
                <WebView
                    source={{html: layoutHTML(this.title, this.topic, this.renderedLatex)}}
                    automaticallyAdjustContentInsets={true}
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
               />
               <Button
                   style={styles.button}
                   textStyle={{fontSize: 18}}
                   onPress={() =>  this.move.navigate('Camera')}>
                   <Text style={styles.buttonText}>More</Text>
               </Button>
               <Button
                   style={styles.button}
                   textStyle={{fontSize: 18}}
                   onPress={() =>  this.move.navigate('ProblemList')}>
                   <Text style={styles.buttonText}>Library</Text>
               </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    webView: {
        marginTop: 20,
        maxHeight: 200,
        width: 320,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    },
    button: {
        height: 36,
        width: 100,
        bottom: 200,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'

  }
});
