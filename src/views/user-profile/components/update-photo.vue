<template>
  <div class="update-photo">
    <img class="image" :src="image" alt="" ref="image">
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { UpdateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  created () {},
  mounted () {
    // ? 获取需要裁切的图片 DOM
    const image = this.$refs.image
    const cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    console.log(cropper)
  },
  watch: {},
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onConfirm () { // 确认按钮监听
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0 // 展示时间，0表示持续展示
      })

      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      // * 如果要求 Content-Type 是 multipart/form-data，
      // ?一定要提交 FormData 数据对象，专门用于文件上传的，不能提交 {}，不然没有作用
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await UpdateUserPhoto(fd)
      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'>
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.image {
  max-width: 100%;
}
</style>
