<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="genderIndex"
      @cancel="$emit('close')"
      @change="onGenderChange"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // *性别选择器选项
      columns: ['男', '女'],
      // *用户性别value
      genderIndex: this.value || 0
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    onGenderChange (picker, value, index) { // picker 选择器改变时触发的参数
      this.genderIndex = index
    },
    async onConfirm () { // *性别选项确定事件
      this.$toast({
        message: '保存中...',
        forbidClick: true // 禁止背景点击
      })
      // *请求提交更新用户性别
      await UpdateUserProfile({
        gender: this.genderIndex
      })
      // 更新成功 -> 修改父组件的 gender -> 关闭弹出层
      // 发布 input 时间,更新鼓组件 v-model 绑定的数据
      this.$emit('input', this.genderIndex)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'>

</style>
