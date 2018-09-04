/**
 * Created on 2018/05/08.
 *
 */
import Util from '../../common/Util';
import React,{Component} from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
class Loading extends React.Component{
    constructor(props) {
   	    super(props);
    };
    render(){
        return(
            <View style={{width:Util.size.width,height:Util.size.height,justifyContent:'center',alignItems:'center',opacity:0.6,position:'absolute'}}>
                {
                    this.props.data==null||this.props.data.isImage==null?
                        <Image source={require('../../resources/images/common/loading.gif')} style={{width: 25, height:25} }  />
                    :
                    this.props.data.isImage && this.props.data.source!==null?
                        <Image source={this.props.data.source} style={{width: 25, height:25} }  />
                    :
                        <Text>{this.props.data.source}</Text>
                }
            </View>
        );
    };
}
export default Loading;