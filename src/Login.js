import React,{Component} from 'react';
import {View,TextInput,Button,StyleSheet} from 'react-native';

export default class LoginView extends Component{
    constructor(props){
        super(props)
        this.state={
            account:'',
            password:''
        }
    }
    static navigationOptions={

    }
    render(){
        const { navigate } = this.props.navigation;
        return(<View>
                <TextInput style={LoginPageStyle.account}  placeholder='please input your mobile' onChangeText={(text)=>{
                    this.state.account = text
                    console.log('account is: '+this.state.account)
                }}></TextInput>
                <TextInput style={LoginPageStyle.password} placeholder='please input your password' onChangeText={(text)=>{
                    this.state.password = text
                    console.log('password is: '+this.state.password)
                }}></TextInput>
                <Button title='登录' onPress={()=>{console.log('on login ...');
                }}></Button>
            </View>);
    }

}

const LoginPageStyle = StyleSheet.create({
    account:{
        alignItems:'center',
        marginLeft:20,
        marginRight:20,
        marginTop:40,
        textAlign:'center',
        height:50,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#0ffaab',
    },
    password:{
        marginLeft:20,
        marginTop:10,
        marginRight:20,
        height:50,
        textAlign:'center',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#0ffaab',
    }

});