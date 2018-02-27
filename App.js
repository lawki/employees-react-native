import React from 'react';
import {StackNavigator} from 'react-navigation';
import {
 StyleSheet, Text, ScrollView, View,Alert,
 TouchableOpacity,
 Button,
 Image,
 } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons'
//import Icon from 'react-native-vector-icons/Ionicons';
 
 import EmployeeDetail from './screens/EmployeeDetail';
 import AddEmployee from './screens/AddEmployee';
// import addButton from './icons/add_icon.jpg';
 import Employee from './screens/Employee';
 import Blink from './screens/Blink';

class Home extends React.Component{

  constructor(props)
   {
      super(props);
      this.state={
          employees:null,
      };
   }
  static navigationOptions =({navigation})=> {
    params = navigation.state.params||{};
    return (
      {
        title:"Home",
        headerRight: (
        <TouchableOpacity onPress={params.goToAddEmployee}
        style={{width:"30%"}}>
        <Text style={{flexDirection:"row"}}>+      </Text>
      </TouchableOpacity>
        )
    }
  );
  }

  componentWillMount() {
    this.props.navigation.setParams({ goToAddEmployee: this._goToAddEmployee });
  }

  _goToAddEmployee(){
    if(this.props && this.props.navigation && this.props.navigation.navigate)
        this.props.navigation.navigate('AddEmployee');
    else
        alert("False props at add employee");
  }

  deleteEmployee(id){
       // alert('Deleting employee '+id);
       let employees = this.state.employees ;
       let newEmployees =[];
       employees.map((employee)=>{
         if(employee.id!=id)
            newEmployees.push(employee);
       })
       this.setState({employees:newEmployees});
   }
   renderEmployees()
   {
     if(!this.state.employees){
       return (<Blink text="Loading the employees..."/>);
     }
      return this.state.employees.map((employee)=>
      {
         return (
                  <View style={{}}>
                        <Employee employee={employee} 
                                onDelete={()=>this.deleteEmployee(employee.id)} 
                                onEmployeeInfo={()=> {
                                    if(this.props.navigation && this.props.navigation.navigate){
                                      this.props.navigation.navigate('EmployeeDetail',{name:employee.name,id:employee.id});
                                    }
                                    else{
                                      alert('invalid property');
                                    }
                                    }
                                    }
                                    />  
                  </View>
                  );
      });
      
    }
   render(){
      return (
           <ScrollView>
            {this.renderEmployees()}
            <View style={styles.button}>
              <Button 
                   
                  title="Add Employee" 
                  onPress={()=> this.props.navigation.navigate('AddEmployee')}
              />
            </View>
           </ScrollView>
           );
   }
   componentDidMount(){
     return fetch("http://192.168.0.13:3000/api/employees")
     .then((employees)=> employees.json())  // 
     .then((employeesJSON)=>{this.setState({employees:employeesJSON})})    //alert(JSON.stringify(employeesJSON))
     .catch((err)=> alert(err));
   }
}

export default StackNavigator({
  Home:{
    screen:Home,
  },
  EmployeeDetail:{
    screen:EmployeeDetail
  },
  Employee:{
    screen:Employee,
  },
  AddEmployee:{
    screen:AddEmployee,
  }
},{
  initialRouteName:'Home',
  navigationOptions:{
    headerStyle:{
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25,
    marginBottom:25,
  },
  image:{
    marginTop:10,
    marginBottom:10,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    height:'auto',
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
    marginRight:10,
    backgroundColor: '#2196F3',
  },
  sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
  item: {
      padding: 10,
      fontSize: 18,
      height: 44,
  },
});

