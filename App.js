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

import { TabNavigator, StackNavigator } from 'react-navigation';

//Camera screen
import CameraScreen from './components/camera';

import HomeScreen from './components/home';

import Problem from './components/problem';

import ProblemView from './components/problem-view';
//Navigators

const CameraStack = StackNavigator({
  Camera: {screen: CameraScreen},
  Problem: {screen: Problem},
  ProblemView: {screen: ProblemView}
});

//Tab navigator
const MathTabs = TabNavigator({
    Home: {
        screen: HomeScreen,

    },
    Camera: {
        screen: CameraStack,

    },
},
{
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
});

// //Stack navigator
// const MathApp = StackNavigator({
//   MathContainer: { screen: MathTabs },
//   Problem: {screen: Problem},
//   ProblemView: {screen: ProblemView}
// });



// const CameraTabScreen = (props) => {
//     return (
//         <View>
//             {CameraStack}
//         </View>
//     )
// }

// return <MathApp />;
//Main app
export default class App extends React.Component {
    render() {
        return <MathTabs />;

    }
}
