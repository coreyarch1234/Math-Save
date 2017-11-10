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
  ListView
} from 'react-native';

import Row from './row';
//list view that gets data from server heroku problems
//passses this data as props to render row

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: <Text style={{fontSize: 20, fontFamily: 'Avenir-Black', fontWeight: '400'}}>MathPath</Text>,
        tabBarLabel: 'Problems',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../images/home.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
    };

    constructor(props){
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: this.ds.cloneWithRows([{name: 'corey', title: 'the kid'}, {name: 'corina', title: 'the goat'}])
        };

    }


    componentWillMount(){
        //call server for array of problem posts. set datasource state.
        fetch('https://ancient-atoll-47438.herokuapp.com/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(response => response.json())
        .then((responseJson) => {
            console.log('THE RESPONSE WITH ALL THE POSTS: ');
            console.log(responseJson);
            this.setState({dataSource: this.ds.cloneWithRows(responseJson)});
        }).catch(err => console.error(err));
    }

    render() {
        return(
            <ListView
               style={styles.container}
               dataSource={this.state.dataSource}
               renderRow={(data) => <Row {...data} />}
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
        )
    }
}

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
    icon: {
        width: 26,
        height: 26,
    },
    logo: {
        width: 52,
        height: 52,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },

});
