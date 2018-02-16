import React, {Component} from 'react';
import {View, TouchableOpacity, Text,StyleSheet} from 'react-native';
export default class Employee extends React.Component{
    constructor(props)
    {
       super(props);
    }
    render(){
       return (
       <View style={styles.employeeContainer}>
           <View style={{marginLeft:20,marginRight:40}}>
               <Text >{this.props.employee.id}</Text>
           </View>
 
           <Text>{this.props.employee.name}</Text>
 
           <TouchableOpacity style={styles.touchableOpacity} onPress={()=> this.props.onDelete()}>
               <Text> X </Text>
           </TouchableOpacity>
 
           <TouchableOpacity style={styles.touchableOpacity} onPress={()=> this.props.onEmployeeInfo()}>
              <Text> More </Text>
          </TouchableOpacity>
       </View>
       );
    }
 }
 const styles = StyleSheet.create({
    employeeContainer:{
        marginTop:10,
        marginBottom:10,
        flexDirection:'row',
    },
  
  });