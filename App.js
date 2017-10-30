import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeModules,
  PixelRatio
} from 'react-native';

import Camera from 'react-native-camera';

import ImageResizer from 'react-native-image-resizer';

import RNFS from 'react-native-fs';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const viewWidth = Math.round(width * 0.7);
const viewHeight = Math.round(viewWidth * 0.5);

const viewX = Math.round((width - viewWidth) / 2);
const viewY = Math.round((height - viewHeight) / 2);


export default class App extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            currentLatex: null
        }
    }

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
                 });
                 return responseJson;
             }).catch(err => console.error(err));

        }).catch(err => console.error(err));
    }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              mStar
            </Text>
            <Camera
               captureTarget={Camera.constants.CaptureTarget.memory}
               ref={(cam) => {
                 this.camera = cam;
               }}
               style={styles.preview}
               aspect={Camera.constants.Aspect.fill}>
               <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
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
        backgroundColor: '#F5FCFF',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
    },
    rectangle: {
        position: "absolute",
        width: viewWidth,
        height: viewHeight,
        left: (width - viewWidth) / 2,
        top: (height - viewHeight) / 2,
        borderWidth: 2,
        borderColor: "#f00",
    }
});
