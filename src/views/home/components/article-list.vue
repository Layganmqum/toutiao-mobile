<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <article-item
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
      <!-- <van-cell
        v-for="(article, index) in articles"
        :key="index"
        :title="article.title"
      /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-Item/index'
import { GetArticles } from '@/api/article'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // *数据列表-显示在屏幕上
      articles: [],
      // *数据列表-加载状态(进行数据获取)
      loading: false,
      // *数据列表-加载结束状态(没有更多了)
      finished: false,
      // *数据列表-获取下一页数据的时间戳
      timestamp: null,

      // *下拉刷新的 loading 状态
      isRefreshLoading: false,
      // *下拉刷新的更新成功文本
      refreshSuccessText: null,
      // *记录列表当前scroll与顶部的距离
      scrollTop: 0
    }
  },
  computed: {},
  created () {},
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  watch: {},
  methods: {
    async onLoad () { // 加载文章列表数据
      // ! 加载步骤
      // * 1. 请求获取数据
      const { data } = await GetArticles({
        // *频道 ID
        channel_id: this.channel.id,
        // *timestamp：时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码
        timestamp: this.timestamp || Date.now(),
        // *是否包含置顶，进入页面第一次请求是要包含置顶文章，1-包含置顶/0-不包含置顶
        with_top: 1
      })
      // * 2. 把数据放到 list 数组中
      const { results } = data.data
      this.articles.push(...results)
      // * 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在加载中
      this.loading = false
      // * 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据，把加载状态设置结束，不在触发加载
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己会将 loading 状态变为 true
      // !下拉刷新步骤
      // *1、请求获取数据
      const { data } = await GetArticles({
        channel_id: this.channel.id,
        // *为了方便学习，只要传递不同的时间戳就一定返回不一样的数据，而且数据不为空
        timestamp: Date.now(),
        with_top: 1
      })
      // *2、把数据放到数据列表中(往顶部追加数据)
      const { results } = data.data
      this.articles.unshift(...results)

      // *3、关闭 loading 状态
      console.log('onRefresh')
      this.refreshSuccessText = `更新了 ${results.length} 条数据` // 成功提示
      this.isRefreshLoading = false
    }
  },
  // 当拥有 keep-alive 是会拥有这两个钩子函数
  activated () {
    // console.log('从缓存中被激活')
    // 把记录的到顶部的距离重新设置回去
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
  // deactivated () {
  //   console.log('组件失去活动')
  // }
}
</script>

<style scoped lang='less'>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
