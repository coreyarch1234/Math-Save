import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

//list view that gets data from server heroku problems
//passses this data as props to render row

export default class ProblemListScreen extends Component {
    static navigationOptions = {
        title: 'Library',
        headerStyle: { backgroundColor: '#fefefe' },
        headerBackTitleStyle: {color: '#6c6cb2'},
        headerTintColor: '#6c6cb2',
        headerTitleStyle: { color: '#484848', fontFamily: 'Montserrat-SemiBold' }
    };

    constructor(props){
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: this.ds.cloneWithRows([{name: 'corey', title: 'the kid'}, {name: 'corina', title: 'the goat'}])
        };

        this.move = this.props.navigation;
        console.log('the navigation is problem list: ');
        console.log(this.move.navigate);

    }


    componentWillMount(){
        console.log('COMPONENT MOUNTED AGAIN!!!!!!!!');
        //call server for array of problem posts. set datasource state.
        fetch('https://ancient-atoll-47438.herokuapp.com/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(response => response.json())
        .then((responseJson) => {
            console.log('$$$$$ THE JSON IS: $$$$$');
            console.log(responseJson);
            this.setState({dataSource: this.ds.cloneWithRows(responseJson)});
        }).catch(err => console.error(err));
    }

    _pressRow(row, title, topic, renderedLatex) {
      console.log('This row was tapped: => ', row);
      this.move.navigate('DetailScreen', { title, topic, renderedLatex });
    }
    _renderRow(rowData, section, row) {
      const title = rowData.title;
      const topic = rowData.topic;
      const renderedLatex = rowData.renderedLatex;
      const COLORS = ['red', 'green', 'blue', 'yellow'];
      return (
          <TouchableHighlight onPress={() => this._pressRow(row, title, topic, renderedLatex)}
          underlayColor='rgba(0,0,0,0.1)'
          style={styles.touchableStyle}>
              <View style={styles.headingContainer}>
                  <Text style={styles.title}>
                      {title}
                  </Text>
                  <Text style={styles.topic}>
                      {topic}
                  </Text>
              </View>
          </TouchableHighlight>
      )
  }

    render() {
        return (
            <ListView
              style={styles.container}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
            />
        )
    }
}


// <ListView
//    style={styles.container}
//    dataSource={this.state.dataSource}
//    renderRow={(data) => <Row {...data}  />}
//    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
// />





// export default class ProblemListScreen extends Component {
//     static navigationOptions = {
//         title: 'MathPath'
//     };
//
//     constructor(props){
//         super(props);
//
//         this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//
//         this.state = {
//             dataSource: this.ds.cloneWithRows([{name: 'corey', title: 'the kid'}, {name: 'corina', title: 'the goat'}]),
//             // dataSource: this.ds.cloneWithRows(['star wars', 'pokemon'])
//         };
//
//         this.move = this.props.navigation;
//         console.log('the navigation is problem list: ');
//         console.log(this.move.navigate);
//
//     }
//
// // onPress={() => this.move.navigate('Home')}
//     componentWillMount(){
//         console.log('COMPONENT MOUNTED AGAIN!!!!!!!!');
//         //call server for array of problem posts. set datasource state.
//         fetch('https://ancient-atoll-47438.herokuapp.com/', {
//           method: 'GET',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           }
//         }).then(response => response.json())
//         .then((responseJson) => {
//             this.setState({dataSource: this.ds.cloneWithRows(responseJson)});
//         }).catch(err => console.error(err));
//     }
//
//     renderRow(dataRow){
//         return (
//             <TouchableHighlight onPress={() =>  this.move.navigate('DetailScreen', {title: dataRow.title, topic: dataRow.topic, renderedLatex: dataRow.latex})}>
//
//                 <View style={styles.containerRow}>
//                     <View style={styles.containerColumn}>
//                         <View>
//                             <Text style={styles.text}>
//                                 {dataRow.title}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={styles.containerColumn}>
//                         <View>
//                             <Text style={styles.text}>
//                                 {dataRow.topic}
//                             </Text>
//                         </View>
//                     </View>
//                 </View>
//
//             </TouchableHighlight>
//         )
//     }
//
//
//     render() {
//         console.log('this is the state');
//         console.log(this.move.navigate);
//         return(
//             <ListView
//                style={styles.container}
//                dataSource={this.state.dataSource}
//                renderRow={this.renderRow.bind(this)}
//                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
//             />
//
//         )
//     }
//
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    containerRow: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerColumn: {
      flex: 1,
      padding: 12,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      marginLeft: 12,
      fontSize: 16,
    },
    photo: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
    touchableStyle: {
      backgroundColor: '#fefefe',
      width: '100%',
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: .5,
      marginBottom: .5
    },
    headingContainer: {
      paddingLeft: 30,
      paddingTop: 20,
      paddingBottom: 15,
    },
    title: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: "#484848"
    },
    topic: {
      fontFamily: 'Montserrat-Light',
      fontSize: 15
    }

});
