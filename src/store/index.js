import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// ? 这里定义一个常亮，来声明底下的 user ，为了能够方便管理和编译器能监听
const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    // ?最开始需要从本地存储获取数据
    user: getItem(USER_KEY), // *当前登录用户的登录状态 (token 等数据)

    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // !为了防止页面刷新数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      // window.localStorage.setItem(USER_KEY, JSON.stringify(payload))
      setItem(USER_KEY, payload)
    },

    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
