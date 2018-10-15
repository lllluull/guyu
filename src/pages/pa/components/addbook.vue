<template>
    <div class="main">
      <button type='primary' @click = 'scanpic'>扫描图书二维码</button>
    </div>
</template>
<script>
import {post} from '@/util'
    export default {
      data() {
        return {
          userinfo: {}
        }
      },
      methods: {
        scanpic () {
          wx.scanCode({
            success: (res) => {
              this.addbook(res.result)
              console.log(res.result)
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
          try {
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
            } catch(e) {
              wx.showModal({
                    title: '失败',
                    content: '找不到该书',
                    showCancel: false,
                  })
            }
          }

      },
      mounted() {
        if(wx.getStorageSync('userinfo')) {
          this.userinfo = wx.getStorageSync('userinfo')
        }
      },
    }
</script>
<style>

</style>
