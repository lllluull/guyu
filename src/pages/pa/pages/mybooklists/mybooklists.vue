<template>
  <div class="main">
    <div class='content'>
      <div class="one"
      v-for="(item, n) in mybooklist" :key = n
      @touchstart = 'touchstart' @touchmove = 'touchmove' @touchend = 'touchend'>
        <div class='topone' :class="touchActive[n]?'toponeactive':''"  @click='tobooklistdetail(item)'>
            <div class="img">
            <img :src="item.image">
            <div class='mask'></div>
            <div class='title'>{{item.title}}</div>
            <div class='count'><span class='iconfont myicon'>&#xe779;</span>{{item.count}}</div>
            </div>
            <div class="right" >
              <div v-for="(name, m) in item.bookname" :key = name>{{m+1}}.{{name}}</div>
            </div>
        </div>
        <div class="bottomone" :class="touchActive[n]?'toponeactive':''"  @click='delbooklist(item)'>
          删除
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {get} from '../../../../util.js'
  export default {
    data() {
      return {
        userinfo: {},
        booklists: [],
        touchx: 0,
      }
    },
    methods: {
      async getbooklist() {
          const info = await get(`/weapp/getbooklist?openid=${this.openid}`)
          this.booklists = info.message
      },
      touchstart(e) {
         this.touchx = e.clientX
      },
      touchmove(e) {
        let index = e.currentTarget.dataset.eventid.substring(2)
        let touchspace = e.clientX - this.touchx
          if(touchspace < -20) {
            this.touchActive[index] = true
            this.touchx = e.clientX
          } else if (touchspace > 20) {
            this.touchActive[index] = false
            this.touchx = e.clientX
          }

      },
      touchend(e) {
      },
      async delll(book) {
        let id = book.id
        const info = await get(`/weapp/delbooklist?id=${id}`)
        wx.showToast({
         title: info,//提示文字
         duration:2000,//显示时长
         mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false
         icon:'success', //图标，支持"success"、"loading"
        })
      },
      tobooklistdetail(item) {
        const mybooklist = JSON.stringify(item)
          wx.navigateTo({
            url:`/pages/pa/pages/booklistdetail/main?mybooklist=${mybooklist}`
          })
      },
      async delbooklist(booklist) {
        const that = this
        wx.showModal({
         title: '确定删除',
         content: '确定要删除该书单？',
         showCancel: true,//是否显示取消按钮
         cancelText:"否",//默认是“取消”
         confirmText:"是",//默认是“确定”
         success: async function (res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            } else {
              let id = booklist.id
                const info = await get(`/weapp/delbooklist?id=${id}`)
                console.log(info.message)
                wx.showToast({
                title: info.message,//提示文字
                duration:2000,//显示时长
                mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false
                icon:'success', //图标，支持"success"、"loading"
                complete: () => {
                  that.getbooklist()
                  }
                })
            }
         },
        })
      },

    },
    computed: {
      openid() {
        if(this.userinfo) {
          return this.userinfo.openId
        }
      },
      mybooklist() {
        let newbooklist = []
        if(this.booklists) {
          this.booklists.map(v => {
            v.bookallname = v.bookname
            v.bookids = v.bookids.split(',')
            v.bookname = v.bookname.split(',')
            if(v.bookname.length > 3) {
              v.bookname.splice(3)
            }
            newbooklist.push(v)
          })
        }
        return newbooklist
      },
      touchActive() {
        let active = []
        if(this.booklists) {
          this.booklists.map( v => {
            active.push(false)
          })
        }
        return active

      }
    },
    mounted() {
      wx.setNavigationBarTitle({
            title: '我的书单'
          })
      if(wx.getStorageSync('userinfo')) {
        this.userinfo = wx.getStorageSync('userinfo')
        this.getbooklist()
      }

    },
    onShow() {
      this.getbooklist()
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
    background-color: rgb(242, 242, 243)
  }
  .content{
    background-color: rgb(242, 242, 243)
  }
  .one{
    width: 100%;
    height: 200rpx;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
  }
  .topone{
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-left: -120rpx;
    transform: translateX(120rpx);
    transition: 0.4s all ease;
  }
  .img{
    height: 180rpx;
    width: 180rpx;
    position: relative;
  }
  .mask{
    height: 180rpx;
    width: 180rpx;
    position: absolute;
    z-index: 2;
    background-color: rgba(0,0,0,0.6)
  }
  img{
    height: 180rpx;
    width: 180rpx;
    position: absolute;
    z-index: 1;
    left: 0;
  }
  .title{
    height: 180rpx;
    width: 180rpx;
    color: #fff;
    position: absolute;
    line-height: 180rpx;
    text-align: center;
    left: 0;
    z-index: 13;
    font-size: 30rpx;
  }
  .count{
    position: absolute;
    bottom: 10rpx;
    right: 10rpx;
    font-size: 18rpx;
    color: #fff;
    z-index: 15;
  }
  .myicon{
    font-size: 18rpx;
    padding-right: 5rpx;
  }
  .right{
    margin-left: 30rpx;
    font-size: 26rpx;
    color: rgb(153, 151, 151)
  }
  .bottomone{
    background-color: red;
    width: 120rpx;
    color: #fff;
    font-size: 30rpx;
    transform: translateX(120rpx);
    transition: 0.4s all ease;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200rpx;
  }
  .toponeactive{
    transform: translateX(0)
  }
</style>
