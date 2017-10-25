import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeModules
} from 'react-native';

import Camera from 'react-native-camera';

const { width, height } = Dimensions.get('window'); // {width:1000, height: 800, ...}
const viewWidth = Math.round(width * 0.8);
const viewHeight = Math.round(viewWidth * 0.6);
const viewX = (width - viewWidth) / 2;
const viewY = (height - viewHeight) / 2;
console.log("whole window width is: " + width);
console.log("whole window height is: " + height);
console.log("viewX is: " + viewX);
console.log("viewY is: " + viewY);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    takePicture() {
       this.camera.capture()
         .then((data) => {
             console.log("DATA START");
             console.log(data);
             console.log("DATA END");
             var path = data.path;
             console.log("PATH START AND IF IT IS UNDEFINED THEN LET ME KNOW");
             console.log(typeof path);
             console.log("PATH END");
             console.log("TESTING NEW!!!!");
             NativeModules.ReadImageData.readImage(path, (image) => {
                 console.log("THE IMAGE DATA IS: ");
                 console.log(image);
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
                        'url':'data:text/plain;base64,' + image ,
                        'region': {
                            'top_left_x': viewX,
                            'top_left_y': viewY,
                            'width': viewWidth,
                            'height': viewHeight
                        }
                      })
                    })
                  .then((response) => response.json())
                  .then((responseJson) => {
                      console.log("THE RESPONSE JSON IS: ");
                      console.log(responseJson)
                      return responseJson;
                  })
                  .catch(err => console.error(err))
             })

         })
         .catch(err => console.error(err));
     }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Camera
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
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
