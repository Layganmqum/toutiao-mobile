<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">
        我的频道<span>点击进入频道</span>
      </div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        @click="onUserChannelClick(index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-bottom">
        频道推荐<span>点击移动频道</span>
      </div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { GetAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEditIndex',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // *所有频道数据列表
      allChannels: [],
      // *控制编辑显示状态
      isEdit: false
    }
  },
  computed: {
    // ! 计算属性发生变化的时候，会自动重新计算
    recommendChannels () {
      // ? 思路：所有频道 - 我的频道 = 剩下的推荐频道
      // * filter 方法：过滤数据，根据方法返回的布尔值 true 来收集数据
      return this.allChannels.filter(channel => {
        // ? 判断 channel 是否属于用户频道
        // *find 方法查找满足条件的单个元素
        return !this.userChannels.find(userChannel => {
          // !找到满足该条件的元素
          return userChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  watch: {},
  methods: {
    // *加载 channel 列表
    async loadAllChannels () {
      const { data } = await GetAllChannels()
      this.allChannels = data.data.channels
    },
    // *添加列表标签
    onAddChannel (value) {
      this.userChannels.push(value)
      // TODO：数据持久化
    },
    // *我的频道点击事件
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // ?编辑状态：删除频道
        this.deleteChannel(index)
      } else {
        // ?非编辑状态：切换频道
        this.switchChannel(index)
      }
    },
    // *我的频道-删除频道
    deleteChannel (index) {
      this.userChannels.splice(index, 1)
      // TODO:数据持久化
    },
    // *我的频道-切换频道
    switchChannel (index) {

    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top: 54px;
}
.channel-title, .channel-bottom {
  font-size: 16px;
  color: #333333;
  span {
    margin-left: 15px;
    font-size: 12px;
    color: lightgray;
    line-height: 16px;
  }
}
.grid-item {
  position: relative;
  width: 80px;
  height: 43px;
  /deep/ .van-grid-item__content {
    padding: 0%;
    background-color: #f4f5f6;
    .van-grid-item__text {
      margin-top: 0;
      font-size: 14px;
      color: #222222;
    }
  }
  /deep/ .van-grid-item__icon {
    position: absolute;
    right: -5px;
    top: -5px;
    font-size: 20px;
    color: red;
    z-index: 10;
  }
}
</style>
