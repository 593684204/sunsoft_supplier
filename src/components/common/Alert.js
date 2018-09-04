/**
 *Created by qiaozm on 2018/8/27
 * 弹窗口公共组件（android，iOS）
 */
/*aletInfo={
    title,//标题
    message,信息
    buttons,按钮数组，android最多3个
    alertType,按钮类型normal,alert,prompt(只有为iOS为才有alert和prompt)
    cancelable 点击其他区域是否可关闭弹窗框（android）
}*/
import {
    Alert,
    AlertIOS,
    Platform
} from 'react-native';
export default function alert(alertInfo){
    if(Platform.OS==='ios' && alertInfo.alertType==='alert'){//弹出一个 iOS 提示框
        AlertIOS.alert(
            alertInfo.title,
            alertInfo.message
        );
    }else if(Platform.OS==='ios' && alertInfo.alertType==='prompt'){//弹出一个带输入框的 iOS 提示框 iOS未完善此方法
        AlertIOS.prompt(
            'Enter a value',
            null,
            text => console.log("You entered "+text)
        );
    }else{//android,ios通用弹框
        Alert.alert(
            alertInfo.title,
            alertInfo.message,
            alertInfo.buttons,
            { cancelable: alertInfo.cancelable==null?true:alertInfo.cancelable }
        )
    }
}