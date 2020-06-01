import {get,post}from "../http"

export const getById =p=>{
    return get('/rank/getById',p)
}
export const getByType =p=>{
    return get('/rank/getByType',p)
}
export const hot =p=>{
    return get('/rank/hot',p)
}