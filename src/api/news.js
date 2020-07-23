import {get,post} from "../http"

//文章详情
export const getOne=p=>{
    return get("/article/getOne",p)
}
//查找文章列表
export const getList=p=>{
    return get("/article/getList",p)
}
//查找文章列表
export const types=p=>{
    return get("/article/types",p)
}