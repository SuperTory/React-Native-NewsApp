/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Home from './components/HomeView'
import Discover from './components/DiscoverView'
import Message from './components/MessageView'
import Mine from './components/MineView'

export default TabNavigator(
  {
    Home:{screen:Home},
    Discover:{screen:Discover},
    Message:{screen:Message},
    Mine:{screen:Mine}
  },
  {
    tabBarPosition: 'bottom',             //设置标签栏位置
    animationEnabled: true,               //开启标签页切换动画
    swipeEnabled: true,                   //允许标签页之间滑动切换
    initialRouteName:'Home',              //初始路由
    tabBarOptions: {                       //标签栏的设置
      style: {                               //整体标签栏样式设置
        height:60,
        backgroundColor: '#91d6ff',
      },
      showIcon:true,
	  activeTintColor:'orange',
    }
  }
)

