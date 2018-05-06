import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

function renderIcon(tab,component){
  let iconSrc='';
  if (tab.focused){                       //标签激活状态下icon的路径
    iconSrc=component+'_highlighted';
  }else{                                  //未激活状态下的icon
    iconSrc='tabbar_'+component;
  }
  return <Image source={{uri:'asset:/TabBar/'+iconSrc+'.png'}} style={{width:30,height:30}} />
}

export default class Message extends Component {
  static navigationOptions=((props)=>{
    return {
      title:'消息',
      tabBarIcon:(tab)=>renderIcon(tab,'message')
    }
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>消息</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
