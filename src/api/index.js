import http from '../utils/request'

export const getMenu = ()=>{
    return http.get('/home/getMenu')
}

export const getTableData = ()=>{
    return http.get('/home/getTableData')
}

export const getCountData = ()=>{
    return http.get('/home/getCountData')
}

export const getData = ()=>{
    return http.get('/home/getData')
}

// 用户管理接口
export const getUser = (params)=>{
    return http.get('/user/getUser',params)
}
export const addUser = (data)=>{
    return http.post('/user/add',data)
}
export const delUser = (data)=>{
    return http.post('/user/del',data)
}
export const editUser = (data)=>{
    return http.post('/user/edit',data)
}