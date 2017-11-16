import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';


export default class Home extends Component {
    static navigationOptions = {
        title: 'MathPath'
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
                <Button
                  style={styles.button}
                  onPress={() =>  this.move.navigate('ProblemList')}
                  title="See all problems"
                />
            </View>
        )
    }
}


// <Button
//   style={styles.button}
//   onPress={() =>  console.log('This will generate a random problem')}
//   title="Random Problem"
// />

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    containerHome: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 36,
        width: 100,
        bottom: 350,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'

  }

});
