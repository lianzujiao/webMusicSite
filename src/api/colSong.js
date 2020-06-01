import {get,post} from "../http"

//收藏歌曲
export const like=p=>{
    return post("/colSong/add",p)
}

//查找用户喜欢的歌曲
export const findSongs=p=>{
    return get("/colSong/findSongs",p)
}

//取消收藏
export const offLike=p=>{
    return post("/colSong/offLike",p)
}