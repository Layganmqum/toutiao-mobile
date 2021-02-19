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
  { // *一级路由渲染到根组件中的 route-view
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      { // *子级路由渲染到父组件中的 route-view 中
        path: '', // ? 默认子路由
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
  },
  {
    path: '/search',
    name: 'Search',
    // 路由懒加载
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    // 路由懒加载
    component: () => import('@/views/article/'),
    // *将动态路由参数映射到组件的 props 中，无论是访问还是维护性都很方便
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
