
let aaa = require('./storage');
let storage = aaa.storage;
let asynStorage={
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    user(params){
        let { id, resolve, reject, syncParams: { extraFetchOptions,url,someFlag } } = params;
        fetch(url, {
            method: 'GET',
            ...extraFetchOptions,
        }).then(response => {
            console.log('fetch数据11 === ' + JSON.stringify(response));
            return response.json();
        }).then(json => {
            console.log('fetch数据22 === ' + JSON.stringify(json));
            if(json){

                /*storage.save({h'OUZ
                    key: 'user',
                    id,
                    data: json,
                    expires: 1000 * 6
                });

                if (someFlag) {
                    // 根据syncParams中的额外参数做对应处理
                }
                console.log('resolve = ' + resolve, resolve);
                // 成功则调用resolve
                resolve && resolve(json);*/
            }
            else{
                // 失败则调用reject
                reject && reject(new Error('data parse error'));
            }
        }).catch(err => {
            reject && reject(err);
        });
    }
};
//导出ssss
exports.ssss = ssss;