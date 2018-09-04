import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppNavigator} from './routers'
import {
    NativeModules,
    DeviceEventEmitter,
    View
} from 'react-native';
import request from '../common/request';//网络请求
import service from '../common/service';
import Util from "../common/Util";
import {msgCode_Five, msgCode_Four, msgCode_One, msgCode_Six, msgCode_Zero} from "../common/constant";
import NetInfo from '../components/common/NetInfo';

const RNBridgeModule = NativeModules.RNBridgeModule;

class App extends Component {
    componentDidMount() {
       /* RNBridgeModule.getBundleCode((bundleCode) => {
            console.log("----getBundleCode:" + bundleCode);
        });
        this.versionCode = RNBridgeModule.versionCode;
        this.versionType = RNBridgeModule.versionType;
        this.bundleCode = RNBridgeModule.bundleCode;
        this.type = this.versionType;
        // SplashScreen.hide();
        /!*app切换到后台多少秒后重启APP  单位：秒*!/
        RNBridgeModule.killAppTime(30 * 60);
        this.FetchRequestServer();
        /!*普通更新apk时，点击了关闭*!/
        DeviceEventEmitter.addListener('cancelUpdate', (msg) => {
            console.log("mjx----cancelUpdate");
            this.FetchCheckBundle();
        });
        /!*下载失败  apk：  bundle:全量  bundlezip：增量*!/
        DeviceEventEmitter.addListener('downloadFail', (msg) => {
            console.log("mjx----downloadFail:" + msg);
            if ('bundle' === msg || 'bundlezip' === msg) {
                this.hideSplash();
            }
        });*/
       this.hideSplash();
    }
    render() {
        const { dispatch, nav } = this.props;
        return (
            <View style={{flex:1}}>
                <AppNavigator ref={nav => this.navigation = nav} />
                <NetInfo/>
            </View>
        );
    }
    hideSplash = () => {
        SplashScreen.hide();//启动页
        RNBridgeModule.dismissProgress(); //隐藏原生弹窗
    }
    FetchRequestServer = () => {
        RNBridgeModule.initProgress('请求服务器地址...');
        let _q = 'type=' + this.type;
        let url = service.baseUrl + service.checkVersion;
        console.log(url + "?" + _q);
        RNBridgeModule.splashProgress('请求服务器地址...');
        let options = {
            method: 'POST',
            body: _q
        };
        request(url, options)
            .then((res) => {
                let msgCode = parseInt(res.msgCode);
                console.log('----FetchRequestServer:' + JSON.stringify(res));
                if (msgCode_Zero === msgCode) {
                    let serviceUrl = res.obj.body.serverUrl;
                    service.baseUrl = serviceUrl;
                    setTimeout(() => {
                        this.FetchCheckBundle();
                    }, 3000);
                } else if (msgCode_One === msgCode) { //请求失败，显示无网页面

                } else if (msgCode_Four === msgCode) { //apk强制更新
                    Util.FuncUpdate(0, res);
                } else if (msgCode_Five === msgCode) { //apk普通更新
                    Util.FuncUpdate(1, res);
                }
            })
            .catch((e) => { //异常
                console.log('----FetchRequestServer error:' + e);
            });
    }

    FetchCheckBundle = () => {
        let common = "&versionType=10";
        let _q = 'type=' + this.type;
        let url = service.baseUrl + service.bundleVersionUrl;
        console.log(url + "?" + _q);
        RNBridgeModule.splashProgress('检测bundle更新...');
        let options = {
            method: 'POST',
            body: _q
        };
        request(url, options)
            .then((res) => {
                console.log('----FetchCheckBundle:' + JSON.stringify(res));
                let msgCode = parseInt(res.msgCode);
                if (msgCode_Zero === msgCode) {//不需要更新，进入首页或登录页
                    this.hideSplash();
                } else if (msgCode_One === msgCode) { //请求失败，服务器异常 进入首页或登录页
                    this.hideSplash();
                } else if (msgCode_Six === msgCode) { //有bundle更新
                    console.log("3秒后去下载")
                    setTimeout(() => {
                        Util.FuncUpdate(2, res);
                    }, 3000);
                }
            })
            .catch(e => {
                console.log('----FetchCheckBundle error:' + e);
            });
    }
}

export default App;
