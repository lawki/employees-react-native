import React, {Component} from 'react';
import {View, TouchableOpacity, Text,StyleSheet,TextInput,Button} from 'react-native';
export default class AddEmployee extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            motto:'' 
        };
    }
    addNewEmployee(employee){
        return fetch('http://192.168.0.13:3000/api/add_employee', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({employee:employee}),
        })
        .then((message)=>message.json())
        .then((messageJSON)=>{
            if(messageJSON.message=="success"){
                alert('Done');
            }
            else{
                alert('Failed! Error at server'+JSON.stringify(messageJSON));
            }
        })
        .catch((err)=> alert("Error on network: "+err));
    }
    render(){
        return (
        <View>
            <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1,marginLeft:"5%",marginRight:"5%",marginTop:"10%"}}
            onChangeText={(name) => {
                prevValues = this.state;
                this.setState({
                    name:name,
                    motto:prevValues.motto
                });
            }}
            value={this.state.text} 
            placeholder="Employee's Name"
            placeholderTextColor="#000"
            autoCapitalize="words"        //autoFocus= true
            //autoCorrect=true
            >
            </TextInput>

            <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1,marginLeft:"5%",marginRight:"5%",marginTop:"10%"}}
            onChangeText={(motto) => {
                prevValues = this.state;
                this.setState({
                    name:prevValues.name,
                    motto:motto,
                });
            }}
            value={this.state.motto} 
            placeholder="Motto"
            placeholderTextColor="#000"
            autoCapitalize="words"        //autoFocus= true
            //autoCorrect=true
            >
            </TextInput>
            <Button title="Submit" onPress={()=> {this.addNewEmployee(this.state)}}/>
        </View>
        );
    }
}