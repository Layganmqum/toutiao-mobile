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
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /顶部搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else/>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
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
      isResultShow: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    // 搜索栏-确认监听
    onSearch () {
      console.log(this.searchText)
      // 展示搜索结果
      this.isResultShow = true
    }
  }
}
</script>

<style scoped lang='less'>

</style>
