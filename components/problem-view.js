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
        headerLeft: null,
        headerBackTitleStyle: {color: '#6c6cb2'},
        headerStyle: { backgroundColor: '#fefefe' },
        headerTintColor: '#6c6cb2',
        headerTitleStyle: { color: '#484848', fontFamily: 'Montserrat-SemiBold' }
    }

    constructor(props){
        super(props);
        this.state = {
            refresh: false
        }
        console.log('PROBLEM VIEW HAS BEEN REACHED');

        this.move = this.props.navigation;

        this.renderedLatex = this.props.navigation.state.params.renderedLatex; //contains the latex
        this.title = this.props.navigation.state.params.title;
        this.topic = this.props.navigation.state.params.topic;
    }

    // componentDidMount(){
    //     var refresh = this.state.refresh;
    //     console.log('REFRESH WAS ACTIVATED');
    //     this.setState({refresh: refresh});
    // }


    render() {
        return (
            <View style={styles.containerHome}>
                <WebView
                    source={{html: layoutHTML(this.title, this.topic, this.renderedLatex)}}
                    automaticallyAdjustContentInsets={true}
                    style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
               />
               <Button
                   style={styles.libraryButton}
                   textStyle={{fontSize: 18}}
                   onPress={() =>  this.move.navigate('ProblemList')}>
                   <Text style={styles.libraryButtonText}>Back to Library</Text>
               </Button>
               <Button
                   style={styles.moreButton}
                   textStyle={{fontSize: 18}}
                   onPress={() =>  this.move.navigate('Camera')}>
                   <Text style={styles.moreButtonText}>Take Another Picture</Text>
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
    moreButtonText: {
        fontSize: 15,
        color: '#6c6cb2',
        fontFamily: 'Montserrat-SemiBold'
    },
    libraryButtonText: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold'
    },
    moreButton: {
        height: 36,
        paddingRight: 25,
        paddingLeft: 25,
        bottom: 200,
        backgroundColor: '#fff',
        borderColor: '#6c6cb2',
        borderWidth: 2,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'

    },
    libraryButton: {
        height: 36,
        paddingRight: 50,
        paddingLeft: 50,
        bottom: 200,
        backgroundColor: '#6c6cb2',
        borderColor: '#6c6cb2',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'

    },
});
