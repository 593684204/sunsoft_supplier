/**
 * 预处理首页区分各个事件的类别
 * Created by qiaozm on 2018/5/8.
 */
'use strict';
import * as types from '../constants/mainType';// 导入事件类型,用来做分配给各个事件
import * as appTypes from '../constants/appType';//导入整个app公共事件类型
import request from '../common/request';//网络请求
import {
    msgCode_Zero,
    msgCode_One,
    msgCode_Four,
    msgCode_NinetyNine
} from '../common/constant';//常量组件
import service from '../common/service';//请求服务器接口地址
// 访问轮播图接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function FetchSwiperData() {
    let url=service.baseUrl+service.supplierSlidead;//https://ssl.ygzykj.com:8480   http://192.168.11.95:8081
    let options={
        method:'POST',
        body:'token=a4ce06b498cddf17f73d2ac5bdf93865'
    };
    return dispatch=>{
        dispatch(FuncFetchIng());
        request(url,options)
            .then(data=>dispatch(FuncFetchSuccess(data)))
            .catch(e=>dispatch(FuncFetchError(e)));
    }
}
//测试使用
async function FuncRequestData(url,options){
    return await request(url,options);
}
function FuncFetchIng() {
    return {
        type: types.FETCH_DOING
    }
}
function FuncFetchSuccess(res) {
    let data=res.obj.body;
    let msgCode=res.msgCode;
    switch (parseInt(msgCode)){
        case msgCode_Zero:
            return {
                type: appTypes.APP_MSG_ZERO,
                data: data,
            };
        case msgCode_One:
            return {
                type:appTypes.APP_MSG_ONE
            };
        case msgCode_Four:
            return{
                type:appTypes.APP_MSG_FOUR
            };
        case msgCode_NinetyNine:
            return{
                type:appTypes.APP_MSGNINETYNINE
            };
        default://暂未定义（未知）
            return{
                type:appTypes.APP_MSGUNKNOW
            };
    }
}
function FuncFetchError(e) {
    console.log('error');
    console.log(e);
    return {
        type: types.FETCH_ERROR,
    }
}