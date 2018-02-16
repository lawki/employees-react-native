import React,{Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
    StyleSheet, Text, ScrollView, View,Alert,
    TouchableOpacity,
    } from 'react-native';
import Employee from './Employee';

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
        return (
                <View>
                    <Text>    
                    employee is {JSON.stringify(this.state.employee)}
                    </Text>
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