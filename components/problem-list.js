import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  ListView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Row from './row';
//list view that gets data from server heroku problems
//passses this data as props to render row

export default class ProblemListScreen extends Component {
    static navigationOptions = {
        title: 'Library',
        headerLeft: null
    };

    constructor(props){
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: this.ds.cloneWithRows([{name: '', title: ''}, {name: '', title: ''}])
        };


        this.move = this.props.navigation;
        console.log('the navigation is problem list: ');
        console.log(this.move.navigate);

    }


    componentWillMount(){

        //JUST CALL LOCAL STORAGE
        console.log('COMPONENT MOUNTED AGAIN!!!!!!!!');
        AsyncStorage.getItem('problemArray').then((value) => {
            let valueOfArray = (value === null ? null : JSON.parse(value));
            console.log(`THE VALUE OF THE LOCAL STORAGE PROBLEM ARRAY IS: ${valueOfArray}`);
            if (valueOfArray === null){
                console.log('VALUE OF ARRAY IS NULL');
            }else{
                console.log(`the first problem is: ${valueOfArray[0]}`);
                this.setState({dataSource: this.ds.cloneWithRows(valueOfArray)});
            }
        })
    }

    _pressRow(row, title, topic, renderedLatex) {
      console.log('This row was tapped: => ', row);
      this.move.navigate('DetailScreen', { title, topic, renderedLatex });
    }

    _renderRow(rowData, section, row) {
      const title = rowData.title;
      const topic = rowData.topic;
      const renderedLatex = rowData.renderedLatex;
      return (
          <TouchableHighlight onPress={() => this._pressRow(row, title, topic, renderedLatex)}>
              <View style={styles.containerRow}>
                  <View style={styles.containerColumn}>
                      <View>
                          <Text style={styles.text}>
                              {title}
                          </Text>
                      </View>
                  </View>
                  <View style={styles.containerColumn}>
                      <View>
                          <Text style={styles.text}>
                              {topic}
                          </Text>
                      </View>
                  </View>
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
        marginTop: 20,
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

});
