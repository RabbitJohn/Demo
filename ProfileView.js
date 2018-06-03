import React,{Component} from 'react';
import {Button,Text,ScrollView,View,StyleSheet,Image} from 'react-native';

export default class ProfileView extends Component{

    static navigationOptions = (navigation,screenOptions)=>({
        title:'个人中心',
        headerStyle:{backgroundColor:'#aabb11'},
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./Resources/mine.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    });

    constructor(props){
        super(props);
        this.state={
            userName:'Li Lei',
        }
    }

    render(){
        return(<View><ScrollView>
                <Text> this is Profile View </Text>
            </ScrollView>
        </View>);
    }
}



const styles = StyleSheet.create({
    icon:{
      width:22,
      height:22,
    }
  });
  