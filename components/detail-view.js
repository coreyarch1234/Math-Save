// rendered when user taps on problem view cell. Display rendered latex
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
    title: 'Problem',
    headerBackTitleStyle: {color: '#6c6cb2'},
    headerStyle: { backgroundColor: '#fefefe' },
    headerTintColor: '#6c6cb2',
    headerTitleStyle: { color: '#484848', fontFamily: 'Montserrat-SemiBold' }
  }

  constructor(props){
    super(props);
    this.state = {

    };

    this.move = this.props.navigation;
    this.title = this.props.navigation.state.params.title;
    this.topic = this.props.navigation.state.params.topic;
    this.renderedLatex = this.props.navigation.state.params.renderedLatex;

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

    );
  }
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
