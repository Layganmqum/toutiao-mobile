<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- /子路由出口 -->

    <!-- 底部导航栏 route：开启路由模式 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: [],
  data () {
    return {
      // *底部导航栏选择 active
      active: 0
    }
  },
  computed: {},
  created () {},
  mounted () {
    // *重新添加缓存
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  watch: {},
  methods: {}
}
</script>

<style scoped lang='less'>

</style>
