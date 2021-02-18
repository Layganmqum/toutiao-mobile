<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(suggestion, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', suggestion)"
    >
      <div slot="title" v-html="highlight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
import { GetSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
// import _ from 'lodash'

// !防抖函数
// const fn = _.debounce(() => {
//   console.log('hello')
// }, 1000)
// fn()

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 联想建议数组
      suggestions: []
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {
    // ! 监视数据变化，只能监视被渲染出来的数据，故传递的props第一次不能监听
    // ? 属性名：要监视的数据的名称
    //   简易写法,但这种写法不能自定义规则
    // searchText () {
    //   console.log('hello')
    // }
    // TODO：推荐写法！
    searchText: {
      // *handler：处理函数，当数据发生变化则会执行 handler 函数
      // async handler () {
      //   // 找到数据接口
      //   // 请求获取数据
      //   // 模板绑定展示
      //   const { data } = await GetSearchSuggestions(this.searchText)
      //   this.suggestions = data.data.options
      // },
      // ! 对 handler 函数做防抖处理,要用原始完整命名函数
      handler: debounce(async function () {
        const { data } = await GetSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // *immediate：该回调将会在监听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    // *高亮搜索文字
    highlight (suggestion) {
      // *RegExp 是正则表达式的构造函数
      //  - 参数1：字符串
      //  - 参数2：匹配模式
      //  - 返回值：正则对象
      return suggestion.replace(new RegExp(this.searchText, 'gi'),
       `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
