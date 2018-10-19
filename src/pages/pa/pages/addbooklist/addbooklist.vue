<template>
  <div class="main">
    <div class="header">
      <input type="text" placeholder="书单标题" v-model="title" :focus = 'focus'><span class='iconfont myicon' v-if='title' @click='del'>&#xe69a;</span>
    </div>
    <div class="content">
      <button class='successbutton' @click='add'>确认</button>
    </div>
  </div>
</template>

<script>
import {get} from '../../../../util.js'
  export default {
    data() {
      return {
        bookid: '',
        img: '',
        title: '',
        focus: true,
        userinfo: {},
        bookname: ''
      }
    },
    methods: {
      del() {
        this.title = ''
      },
      back() {
        wx.navigateBack()
      },
      async add() {
        const info = await get(`/weapp/addbooklist?bookid=${this.bookid}&openid=${this.userinfo.openId}&image=${this.img}&title=${this.title}&bookname=${this.bookname}`)
        await wx.showModal({
                title: '提示',
                content: info.message,
                showCancel: false,
                success:this.back()
              })
      }
    },
    computed: {
      openid() {
        return this.userinfo.openid
      }
    },
    mounted() {
      this.bookid = this.$root.$mp.query.bookid
      this.img = this.$root.$mp.query.img
      this.title = this.$root.$mp.query.title
      this.bookname = this.$root.$mp.query.title
      wx.setNavigationBarTitle({
            title: '创建书单'
          })
      if(wx.getStorageSync('userinfo')) {
        this.userinfo = wx.getStorageSync('userinfo')
      }
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
    background-color: rgb(220, 221, 221);
  }
  .header{
    margin-top: 20rpx;
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    background-color: rgb(250, 251, 252);
    box-sizing: border-box;
  }
  input{
    width: 80%;
    height: 80rpx;
    margin-left: 20rpx;
    font-size: 28rpx;
    color: rgb(135, 137, 138)
  }
  .myicon{
    margin-left: 90rpx;
    font-size: 30rpx;
    color: rgb(243, 137, 137)
  }
  .content{
    width: 100%;
    height: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button{
    height: 100rpx;
    width: 600rpx;
    border: 0;
    outline: none;
    color: aliceblue;
    font-size: 35rpx;
    font-weight: bold;
    margin: 0;
    padding: 0;
    line-height: 100rpx;
    opacity: 0.8;
  }
  .successbutton {
    background-color: rgb(32, 151, 32);
    letter-spacing: 30rpx;
  }
</style>
