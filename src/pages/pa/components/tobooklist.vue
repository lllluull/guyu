<template>
    <div class="main1">
      <div class="realtitle">
        <div class='innertitle'>收藏到书单</div>
      </div>
      <div class="title" @click = 'toaddbooklist'>
        <div class="img"><div class='iconfont myfont'>&#xe603;</div></div><div class='name'>新建书单</div>
      </div>
      <div class="title" v-for='(item, index) in booklists' :key=index @click='addonebook(item.title)'>
        <div class="img"><img :src="item.image"></div><div class='name'><div class='bookname'>{{item.title}}</div><div class='bookcount'>共{{item.count}}本</div></div>
      </div>
    </div>
</template>
<script>
import {get} from '../../../util.js'
export default {
    props: [
      'bookinfof'
    ],
    data() {
      return {
        userinfo:{},
        booklists: []
      }
    },
    methods: {
      toaddbooklist() {
          wx.navigateTo({
              url:`/pages/pa/pages/addbooklist/main?bookid=${this.bookid}&img=${this.img}&title=${this.title}`
          })
          this.getbooklist()
      },
      async addonebook(title) {
        const res = await get(`/weapp/addonebook?openid=${this.openid}&bookid=${this.bookid}&title=${title}&bookname=${this.title}`)
        wx.showModal({
                title: '提示',
                content: res.message,
                showCancel: false,
                success: this.getback()
              })
        this.getbooklist()
      },
      async getbooklist() {
          const info = await get(`/weapp/getbooklist?openid=${this.openid}`)
          this.booklists = info.message
      },
      async getback() {
          this.getbooklist()
          this.$emit('hidepop');

      }
    },
    computed: {
      bookid(){
        if(this.bookinfof.last === 'shi') {
          return this.bookinfof.id
        } else {
          return this.bookinfof.bookid
        }
      },
      img() {
        if(this.bookinfof) {
          return this.bookinfof.image
        }
      },
      title() {
        if(this.bookinfof) {
          return this.bookinfof.title
        }
      },
      openid() {
        if(this.userinfo) {
          return this.userinfo.openId
        }
       }
    },
    async mounted() {
      if(wx.getStorageSync('userinfo')) {
        this.userinfo = wx.getStorageSync('userinfo')
      }
      this.getbooklist()
    },
    async onShow(){
     this.getbooklist()
     console.log('pppp')
    }
}
</script>
<style scoped>
  .main1{
    width: 100%;
    height: 400px;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    opacity: 1;
    z-index: 1000;
    background-color: #fff;
  }
  .realtitle{
    height: 60rpx;
    line-height: 60rpx;
    widows: 100%;
    background-color: rgb(213, 215, 216);
    color: rgb(87, 87, 87);
    font-size: 30rpx;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
  }
  .innertitle{
    padding-left: 20rpx;
  }
  .title{
    width: 100%;
    height: 100rpx;
    color: rgb(87, 88, 88);
    display: flex;
    align-items: center;
    font-size: 30rpx;
    border-bottom: 1px solid rgb(238, 236, 236);
  }
  .img{
    width: 80rpx;
    height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(252, 232, 232);
    margin-left: 10rpx;
  }
  .myfont{
    font-size: 60rpx;
    color: red;
  }
  .name{
    height: 100rpx;
    line-height: 100rpx;
    margin-left: 20rpx;
  }
  img{
    width: 80rpx;
    height: 80rpx;
  }
  .bookname{
    height: 50rpx;
    line-height: 50rpx;
  }
  .bookcount{
    height: 50rpx;
    line-height: 50rpx;
    color: rgb(194, 196, 197);
    font-size: 25rpx;
  }
</style>

