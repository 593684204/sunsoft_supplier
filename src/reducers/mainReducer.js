/**
 * 处理首页的state变化
 * Created by qiaozm on 2018/5/8.
 */
'use strict';
import * as types from '../constants/mainType' // 导入事件类别,用来做事件类别的判断
import * as appTypes from '../constants/appType';//导入整个app公共事件类型
// 初始状态
const initialState = {
    data:null,
    loaded:false,
    status:''
}
// 不同类别的事件使用switch对应处理过程
export default function mainReducer(state=initialState, action) {
    switch (action.type) {
        case types.FETCH_DOING:
            return {
                ...state,
                status: '正在获取数据',
                loaded: false,
                data: null,
            };
        case appTypes.APP_MSG_ZERO:
            return {
                ...state,
                status: 'success',
                loaded: true,
                data: action.data,
            };
        case appTypes.APP_MSG_ONE:
            return {
                ...state,
                status: 'noData',
                loaded: true,
                data: null,
            };
        case appTypes.APP_MSG_FOUR:
            return {
                ...state,
                status: '强制更新',
                loaded: true,
                data: null,
            };
        case appTypes.APP_MSGNINETYNINE:
            return {
                ...state,
                status: '强制退出',
                loaded: true,
                data: null,
            };
        case types.FETCH_ERROR:
            return {
                ...state,
                status: 'timeOut',
                loaded: true,
                data: null,
            };
        default:
            return state;
    }
}