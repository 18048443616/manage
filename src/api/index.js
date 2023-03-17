import http from '../utils/request'

export const getMenu = ()=>{
    return http.get('/home/getMenu')
}