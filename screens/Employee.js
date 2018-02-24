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
           <View style={{width:"10%"}}>
               <Text >{this.props.employee.id}</Text>
           </View>
            <View style={{width:"40%"}}>
           <Text>{this.props.employee.name}</Text>
           </View>
 
           <TouchableOpacity style={{width:"20%"}} onPress={()=> this.props.onDelete()}>
               <Text> Delete </Text>
           </TouchableOpacity>
 
           <TouchableOpacity style={{width:"20%"}} onPress={()=> this.props.onEmployeeInfo()}>
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
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        justifyContent:'space-around',
    },
  
  });