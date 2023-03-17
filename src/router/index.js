import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect:'/home',
    component: ()=> import('../views/Main.vue'),
    children:[
      {
        path: '/home',
        name: 'home',
        component: ()=> import('../views/Home.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/Mall.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/PageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/PageTwo.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
