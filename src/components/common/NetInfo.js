import React,{Component} from 'react';
import  {
  NetInfo
} from 'react-native';
import { connect } from "react-redux";
import * as commonAction from "../../actions/commonAction";
class NetInfoReact extends React.Component{
    constructor(props){
        super(props)
    }
  componentDidMount() {
    NetInfo.addEventListener(
        'connectionChange',
         this._handleConnectivityTypeChange
    );
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
    );
    /*//检测网络是否连接
      NetInfo.isConnected.fetch().then(isConnected => {
          //this.props.FuncIsConnected(isConnected);
      });
    //检测网络连接信息
      NetInfo.getConnectionInfo().then((connectionInfo) => {
          this.props.FuncGetConnectionInfo(connectionInfo);
          console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      });*/
  };
  componentWillUnmount=()=>{
    NetInfo.removeEventListener(
        'connectionChange',
        this._handleConnectivityTypeChange
    );
      NetInfo.isConnected.removeEventListener(
          'connectionChange',
          this._handleConnectivityChange
      );
  };
    _handleConnectivityTypeChange=(connectionInfo)=>{
      this.props.FuncGetConnectionInfo(connectionInfo);
       // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  };
    _handleConnectivityChange=(isConnected)=>{
        this.props.FuncIsConnected(isConnected);
    };
  render() {
    return null;
  }
}
export default connect(
    (state) => ({
        isConnected:state.commonReducer.conn_isConnected,
        type:state.commonReducer.conn_type,
        effectiveType:state.commonReducer.conn_EffectiveConnectionType
    }),
    (dispatch) => ({
        FuncIsConnected: (isConnected) => dispatch(commonAction.FuncIsConnected(isConnected)),
        FuncGetConnectionInfo:(connectionInfo)=>dispatch(commonAction.FuncGetConnectionInfo(connectionInfo)),
    })
)(NetInfoReact)