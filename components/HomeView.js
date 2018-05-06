import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation';
import NewsDetail from './NewsDetail';
import ScrollImage from './ScrollImage'


const DevWidth=require('Dimensions').get('window').width;

class HomeList extends Component {
  static defaultProps={
    newsUrl:"http://c.m.163.com/nc/article/headline/T1348647853363/0-25.html?from=toutiao&fn=2&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&size=20&version=8.1&spever=false&net=wifi&lat=5OtqEKiivwW4K%2BGMt6DBdA%3D%3D&lon=jKlRVyYkSNti2wwsjGQHrw%3D%3D&ts=1463384311&sign=TtD7IZllDljVzBs2E4sa9fQyKTKF021w2EUC6qx1gEN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore",
    newsKey:"T1348647853363"
  };

  static navigationOptions={
    title:'网易新闻',
  };

  constructor(props){
    super(props);
    this.state={
      headerNews:[],
      rowNews:[],
      refreshing:false,
      _navigation:{}
    };
  }

  componentDidMount() {
    this.getNewsData();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollImage headerNews={this.state.headerNews} navigation={this.props.navigation}/>
        <FlatList
          ref={ref=>flatList=ref}
          keyExtractor = {(item, index) => index.toString()}
          data={this.state.rowNews}                         //数据源
          renderItem={this.renderItem.bind(this)}          //定义每条数据的渲染方法
          refreshControl={                                  //下拉刷新组件
            <RefreshControl
              refreshing={this.state.refreshing}            //通过state.refreshing控制是否刷新
              onRefresh={this._onRefresh.bind(this)}        //执行刷新函数
            />
          }
        />
      </View>
    );
  }
  getNewsData(){
    fetch(this.props.newsUrl)
      .then((response)=>response.json())              //将返回的数据转化为json格式
      .then((responseJson)=>{                         //接收转化后的json数据，保存到state中
        let rawData=responseJson[this.props.newsKey];
        this.setState({
          headerNews:rawData.slice(0,4),
          rowNews:rawData.slice(4)
        });
      })
      .catch((err)=>{                                 //对异常进行捕获、打印
        console.log(err);
      })
  }

   //渲染单条数据
  renderItem(item){
    return(
      <TouchableOpacity activeOpacity={0.5} onPress={()=>this.showDetail(item.item)}>
        <View style={styles.newsItem}>
          <Image style={styles.newsImg} source={{uri:item.item.imgsrc}} />
          <View style={styles.newsText}>
            <Text style={styles.newsTitle}>{item.item.title}</Text>
            <Text style={styles.newsDigest}>{item.item.digest}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
   //跳转到详情页
  showDetail(item){
    this.props.navigation.navigate('Detail',{id:item.id,title:item.title});
  }
  //下拉刷新数据
  _onRefresh() {
    this.setState({refreshing: true});              //允许刷新
    this.getNewsData();                             //获取数据
    this.setState({refreshing:false});              //停止刷新
  }
}

//底部标签渲染函数
function renderIcon(tab,component){
  let iconSrc='';
  if (tab.focused){                       //标签激活状态下icon的路径
    iconSrc=component+'_highlighted';
  }else{                                  //未激活状态下的icon
    iconSrc='tabbar_'+component;
  }
  return <Image source={{uri:'asset:/TabBar/'+iconSrc+'.png'}} style={{width:30,height:30}} />
}

export default Home=StackNavigator(
  {
    List:{screen:HomeList},
    Detail:{screen:NewsDetail}
  },
  {
    navigationOptions:{
      tabBarLabel:'主页',
      tabBarIcon:(tab)=>renderIcon(tab,'home'),
      headerStyle:{
        backgroundColor: '#91d6ff',
      },
      headerTitleStyle:{
        color: '#ff935c'
      }
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  newsItem:{
    width:DevWidth,
    flexDirection:'row',
    justifyContent:'space-evenly',
	marginBottom:10
  },
  newsText:{
    width:DevWidth*0.6,
    height:80,
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
  },
  newsImg:{
    width:100,
    height:80
  },
  newsTitle:{
    fontSize:16,
    marginBottom:5,
    marginTop:5
  },
  newsDigest:{
    fontSize:12
  }
});

