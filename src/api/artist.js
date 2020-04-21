import {get} from "../util/request"

//歌手单曲和部分歌手信息
export const art=p=>{
    return get('/artists',p)
}

//歌手描述
export const desc=p=>{
    return get('/artist/desc',p)
}

//歌手专辑
export const album=p=>{
    return get('/artist/album',p)
}
//相似歌手
export const simi=p=>{
    return get('/simi/artist',p)
}

