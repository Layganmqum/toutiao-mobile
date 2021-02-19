<template>
  <!-- <div class="article-item">文章列表项</div> -->
  <!-- to里面的 name：路由设置的 name，parmas：想要传递的参数 -->
  <van-cell
    class="article-item"
    :to="{
      name: 'Article',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <div class="title" slot="title">{{ article.title }}</div>
    <div slot="label">
      <div
        v-if="article.cover.type === 3"
        class="cover-wrap"
      >
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 默认插槽的名字：default，可以省略 -->
    <!-- <div slot="default">hello</div> -->
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
import '@/utils/dayjs'
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
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
  methods: {}
}
</script>

<style scoped lang='less'>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: none;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    padding: 15px 0;
    display:  flex;
    flex-wrap: nowrap;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      // 排除最后一个元素，其他元素加上该属性
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 12px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
