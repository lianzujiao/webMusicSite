import {get} from "../util/request"


//不可用
export const url=p=>{
    return get('/music/url',p)
}

export const detail=p=>{
    return get('/song/detail',p)
}



//检查音乐是否有版权
export const check=p=>{
    return get('/check/music',p)
}

//获得歌词
export const lyric=p=>{
    return get('/lyric',p)
}
