import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'Login',
    // 路由懒加载
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'Home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'Qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
