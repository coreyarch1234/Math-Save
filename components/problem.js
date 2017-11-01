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
  PixelRatio,
  KeyboardAvoidingView
} from 'react-native';

//Problem info
import ProblemInfo from './problem-info';

//next to do is the same for difficulty and category. And in return setstate function, make heroku api call
export default class Problem extends Component {
    static navigationOptions = {
        title: <Text style={{fontSize: 20, fontFamily: 'Avenir-Black', fontWeight: '400'}}>Add Detail</Text>
    }

    constructor(props){
        super(props);
        this.state = {
            title: null,
            category: null
        }
        this.latex = this.props.navigation.state.params.latex; //contains the latex
        console.log('LATEX SAVED AND PASSED IN PROPS FROM CAMERA: ');
        // console.log(this.latex);
        console.log(this.props.navigation);
        console.log(this.props.navigation.state);
        console.log(this.props.navigation.state.params);
        console.log(this.props.navigation.state.params.latex);
    }

    render() {
        console.log(this.state.title);
        return (
            <KeyboardAvoidingView
             behavior="padding"
             style={styles.containerHome}>
                <View style={{width: '100%'}}>
                    <ProblemInfo
                        onSubmit = {(title, category) => {
                            this.setState({title: title, category: category}, function() {
                                //make api call to save to mongo
                                console.log('successfuly received title to be saved: ');
                                console.log(this.state.title);
                                console.log('successfuly received category to be saved: ');
                                console.log(this.state.category);
                                console.log('successfuly received latex to be saved: ');
                                console.log(this.latex);
                            })
                        }}

                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
