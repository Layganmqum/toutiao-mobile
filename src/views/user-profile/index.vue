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

    <input
      type="file"
      name="avatar"
      ref="file"
      hidden
      accept="image/*"
      @change="onFileChange"
    >
    <!-- accept="image/*" 意思是：所有图片都可以选 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
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
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
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
        <!--
          // ! v-model 只能使用一次
          // ? 如果有多个数据需要保持同步，使用 .sync 修饰符
          // TODO:举例
          :gender.sync="user.gender"
            - :gender="user.gender"
            - @update-gender="user.gender = $event"
          子组件 $emit('update:gender', event)
         -->
      <update-name
        v-if="isEditNameShow"
        :name="user.name"
        @close="isEditNameShow = false"
        @update-name="user.name = $event"
      />
    </van-popup>
    <!-- /修改昵称的弹出层 -->
    <!-- 修改性别的弹出层 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isEditGenderShow"
        v-model="user.gender"
        @close="isEditGenderShow = false"
      />
    </van-popup>
    <!-- /修改生日的弹出层 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow = false"
        @update-name="user.name = $event"
      />
    </van-popup>
    <!-- /修改生日的弹出层 -->
    <!-- /修改用户头像的弹出层 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        class="update-photo-popup"
        v-if="isEditPhotoShow"
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /修改用户头像的弹出层 -->
  </div>
</template>

<script>
import { GetUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: [],
  data () {
    return {
      // *用户数据
      user: {},
      // *编辑昵称弹出层显示状态
      isEditNameShow: false,
      // *编辑性别弹出层显示状态
      isEditGenderShow: false,
      // *编辑生日弹出层显示状态
      isEditBirthdayShow: false,
      // *编辑修改头像弹出层显示状态
      isEditPhotoShow: false,
      // *上传预览图片
      previewImage: null
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
    },
    onFileChange () { // 头像改变选取监听
      // 在弹出层里面预览图片
      // !从文件中拿到图片对象
      const file = this.$refs.file.files[0]
      this.previewImage = file
      // 展示弹出层
      this.isEditPhotoShow = true

      // TODO: 为了解决相同文件不触发 change 事件，所以在这里手动的清空 file 的 value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
