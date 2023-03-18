import Mock from 'mockjs'
import homeData from './mockData/homeData'
import user from './mockData/user'

Mock.mock('/api/home/getMenu',homeData.getMenu)
Mock.mock('/api/home/getTableData',homeData.getTableData)
Mock.mock('/api/home/getCountData',homeData.getCountData)
Mock.mock('/api/home/getData',homeData.getData)

// 用户管理接口拦截
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)
