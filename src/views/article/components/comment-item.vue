<template>
  <van-cell
    class="comment-item"
    :title="comment.content"
  >
    <van-image
      class="avatar"
      round
      fit="cover"
      slot="icon"
      :src="comment.aut_photo"
    />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap">
          <van-icon
            class="like-icon"
            :color="comment.is_liking ? 'red' : ''"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          ></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="pubdate-wrap">
        <span class="pubdate">{{ comment.pubdate | dateTime('MM-DD HH:MM') }}</span>
        <van-button
          class="reply-btn"
          round
          size="mini"
          @click="$emit('reply-click', comment)"
        >{{ comment.reply_count}} 回复</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { AddCommentLike, DeleteCommentLike } from '@/api/comment'
import '@/utils/dayjs'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    // ! 目前接口问题，点赞功能不可用
    async onCommentLike () { // 评论点赞函数
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已点赞，取消点赞
        await DeleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 没有点赞，添加点赞
        await AddCommentLike(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang='less'>
.comment-item {
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .like-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pubdate-wrap {
    display: flex;
    align-items: center;
  }
}
</style>
