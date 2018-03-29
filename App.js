import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Image
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
//Camera screen
import CameraScreen from './components/camera';
// List of Problems
import ProblemListScreen from './components/problem-list';
// Submission of Subject and Topic
import Problem from './components/problem';
//After save button, latex view
import ProblemView from './components/problem-view';
// After tapping on problem cell
import DetailView from './components/detail-view';

import HomeScreen from './components/home';

const CameraStack = StackNavigator({
  Camera: {screen: CameraScreen},
  Problem: {screen: Problem},
  ProblemView: {screen: ProblemView}
});

const HomeStack = StackNavigator({
  Home: {screen: HomeScreen},
  ProblemList: {screen: ProblemListScreen},
  DetailScreen: {screen: DetailView},
},{
  headerMode: 'screen'
});

// Tab navigator to nest camera and home stack
const MathTabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'LIBRARY',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('./images/library.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      )
    }

  },
  Camera: {
    screen: CameraStack,
    navigationOptions: {
      tabBarLabel:'CAMERA',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('./images/camera.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      )
    }
  },
},
{
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#f05364',
    inactiveTintColor: '#bbb',
    inactiveBackgroundColor: '#fefefe',
    activeBackgroundColor: '#fefefe',
    labelStyle: {
      fontSize: 9,
      fontFamily: 'Montserrat-SemiBold'
    },
  },
});


const styles = {
  icon: {
    width: 24,
    height: 24,
  }
};

export default class App extends React.Component {
  render() {
    return <MathTabs />;
  }
}
