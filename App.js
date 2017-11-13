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


const CameraStack = StackNavigator({
    Camera: {screen: CameraScreen},
    Problem: {screen: Problem},
    ProblemView: {screen: ProblemView}
});

const HomeStack = StackNavigator({

    Home: {screen: HomeScreen},
    ProblemList: {screen: ProblemListScreen},


});

//Tab navigator
const MathTabs = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Problems',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/home.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        }

    },
    Camera: {
        screen: CameraStack,
        navigationOptions: {
            tabBarLabel:'Camera',
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
      activeTintColor: '#e91e63',
    },
});


const styles = {
    icon: {
        width: 26,
        height: 26,
    }
}

export default class App extends React.Component {
    render() {
        return <MathTabs />;

    }
}
