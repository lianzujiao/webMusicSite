import {get,post} from "../http"

//演出详情
export const getOne=p=>{
    return get("/show/getOne",p)
}
//所有演出
export const getList=p=>{
    return get("/show/getList",p)
}
//最新演出
export const newList=p=>{
    return get("/show/new",p)
}
