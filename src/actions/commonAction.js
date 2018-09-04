/**
 * 预处理消息区分各个事件的类别
 * Created by qiaozm on 2018/5/8.
 */
'use strict';
import * as types from '../constants/commonType';// 导入事件类型,用来做分配给各个事件
/*// 模拟用户信息
let commonModal = {
    conn_effectiveType: null,
    conn_type:null,
    conn_isConnected:null
}*/


export function FuncIsConnected(isConnected) {
    return{
        type:types.CONN_ISCONNECTED,
        isConnected
    }
}

export function FuncGetConnectionInfo(connectionInfo) {
    return{
        type:types.CONN_CONNECTIONINFO,
        connectionInfo
    }
}