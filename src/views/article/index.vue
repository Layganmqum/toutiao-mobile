<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <div class="article-wrap">
      <!-- 标题 -->
      <h1 class="title">{{ article.title }}</h1>
      <!-- /标题 -->
      <!-- 作者栏 -->
      <van-cell center class="user-info">
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="article.aut_photo"
        />
        <div slot="title" class="name" >{{ article.aut_name }}</div>
        <div slot="label" class="pubdate" >{{ article.pubdate | relativeTime }}</div>
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'danger' : 'info'"
          round
          :icon="article.is_followed ? 'star' : 'plus'"
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
        >{{ article.is_followed ? '已关注' : '关注'}}</van-button>
      </van-cell>
      <!-- /作者栏 -->
      <!-- 正文内容 -->
      <div
        v-html="article.content"
        class="content markdown-body"
        ref="article-content"
      >
      </div>
      <!-- /正文内容 -->

      <!-- 文章评论列表 -->
      <comment-list :source="articleId"/>
      <!-- /文章评论列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      ></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : '#777'"
        @click="onCollect"
      ></van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'red' : '#777'"
        @click="onLike"
      ></van-icon>
      <van-icon
        name="share"
        color="#777777"
      ></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import './github-markdown.css'
import {
  GetArticleById,
  AddCollectById,
  DeleteCollectById,
  AddLikeById,
  DeleteLikeById
} from '@/api/article'
import { AddFollow, DeleteFollow } from '@/api/user'
import { ImagePreview } from 'vant'
import CommentList from './components/comment-list'

export default {
  name: 'ArticleIndex',
  components: {
    CommentList
  },
  // ! 在组件中获取动态路由参数：
  // * 方式一：this.$route.params.xxx
  // * 方式二：props 传参 (推荐!)
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      // *文章数据对象
      article: {},
      // *关注用户的 loading 状态
      isFollowLoading: false,
      // *收藏文章的 loading 状态
      isCollectLoading: false
    }
  },
  computed: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  watch: {},
  methods: {
    async loadArticle () { // 加载文章内容
      // !这里传入的 ID 太长了，不符合JS安全传参标准，故会导致 404 报错
      const { data } = await GetArticleById(this.articleId)
      this.article = data.data

      /**
       * ! Tips: 数据改变影响视图更新(DOM 数据)不是立即的
       * * 所以如果需要在加载(修改)数据之后马上操作被该数据影响的视图 DOM
       * * 则需要把这个代码放到 $nextTick() 中
       * ? this.$nextTick() 是 Vue 官方提供的一种专门解决这个问题的方法
       * this.$nextTick(): wait DOM update
       */
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    handlePerviewImage () { // 文章加载函数
      // *1. 获取文章内容 DOM 容器
      const articleContent = this.$refs['article-content']

      // 得到所有的 img 标签
      const imgs = articleContent.querySelectorAll('img')

      // *2. 先创建一个装载图片地址的容器
      const imgPaths = []
      // *3. 循环 img 列表，给 img 注册点击事件
      // *4. 在事件处理函数中调用 ImagePreview() 预览
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // *预览图片路径列表
            startPosition: index // *预览图片起始位置
          })
        }
      })
    },
    async onFollow () { // 关注函数
      // ! Tips: 此项目由于接口问题，此处测试不了关注功能
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 用户已关注，取消关注
        await DeleteFollow(this.article.aut_id)
      } else {
        // 用户未关注，添加关注
        await AddFollow(this.article.aut_id)
      }
      // 更新按钮视图
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () { // 收藏函数
      // ! Tips: 此项目由于接口问题，此处测试不了关注功能
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) {
        // 用户已收藏，取消收藏
        await DeleteCollectById(this.articleId)
      } else {
        // 用户未收藏，添加收藏
        await AddCollectById(this.articleId)
      }
      // 更新按钮视图
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike () { // 点赞函数
      // ! Tips: 此项目由于接口问题，此处测试不了关注功能
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 用户已点赞，取消点赞
        await DeleteLikeById(this.articleId)
        this.article.attitude = -1
      } else {
        // 用户未点赞，添加点赞
        await AddLikeById(this.articleId)
        this.article.attitude = 1
      }
      // 更新按钮视图
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    }
  }
}
</script>

<style scoped lang='less'>
// *标题样式
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}

// *用户栏样式
.user-info {
  .avatar {
    height: 35px;
    width: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 14px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 30px;
  }
}

// *文章列表样式
ul {
  list-style: unset;
}

// *文章内容样式
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 50px;
  overflow-y: auto;
}
.article-bottom {
  background-color: #fff;
  height: 50px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .comment-btn {
    width: 150px;
  }
}
</style>
