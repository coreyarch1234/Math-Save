// Rendered after picture is take
// User enters problem info and saves data to local storage as well as to database
// Navigate to Problem View afterwards
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
      topic: null,
    };
    this.latex = this.props.navigation.state.params.latex; //contains the latex
    this.renderedLatex = this.props.navigation.state.params.renderedLatex; //contains the renderedLatex
    this.move = this.props.navigation; //to send html in navigate
  }
  // Local storage holds array of problem objects that contain, title, latex, topic, etc
  saveDataToLocal(problem) {
    AsyncStorage.getItem('problemArray').then((value) => {
      let valueOfArray = (value === null ? null : JSON.parse(value));
      if (valueOfArray === null){
        AsyncStorage.setItem('problemArray', JSON.stringify([problem]));
      }else{
        AsyncStorage.setItem('problemArray', JSON.stringify([problem, ...valueOfArray]));
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.containerHome}>
        <View style={{width: '100%'}}>
          <ProblemInfo
            onSubmit = {(title, topic, callback) => {
              this.setState({title: title, topic: topic}, function() {
                var problem = {
                  title: title,
                  topic: topic,
                  latex: this.latex,
                  renderedLatex: this.renderedLatex
                };
                // Save to local storage before navigating to ProblemView
                this.saveDataToLocal(problem);
                // clear text fields
                callback();
                console.log('SAVED PROBLEM');
                this.move.navigate('ProblemView', {
                  renderedLatex: this.renderedLatex,
                  isProblemSaved: true
                });
              });
            }}

          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  // render() {
  //   return (
  //     <KeyboardAvoidingView
  //       behavior="padding"
  //       style={styles.containerHome}>
  //       <View style={{width: '100%'}}>
  //         <ProblemInfo
  //           onSubmit = {(title, topic, callback) => {
  //             this.setState({title: title, topic: topic}, function() {
  //               //make api call to save to mongo
  //               //make axios request to the endpoints. on success, navigate to math view
  //               fetch('https://ancient-atoll-47438.herokuapp.com/latex', {
  //                 method: 'POST',
  //                 headers: {
  //                   'Accept': 'application/json',
  //                   'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify({
  //                   title: this.state.title,
  //                   topic: this.state.topic,
  //                   latex: this.latex
  //                 })
  //               }).then(response => response.json())
  //                 .then((responseJson) => {
  //                   //SAVE TO LOCAL STORAGE THEN NAVIGATE
  //                   var problem = {
  //                     title: responseJson.problem.title,
  //                     topic: responseJson.problem.topic,
  //                     latex: this.latex,
  //                     renderedLatex: responseJson.renderedLatex
  //                   };
  //                   // Save to local storage before navigating to ProblemView
  //                   this.saveDataToLocal(problem);
  //                   this.move.navigate('ProblemView', {
  //                     title: responseJson.problem.title,
  //                     topic: responseJson.problem.topic,
  //                     renderedLatex: responseJson.renderedLatex
  //                   });
  //                 }).catch(err => console.error(err));
  //             });
  //           }}
  //
  //         />
  //       </View>
  //     </KeyboardAvoidingView>
  //   );
  // }
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
