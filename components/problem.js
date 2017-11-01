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

//Problem info
import ProblemInfo from './problem-info';

//next to do is the same for difficulty and category. And in return setstate function, make heroku api call
export default class Problem extends Component {
    static navigationOptions = {
        title: 'Problem'
    }

    constructor(props){
        super(props);
        this.state = {
            title: null
        }
    }

    render() {
        console.log(this.state.title);
        return (
            <View style={styles.containerHome}>
                <ProblemInfo
                    onSubmit = {(title) => {
                        this.setState({title: title}, function() {
                            //make api call to save to mongo
                            console.log('successfuly received title to be saved: ');
                            console.log(this.state.title);
                        })
                    }}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
