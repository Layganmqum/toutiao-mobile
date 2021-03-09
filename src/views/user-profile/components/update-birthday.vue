<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: [],
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2002, 1, 22)
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    async onConfirm () { // *性别选项确定事件
      this.$toast({
        message: '保存中...',
        forbidClick: true // 禁止背景点击
      })

      // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      // *请求提交更新用户性别
      await UpdateUserProfile({
        birthday: date
      })
      // 更新成功 -> 修改父组件的 gender -> 关闭弹出层
      // 发布 input 时间,更新鼓组件 v-model 绑定的数据
      this.$emit('input', date)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'>

</style>
