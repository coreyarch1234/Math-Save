import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  // Button,
} from 'react-native';

import Button from 'apsl-react-native-button';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBarVisible: false,
        header: null,
        headerBackTitleStyle: {color: '#6c6cb2'},


    };

    constructor(props){
        super(props);
        this.move = this.props.navigation;
        console.log('the navigation is home: ');
        console.log(this.move.navigate);

    }
    // <Image
    //      style={styles.welcomeImage}
    //      source={require('../images/home.png')}
    // />
    render() {
        return(
            <View style={styles.welcomeView}>
              <View style={styles.welcomeImageContainer} >
                <Image
                  style={styles.welcomeImage}
                  source={require('../images/home-cover.jpg')}
                />
              </View>
                <View style={styles.welcomeMessageContainer} >
                    <Text style={styles.title}>Welcome to Tangent!</Text>
                    <Text style={styles.subtitle}>Our app allows you to convert hand-written math equations to digital text.</Text>
                    <Button
                        style={styles.button}
                        textStyle={{fontSize: 18}}
                        onPress={() => this.move.navigate('ProblemList')}>
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

// <Button
//   style={styles.button}
//   onPress={() =>  this.move.navigate('ProblemList')}
//   title="GET STARTED"
// />

// <Button
//   style={styles.button}
//   onPress={() =>  console.log('This will generate a random problem')}
//   title="Random Problem"
// />

const styles = StyleSheet.create({
    welcomeView: {
      flex: 1,
      backgroundColor: 'white'
    },
    welcomeImageContainer: {
        // backgroundColor: 'green',
        marginTop: '5%',
        marginBottom: '5%',
        position: 'absolute',
        padding: '5%',
        width: '100%'
    },
    welcomeImage: {
        width: 333,
        height: 400,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    welcomeMessageContainer: {
        // backgroundColor: 'red',
        position: 'absolute',
        marginTop: '123%',
        padding: '5%',
        width: '100%'
    },



    buttonText: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        letterSpacing: 0.5,
        fontFamily: 'Montserrat-SemiBold'
    },
    button: {
        backgroundColor: '#6c6cb2',
        borderColor: '#6c6cb2',
        height: 35,
        borderRadius: 8,
        paddingLeft: 50,
        paddingRight: 50,
        alignSelf: 'center',
        justifyContent: 'center'
     },
      title: {
          fontFamily: 'Montserrat-Bold',
          fontSize: 25,
          alignSelf: 'center',
          justifyContent: 'center',
          marginBottom: 6
      },
      subtitle: {
          fontFamily: 'Montserrat-Light',
          fontSize: 13,
          alignSelf: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: 20
      }

});
