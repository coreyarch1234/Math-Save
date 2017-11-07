import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  WebView
} from 'react-native';

import HTML from 'react-native-render-html';
import layoutHTML from '../helpers/latex';

//next to do is the same for difficulty and topic. And in return setstate function, make heroku api call
export default class ProblemView extends Component {
    static navigationOptions = {
        title: 'Review'
    }

    constructor(props){
        super(props);
        this.state = {
            title: null,
            topic: null
        }
        this.renderedLatex = this.props.navigation.state.params.renderedLatex; //contains the latex
        this.title = this.props.navigation.state.params.title;
        this.topic = this.props.navigation.state.params.topic;
        console.log('THE TITLE IS: ');
        console.log(this.title);
        console.log('THE TOPIC IS: ');
        console.log(this.topic);
    }

    render() {
        return (
            <WebView
              source={{html: layoutHTML(this.title, this.topic, this.renderedLatex)}}
           />
        )
    }
}


// <KeyboardAvoidingView
//  behavior="padding"
//  style={styles.containerHome}>
//      <ScrollView style={{ flex: 1 }}>
//         <Text>This HTML</Text>
//         <HTML html={htmlContent}/>
//      </ScrollView>
// </KeyboardAvoidingView>
const styles = StyleSheet.create({
    containerHome: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});


/*
<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>c</mi><mo>=</mo><mo>±</mo><msqrt><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup></mrow></msqrt></mrow><annotation encoding="application/x-tex">c = \\pm\\sqrt{a^2 + b^2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.913389em;"></span><span class="strut bottom" style="height:1.04em;vertical-align:-0.12661100000000003em;"></span><span class="base"><span class="mord mathit">c</span><span class="mrel">=</span><span class="mord">±</span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist svg-align" style="height:0.913389em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathit">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.740108em;"><span style="top:-2.9890000000000003em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathrm mtight">2</span></span></span></span></span></span></span></span><span class="mbin">+</span><span class="mord"><span class="mord mathit">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.740108em;"><span style="top:-2.9890000000000003em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathrm mtight">2</span></span></span></span></span></span></span></span></span></span><span style="top:-2.873389em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1em;"><svg width=\'400em\' height=\'1em\' viewBox=\'0 0 400000 1000\' preserveAspectRatio=\'xMinYMin slice\'><path d=\'M95 622c-2.667 0-7.167-2.667-13.5\n-8S72 604 72 600c0-2 .333-3.333 1-4 1.333-2.667 23.833-20.667 67.5-54s\n65.833-50.333 66.5-51c1.333-1.333 3-2 5-2 4.667 0 8.667 3.333 12 10l173\n378c.667 0 35.333-71 104-213s137.5-285 206.5-429S812 17.333 812 14c5.333\n-9.333 12-14 20-14h399166v40H845.272L620 507 385 993c-2.667 4.667-9 7-19\n7-6 0-10-1-12-3L160 575l-65 47zM834 0h399166v40H845z\'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.12661100000000003em;"></span></span></span></span></span></span></span>

*/
