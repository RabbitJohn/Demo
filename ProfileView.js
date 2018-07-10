import React,{Component} from 'react';
import {Button,Text,ListView,View,StyleSheet,Image,TouchableHighlight,Alert} from 'react-native';

const ds = new ListView.DataSource({
    //返回一个row改变的条件
    rowHasChanged:(r1,r2)=> r1 !== r2
  });  

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
            datasource:ds.cloneWithRows({
                "row1":{
                    image:require('./Resources/profile/profile_order.png'),
                    content:'我的订单',
                },
                "row2":{
                    image:require('./Resources/profile/profile_jifen.png'),
                    content:"积分商城",
                },
                "row3":{
                    image:require('./Resources/profile/profile_setting.png'),
                    content:"设置",
                }
            },),
        }
    }

    render(){
        return(<View style={styles.container}>
            <ListView dataSource={this.state.datasource} renderRow = {this._renderRow}></ListView>
        </View>);
    }


    _renderRow = (rowData,sectionID,rowID,highlightRow)=>{
        return (
            <TouchableHighlight style={styles.listviewItem} onPress = {()=>{
                Alert.alert("你点击了第"+rowData.content);
            }}>
                <View style = {styles.listviewItem}>
                    <Image style={styles.icon} source={rowData.image}></Image>
                    <Text style={styles.rowText}>{rowData.content}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    

}



const styles = StyleSheet.create({
    container:{
        flex:1
    },
    listview:{
        flex:1
        // alignSelf:'center',
    },
    listviewItem:{
        height:60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white'
        },
    icon:{
        marginLeft:15,
        width:22,
        height:22,
        alignSelf : 'center'
    },
    rowText:{
        paddingLeft:15,
        fontSize:15,
        textAlign:'left',
        alignSelf:'center',
    }
  });