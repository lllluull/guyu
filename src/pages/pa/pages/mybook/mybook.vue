<template>
  <div class="main">
      <div class="bookshow">
        <div class="navout">
          <div class="nav" >
            <div class="navitem" v-for='(item, index) in nav' :key='index' :class="index ===  activeIndex? 'active' : ''" @click="changeactive(index)">
              {{item}}
            </div>
          </div>
          <div class="slider" :style="{transform: 'translateX(' + silderwidth + 'rpx)'}"></div>
        </div>
        <div class="content">
            <swiper @change= 'changeindex' class='swiper'>
              <block>
                <swiper-item class='wiper-item'>
                  <div>
                    <div>
                      <mycard v-for = '(book,index) in booklist1' :key =index :book='book' :rate = 'book.rate'></mycard>
                  </div>
                  </div>
                </swiper-item>
              </block>
              <block>
                <swiper-item>
                  <div>
                    <div>
                      <mycard v-for = '(book,index) in booklist2' :key =index :book='book' :rate = 'book.rate'></mycard>
                  </div>
                  </div>
                </swiper-item>
              </block>
              <block>
                <swiper-item>
                  <div>
                    <div>
                      <mycard v-for = '(book,index) in booklist' :key =index  :book='book' :rate = 'book.rate'></mycard>
                  </div>
                  </div>
                </swiper-item>
              </block>
            </swiper>
        </div>
      </div>
  </div>
</template>
<script>
import addbook from '../../components/addbook'
import mycard from '../../components/card'
import {post} from '@/util'
  export default{
    data() {
      return {
        userinfo: {},
        booklist: [],
        booklist1: [],
        booklist2: [],
        nav:[
          '未读的书',
          '已读的书',
          '我的藏书'
        ],
        activeIndex: 0
      }
    },
    components: {
      addbook,
      mycard
    },
    methods: {
        async mybook () {
          try {
                const info  = await post('/weapp/mybooks', {
                    openid: this.userinfo.openId,
                    read: 0
                  })
                  this.booklist1 = info.message
            } catch(e) {
              wx.showModal({
                    title: '失败',
                    content: '加载失败',
                    showCancel: false,
                  })
            }
          },
          async mybook1 () {
          try {
                const info  = await post('/weapp/mybooks', {
                    openid: this.userinfo.openId,
                    read: 1
                  })
                  this.booklist2 = info.message
            } catch(e) {
              wx.showModal({
                    title: '失败',
                    content: '加载失败',
                    showCancel: false,
                  })
            }
          },
          async mybook2 () {
          try {
                const info  = await post('/weapp/mybooks', {
                    openid: this.userinfo.openId,
                    read: 2
                  })
                  this.booklist = info.message
            } catch(e) {
              wx.showModal({
                    title: '失败',
                    content: '加载失败',
                    showCancel: false,
                  })
            }
          },
        changeactive(index) {
          this.activeIndex = index
        },
        changeindex(e) {
          this.activeIndex = e.mp.detail.current
        }
    },
    async mounted() {
      if(wx.getStorageSync('userinfo')) {
          this.userinfo = wx.getStorageSync('userinfo')
          this.mybook()
          this.mybook1()
          this.mybook2()
        }
    },
    computed: {
      silderwidth() {
        return this.activeIndex * 250
      },
    },
    onPullDownRefresh(e) {
      wx.stopPullDownRefresh();
    }
  }

</script>
<style scoped>
.nav{
  width: 100%;
  height: 90rpx;
  display: flex;
}
.navitem{
  flex:1;
  height: 90rpx;
  font-size: 30rpx;
  display:flex;
  justify-content: center;
  align-items: center;
}
.slider{
  height: 10rpx;
  width: 33.3%;
  background: red;
  transition: 1s ease all;
}
.navout {
  width: 100%;
  height: 100rpx;
  border-bottom: 1px solid rgb(160, 158, 158);
}
.active{
  color: red;
}
.swiper, .main, .bookshow, .content, .wiper-item{
  height: 100%;
}
</style>
