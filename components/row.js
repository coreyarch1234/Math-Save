import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

//Detail View
import DetailView from './detail-view';



export default class Row extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        // this.move = this.props.navigation;
        // this.move = this.props.navigation;
        // console.log('the navigation is row: ');
        // console.log(this.move.navigate);
        // console.log(this.props.nav);

    }
    // onPress={() =>  this.move.navigate('DetailScreen' , {title: this.props.title, topic: this.props.topic, renderedLatex: this.props.latex})}

    _pressRow() {
        console.log('list item pressed')
        console.log(this.props);
    }
    render() {
        return (
            <View style={styles.containerRow}>
                   <View style={styles.containerColumn}>
                       <View>
                           <Text style={styles.text}>
                             {`${this.props.title}`}
                           </Text>
                       </View>
                   </View>
                   <View style={styles.containerColumn}>
                       <View>
                           <Text style={styles.text}>
                             {`${this.props.topic}`}
                           </Text>
                       </View>
                   </View>
               </View>    
        )
    }
}



// <TouchableHighlight onPress={() => this._pressRow()}>
//
//     <View style={styles.containerRow}>
//         <View style={styles.containerColumn}>
//             <View>
//                 <Text style={styles.text}>
//                   {`${this.props.title}`}
//                 </Text>
//             </View>
//         </View>
//         <View style={styles.containerColumn}>
//             <View>
//                 <Text style={styles.text}>
//                   {`${this.props.topic}`}
//                 </Text>
//             </View>
//         </View>
//     </View>
//
// </TouchableHighlight>
//

const styles = StyleSheet.create({
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
