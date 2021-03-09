import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/index'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'Login',
    // 路由懒加载
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false } // 给路由额外自定义数据
  },
  { // *一级路由渲染到根组件中的 route-view
    path: '/',
    component: () => import('@/views/layout/'),
    meta: { requiresAuth: false },
    children: [
      { // *子级路由渲染到父组件中的 route-view 中
        path: '', // ? 默认子路由
        name: 'Home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'Qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    // 路由懒加载
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    // 路由懒加载
    component: () => import('@/views/article/'),
    meta: { requiresAuth: false },
    // *将动态路由参数(:articleId)映射到组件的 props 中，无论是访问还是维护性都很方便
    // ?参考：Vue Router 路由组件传参
    props: true
  },
  {
    path: '/user/profile',
    name: '.user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

// to：要访问的页面路由信息
// from：来自哪个页面的路由信息
// next：放行的标记
router.beforeEach((to, from, next) => {
  // 校验登录状态，提示用户
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      // 如果有登陆，则直接通过
      return next()
    }
    // 没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，是否登录？'
    }).then(() => {
      // 确认执行这里
      router.replace({
        name: 'Login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      // 取消执行这里
      // TODO：中断路由导航
      next(false)
    })
  } else {
    // 不需要登录状态的页面，直接放行
    next()
  }
})

export default router
