import {get,post} from "../util/request"
export const newSong=p=>{
    return get("/personalized/newsong",p)
}