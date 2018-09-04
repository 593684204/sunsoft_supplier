/**
 * 处理公共组件的state变化
 * Created by qiaozm on 2018/8/22.
 */
'use strict';
import * as types from '../constants/commonType' // 导入事件类别,用来做事件类别的判断
// 初始状态
const initialState = {
    conn_isConnected: null,
    conn_EffectiveConnectionType: null,
    conn_type: null
}
// 不同类别的事件使用switch对应处理过程
export default function commonReducer(state=initialState, action) {
    switch (action.type) {
        case types.CONN_ISCONNECTED:
            console.log('======================='+action.isConnected);
            return {
                ...state,
                conn_isConnected:action.isConnected
            };
        case types.CONN_CONNECTIONINFO:
            console.log('=======================conn_type='+action.connectionInfo.type+'====conn_EffectiveConnectionType='+action.connectionInfo.effectiveType);
            return {
                ...state,
                conn_EffectiveConnectionType: action.connectionInfo.effectiveType,//2g,3g,4g,unknown
                conn_type: action.connectionInfo.type//none - 设备处于离线状态wifi - 设备通过wifi联网，或者设备是iOS模拟器cellular - 设备通过蜂窝数据流量联网unknown - 联网状态异常
            };
        default:
            return state;
    }
}