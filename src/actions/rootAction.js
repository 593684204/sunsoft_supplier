import * as types from '../constants/rootType';// 导入事件类型,用来做分配给各个事件
import request from '../common/request';//网络请求
import service from '../common/service';
import Util from "../common/Util";
import {
    msgCode_Zero,
    msgCode_One,
    msgCode_Four,
    msgCode_Five,
    msgCode_Six
} from '../common/constant';
import {
    NativeModules,
    DeviceEventEmitter
} from 'react-native';
const RNBridgeModule = NativeModules.RNBridgeModule;

//请求服务器接口地址

export function FetchRequestServer() {
    RNBridgeModule.initProgress('请求服务器地址...');
    let _q = 'versionCode=1.1.4'  + '&type=10';
    let url = service.baseUrl + service.checkVersion;
    console.log(url+"?"+_q);
    let options = {
        method: 'POST',
        body: _q
    };
    return dispatch => {
        request(url, options)
            .then(data => dispatch(FuncFetchSuccess(data)))
            .catch(e => dispatch(FuncFetchError(e)));
    }
}

function FuncFetchSuccess(res) {
    console.log('FuncFetchSuccess:' + JSON.stringify(res));
    let msgCode = res.msgCode;
    if (msgCode === msgCode_Zero) {
        let serviceUrl = res.obj.body.serverUrl;
        service.baseUrl = serviceUrl;
       return FetchCheckBundle(serviceUrl);

    } else if (msgCode_One === msgCode) { //请求失败，显示无网页面
        return {
            type: types.FETCH_NONET,
            data: res,
        }
    } else if (msgCode_Four === msgCode) { //apk普通更新
        Util.FuncUpdate(0, res);
        return {
            type: types.FETCH_SUCCESS,
            data: res,
        }

    }else if (msgCode_Five === msgCode) { //apk普通更新
        Util.FuncUpdate(1, res);
        return {
            type: types.FETCH_SUCCESS,
            data: res,
        }

    }
    /*return {
        type: types.FETCH_SUCCESS,
        data: res,
    }*/
}

function FuncFetchError(e) {
    console.log('FuncFetchError:'+e);
    return {
        type: types.FETCH_ERROR,
    }
}

function FetchCheckBundle(serviceUrl){
    let _q = 'versionCode=1.1.4' + '&type=10' + "&bundleCode=1.1";
    let url = serviceUrl + service.bundleVersionUrl;
    console.log(url+"?"+_q);
    let options = {
        method: 'POST',
        body: _q
    };
    return dispatch => {
        request(url, options)
            .then(data => dispatch(FuncCheckBundleSuccess(data)))
            .catch(e => dispatch(FuncCheckBundleError(e)));
    }
}


function FuncCheckBundleSuccess(res) {
    console.log('FuncCheckBundleSuccess'+JSON.stringify(res));
    let msgCode = res.msgCode;
    if(msgCode == msgCode_Zero){//不需要更新，进入首页或登录页
        return {
            type: types.FETCH_HIDE,
            isHide:true,
            data: res,
        }
    }else if(msgCode_One==msgCode){ //请求失败，服务器异常 进入首页或登录页
        return {
            type: types.FETCH_NONET,
            data: res,
        }
    }else if(msgCode_Six==msgCode){ //有bundle更新
        console.log("3秒后去下载")
        Util.FuncUpdate(2,res);
        return {
            type: types.FETCH_SUCCESS,
            data: res,
        }
    }
   /* return {
        type: types.FETCH_SUCCESS,
        data: res,
    }*/
}

function FuncCheckBundleError(e) {
    console.log('FuncCheckBundleError'+e);
    return {
        type: types.FETCH_ERROR,
    }
}

export function refreshReload() {
    return FetchRequestServer();
}