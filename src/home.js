/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {StackNavigator,NavigationNavigatorProps} from 'react-navigation';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';


const ds = new ListView.DataSource({
  //返回一个row改变的条件
  rowHasChanged:(r1,r2)=> r1 !== r2
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const circleSize = 8;
const circleMargin = 5;

// type Props = {};
export default class Home extends Component {
  
  static navigationOptions=({navigation,screenOptions})=>
    ({
      title:'首页',
      headerBackTitle:'首页',
      headerRight:(<Button title='抽奖了' onPress={()=>{
        Alert.alert("正在抽奖");
      }}></Button>),
      headerStyle:{backgroundColor:'#aabb11'},
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      // tabBarIcon: ({ tintColor }) => (
      //   <Image
      //     source={require('../Resources/homepage.png')}
      //     style={[styles.icon, { tintColor: tintColor }]}
      //   />
      // ),
    });
  
  constructor(props){
    super(props);
    this.state = {
        currentPage:0,
        dataSource:ds.cloneWithRows([
          { image:require('../Resources/cars/car1.jpg'),
           title:'商品1',
           subTitle:'描述1'
         },{
           image:require('../Resources/cars/car2.jpg'),
           title:'商品2',
           subTitle:'描述2'
         },{
           image:require('../Resources/cars/car3.jpg'),
           title:'商品3',
           subTitle:'描述3'
      }]),

      searchText:'',
      advertisements:[
        {
          image:{uri:'https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg'},
          identify:'1',
          backgroundColor:'gray'
        },
        {
          image:require('../Resources/advertisement/ad2.jpg'),
          identify:'2',
          backgroundColor:'yellow'
        },
        {
          image:require('../Resources/advertisement/ad3.jpg'),
          identify:'3',
          backgroundColor:'green'
        }
      ],
      isRefreshing:false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={'blue'}
                    barStyle={'default'}
                    networkActivityIndicatorVisible={true}
          >   
          </StatusBar>

          <View style={styles.advertisement}>
            <ScrollView ref="scrollView"
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
            >
            {
              this.state.advertisements.map((advertisement,index)=>{
                return (
                    <TouchableHighlight key={advertisement.identify} onPress={()=>Alert.alert('你单击了轮播图',null,null)}> 
                      <View style={[styles.advertisementContent,{backgroundColor:advertisement.backgroundColor},]}>
                      <Image style={styles.advertisementContent} source={advertisement.image}></Image>
                      <Text  text={advertisement.identify}></Text>
                      </View>
                    </TouchableHighlight>
                  );
                })
            }         
            </ScrollView>
            <View style={ [ styles . indicator, { left : 15 }]}> 
              {this.state.advertisements.map((advertisement, index ) => { 
                return <View key= {index} style={ (index === this.state . currentPage) ? styles.circleSelected : styles.circle}/> 
                })}
            </View>

          </View>

          <View style={styles.searchbar}>
            <TextInput style={styles.input} placeholder='搜索商品' onChangeText={
              (text)=>{
                this.setState({searchText:text});
              }
            }>
            </TextInput>      
            <Button style={styles.button} title='搜索' onPress={()=>{
              Alert.alert('搜索内容'+this.state.searchText,null,null);
            }}>
            </Button>
        </View>

        <View style={styles.products}>
          <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          refreshControl={this._renderRefreshControl()
          }
          />
        </View>
      </View>
    );
  }
  componentDidMount() {
    this._startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  _startTimer(){
    this.interval = setInterval(()=>{
      nextPage = this.state.currentPage+1;
      if(nextPage >= 3){
        nextPage = 0;
      }
      this.setState({currentPage:nextPage});
      const offsetX = nextPage * Dimensions.get('window').width;
      this.refs.scrollView.scrollResponderScrollTo({x:offsetX,y:0,animated:true})
    },2000);
  }  
  _renderRow = (rowData,sectionID,rowID) => {
    const {navigate} = this.props.navigation;
      return(
        <TouchableHighlight onPress={()=>{
          // Alert.alert('你单击了商品列表',null,null)
          navigate('Login')
        }}>
        <View style={styles.row}>
          <Image source={rowData.image} style = {styles.productImage}></Image>
          <View style={styles.productText}>
            <Text style={styles.productTitle}>{rowData.title}</Text>
            <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
          </View>
        </View>
        </TouchableHighlight>
      );
  }

  _renderSeparator(sectionID,rowID,adjacentRowHighlightd){
    return(<View key={`${sectionID}-${rowID}`} style={styles.divider}></View>);
  }

  _renderRefreshControl(){
    return(<RefreshControl refreshing={this.state.isRefreshing}
      tintColor={'#FF0000'}
      title={'正在刷新数据，请稍后...'}
      titleColor={'#0000FF'}
      onRefresh={this._onRefresh}
      />);
  }

  _onRefresh = ()=>{
    this.setState({isRefreshing:true});
    setTimeout(() => {
      this.setState({isRefreshing:false});
    }, 2000);
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  searchbar: {
    marginTop:Platform.OS === 'ios' ? 20:0,
    height:40,
    marginLeft:5,
    flexDirection :'row',
  },
  input:{
    flex:1,
    borderColor:'gray',
    borderWidth:2,
    borderRadius: 10
  },
  button:{
    flex:1,
  },
  advertisement: {
    height:180,
  },
  products: {
    flex:1,
  },
  advertisementContent:{
    width:Dimensions.get('window').width,
    height:180,
  },
  indicator:{
    position: 'absolute',
    top: 160,
    flexDirection: 'row',
  },
  circle:{
    width:circleSize,
    height:circleSize,
    borderRadius: circleSize/2,
    backgroundColor:'gray'
  },
  circleSelected:{
    width:circleSize,
    height:circleSize,
    borderRadius: circleSize/2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin,
  },
  row:{
    height:60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage:{
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    alignSelf : 'center'
  },
  productText:{
      flex:1,
      marginTop:10,
      marginBottom:10
  },
  productTitle:{
      flex:3,
      fontSize:16
  },
  productSubTitle:{
    flex:2,
    fontSize:14,
    color:'gray'
  },
  divider:{
    height:1,
    width:Dimensions.get('window').width-5,
    marginLeft:5,
    backgroundColor:'lightgray'
  },
  icon:{
    width:22,
    height:22
  }
});
