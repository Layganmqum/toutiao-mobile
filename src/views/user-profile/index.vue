<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <van-cell title="头像" is-link>
      <van-image
        width="30"
        height="30"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
    ></van-cell>

    <!-- 修改昵称的弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 当传递子组件既要使用，又要修改
        // * 这种情况下可以用 v-model 简写
       -->
       <!--
         v-model="user-name"
          - 默认传递一个名字叫 value 的数据 :value="user.name"
          - 默认监听 input 时间 @input="user.name = $event"
        // ! v-model 的本质还是父子组件通信，他仅仅是简化了父组件的使用
        // * 子组件该声明的还是要声明，该emit 的也不可减少
        -->
      <update-name
        :name="user.name"
        @close="isEditNameShow = false"
        @update-name="user.name = $event"
      />
    </van-popup>
    <!-- /修改昵称的弹出层 -->
  </div>
</template>

<script>
import { GetUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  props: [],
  data () {
    return {
      // *用户数据
      user: {},
      // *编辑昵称弹出层显示状态
      isEditNameShow: false
    }
  },
  computed: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  watch: {},
  methods: {
    async loadUserProfile () { // 获取用户个人资料
      const { data } = await GetUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
</style>
