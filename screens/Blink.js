import React,{Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
 StyleSheet, Text,View
 } from 'react-native';

export default class Blink extends Component {
    constructor(props) {
    super(props);
    this.state = {isShowingText: true};
  
    // Toggle the state every second
    setInterval(() => {
    this.setState(previousState => {
          return { isShowingText: !previousState.isShowingText };
          });
        }, 1000);
    }
  
    render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
      return (
        <View style={{width:"100%",height:"50%"}}>
            <Text style={{marginTop:"25%",marginLeft:"25%"}}>{display}</Text>
        </View>
      );
    }
  }