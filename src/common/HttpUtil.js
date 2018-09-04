import Util from './Util';

export default {


    fetchUrl(url,param){
        console.log("mjx----url:"+url+'?'+param);
        let p= this.postUrl(url,param);
        let p2=Util.FuncTimeOut();
        return Promise.race([p,p2]);
    },


    postUrl(url,param){
        return new Promise((resolve,reject)=>{
            Util.post(url,param,(data)=>{
                let _msgCode=data.msgCode;
                if(_msgCode==99){ //退出登录

                }else if(_msgCode==4){ //强制更新
                  Util.FuncUpdate(0,data);

                }else{
                    resolve(data);
                }
            },(err)=>{
                reject('weekNet');
            });
        });
    },

}