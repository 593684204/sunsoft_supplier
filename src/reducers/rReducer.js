/**
 * 处理登录过程中的state变化
 * Created by qiaozm on 2018/5/8.
 */
'use strict';
import * as types from '../constants/rootType' // 导入事件类别,用来做事件类别的判断
// 初始状态
const initialState = {
    status: 'success',
    data: null,
    isHide:false
}
// 不同类别的事件使用switch对应处理过程
export default function rResucer(state=initialState, action) {
    switch (action.type) {
        case types.FETCH_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: action.data,
            }
            break;
        case types.FETCH_ERROR:
            return {
                ...state,
                status: 'error',
                data: null,
            }
            break;
        case types.FETCH_NONET:
            return {
                ...state,
                status: 'nonet',
                data: null,
            }
            break;
        case types.FETCH_HIDE:
            return {
                ...state,
                status: 'success',
                data: action.data,
                isHide:true
            }
            break;
        default:
            return state;
    }
}