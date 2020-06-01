import {get,post} from "../http"


export const getByName=p=>{
    return get('/song/getByName',p)
}

//歌曲详情
export const getOne=p=>{
    return get('/song/getOne',p)
}

//添加歌曲播放量
export const popularity=p=>{
    return post('/song/popular',p)
}



