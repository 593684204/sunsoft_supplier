/**
 * 处理首页的state变化
 * Created by qiaozm on 2018/5/8.
 */
'use strict';
import * as types from '../constants/loadImgType' // 导入事件类别,用来做事件类别的判断
// 初始状态
const initialState = {
    loaded:false,
    width:0,
    height:0
}
// 不同类别的事件使用switch对应处理过程
export default function loadImgReducer(state=initialState, action) {
    switch (action.type) {
        case types.LOAD_DOING:
            return {
                ...state,
                loaded: false
            };
        case types.LOAD_SUCCESS:
            return {
                ...state,
                loaded: true,
                width:action.width,
                height:action.height
            };
        default:
            return state;
    }
}