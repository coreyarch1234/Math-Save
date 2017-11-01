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

//Camera screen
import CameraScreen from './components/camera';

import HomeScreen from './components/home';

import Problem from './components/problem';

//Navigators
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

const MathApp = StackNavigator({
  MathContainer: { screen: MathTabs },
  Problem: {screen: Problem}
});


//Main app
export default class App extends React.Component {
    render() {
        return <MathApp />;
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
    logo: {
        width: 52,
        height: 52,
    },

});
