import {get,post} from "../http"

export const getAll=p=>{
    return get('/bandshome/get',p)
}
export const hot=p=>{
    return get('/bandshome/hot',p)
}
export const detail=p=>{
    return get('/bandshome/getOne',p)
}
export const hotSongs=p=>{
    return get('/bandshome/hotSongs',p)
}
export const getByName=p=>{
    return get('/bandshome/getByName',p)
}