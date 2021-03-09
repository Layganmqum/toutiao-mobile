<template>
  <div class="login-container">
    <!-- 登录头部 -->
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /登录头部 -->

    <!-- 登录表单 -->
    <!--
      基于 Vant 的表单验证：
      1、 使用 van-form 组件包裹所有的表单项 van-field
      2、 给 van-form 绑定 submit 事件
          当表单提交的时候会触发 submit 事件
          提示：只有表单验证通过，他才会调用 submit
      3、 使用 Field 的 rules 属性定义校验规则
     -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @failed="onFailed"
      @submit="onLogin"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
      <!-- 这里发送验证码按钮点击事件需要加上 .prevent 来防止默认事件的表单监听 -->
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="60 * 1000"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-if="!isCountDownShow"
            class="send-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            loading-type="spinner"
            @click.prevent="onSendSms"
          >获取验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
          center
        >登录</van-button>
      </div>
      <!-- /登录按钮 -->
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { Login, SendSms } from '@/api/user.js'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: [],
  data () {
    return {
      // *用户登录数据
      user: {
        // *手机号
        mobile: '13922222222',
        // *验证码
        code: '246810'
      },
      // *表单验证规则定义
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // *发送验证码按钮倒计时显示
      isCountDownShow: false,
      // *发送验证码按钮的 loading 状态
      isSendSmsLoading: false
    }
  },
  computed: {},
  created () {},
  mounted () {
  },
  watch: {},
  methods: {
    // * 登录事件
    async onLogin () {
      // *自定义加载图标
      this.$toast.loading({
        message: '加载中...', // 文本内容
        forbidClick: true, // 是否禁止背景点击
        loadingType: 'spinner', // 加载图标类型
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // ? async + await 异步调用终极方法
      // const res = await Login(this.user)
      // console.log(res)
      // ? promise 接受链式调用方法
      // Login(this.user).then(res => {
      //   console.log(res)
      // }).catch(error => {
      //   console.log(error)
      // }).finally(() => {
      //   console.log('111')
      // })
      // *1. 找到数据接口
      // *2. 封装请求方法
      // *3. 请求调用登录
      // *4. 处理响应结果
      // ! 项目练手主要运用 async + await (需要用 try + catch 处理)
      try {
        const { data } = await Login(this.user) // ?结构 response 里面的 data 对象
        // *处理响应结果
        this.$toast.success('登录成功')
        // *将后端返回的用户的登录状态(token 等数据)放到 Vuex 容器中
        this.$store.commit('setUser', data.data)

        // 清除 layoutIndex 缓存,让它重新渲染
        this.$store.commit('removeCachePage', 'LayoutIndex')

        // *登录成功，跳转回原来页面
        // this.$router.back() // ! 这方式有问题，暂时用这种方式
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        this.$toast.fail('登录失败\n手机号/验证码输入错误')
        console.log(err)
      }
    },
    // * 表单失败监听
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 显示位置
        })
      }
    },
    // * 发送验证码按钮事
    async onSendSms () {
      // * validate 验证成功返回的是 undefined，失败返回的是表单验证错误信息
      // this.$refs['login-form'].validate('mobile').then(res => {
      //   console.log(res)
      // })
      // ? 事件流程
      // 1. 校验手机号码
      // 2. 验证通过 -> 请求发送验证码 -> 用户接受短信 -> 输入验证码 -> 请求登录
      // 3. 请求发送验证码 -> 隐藏发送按钮,显示倒计时
      // 4. 倒计时结束 -> 隐藏倒计时,显示发送按钮
      try {
        // *1. 校验手机号码
        await this.$refs['login-form'].validate('mobile') // 成功不需要输出

        // *2. 验证通过，请求发送验证码
        this.isSendSmsLoading = true // ? 展示按钮的 loading 状态，防止网络慢的用户多次点击触发发送行为
        await SendSms(this.user.mobile)

        // *3. 验证码发送出去了，该显示倒计时了
        this.isCountDownShow = true
      } catch (err) {
        // try 里面的任何代码错误都会进入 catch
        // ? 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // * 发送短信失败的错误提示
          message = '客官别急\n等一等哟~'
        } else if (err.name === 'mobile') {
          // *表单验证实拍的错误提示
          message = err.message
        } else {
          // *未知错误
          message = '秋波暗送失败\n涂个口红再来哟'
        }
        this.$toast({
          message, // 提示消息
          position: 'top' // 显示位置
        })
      } finally {
        // *无论发送验证码成功与否，最后都需要关闭发送按钮的 loading 状态
        this.isSendSmsLoading = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  .login-btn-wrap {
    padding: 32px 32px;
  }
  .van-count-down{
    margin-top: 5.53px;
    height: 23px;
    width: 76px;
    line-height: 23px;
    background-color: #ededed;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
    border-radius: 999px;
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn {
    background-color: #6db4fb;
    border-radius: 10px;
  }
}
</style>
