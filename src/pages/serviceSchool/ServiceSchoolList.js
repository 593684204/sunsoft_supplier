import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    TouchableHighlight,
    TextInput,
    Button,
    FlatList
} from 'react-native';
import { connect } from "react-redux";
//import FastImage from 'react-native-fast-image';
import LoadImg from '../../components/common/loadImg';
import Util from '../../common/Util';
import * as serviceSchoolListAction from "../../actions/serviceSchoolListAction";

class ServiceSchoolList extends Component {
    static navigationOptions=({navigation})=>({
        headerTitle:(
            <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:18,color:'#333'}}>首页</Text>
            </View>
        ),
        headerLeft:(<TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={()=>{navigation.goBack()}}>
            <Text>{navigation.state.params.token}</Text>
        </TouchableHighlight>),
        headerRight:(<TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={()=>{navigation.state.params.navigatePress()}}>
            <Text>右按钮</Text>
        </TouchableHighlight>)
    });
    constructor(props) {
        super(props);
        this.pageNo=1;
        this.pageSize=10;
       // alert(this.props.navigation.state.params.token);
    }

    componentWillMount(){
        this.props.navigation.setParams({
            navigatePress:this.navigatePress
        });//顶部导航右边按钮添加事件
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        this.props.FuncFetchData(this.pageNo,this.pageSize);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        lastBackPressed = null;
    }
    navigatePress = () => {
        alert('点击headerRight');
        console.log(this.props.navigation);
    };
    onBackAndroid=()=>{
        console.log(this.props.navigation.state);
        console.log(this.props.navigation.state.routeName);
        const { goBack } = this.props.navigation;
        goBack();
        return true;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                        style={{flex: 1}}
                        placeholder="请输入要跳转的行号"
                        onChangeText={(text) => this.props.FuncSetLineNum(text)}
                    />
                    <Button title="跳转到行" onPress={()=>this.onButtonPress()} color={'skyblue'}/>
                    <Button title="跳转到底部" onPress={()=>this.onBtnPressBottomBotton()} color={'green'}/>
                    <Button title="跳转到顶部" onPress={()=>this.onBtnPressTopBotton()} color={'blue'}/>
                </View>
                <FlatList
                    data={this.props.data}
                    //使用 ref 可以获取到相应的组件
                    ref={(flatList) => this._flatList = flatList}
                    ListHeaderComponent={this._header}//header头部组件
                    ListFooterComponent={this._footer}//footer尾部组件
                    ItemSeparatorComponent={ItemDivideComponent}//分割线组件
                    //空数据视图,可以是React Component,也可以是一个render函数，或者渲染好的element。
                    ListEmptyComponent={this.createEmptyView()}
                    keyExtractor={this._keyExtractor}
                    //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                    //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                    //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
                    getItemLayout={(data, index) => ( {length: 100, offset: (100 + 1) * index, index} )}
                    //决定当距离内容最底部还有多远时触发onEndReached回调。
                    //注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onEndReachedThreshold={0.4}
                    //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                    onEndReached={()=>{this.pageNo+=1;this.props.FuncFetchData(this.pageNo,this.pageSize)}}
                    refreshing={this.props.refreshing}
                    onRefresh={() => {
                        this.setState({refreshing: true});//开始刷新
                        this.pageNo=1;
                        this.props.FuncFetchData(this.pageNo,this.pageSize);
                    }}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
    _header = ()=> {
        return (
            <Text style={{fontWeight: 'bold', fontSize: 20,textAlign:'center'}}>---------头部展示---------</Text>
        );
    };

    _footer = () => (
        <View>
            {
                this.pageNo<Math.ceil(this.props.results/this.pageSize)?
                    null
                    :
                    <Text style={{fontSize: 14, alignSelf: 'center'}}>到底啦，没有啦！</Text>
            }
        </View>
    );
    createEmptyView=()=> {
        return (
            <Text style={{fontSize: 40, alignSelf: 'center'}}>还没有数据哦！</Text>
        );
    }
    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;
    itemClick=(item, index)=> {
        alert('点击了第' + index + '项，学校名称为：' + item.schoolName);
    };

    _renderItem = ({item, index}) => {
        //console.log('------------------renderItem------------------------');
        //console.log(item);
        return (
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={'#fff'}
                onPress={()=>{this.itemClick(item, index)}}>
                <View style={{height:100,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                    <View style={{height:100,width:100}}>
                        <LoadImg data={{
                            uri:item.schoolLogoUrl,
                            style:{height:100,width:100},
                            imgProperty:{
                                width:10*Util.size.width/150,
                                height:10*Util.size.width/150
                            },
                            dataSource:require('../../resources/images/common/default.png'),
                            priority:'normal'
                        }}/>
                    </View>
                    <View style={{height:100,width:Util.size.width-100,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                        <Text style={styles.instructions}>{item.schoolName}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    //点击按钮跳转
    onButtonPress=()=> {
        //viewPosition参数：0表示顶部，0.5表示中部，1表示底部
        this._flatList.scrollToIndex({viewPosition: 0, index: parseInt(this.props.lineNum)});
        //this._flatList.scrollToOffset({ animated: true, offset: 2000 });
    };
    onBtnPressBottomBotton=()=> {
        this._flatList.scrollToEnd();
    };
    onBtnPressTopBotton=()=>{
        this._flatList.scrollToIndex({viewPosition: 0, index: 0});
    };
}
class ItemDivideComponent
    extends Component {
    render() {
        return (
            <View style={{height: 1, backgroundColor: 'skyblue'}}/>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
export default connect(
    (state) => ({
        status: state.serviceSchoolListReducer.status,
        data:state.serviceSchoolListReducer.data,
        results:state.serviceSchoolListReducer.results,
        lineNum:state.serviceSchoolListReducer.lineNum,
        refreshing:state.serviceSchoolListReducer.refreshing
    }),
    (dispatch) => ({
        FuncFetchData: (pageNo, pageSize) => dispatch(serviceSchoolListAction.fetchData(pageNo, pageSize)),
        FuncSetLineNum:(text)=>dispatch(serviceSchoolListAction.setLineNum(text))
    })
)(ServiceSchoolList)