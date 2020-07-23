import {get,post} from "../http"

//所有歌单
export const getAll=p=>{
    return get('/songSheet/getAll',p);
}

//查找歌单
export const getByName=p=>{
    return get('/songSheet/findSheet',p)
}

//根据类型获取歌单
export const getByType=p=>{
    return get('/songSheet/getOneByType',p)
}
//根据id获取歌单
export const getById=p=>{
    return get('/songSheet/getById',p)
}

//获取最新歌单
export const hotSheet=p=>{
    return get('/songSheet/hot',p)
}
//根据标签选择列表
export const getByTag=p=>{
    return get('/songSheet/getByTag',p)
}
//添加歌单点击量
export const popularity=p=>{
    return post('/songSheet/popular',p)
}