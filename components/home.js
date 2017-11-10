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

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };

        this.data = {
            name: 'Corey',
            title: 'Engineer'
        }

    }

    render() {
        // const { navigate } = this.props.navigation; //gets passed down from stack navigator
        return(
            <ListView
               style={styles.container}
               dataSource={this.state.dataSource}
               renderRow={(data) => <Row {...this.data} />}
            />
        )
    }
}
// export default class HomeScreen extends Component {
//     static navigationOptions = {
//         title: <Text style={{fontSize: 20, fontFamily: 'Avenir-Black', fontWeight: '400'}}>MathPath</Text>,
//         tabBarLabel: 'Problems',
//         tabBarIcon: ({tintColor}) => (
//             <Image
//                 source={require('../images/home.png')}
//                 style={[styles.icon, {tintColor: tintColor}]}
//             />
//         )
//     };
//
//     render() {
//         // const { navigate } = this.props.navigation; //gets passed down from stack navigator
//         return(
//             <View style={styles.containerHome}>
//                 <Image
//                     source={require('../images/comet.png')}
//                     style={styles.logo}
//                 />
//
//             </View>
//         )
//     }
// }

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

});
