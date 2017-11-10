import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default class Row extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.text}>
                {`${this.props.title} ${this.props.topic}`}
              </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
