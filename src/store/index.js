import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // ?最开始需要从本地存储获取数据
    user: getItem('user') // *当前登录用户的登录状态 (token 等数据)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // !为了防止页面刷新数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      // window.localStorage.setItem('user', JSON.stringify(payload))
      setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
