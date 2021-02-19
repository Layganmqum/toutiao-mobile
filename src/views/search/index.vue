<template>
  <div class="search-container">
    <!-- //! Tips: 在 van-search 外层增加 form 标签，且 action 不为空
         //! 即可在 iOS 输入法中显示搜索按钮。
    -->
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /顶部搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <!-- 子组件带参数执行函数，监听时可用不用写参数名 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { GetSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: [],
  data () {
    return {
      // *搜索框输入的内容
      searchText: '',
      // *控制搜索结果显示
      isResultShow: false,
      // *搜索历史记录
      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () {},
  watch: {
    // !监视搜索历史记录的变化，当发生变化就存储到本地
    // *这里相当于全局变更，即可省略其他地方的变化修改
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  methods: {
    // *搜索栏-确认监听
    onSearch (searchText) {
      // 让输入框文字设置为要搜索的文本
      this.searchText = searchText

      // 操作历史记录，判断是否有重复项
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }

      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)

      // ?如果用户已登录，则把搜索历史记录存储到线上
      //    * 提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
      // ?如果用户没有登录，则把搜索历史记录存储到本地
      // setItem('search-histories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },
    // *搜索历史
    async loadSearchHistories () {
      // 因为后端帮我们存储的用户搜索历史记录太少了(4条)
      // 所以需要让后端返回的历史记录和本地的历史记录合并到一起

      // *获取本地历史记录
      let searchHistories = getItem('search-histories') || []
      // ?判断用户是否登录
      if (this.user) {
        const { data } = await GetSearchHistories()
        // !想要线上+本地合并，就要考虑数组去重的问题
        // TODO:这里是用 Set函数来解决数组去重的问题
        // * 步骤1-合并数组：[...Array1, ...Array2]
        // * 步骤2-把 Set 转为数组：[...Set对象]
        // ? 数组去重就是将 步骤1+步骤2 整合一起
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      }
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped lang='less'>

</style>
