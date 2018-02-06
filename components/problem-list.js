// Displays listview cells of problems
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

//list view that gets data from server heroku problems
//passses this data as props to render row

export default class ProblemListScreen extends Component {
  static navigationOptions = {
    title: 'Library',
    headerLeft: null,
    headerStyle: { backgroundColor: '#fefefe' },
    headerBackTitleStyle: {color: '#6c6cb2'},
    headerTintColor: '#6c6cb2',
    headerTitleStyle: { color: '#484848', fontFamily: 'Montserrat-SemiBold' }
  };

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{title: 'Tap on Camera 📷', topic: 'Take picture of your first equation!'}, {title: 'We save your posts 📫', topic: 'Come back here to see them!'}])
    };
    this.move = this.props.navigation;
  }


  componentWillMount(){
    //JUST CALL LOCAL STORAGE to display the cells
    AsyncStorage.getItem('problemArray').then((value) => {
      let valueOfArray = (value === null ? null : JSON.parse(value));
      if (valueOfArray === null){
        console.log('VALUE OF ARRAY IS NULL');
      }else{
        this.setState({dataSource: this.ds.cloneWithRows(valueOfArray)});
      }
    });
  }

  // when cell pressed, go to detailscreen with data of that cell passed
  _pressRow(row, title, topic, renderedLatex) {
    if (renderedLatex === undefined) {
      return;
    }else{
      this.move.navigate('DetailScreen', { title, topic, renderedLatex });
    }
  }

  // render each row of the library 
  _renderRow(rowData, section, row) {
    const title = rowData.title;
    const topic = rowData.topic;
    const renderedLatex = rowData.renderedLatex;
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



    );
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        removeClippedSubviews={false}
      />
    );
  }
}


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
    color: '#484848'
  },
  topic: {
    fontFamily: 'Montserrat-Light',
    fontSize: 15
  }
});
