<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { GetSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // *搜索结果页码
      page: 1,
      // *搜索结果每页大小
      perPage: 20
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    async onLoad () {
      // *1. 请求获取数据
      const { data } = await GetSearchResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索的关键字
      })
      console.log(data)
      // *2. 将数据放到数据列表中
      const { results } = data.data
      // ES6中数组合并
      this.list.push(...results)

      // *3. 关闭本次的 loading
      this.loading = false
      // *4. 判断是否还有数据
      if (results.length) {
        //  ?- 如果还有数据：则更新获取下一页数据的页码
        this.page++
      } else {
        //  ?- 如果没有数据：则把 finished 设置为 true，关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
.search-result {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
