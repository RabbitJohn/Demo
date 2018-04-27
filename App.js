/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
} from 'react-native';

const ds = new ListView.DataSource({
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

type Props = {};
export default class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentPage:0,
        dataSource:ds.cloneWithRows([
          { image:require('./Resources/cars/car1.jpg'),
           title:'商品1',
           subTitle:'描述1'
         },{
           image:require('./Resources/cars/car2.jpg'),
           title:'商品2',
           subTitle:'描述2'
         },{
           image:require('./Resources/cars/car3.jpg'),
           title:'商品3',
           subTitle:'描述3'
         }]),
      searchText:'',
      advertisements:[
        {
          image:require('./Resources/advertisement/ad1.jpg'),
          identify:'1',
          backgroundColor:'gray'
        },
        {
          image:require('./Resources/advertisement/ad2.jpg'),
          identify:'2',
          backgroundColor:'yellow'
        },
        {
          image:require('./Resources/advertisement/ad3.jpg'),
          identify:'3',
          backgroundColor:'green'
        }
      ],
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
        <View style={styles.products}>
          <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
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
      return(
        <TouchableHighlight onPress={()=>Alert.alert('你单击了商品列表',null,null)}>
        <View style={styles.row}>
          <Image source={rowData.image} style = {styles.productImage}></Image>
          <Text style={styles.productTitle}>{rowData.title}</Text>
          <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
        </View>
        </TouchableHighlight>
      );
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
  row:{
    height:60,
    justifyContent:'center',
    alignItems:'center'
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
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  productText:{

  },
  productTitle:{

  },
  productSubTitle:{

  },
});
