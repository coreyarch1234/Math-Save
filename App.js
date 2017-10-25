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
console.log("whole window width is: " + width);
console.log("whole window height is: " + height);
console.log("viewX is: " + viewX);
console.log("viewY is: " + viewY);
console.log("viewWidth is: " + viewWidth);
console.log("viewHeight is: " + viewHeight);
console.log("Pixel: " + PixelRatio.get())

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// fetch('https://api.mathpix.com/v3/latex', {
//      method: 'POST',
//      headers: {
//        'app_id': 'corey_harrilal_students_makeschool_com',
//        'app_key': 'ddd5a182cfbd8d0a170c',
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'
//      },
//      formats: {
//          'mathml': true
//      },
//      body: JSON.stringify({
//        'url':`data:text/plain,${base64Data}`
//      })
//    })
//  .then((response) => response.json())
//  .then((responseJson) => {
//      console.log("THE RESPONSE JSON IS: ");
//      console.log(responseJson)
//      return responseJson;
//  })
//  .catch(err => console.error(err))
// /Users/coreyharrilal/Library/Developer/CoreSimulator/Devices/72FF6D98-730D-459C-83FC-AB34BD1A72B4/data/Containers/Data/Application/0E7CD174-C2E2-429C-B578-55C1B1B0B810/Documents/70D54E9E-A339-4172-915B-8A12CFEFA089.jpg
export default class App extends Component<{}> {
    takePicture() {
       this.camera.capture()
         .then((data) => {
             console.log("DATA START");
             console.log(data.data);
             var base64Data = data.data;
             console.log("DATA END");
             var base64String = `data:image/jpeg;base64,${base64Data}`
             ImageResizer.createResizedImage(base64String, 800, 600, 'JPEG', 100)
             .then((response) => {
                 console.log("the resized image path is: " + response.uri);
                 RNFS.readFile(response.uri.substring(7), "base64")  //substring(7) -> to remove the file://
                .then((res) =>{
                    console.log("the base64 res from native file is: " + res);
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
                       })
                     .then((response) => response.json())
                     .then((responseJson) => {
                         console.log("THE RESPONSE JSON IS: ");
                         console.log(responseJson)
                         return responseJson;
                     })
                })

             })
             .catch((err) => {
                console.log(err);
              // Oops, something went wrong. Check that the filename is correct and
              // inspect err to get more details.
            });
            //  fetch('https://api.mathpix.com/v3/latex', {
            //       method: 'POST',
            //       headers: {
            //         'app_id': 'corey_harrilal_students_makeschool_com',
            //         'app_key': 'ddd5a182cfbd8d0a170c',
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //       },
            //       formats: {
            //           'mathml': true
            //       },
            //       body: JSON.stringify({
            //         'url':`data:text/plain;base64,${base64Data}`
            //       })
            //     })
            //   .then((response) => response.json())
            //   .then((responseJson) => {
            //       console.log("THE RESPONSE JSON IS: ");
            //       console.log(responseJson)
            //       return responseJson;
            //   })
            //   .catch(err => console.error(err))
            //  var path = data.path;
            //  console.log("PATH START AND IF IT IS UNDEFINED THEN LET ME KNOW");
            //  console.log(typeof path);
            //  console.log("PATH END");
            //  console.log("TESTING NEW!!!!");

            //  ImageResizer.createResizedImage(resizePath, 70, 30, 'JPEG', 100)
            //  .then((response) => {
            //      console.log("the resized image path is: " + response.uri);
            //      var formatPath = (response.uri.split('Caches/')[1]).split('.jpg')[0];
            //      var readImagePath = `assets-library://asset/asset.JPG?id=${formatPath}&ext=JPG`;
            //      console.log("the resized image path is split path: " + (response.uri.split('Caches/')[1]).split('.jpg')[0]);
            //      console.log("the resized image size is: " + response.size);
            //      NativeModules.ReadImageData.readImage(readImagePath, (image) => {
            //          console.log("THE IMAGE DATA IS: ");
            //          console.log(image);
            //          fetch('https://api.mathpix.com/v3/latex', {
            //               method: 'POST',
            //               headers: {
            //                 'app_id': 'corey_harrilal_students_makeschool_com',
            //                 'app_key': 'ddd5a182cfbd8d0a170c',
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json'
            //               },
            //               formats: {
            //                   'mathml': true
            //               },
            //               body: JSON.stringify({
            //                 'url':`data:text/plain;base64,${image}`
            //               })
            //             })
            //           .then((response) => response.json())
            //           .then((responseJson) => {
            //               console.log("THE RESPONSE JSON IS: ");
            //               console.log(responseJson)
            //               return responseJson;
            //           })
            //           .catch(err => console.error(err))
            //      })
            //  })
            //  .catch((err) => {
            //     console.log(err);
            //   // Oops, something went wrong. Check that the filename is correct and
            //   // inspect err to get more details.
            // });
            //  ImageResizer.createResizedImage(resizePath, 70, 30, 'JPEG', 100)
            //  .then((response) => {
            //      console.log("the resized image path is: " + response.uri);
            //      var formatPath = (response.uri.split('Caches/')[1]).split('.jpg')[0];
            //      var readImagePath = `assets-library://asset/asset.JPG?id=${formatPath}&ext=JPG`;
            //      console.log("the resized image path is split path: " + (response.uri.split('Caches/')[1]).split('.jpg')[0]);
            //      console.log("the resized image size is: " + response.size);
            //      NativeModules.ReadImageData.readImage(readImagePath, (image) => {
            //          console.log("THE IMAGE DATA IS: ");
            //          console.log(image);
            //          fetch('https://api.mathpix.com/v3/latex', {
            //               method: 'POST',
            //               headers: {
            //                 'app_id': 'corey_harrilal_students_makeschool_com',
            //                 'app_key': 'ddd5a182cfbd8d0a170c',
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json'
            //               },
            //               formats: {
            //                   'mathml': true
            //               },
            //               body: JSON.stringify({
            //                 'url':`data:text/plain;base64,${image}`
            //               })
            //             })
            //           .then((response) => response.json())
            //           .then((responseJson) => {
            //               console.log("THE RESPONSE JSON IS: ");
            //               console.log(responseJson)
            //               return responseJson;
            //           })
            //           .catch(err => console.error(err))
            //      })
            //  })
            //  .catch((err) => {
            //     console.log(err);
            //   // Oops, something went wrong. Check that the filename is correct and
            //   // inspect err to get more details.
            // });
            //  ImageResizer.createResizedImage(path, 70, 30, 'JPEG', 100).then((response) => {
            //      console.log("the resized image path is: " + response.uri);
            //      console.log("the resized image size is: " + response.size);
            //
            //      NativeModules.ReadImageData.readImage(response.uri, (image) => {
            //          console.log("THE IMAGE DATA IS: ");
            //          console.log(image);
            //          fetch('https://api.mathpix.com/v3/latex', {
            //               method: 'POST',
            //               headers: {
            //                 'app_id': 'corey_harrilal_students_makeschool_com',
            //                 'app_key': 'ddd5a182cfbd8d0a170c',
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json'
            //               },
            //               formats: {
            //                   'mathml': true
            //               },
            //               body: JSON.stringify({
            //                 'url':`data:text/plain;base64,${image}`
            //               })
            //             })
            //           .then((response) => response.json())
            //           .then((responseJson) => {
            //               console.log("THE RESPONSE JSON IS: ");
            //               console.log(responseJson)
            //               return responseJson;
            //           })
            //           .catch(err => console.error(err))
            //      })
            //   // response.uri is the URI of the new image that can now be displayed, uploaded...
            //   // response.path is the path of the new image
            //   // response.name is the name of the new image with the extension
            //   // response.size is the size of the new image
            // }).catch((err) => {
            //     console.log(err);
            //   // Oops, something went wrong. Check that the filename is correct and
            //   // inspect err to get more details.
            // });
            //  NativeModules.ReadImageData.readImage(path, (image) => {
            //      console.log("THE IMAGE DATA IS: ");
            //      console.log(image);
            //      fetch('https://api.mathpix.com/v3/latex', {
            //           method: 'POST',
            //           headers: {
            //             'app_id': 'corey_harrilal_students_makeschool_com',
            //             'app_key': 'ddd5a182cfbd8d0a170c',
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //           },
            //           formats: {
            //               'mathml': true
            //           },
            //           body: JSON.stringify({
            //             'url':`data:text/plain;base64,${image}`
            //           })
            //         })
            //       .then((response) => response.json())
            //       .then((responseJson) => {
            //           console.log("THE RESPONSE JSON IS: ");
            //           console.log(responseJson)
            //           return responseJson;
            //       })
            //       .catch(err => console.error(err))
            //  })

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
  // rectangle: {
  //   position: "absolute",
  //   width: viewWidth,
  //   height: viewHeight,
  //   left: (width - viewWidth) / 2,
  //   top: (height - viewHeight) / 2,
  //   borderWidth: 2,
  //   borderColor: "#f00",
  // }
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

//'region': {'top_left_x': 3, 'top_left_y': 22, 'width': 70, 'height': 18}, captureTarget={Camera.constants.CaptureTarget.disk}
