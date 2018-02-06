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

import ProblemListScreen from './components/problem-list';

import Problem from './components/problem';

import ProblemView from './components/problem-view';

import HomeScreen from './components/home';

import DetailView from './components/detail-view';


const CameraStack = StackNavigator({
  Camera: {screen: CameraScreen},
  Problem: {screen: Problem},
  ProblemView: {screen: ProblemView}
});

const HomeStack = StackNavigator({

  Home: {screen: HomeScreen},
  ProblemList: {screen: ProblemListScreen},
  DetailScreen: {screen: DetailView},
  // headerMode: {screen: HomeScreen},

},{
  headerMode: 'screen' // 这里必须设置成 screen
});

//Tab navigator
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
