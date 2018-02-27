import React,{Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
    StyleSheet, Text, ScrollView, View,Alert,
    TouchableOpacity,
    } from 'react-native';

import Employee from './Employee';
import Blink from './Blink';

class DetailRow extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return (
            <View style={styles.rowContainer}>
                <View style={{width:"40%"}}>
                    <Text style={{textAlign:"left"}}>{this.props.propertyName} </Text>
                 </View> 
                 <Text>:</Text>
                 <View style={{width:"40%"}}>
                   <Text style={{textAlign:'right'}}> {this.props.propertyValue}</Text>
                 </View>  
            </View>
        );
    }
}

export default class EmployeeDetail extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.name : 'Employee Detail',
        }
      };
    
    constructor(props){
        super(props);
        this.state = {
            employee:null,
        }
    }

    render(){
        if(!this.state.employee)
        {
            return (<Blink text="Loading the employee..."/>)
        }
        return (
                <View style={{flex:1,flexDirection:"column"}}>
                    <DetailRow propertyName="Employee ID" propertyValue={this.state.employee?this.state.employee.id:0}/>
                    <DetailRow propertyName="Name" propertyValue={this.state.employee?this.state.employee.name:0}/>
                    <DetailRow propertyName="Motto" propertyValue={this.state.employee?this.state.employee.motto:0}/>
                </View>
        );
    }
    componentDidMount(){
        fetch("http://192.168.0.13:3000/api/employee/"+this.props.navigation.state.params.id)
        .then((employee)=> employee.json())
        .then((employeeJSON)=>{this.setState({employee:employeeJSON})})
        .catch((error)=> alert(error));
    }
}

const styles = StyleSheet.create({
    rowContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:20,
        marginLeft:20,
        marginRight:20,
    }
});