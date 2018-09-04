/**
 *Created by qiaozm on 2018/8/27
 * toast公共组件（android，iOS）
 */
/*toastInfo={
    message,提示信息
    duration,toast显示时长long:3500,short2000
    position,toast显示位置bottom:-20底部，top:20现在在顶部center:0显示在中间
    shadow,是否有阴影
    animation,是否有动画效果
    textColor,toast文字颜色
    hideOnPress,点击toast是否关闭正在显示的toast
    delay显示时是否有延迟
}*/
import Toast from 'react-native-root-toast';
export default {
    show(toastInfo){
        return Toast.show(toastInfo.message, {
            duration: toastInfo.duration==null?Toast.durations.LONG:toastInfo.duration,
            position: toastInfo.position==null?Toast.positions.BOTTOM:toastInfo.position,
            shadow: toastInfo.shadow==null?true:toastInfo.shadow,
            animation: toastInfo.animation==null?true:toastInfo.animation,
            textColor:toastInfo.textColor,
            hideOnPress: toastInfo.hideOnPress==null?true:toastInfo.hideOnPress,
            delay: toastInfo.delay==null?0:toastInfo.delay,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
    },
    hide(toast){
        Toast.hide(toast);
    }
}