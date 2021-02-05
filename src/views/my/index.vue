<template>
  <div class="my-container">
    <van-cell-group>
      <!-- 顶部用户信息(头像+昵称+编辑按钮) -->
      <van-cell
        title="单元格"
        value="内容"
        center
      >
        <van-image
          slot="icon"
          width="50"
          height="50"
          round
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title">昵称</div>
        <van-button
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>
      <!-- 用户文章信息(头条+关注+粉丝+获赞) -->
      <van-grid>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
      <!-- 收藏 + 历史 -->
      <van-grid clickable :column-num="2">
        <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
        <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
      </van-grid>
      <!-- 消息通知 + 小智同学 + 退出登录 -->
      <van-cell title="消息通知" is-link url="" />
      <van-cell title="小智同学" is-link to="" />
      <van-cell title="退出登录" to="" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang='less'>

</style>
