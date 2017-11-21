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
        header: null


    };

    constructor(props){
        super(props);
        this.move = this.props.navigation;
        console.log('the navigation is home: ');
        console.log(this.move.navigate);

    }

    render() {
        return(
            <View>
                <View style={styles.container} >
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
    container: {
        position: 'absolute',
        marginTop: 504,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
    },
    containerHome: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
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
          marginBottom: 30
      }

});
