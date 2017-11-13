import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  NativeModules,
  PixelRatio,
  ListView
} from 'react-native';

import Row from './row';
//list view that gets data from server heroku problems
//passses this data as props to render row

import Options from './options';

// import Button from 'apsl-react-native-button';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'MathPath'
    };

    constructor(props){
        super(props);
        this.move = this.props.navigation;

    }

    render() {
        return(
            <View>
                <Button
                  style={styles.button}
                  onPress={() =>  this.move.navigate('Options')}
                  title="See all problems"
                />

                <Button
                  style={styles.button}
                  onPress={() =>  console.log('This will generate a random problem')}
                  title="Random Problem"
                />
            </View>
        )
    }
}


// <Button
//   onPress={onPressLearnMore}
//   title="Learn More"
//   color="#841584"
//   accessibilityLabel="Learn more about this purple button"
// />
//
// <Button
//     style={styles.button}
//     textStyle={{fontSize: 18}}
//     onPress={() =>  this.move.navigate('Options')}>
//     <Text style={styles.buttonText}>See all problems</Text>
// </Button>
// export default class HomeScreen extends Component {
//     static navigationOptions = {
//         title: <Text style={{fontSize: 20, fontFamily: 'Avenir-Black', fontWeight: '400'}}>MathPath</Text>,
//     };
//
//     constructor(props){
//         super(props);
//
//         this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//
//         this.state = {
//             dataSource: this.ds.cloneWithRows([{name: 'corey', title: 'the kid'}, {name: 'corina', title: 'the goat'}])
//         };
//
//     }
//
//
//     componentWillMount(){
//         //call server for array of problem posts. set datasource state.
//         fetch('https://ancient-atoll-47438.herokuapp.com/', {
//           method: 'GET',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           }
//         }).then(response => response.json())
//         .then((responseJson) => {
//             // console.log('THE RESPONSE WITH ALL THE POSTS: ');
//             // console.log(responseJson);
//             this.setState({dataSource: this.ds.cloneWithRows(responseJson)});
//         }).catch(err => console.error(err));
//     }
//
//     render() {
//         console.log('THE STATE FOR UPDATES IS: state: ', this.props.navigation.state);
//         return(
//             <ListView
//                style={styles.container}
//                dataSource={this.state.dataSource}
//                renderRow={(data) => <Row {...data} />}
//                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
//             />
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
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
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

//
// export default () => <HomeScreen
//     ref={(ref) => { this.nav = ref; }}
//     onNavigationStateChange={(prevState, currentState) => {
//          const getCurrentRouteName = (navigationState) => {
//          if (!navigationState) return null;
//          const route = navigationState.routes[navigationState.index];
//          if (route.routes) return getCurrentRouteName(route);
//          return route.routeName;
//     };
//     global.currentRoute = getCurrentRouteName(currentState);
//   }}
// />;
