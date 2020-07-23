import {get} from '../http'
export const detail=p=>{
    return get("/album/getAlbum",p)
}