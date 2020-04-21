import {get,post} from "../http"

export const register=p=>{
  return  post('/user/register',p)
}
export const login=p=>{
  return  post('/user/login',p)
}

export const updatePass=p=>{
  return post('/user/updatePass',p)
}

export const updateMsg=p=>{
  return post('/user/updateMsg',p)
}

export const getMsg=(p,authorization)=>{
  return get('/user/getMsg',p,authorization)
}


