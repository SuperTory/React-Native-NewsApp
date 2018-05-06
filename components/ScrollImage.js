import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const DevWidth=require('Dimensions').get('window').width;

export default class ScrollImage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    }
  }

  componentDidMount() {
    this.setTimer();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render(){
    return(
      <View style={styles.banner}>
        <ScrollView ref="scrollView"   horizontal={true}
                    pagingEnabled={true} showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e)=>this.slide(e)}
                    onTouchEnd={()=>this.bannerDetail()}
                    onScrollBeginDrag={()=>{this.stopTimer()}}
                    onScrollEndDrag={()=>{this.setTimer()}}
        >
          {/*渲染轮播图片*/}
          {this.renderBanner()}
        </ScrollView>
        <View style={styles.indicateBar}>
          {/*渲染底部指示标签点*/}
          {this.renderIndicate()}
        </View>
      </View>
    )
  }

  //渲染轮播图片
  renderBanner(){
    return this.props.headerNews.map((item,index)=>
      <View key={index} style={styles.bannerItem}>
        <Image source={{uri:item.imgsrc}} style={styles.itemImage} />
        <Text style={styles.bannerTitle}>{item.title}</Text>
      </View>
    )
  }
  renderIndicate(){
    let jsx=[];
    let index=this.state.pageIndex;
    for (let i=0;i<this.props.headerNews.length;i++){
      // 判断是否为当前页，若为当前页则指示点为蓝色，否则为白色
      if (i===index){
        jsx.push(<Text key={i} style={{fontSize:15,color:'#5cb0ff'}}>●</Text>)
      }else {
        jsx.push(<Text key={i} style={{fontSize:15,color:'#9c9c9c'}}>●</Text>)
      }
    }
    return jsx;
  }
  slide(e){
    let offset=e.nativeEvent.contentOffset.x;           //获取x偏移量
    let index=Math.floor(offset/DevWidth);              //通过偏移量计算出当前页码
    this.setState({
      pageIndex:index
    });
  }
  setTimer(){
    this.timer=setInterval(()=>{
      this.setState((preState)=>{                     //更新pageIndex
        if(preState.pageIndex>=(this.props.headerNews.length-1)){      //如果页码越界则归零
          return {pageIndex:0}
        }else {
          return {pageIndex:preState.pageIndex+1}               //否则页码加一
        }
      });

      // 让图片偏移到页码所对应的页面
      let offset=this.state.pageIndex*DevWidth;
      this.refs.scrollView.scrollTo({x:offset,y:0,animated:true});
    },3000)
  }
  stopTimer(){
    console.log('停止计时');
    clearInterval(this.timer);
  }
  bannerDetail(){
    let item=this.props.headerNews[this.state.pageIndex];
    console.log(this.props.navigation);
    this.props.navigation.navigate('Detail',{id:item.id,title:item.title});
  }
}

const styles = StyleSheet.create({
  banner:{
    width:DevWidth,
    height:DevWidth*0.5
  },
  bannerItem:{
    width:DevWidth,
  },
  itemImage:{
    width:DevWidth,
    height:DevWidth*0.6
  },
  bannerTitle:{
    width:DevWidth,
    height:25,
    lineHeight:25,
    color:'#fff',
    backgroundColor:'rgba(0,0,0,0.5)',
    alignItems:'flex-end',
    position:'absolute',
    bottom:0
  },
  indicateBar:{
    width:DevWidth,
    height:25,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
});