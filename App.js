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

//camera
class CameraScreen extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            currentLatex: null
        }
    }

    static navigationOptions = {
        title: 'cometMath', //goes on the tab bar. title is a navigation property
        tabBarLabel: 'Camera',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./images/camera.png')}
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
                      source={require('./images/take-picture.png')}
                      style={[styles.capture]}
                  />
              </TouchableHighlight>
           </Camera>
           <View style={styles.rectangle} />
          </View>
        );
    }
}

//home screen
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'mStar', //goes on the tab bar. title is a navigation property
        tabBarLabel: 'Problems',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./images/home.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
    };

    render() {
        // const { navigate } = this.props.navigation; //gets passed down from stack navigator
        return(
            <View style={styles.containerHome}>
                <Image
                    source={require('./images/comet.png')}
                    style={styles.logo}
                />

            </View>
        )
    }
}
// <Button
//     onPress={() => navigate('Camera')} //when you tap, get sent to booknumber
//     color='#ff5c5c'
//     title="Continue"
// />
const MathTabs = TabNavigator({
    Home: {
        screen: HomeScreen
    },
    Camera: {
        screen: CameraScreen
    },
},
{
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
});


export default class App extends React.Component {
    render() {
        return <MathTabs />;
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
    homeScreenHead: {
        fontSize: 40,
        fontWeight: '700',
        color: 'white',
        marginBottom: 15
    },
    icon: {
        width: 26,
        height: 26,
    },
    logo: {
        width: 52,
        height: 52,
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
        bottom: 50,
        margin: 40,
    },
    rectangle: {
        position: "absolute",
        width: viewWidth,
        height: viewHeight,
        left: (width - viewWidth) / 2,
        top: (height - viewHeight) / 2,
        borderWidth: 2,
        borderColor: "#fff",
    }
});
//
// navigationOptions: {
//     tabBar: {
//         label: 'Camera',
//         icon: ({ tintColor }) => <Icon name='account-circle' size={35} color={tintColor} />
//     }
// },
