import React, {Component} from 'react';
import {View, TouchableOpacity, Text,StyleSheet,TextInput,Button} from 'react-native';
export default class AddEmployee extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            employee:{
                name: '',
                motto:''
            },
            isAdded:false, 
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
                prevState = this.state;
                this.setState({
                    employee:this.state.employee,
                    isAdded:true,
                });
            }
            else{
                alert('Failed! Error at server'+JSON.stringify(messageJSON));
            }
        })
        .catch((err)=> alert("Error on network: "+err));
    }
    render(){
        if(this.state.isAdded){
            return (
            <View style={styles.container}>
                <Text style={styles.container}>
                    Successfully added the employee.
                </Text>
                <Button style={styles.button} title="Add another"/>
            </View>
            );
        }
        return (
        <View>
            <TextInput
            style={styles.textInput}
            onChangeText={(name) => {
                prevValues = this.state;
                this.setState({
                    employee:{
                        name:name,
                        motto:prevValues.employee.motto
                    },
                    isAdded:false
                });
            }}
            value={this.state.employee.name} 
            placeholder="    Employee's Name"
            placeholderTextColor="#000"
            autoCapitalize="words" 
            >
            </TextInput>

            <TextInput
            style={styles.textInput}
            onChangeText={(motto) => {
                prevValues = this.state;
                this.setState({
                    employee:{
                        name:prevValues.employee.name,
                        motto:motto,
                    },
                    isAdded:false,
                });
            }}
            value={this.state.employee.motto} 
            placeholder="    Motto"
            placeholderTextColor="#000"
            autoCapitalize="sentences"        //autoFocus= true
            //autoCorrect=true
            >
            </TextInput>
            <View style={styles.button}>
                <Button title="Submit" onPress={()=> {this.addNewEmployee(this.state.employee)}}/>
            </View>
        </View>
        );
    }
}

var styles=StyleSheet.create({
    container: {
        flex: 1,
        marginTop:25,
        marginBottom:25,
      },
    textInput:{
         height: 40,
         borderColor: 'gray', 
         borderWidth: 1,
         marginLeft:"5%",
         marginRight:"5%",
         marginTop:"10%"
        },
    button:{
        marginTop:"10%",
        marginLeft:"10%",
        marginRight:"10%",
    }
});