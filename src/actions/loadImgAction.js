/**
 * 预处理图片组件区分各个事件的类别
 * Created by qiaozm on 2018/5/14.
 */
'use strict';
import * as types from '../constants/loadImgType';// 导入事件类型,用来做分配给各个事件
//根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function FuncLoaded(event,imgPropertyData) {
    let width=event.nativeEvent.width;//图片实际宽
    let height=event.nativeEvent.height;//图片实际高
    let ratio=width/height;//图片缩放系数
    let wid=imgPropertyData.width;//展示图宽
    let hei=imgPropertyData.height;//展示图高
    if(height>width){
        wid=hei*ratio;
    }else{
        hei=wid/ratio;
    }
    return {
        type:types.LOAD_SUCCESS,
        width:wid,
        height:hei
    }
}
export function FuncOnLoadStart() {
    return {
        type: types.LOAD_DOING
    }
}