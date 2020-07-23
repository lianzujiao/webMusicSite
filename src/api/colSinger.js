import {get,post} from "../http"

//收藏歌曲
export const like=p=>{
    return post("/colSinger/add",p)
}

//查找用户喜欢的歌曲
export const findSingers=p=>{
    return get("/colSinger/findsingers",p)
}

//取消收藏
export const offLike=p=>{
    return post("/colSinger/offLike",p)
}