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
    <!--
        //! :class="{ active: index === 激活的频道 }"
     -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        @click="onUserChannelClick(channel, index)"
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
import { GetAllChannels, AddUserChannel, DeleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEditIndex',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
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
    // *扩展运算符，将 store 里面的 user 映射到此 vue 文件里
    ...mapState(['user']),
    // ! 计算属性发生变化的时候，会自动重新计算(响应式)
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
    async onAddChannel (channel) {
      this.userChannels.push(channel)

      console.log(this.user)
      // TODO：数据持久化
      if (this.user) {
        // *用户登录状态下：数据存储到线上
        await AddUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // *用户未登录状态下：数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // *我的频道点击事件
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // ?编辑状态：删除频道
        this.deleteChannel(channel, index)
      } else {
        // ?非编辑状态：切换频道
        this.switchChannel(index)
      }
    },
    // *我的频道-删除频道
    async deleteChannel (channel, index) {
      // !如果删除的是当前激活频道之前的频道，需要更新 active
      if (index <= this.active) {
        // *更新激活频道的 active
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)

      // TODO:数据持久化
      if (this.user) {
        // *用户登录状态：将数据存储到数据库
        await DeleteUserChannel(channel.id)
      } else {
        // *用户未登录状态：将数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    // *我的频道-切换频道
    switchChannel (index) {
      // ?切换频道
      this.$emit('update-active', index)
      // ?关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top: 54px;

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
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
