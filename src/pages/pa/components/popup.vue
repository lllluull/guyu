<template>
  <div class="main">
    <div class="content" :style="{bottom: silderHeight}" :animation="animation1">
      <div class="title" @click.prevent.stop = 'test'>
        <span class='iconfont titleleft' > &#xe615;</span>标记为已读
      </div>
      <div class="title">
        <span class='iconfont titleleft'> &#xe609;</span>添加到书单
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'bookinfof'
    ],
    data() {
      return {
        showup: false,
        silderHeight: 0,
        animation1: ''
      }
    },
    methods: {
      test() {
        var animation1 = wx.createAnimation({
        duration: 9000,
        timingFunction: 'ease',
      })
      animation1.translateY(-300).step()
      this.animation1 = animation1.export();
      }
    },
     onReady() {
       this.test()
     }
  }
</script>
<style scoped>
.main{
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.7);
}
.content{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200rpx;
  background-color: #fff;
  transition: 2s ease all;
  opacity: 1;
}
.title{
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 30rpx;
  color: rgb(131, 128, 128);
  border-bottom: 1px solid rgb(187, 185, 185);
}
.titleleft{
  color: red;
  padding-right: 30rpx;
  padding-left: 60rpx;
}
</style>
