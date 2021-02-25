<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->

    <!-- 输入框 -->
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'
export default {
  name: 'UpadateName',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.name
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {
    // * 这里进行 props 监听，解决由于渲染完成仍未加载 name 导致的 localName = undefined
    name: function (newVal, oldVal) {
      this.localName = this.name
    }
  },
  methods: {
    async onConfirm () { // 确认昵称修改事件函数
      this.$toast.loading({
        message: '保存中',
        forbidClick: true // 禁止背景点击
      })
      try {
        // 请求提交更新用户昵称
        await UpdateUserProfile({
          name: this.localName
        })
        this.$toast.success('保存成功')
        // 更新成功 -> 修改父组件的 name -> 关闭弹出层
        this.$emit('update-name', this.localName)
        this.$emit('close')
      } catch (err) { // *解决昵称已存在导致的报错
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.name-field-wrap {
  padding: 10px;
  .van-field {
    border-radius: 5px;
  }
}
</style>
