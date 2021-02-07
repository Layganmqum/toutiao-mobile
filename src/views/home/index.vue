<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <!--
      标签页组件有一个功能，只有第1次查看标签页的时候才会渲染里面的内容
     -->
    <van-tabs v-model="active">
      <van-tab
        v-for="(channel, index) in channels"
        :key="index"
        :title="channel.name"
      >
        <!-- 文章列表组件 -->
        <ArticleList :channel="channel"/>
      </van-tab>
    </van-tabs>
    <!-- /文章频道列表 -->
  </div>
</template>

<script>
import { GetUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: [],
  data () {
    return {
      // *控制被激活的标签 channel
      active: 0,
      // *频道列表
      channels: []
    }
  },
  computed: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  watch: {},
  methods: {
    async loadChannels () {
      const { data } = await GetUserChannels()
      console.log(data)
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang='less'>
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    color: #ffffff;
    font-size: 14px;
    background-color: #5babfb;
    border: none;
  }
}

</style>
