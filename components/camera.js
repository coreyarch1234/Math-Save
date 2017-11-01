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
  PixelRatio
} from 'react-native';

import Camera from 'react-native-camera';

import ImageResizer from 'react-native-image-resizer';

import RNFS from 'react-native-fs';

import { TabNavigator, StackNavigator } from 'react-navigation';

import { Icon } from 'react-native-elements';

//variables/constants
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const viewWidth = Math.round(width * 0.7);
const viewHeight = Math.round(viewWidth * 0.5);

const viewX = Math.round((width - viewWidth) / 2);
const viewY = Math.round((height - viewHeight) / 2);


//camera screen
export default class CameraScreen extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            currentLatex: null
        }
        this.move = this.props.navigation;
        console.log('the navigate object is: ');
        console.log(this.move.navigate);
    }

    static navigationOptions = {
        title: 'Camera',
        tabBarLabel: 'Camera',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../images/camera.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
    };

    takePicture() {

        this.camera.capture().then((data) => {

            var base64Data = data.data;
            var base64String = `data:image/jpeg;base64,${base64Data}`
            return ImageResizer.createResizedImage(base64String, 800, 200, 'JPEG', 100)

        }).then((response) => {

            return  RNFS.readFile(response.uri.substring(7), "base64")

        }).then((res) => {

            fetch('https://api.mathpix.com/v3/latex', {
                 method: 'POST',
                 headers: {
                   'app_id': 'corey_harrilal_students_makeschool_com',
                   'app_key': 'ddd5a182cfbd8d0a170c',
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                 },
                 formats: {
                     'mathml': true
                 },
                 body: JSON.stringify({
                   'url':`data:text/plain;base64,${res}`
                 })

             }).then(response => response.json())

             .then((responseJson) => {
                 console.log("THE RESPONSE JSON IS: ");
                 console.log(responseJson);
                 console.log("THE LATEX IS: ");
                 console.log(responseJson.latex);
                 var latex = responseJson.latex;

                 //change current latex
                 this.setState({currentLatex: latex}, function(){
                     console.log("the current state is now: " + this.state.currentLatex);
                     //navigate to problem  info fields
                     console.log('test to see if you can print navigate here: ');
                     console.log(this.move);
                     this.move.navigate('Problem');

                 });
                 return responseJson;
             }).catch(err => console.error(err));

        }).catch(err => console.error(err));
    }

    render() {
        return (
          <View style={styles.container}>

            <Camera
               captureTarget={Camera.constants.CaptureTarget.memory}
               ref={(cam) => {
                 this.camera = cam;
               }}
               style={styles.preview}
               aspect={Camera.constants.Aspect.fill}>
               <TouchableHighlight onPress={this.takePicture.bind(this)} >
                  <Image
                      source={require('../images/circle.png')}
                      style={[styles.capture]}
                  />
              </TouchableHighlight>
           </Camera>
           <View style={styles.rectangle} />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e67e22',
    },
    containerHome: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
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
        bottom: 40,
        margin: 40,
    },
    rectangle: {
        position: "absolute",
        width: viewWidth,
        height: viewHeight,
        left: (width - viewWidth) / 2,
        top: (height - viewHeight) * 0.4,
        borderWidth: 2,
        borderColor: "#fff",
    }
});