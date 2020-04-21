import {get,post} from "../util/request"

//新歌榜单
export const list=p=>{
    return get("/top/list",p);
}

//热门歌手
export const topSinger=p=>{
    return get("/top/artists",p);
}

//歌手类目
export const artistCat=p=>{
    return get("/artist/list",p);
}


// //获取榜单名和封面
// export const listDiscov=p=>{
//     return get("/discover/toplist",p);
// }