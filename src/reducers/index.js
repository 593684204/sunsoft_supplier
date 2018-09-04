/**
 * reducer统一处理入口
 * Created by qiaozm on 2018/5/8.
 */
'use strict';
import { combineReducers } from 'redux';
import loginIn from './loginReducer'; // 导入登录的redux处理过程
import rReducer from './rReducer';
import mainReducer from './mainReducer';//导入首页的redux处理过程
import serviceSchoolListReducer from './serviceSchoolListReducer';//服务中学校redux处理
/******************公共start*************************/
import loadImgReducer from './loadImgReducer';//导入图片组件的redux处理过程
import commonReducer from './commonReducer';//导入公共组件的redux处理过程
/******************公共end*************************/
//import mainIn from './mainReducer';
const rootReducer = combineReducers({ // 将所有的redux处理逻辑包装在一起
    loginIn,
    mainReducer,
    serviceSchoolListReducer,
    rReducer,
    loadImgReducer,
    commonReducer
});
export default rootReducer; // 导出,作为统一入口