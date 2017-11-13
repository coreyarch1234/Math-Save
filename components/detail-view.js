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


export default class DetailView extends Component {
    static navigationOptions = {
        title: 'Review'
    }

    constructor(props){
        super(props);
        this.state = {

        }

        this.title = this.props.title;
        this.topic = this.props.title;
        this.renderedLatex = this.props.latex;
        this.move = this.props.navigation;

    }

    render() {
        return (

            <View style={styles.containerHome}>
                <WebView
                    source={{html: layoutHTML(this.title, this.topic, this.renderedLatex)}}
                    automaticallyAdjustContentInsets={true}
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
               />
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
        bottom: 350,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'

  }
});
