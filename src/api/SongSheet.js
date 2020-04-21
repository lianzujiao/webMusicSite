import {get,post} from "../util/request"

//歌单分类
export const catlist=p=>{
    return get('/playlist/catlist',p);
}

//热门歌单分类
export const hot=p=>{
    return get('/playlist/hot',p);
}

//歌单，网友精选碟
export const playlist=p=>{
    return get('/top/playlist',p);
}

//歌单详情页
export const detail=p=>{
    return get('/playlist/detail',p);
}