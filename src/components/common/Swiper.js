/**
 * 轮播图组件
 *Created by qiaozm on 2018/5/14
 */
import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native'
import ReactNativeSwiper from 'react-native-swiper';
import Util from '../../common/Util';
import LoadImg from '../../components/common/loadImg';
import swiperStyle from '../../styles/common/swiperStyle';

export default class Swiper extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render(){
        return(
            <View style={{flex:1}}>
                {this.FuncSwiperList()}
            </View>
        );
    }

    //生成轮播图列表
    FuncSwiperList=()=>{
        let list=this.props.data;
        let swiperList=null;
        if(list==null || list.length===0){
            swiperList=(<View key={'swiperList_0'} style={swiperStyle.slide1}>
                <Image source={require('../../resources/images/common/banner.jpg')}  style={{height:34*Util.size.width/75,width:Util.size.width}} />
            </View>);
        }else if(list.length===1){
            swiperList=(<View key={'swiperList_0'} style={swiperStyle.slide1}>
                <LoadImg data={
                    {
                        style:{height:34*Util.size.width/75,width:Util.size.width},
                        uri:Util.FuncGetPicFormat(list[0].adCode,'!t750x340'),
                        dataSource:require('../../resources/images/common/swiperdefault.jpg'),
                        priority:'normal',
                        imgProperty:{
                            width:Util.size.width,
                            height:34*Util.size.width/75
                        }
                    }
                } />
            </View>);
        }else{
            let swiperItemList=[];
            list.forEach((item,index)=> {
                swiperItemList[index]=(
                    <View key={'swiperItemList_'+index} style={swiperStyle.slide1}>
                        <LoadImg data={
                            {
                                style:swiperStyle.swiperImg,
                                uri:Util.FuncGetPicFormat(list[index].adCode,'!t750x340'),
                                dataSource:require('../../resources/images/common/swiperdefault.jpg'),
                                priority:'normal',
                                imgProperty:{
                                    width:Util.size.width,
                                    height:34*Util.size.width/75
                                }
                            }
                        } />
                    </View>);
            });
            swiperList=(
                <ReactNativeSwiper key={'swiperList_'} showsButtons={false} horizontal={true} width={Util.size.width}
                                   paginationStyle={[swiperStyle.pagination_x,swiperStyle.pagination]}
                                   dot={<View style={{backgroundColor:'#717171', width:18, height:3, marginLeft:0.5, marginRight:0.5, marginTop: 3, marginBottom: 3,}} />}
                                   activeDot={<View style={{backgroundColor: '#e64e0d', width:18, height:3, marginLeft:0.5, marginRight:0.5, marginTop: 3, marginBottom: 3,}} />}
                                   autoplay={true} autoplayTimeout={5} onMomentumScrollEnd={(e, state, context) => {}}>
                    {swiperItemList}
                </ReactNativeSwiper>
            );
        }
        return swiperList;
    }
}