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
        title: <Image
            source={require('../images/document.png')}
            style={{width: 25, height: 25}}
        />
    }

    constructor(props){
        super(props);
        this.state = {
            title: null,
            category: null
        }
    }

    render() {
        console.log(this.state.title);
        return (
            <View style={styles.containerHome}>
                <ProblemInfo
                    onSubmit = {(title, category) => {
                        this.setState({title: title, category: category}, function() {
                            //make api call to save to mongo
                            console.log('successfuly received title to be saved: ');
                            console.log(this.state.title);
                            console.log('successfuly received category to be saved: ');
                            console.log(this.state.category);
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
