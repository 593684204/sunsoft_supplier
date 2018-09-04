/**
 *Created by qiaozm on 2018/8/29
 */
'use strict';
import * as types from '../constants/serviceSchoolListType';// 导入事件类型,用来做分配给各个事件
import service from '../common/service';
import request from '../common/request';
export function fetchData(pageNo,pageSize,refreshing) {
    console.log('-------------pageNo='+pageNo+'--------------------------');
    let url=service.baseUrl+service.selectSchoolIdAndSchoolInfo;
    let _q='token=a4ce06b498cddf17f73d2ac5bdf93865&provinceRegionId=&cityRegionId=&districtRegionId=&schoolName=' +
        '&pageNo='+pageNo+'&pageSize='+pageSize+'&status=00';
    console.log(url);
    let options = {
        method: 'POST',
        body: _q
    };
    return dispatch=>{
        if(refreshing){dispatch(setRefreshing(refreshing));}
        else{dispatch(fetchDoing());}//开始发起请求
      request(url,options).then(
          data=>dispatch(fetchSuccess(data))
      ).catch(e=>dispatch(fetchError()))
    };
}
//设置跳转行码
export function setLineNum(text) {
    return dispatch=>{
        dispatch(lineNum());
    }
}
function lineNum() {
    return{
        type:types.SET_LINE_NUM
    }
}

function setRefreshing(refreshing){
    return {
        type:types.FETCH_REFRESHING
    }
}

function fetchDoing() {
    return {
        type: types.FETCH_DOING
    }
}
function fetchSuccess(data) {
    return{
        type:types.FETCH_DONE,
        data:data.obj.body
    }
}
function fetchError(e){
    console.log(e);
    return{
        type:types.FETCH_ERROR
    }
}