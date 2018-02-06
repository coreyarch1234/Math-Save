import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

import Camera from 'react-native-camera';

import ImageResizer from 'react-native-image-resizer';

import RNFS from 'react-native-fs';

import { TabNavigator, StackNavigator } from 'react-navigation';

import { Icon } from 'react-native-elements';

// import Spinner from 'react-native-spinkit';
import Spinner from 'react-native-loading-spinner-overlay';


import keys from '../keys.js';
const api_id = keys.api_id;
const api_key = keys.api_key;

//variables/constants
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const viewWidth = Math.round(width * 0.7);
const viewHeight = Math.round(viewWidth * 0.5);

const viewX = Math.round((width - viewWidth) / 2);
const viewY = Math.round((height - viewHeight) / 2);


//camera screen
export default class CameraScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentLatex: null,
      errorMessage: false,
      visible: false
    };
    console.log('THE CAMERA IS MOUNTED AGAIN');
    this.move = this.props.navigation;
    console.log('the navigate object is: ');
    console.log(this.move.navigate);
  }

  static navigationOptions = {
      title: 'Camera',
      headerLeft: null,
      headerBackTitleStyle: {color: '#6c6cb2'},
      headerStyle: { backgroundColor: '#fefefe' },
      headerTintColor: '#6c6cb2',
      headerTitleStyle: { color: '#484848', fontFamily: 'Montserrat-SemiBold' },
      tabBarLabel: 'Camera',
      tabBarIcon: ({tintColor}) => (
          <Image
              source={require('../images/camera.png')}
              style={[styles.icon, {tintColor: tintColor}]}
          />
      )
  };

  loadingToggle() {
    var visible = this.state.visible;
    console.log(`LOADING ON VALUE IS BEFORE ${visible}`);
    console.log('LOADING TOGGLE HAS BEEN REACHED');
    this.setState({visible: !visible});
  }
  loadingDisplay() {
    if (this.state.visible) {
      return (
        <Spinner visible={this.state.visible} textContent={'Processing...'} textStyle={{color: '#FFF', fontFamily:'Montserrat-Medium', paddingTop: 12, fontSize: 16}} />
      );
    }
  }

  takePicture() {
    // show spinner
    console.log(`LOADING ON VALUE IS BEFORE ${this.state.visible}`);
    this.loadingToggle();
    console.log(`LOADING ON VALUE IS NOW AFTER ${this.state.visible}`);

    this.camera.capture().then((data) => {

      var base64Data = data.data;
      var base64String = `data:image/jpeg;base64,${base64Data}`;
      return ImageResizer.createResizedImage(base64String, 800, 200, 'JPEG', 100);

    }).then((response) => {

      return  RNFS.readFile(response.uri.substring(7), 'base64');

    }).then((res) => {

      fetch('https://api.mathpix.com/v3/latex', {
        method: 'POST',
        headers: {
          'app_id': api_id,
          'app_key': api_key,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        formats: {
          'mathml': true
        },
        ocr: ['math'],
        body: JSON.stringify({
          'url':`data:text/plain;base64,${res}`
        })

      }).then(response => response.json())
        .then((responseJson) => {

          // // Turn off spinner before navigate to next
          // this.loadingToggle();

          if (responseJson.latex == ''){
            this.loadingToggle();
            return;
          }else{
            // Turn off spinner before navigate to next
            this.loadingToggle();
            var latex = responseJson.latex;

            //change current latex
            this.setState({currentLatex: latex, errorMessage: false}, function(){
              console.log('the current state is now: ' + this.state.currentLatex);
              //navigate to problem  info fields
              console.log('test to see if you can print navigate here: ');
              console.log(this.move);
              console.log(`============THE LATEX IS NOT EMPTY, SET ERROR MESSAGE TO ${this.state.errorMessage}========`);
              this.move.navigate('Problem', {latex: this.state.currentLatex});
            });
            return responseJson;

          }
        }).catch(err => console.error(err));

    }).catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.loadingDisplay()}
        <View style= {{height: 40}}>
          <Text style = {{fontSize: 16, color: 'white', fontFamily:'Montserrat-Medium', paddingTop: 12}}>Tap to take a picture!</Text>
        </View>
        <Camera
          captureTarget={Camera.constants.CaptureTarget.memory}
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableHighlight onPress={this.takePicture.bind(this)}
            underlayColor='rgba(0,0,0,0.1)'
            style={{backgroundColor: 'rgba(0,0,0,0.0)', bottom: 50, position: 'relative'}}
          >
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Icon
                name={'circle-outline'}
                type='material-community'
                color={'#6c6cb2'}
                size={50}
                underlayColor="transparent"
              />
            </View>
          </TouchableHighlight>
        </Camera>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c6cb2',
  },
  icon: {
    width: 26,
    height: 26,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    width: 60,
    height: 60,
    borderRadius: 5,
    bottom: 0,
    margin: 20,
  },
  rectangle: {
    position: 'absolute',
    width: viewWidth,
    height: viewHeight,
    left: (width - viewWidth) / 2,
    top: (height - viewHeight) * 0.4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  spinner: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
