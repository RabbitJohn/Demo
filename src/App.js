/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator,TabNavigator} from 'react-navigation'
import {
  View,Text,Button,Image,StyleSheet
} from 'react-native';

import Home from './home';
import LoginView from './Login';
import ProfileView from './ProfileView'

const App = TabNavigator({
  Home:StackNavigator({
    Home:{
      screen:Home,

      navigationOptions:({
        title:'首页',
        headerBackTitle:'首页',
        headerRight:(<Button title='抽奖'></Button>),
        headerStyle:{backgroundColor:'#aabb11'},
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../Resources/homepage.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        ),  
        }),

        path:'/home',
      },
    },
),
  Profile:StackNavigator({
    Profile:{
      
      screen:ProfileView,

      navigationOptions:({
        title:'我的',
              // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../Resources/mine.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
      }),
    },
    Login:{
      screen:LoginView,
      navigationOptions:({
        gesturesEnabled:false,
        title:'登录',
      }),
     },
  }),
});
export default App;

const styles = StyleSheet.create({
  icon:{
    width:22,
    height:22,
  }
});
