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
      >{{ article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <!-- /作者栏 -->
    <!-- 正文内容 -->
    <div v-html="article.content" class="content markdown-body">
    </div>
    <!-- /正文内容 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { GetArticleById } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
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
      article: {}
    }
  },
  computed: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  watch: {},
  methods: {
    async loadArticle () {
      // !这里传入的 ID 太长了，不符合JS安全传参标准，故会导致 404 报错
      const { data } = await GetArticleById(this.articleId)
      this.article = data.data
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
</style>
