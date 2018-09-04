/**
 *Created by qiaozm on 2018/8/29
 * button口公共组件（android，iOS）
 */
import React, { Component } from 'react';
import {
    Text,
    ImageBackground,
    TouchableHighlight
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight underlayColor="rgba(255,255,155,0)" style={this.props.data.style}>
                {
                    this.props.data.isImageBackground?
                        <ImageBackground underlayColor="rgba(255,255,155,0)" source={this.props.data.source} style={{width:'100%', height:'100%',justifyContent:'center',alignItems:'center'}}>
                            <Text style={this.props.data.fontStyle}>{this.props.data.text}</Text>
                        </ImageBackground>
                    :
                        <Text style={this.props.data.fontStyle}>{this.props.data.text}</Text>
                }
            </TouchableHighlight>

        );
    }
}