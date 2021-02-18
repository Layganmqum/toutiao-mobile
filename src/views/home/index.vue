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
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道标签列表 -->
    <!--
      标签页组件有一个功能，只有第1次查看标签页的时候才会渲染里面的内容
     -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="(channel, index) in channels"
        :key="index"
        :title="channel.name"
      >
        <!-- 文章列表组件 -->
        <ArticleList :channel="channel"/>
        <!-- /文章频道标签列表 -->
      </van-tab>
      <!-- 汉堡按钮定位把标签列表最后的位置给挡住了，解决办法是在最后添加一个占位元素 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <!-- 标签栏右侧按钮 -->
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
      <!-- /标签栏右侧按钮 -->
    </van-tabs>

    <!-- 底部弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      get-container="body"
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
    >
    <!--
      //!模板中的 $event 表示事件参数,传递的参数是 1，$event = 1
    -->
    <channel-edit
      :userChannels="channels"
      :active="active"
      @close="isChannelEditShow = false"
      @update-active="active = $event"
    />
    </van-popup>
    <!-- /底部弹出层 -->
  </div>
</template>

<script>
import { GetUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: [],
  data () {
    return {
      // *控制被激活的标签 channel
      active: 0,
      // *频道列表
      channels: [],
      // *控制编辑频道的编辑状态
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  mounted () {},
  watch: {},
  methods: {
    // *请求获取频道数据
    async loadChannels () {
      let channels = []
      // const { data } = await GetUserChannels()
      // this.channels = data.data.channels
      // *要正确的获取频道列表数据就需要判断 用户是否登录/本地存储是否有数据 否则就加载推荐的频道
      if (this.user) {
        // ?用户登录状态：请求获取用户的线上频道列表数据
        const { data } = await GetUserChannels()
        channels = data.data.channels
      } else {
        // ?用户未登录状态：判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')
        if (localChannels) { // 如果有本地存储的频道列表则使用
          channels = localChannels
        } else { // 如果没有本地存储列表，则使用推荐的列表
          const { data } = await GetUserChannels()
          channels = data.data.channels
        }
        // *把处理好的数据放到 data 中以供模板使用
        this.channels = channels
      }
    },
    // *子组件传值切换频道
    onUpdateActive (index) {
      this.active = index
    }
  }
}
</script>

<style scoped lang='less'>
// * 该页面样式
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
// * 文章列表标签样式
.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 15px !important;
    height: 3px;
    background-color: #3296fa;
    margin-bottom: 5px;
  }
}
// * 弹出层样式
.channel-edit-popup {
  height: 100%;
}
// * 标签弹出层控制按钮样式
.wap-nav-wrap {
  position: fixed;
  right: 0;
  width: 33px;
  height: 43px;
  line-height: 43px;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon {
    font-size: 24px;
  }
}
// * 标签列表占位 div
.wap-nav-placeholder {
  width: 33px;
  // ?flex-shrink 作用:
  // * 当父元素 display: flex 时，子元素已经分配好 flex 的占位比
  // * 设置 flex-shrink 则不参与占位分配，重新分配文件流，给定固定宽高
  flex-shrink: 0;
}
</style>
