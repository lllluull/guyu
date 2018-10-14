<template>
  <div>
    <div v-if='!userinfo.nickName' class='showall'>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
    </div>
    <div class='mainme'>
      <img :src=userinfo.avatarUrl >
      <p>{{userinfo.nickName}}</p>
    </div>
  </div>
</template>

<script>
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config.js'
  import prgressover from '@/components/progress'
  import {post, get} from '@/util'
  export default {
    data () {
      return {
        userinfo: {},
        booklist: [],
        page: 0,
        more: true,
      }
    },
    methods: {
      doLogin () {
        console.log('---------------')
        qcloud.setLoginUrl(config.loginUrl)
        const session = qcloud.Session.get()
        if (session) {
            qcloud.loginWithCode({
                success: res => {
                    this.userinfo = res
                    wx.setStorageSync('userinfo', this.userinfo)
                },
                fail: err => {
                    console.error(err)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                success: res => {
                    this.userinfo = res
                    wx.setStorageSync('userinfo', this.userinfo)
                },
                fail: err => {
                    console.error(err)
                }
            })
          }
      },
      async getBookList(init) {
        wx.showNavigationBarLoading()
        if(init) {
          this.page = 0
          this.more = true
          this.booklist = []
        }
        const booklist = await get(`/weapp/booklist?page=${this.page}`)
        if (booklist.code === -1) {
            wx.showToast({
              title: booklist.message,
              mask: true,
              icon: 'none',

            })
        } else {
          if(booklist.message.length < 6 && this.page > 0) {
            this.more = false
          }
          this.booklist = this.booklist.concat(booklist.message)
        }
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      },
    },
    components: {
      prgressover,
    },
    async created () {
      if(wx.getStorageSync('userinfo')) {
        this.userinfo = wx.getStorageSync('userinfo')
      }
       this.getBookList(true)
    },
    onPullDownRefresh() {
    this.getBookList(true)
  },
  onReachBottom() {
    if (!this.more) {
      return
    } else {
      this.page += 1
      this.getBookList(false)
    }
  }

  }
</script>
<style scoped>
  .mainme {
    padding-top: 30rpx;
    width: 100%;
    text-align: center;
    padding-bottom: 30rpx;
  }
  img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%
  }
  p {
    padding-top: 10rpx;
  }
  .showall {
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
</style>
