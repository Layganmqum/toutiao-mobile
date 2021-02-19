<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div v-if="isDeleteShow">
        <!--
          prop 数据如果是引用类型(数组、对象)可以修改
          // ! PS:这里的修改指的是：user.name = 'Jack' / arr.push(123)...
          // ! **任何 prop 数据都不能重新赋值：xxx = xxx **
          如果想要让 prop 数据重新赋值，则需要让父组件自行修改
         -->
        <span
          style="color: red"
          @click="$emit('update-histories', [])"
        >全部删除</span>
        &nbsp;&nbsp;
        <span
          @click="isDeleteShow = false"
        >完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onHistoryClick(history, index)"
    >
    <van-icon
      v-if="isDeleteShow"
      name="close"
    />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // *删除状态显示
      isDeleteShow: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    onHistoryClick (history, index) { // 搜索历史点击事件
      if (this.isDeleteShow) {
        // 操作前需要判断：当前是否为删除状态
        this.searchHistories.splice(index, 1)
        // TODO：持久化处理
        // 1. 修改本地存储数据
        // ?无论用户是否登录,都把数据持久化到本地
        // 2. 请求接口删除线上的数据
        // ?如果用户已登录:则删除线上历史记录
        // ! PS:没有删除单个历史记录的接口，只有删除所有历史记录的接口
        // setItem('search-histories', this.searchHistories)
        // ! Tips：线上历史记录单个删除不了会导致测试此阶段有误
      } else {
        // 当前非删除状态，展示搜索结果
        this.$emit('search', history)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
