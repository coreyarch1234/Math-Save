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

//home screen
export default class HomeScreen extends Component {
    static navigationOptions = {
        title: <Image
            source={require('../images/home.png')}
            style={{width: 25, height: 25}}
        />,
        tabBarLabel: 'Problems',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../images/home.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
    };

    render() {
        // const { navigate } = this.props.navigation; //gets passed down from stack navigator
        return(
            <View style={styles.containerHome}>
                <Image
                    source={require('../images/comet.png')}
                    style={styles.logo}
                />

            </View>
        )
    }
}

// <Image
//     source={require('../images/comet.png')}
//     style={styles.logo}
// />

const styles = StyleSheet.create({
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
