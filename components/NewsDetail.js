import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

export default class NewsDetail extends Component{
  constructor(props){
    super(props);
    this.state={
      detailHtml:''
    }
  }
  static navigationOptions=((props)=>{
    return {
      title:props.navigation.state.params.title
    }
  });
  componentDidMount() {
    this.getNewsDetail()
  }

  render(){
    return (
      <WebView
        automaticallyAdjustContentInsets={true}
        source={{html: this.state.detailHtml, baseUrl: ''}}     //网页数据源
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    )
  }

  getNewsDetail(){
    let newsId=this.props.navigation.state.params.id;       //获取新闻id
    let url='http://c.3g.163.com/nc/article/' + newsId + '/full.html';    //拼接新闻详情的url
    fetch(url).then(response=>response.json())
      .then((responseJson)=>{
        let detail=responseJson[newsId];
        let imgArr=detail.img;                      //抽取数据中的图片数组
        let rawHtml=detail.body;                    //抽取数据中的htmlbody内容
        imgArr.forEach((imgItem)=>{                 //遍历图片数组将图片插入到body中
          let imgHtml='<img src="'+imgItem.src+'" width="100%">';
          rawHtml=rawHtml.replace(imgItem.ref,imgHtml);
        });
        this.setState({
          detailHtml:rawHtml                        //将拼接好的网页body保存到state中
        });
      })
      .catch((err)=>{
        console.log(err);
      })
  }
}