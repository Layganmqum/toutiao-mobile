<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      class="post-btn"
      size="mini"
      type="info"
      @click="onPost"
      :disabled="!message"
    >发布</van-button>
  </div>
</template>

<script>
import { AddComment } from '@/api/comment'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: '' // 评论的输入框内容
    }
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true // 禁止点击背景
      })
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求提交数据
      // 4. 处理响应结果
      const { data } = await AddComment({
        target: this.target, // 评论的目标id(评论文章即为文章id，对评论进行回复则为评论id)
        content: this.message, // 评论的内容
        art_id: this.articleId === null ? null : this.articleId.toString() // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      })

      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      // 发布成功，清空文本框内容
      this.message = ''
    }
  }
}
</script>

<style scoped lang='less'>
.post-comment {
  display: flex;
  align-items: center;
  padding: 14px;
}
.post-btn {
  width: 37.5px;
  font-size: 12px;
  text-align: center;
}
</style>
