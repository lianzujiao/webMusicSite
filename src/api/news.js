import {get,post} from "../http"

//收藏歌曲
export const getOne=p=>{
    return get("/article/getOne",p)
}