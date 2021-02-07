<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <!-- 顶部用户信息(头像+昵称+编辑按钮) -->
      <van-cell
        class="base-info"
        :border="false"
        center
      >
        <van-image
          class="avatar"
          slot="icon"
          width="50"
          height="50"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <van-button
          class="update-btn"
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>
      <!-- 用户文章信息(头条+关注+粉丝+获赞) -->
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div @click="$router.push('/login')">
        <van-image
          class="mobile"
          width="66"
          height="66"
          round
          fit="cover"
          :src="require('./shouji.png')"
        />
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- 收藏 + 历史 -->
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 消息通知 -->
    <van-cell title="消息通知" is-link url="" />
    <!-- 小智同学 -->
    <van-cell class="mb-4" title="小智同学" is-link to="" />
    <!-- 退出登录 -->
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: [],
  data () {
    return {
      // *当前登录用户信息
      currentUser: {}
    }
  },
  computed: {
    // *如果 user 放在 data 里面则不是响应式的(除非用 watch 监听)
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  mounted () {},
  watch: {},
  methods: {
    onLogout () { // 点击退出登录
      // ?提示用户确认退出
      this.$dialog.confirm({
        title: '最后的挽留',
        message: '确认离开我吗？'
      })
        .then(() => { // 确认执行这里
          // *清除用户登录状态(把 Vuex 的 uesr 清除)
          this.$store.commit('setUser', null)
        })
        .catch(() => { // 取消执行这里
          // *退出登录
          this.$toast({
            message: '客官记得早点回家哦~', // 提示消息
            position: 'top' // 显示位置
          })
        })
      // ?点击确认 -> 处理退出
    },
    async loadCurrentUser () { // 获取登录用户信息
      const { data } = await GetCurrentUser()
      this.currentUser = data.data
    }
  }
}
</script>

<style scoped lang='less'>
.my-container{
  // 我的信息样式
  .my-info{
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info{
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      height: 115px;
      background-color: unset;
      .avatar{
        box-sizing: border-box;
        height: 66px;
        width: 66px;
        border: 1px solid #ffffff;
        margin-right: 11px;
      }
      .name{
        color: #ffffff;
        font-size: 15px;
      }
      .update-btn{
        height: 16px;
        font-size: 12px;
        color: #666666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #ffffff !important;
        .text-wrap{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count{
            font-size: 18px;
          }
          .text{
            font-size: 12px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content{
      background-color: unset;
    }
  }
  // 收藏-历史 样式
  /deep/ .nav-grid{
    .nav-grid-item{
      height: 70px;
      .toutiao{
        font-size: 22px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
  }
  // 退出 单元格样式
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
  .not-login{
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text{
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
