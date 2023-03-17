import Mock from 'mockjs'
import homeData from './mockData/homeData'

Mock.mock('/api/home/getMenu',homeData.getMenu)