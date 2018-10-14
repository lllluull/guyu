<template>
    <div class="main">
      <button type='primary' @click = 'scanpic'>扫描图书二维码</button>
    </div>
</template>
<script>
import {post} from '@/util'
    export default {
      props: [
        'userinfo'
      ],
      methods: {
        scanpic () {
          wx.scanCode({
            success: (res) => {
              this.addbook(res.result)
            },
            fail: (res) => {
              wx.showModal({
                title: '失败',
                content: '扫描失败',
                showCancel: false,
              })
            }
          })
        },
        async addbook (isbn) {
          const res = await post('/weapp/addbook', {
            isbn,
            openid: this.userinfo.openId
          })
          if(res.code === -1) {
            wx.showModal({
                title: '提示',
                content: '添加失败',
                showCancel: false,
              })
              return
          }
          wx.showModal({
                title: '提示',
                content: res.message,
                showCancel: false,
              })
        }
      }
    }
</script>
<style>

</style>
