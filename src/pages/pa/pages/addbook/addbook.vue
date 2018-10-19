<template>
    <div class="main">
      <div class="content">
        <div class="title">操作步骤</div>
        <div class="dess">
          <div>1.点击下面的按钮扫描实体书背后的二位码或者条形码</div>
          <div>2.可以在我的书库中查看添加进去的图书</div>
          <div>3.点击右侧的更多按钮可以将图书标记为已读或者加入我的书单</div>
        </div>
      </div>
      <div class='button'>
        <button type='primary' @click = 'scanpic'>扫描图书二维码</button>
      </div>
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
         wx.setNavigationBarTitle({
            title: '添加图书'
          })
      },
       onPullDownRefresh(e) {
          wx.stopPullDownRefresh();
        }
    }
</script>
<style scoped>
  .main{
    height: 100%;
    width: 100%;
    background-color: rgb(221, 237, 250);
  }
  .title{
    height: 100rpx;
    width: 100%;
    padding-left: 20rpx;
    font-size: 30rpx;
    background-color: #fff;
    padding-top: 50rpx;
  }
  .dess{
    padding-top: 20rpx;
    margin-bottom: 100rpx;
    height: 200rpx;
    width: 100%;
    padding-left: 20rpx;
    padding-right: 20rpx;
    background-color: #fff;
    font-size: 25rpx;
    line-height: 50rpx;
  }
  button{
    width: 80%;
  }
  .button{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

