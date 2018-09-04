/**
 * 图片处理组件（添加图片缓存处理）
 * Created by qiaozm on 2018/5/14.
 */
import React,{Component} from 'react';
import FastImage from 'react-native-fast-image'
import Immutable from 'immutable';
import {
    View,
    Image
} from 'react-native';
import * as loadImgAction from "../../actions/loadImgAction";
import { connect } from "react-redux";
class LoadImg extends React.Component{
    constructor(props) {
   	    super(props);
    };
    shouldComponentUpdate(nextProps,nextState){
        const thisProps = this.props || {};
        for (const key in nextProps) {
            if (!Immutable.is(thisProps[key], nextProps[key])) {
                return true;
            }
        }
        return false;
    }
    render(){
        return this.renderView();
    };
    renderView=()=>{
        let priority=FastImage.priority.normal;
        if(this.props.data.priority==='low'){
            priority=FastImage.priority.low;
        }else if(this.props.data.priority==='high'){
              priority=FastImage.priority.high;
        }
        return(
             <View>
                 <FastImage
                     style={this.props.data.style}
                     source={{
                       uri: this.props.data.uri,
                       headers:{ Authorization: 'someAuthToken' },
                       priority: priority,
                     }}
                     resizeMode={FastImage.resizeMode.contain}
                     onLoadStart={()=>this.props.FuncOnLoadStart()}
                     onLoad={(event)=>this.props.FuncLoaded(event,this.props.data.imgProperty)}
                 />
                 {
                     this.props.loaded===false?
                         <View style={[this.props.data.style,{position:'absolute',top:0,left:0}]}>
                             <Image source={this.props.data.dataSource}  style={[this.props.data.style,this.props.loaded?{width:this.props.width,height:this.props.height}:null]} resizeMode='contain' />
                         </View>
                     :
                     null
                 }
             </View>
        );
    }
}
export default connect(
    (state) => ({
        loaded:state.loadImgReducer.loaded,
        width:state.loadImgReducer.width,
        height:state.loadImgReducer.height
    }),
    (dispatch) => ({
        FuncOnLoadStart: () => dispatch(loadImgAction.FuncOnLoadStart()),
        FuncLoaded:(event,imgPropertyData)=>dispatch(loadImgAction.FuncLoaded(event,imgPropertyData))
    })
)(LoadImg)