/**
 *Created by qiaozm on 2018/8/29
 */
'use strict';
import * as types from '../constants/serviceSchoolListType' // 导入事件类别,用来做事件类别的判断
// 初始状态
const initialState = {
    status: 'FETCH_DOING',
    data:[],
    results:0,
    lineNum:1,
    refreshing:false//初始不刷新
}
// 不同类别的事件使用switch对应处理过程
export default function serviceList(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_DOING:
            return {
                ...state,
                status: 'FETCH_DOING'
            };
        case types.FETCH_REFRESHING:
            return {
                ...state,
                status: 'FETCH_DOING',
                refreshing:ation.refreshing
            };
        case types.FETCH_DONE:
            return {
                ...state,
                status: 'FETCH_DONE',
                data: action.data.rows.concat(state.data),
                results:action.data.results
            };
        case types.FETCH_ERROR:
            return {
                ...state,
                status: 'FETCH_ERROR'
            };
        default:
            return state;
    }
}