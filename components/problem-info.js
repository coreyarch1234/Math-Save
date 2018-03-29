import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

import Button from 'apsl-react-native-button';
import Spinner from 'react-native-spinkit';

export default class ProblemInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: 'Fill Me In',
      topic: 'Fill Me In',
      isVisible: false
    };
  }

  changeVisibility() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  // show spinner or text
  loadOrText() {
    if (this.state.isVisible) {
      return (
         <Spinner style={styles.buttonText} isVisible={this.state.isVisible} size={100} type={'Wave'} color={'#6c6cb2'}/>
      )
    }else{
      return (
        <Text style={styles.buttonText}>Save</Text>
      )
    }
  }

  render() {
    return (
      <View>
        <View style={styles.title}>
          <FormLabel>Subject (Ex: Algebra, Calculus)</FormLabel>
          <FormInput
            onChangeText={(title) => {
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
        <Button
          style={styles.button}
          textStyle={{fontSize: 18}}
          onPress={() => {
            this.changeVisibility();
            this.props.onSubmit(this.state.title, this.state.topic);
          }}>
          {this.loadOrText()}
        </Button>
      </View>
    );
  }
}
// <Text style={styles.buttonText}>Save</Text>

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
  spinner: {
    marginTop: 20,
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
  },
};
