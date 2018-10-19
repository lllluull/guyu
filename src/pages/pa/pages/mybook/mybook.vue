<template>
  <div class="main">
      <div class="bookshow">
        <div class="navout">
          <div class="nav" >
            <div class="navitem" v-for='(item, index) in nav' :key='index' :class="index ===  activeIndex? 'active' : ''"  @click='changeactive(index)'>
              {{item}}
            </div>
          </div>
          <div class="slider" :style="{transform: 'translateX(' + silderwidth + 'rpx)'}"></div>
        </div>
        <div class="content">
            <swiper @change= 'changeindex' class='swiper' :current='activeIndex' autoplay='false'>
              <block>
                <swiper-item class='wiper-item'>
                  <div>
                    <div>
                      <mycard v-for = '(book,index) in booklist1' :key =index :book='book' :rate = 'book.rate' @bookinfo = 'bookinfo'></mycard>
                  </div>
                  </div>
                </swiper-item>
              </block>
              <block>
                <swiper-item>
                  <div>
                    <div>
                      <mycard v-for = '(book,index) in booklist2' :key =index :book='book' :rate = 'book.rate' @bookinfo = 'bookinfo'></mycard>
                  </div>
                  </div>
                </swiper-item>
              </block>
              <block>
                <swiper-item>
                  <div>
                    <div>
                      <mycard v-for = '(book,index) in booklist' :key =index  :book='book' :rate = 'book.rate' @bookinfo = 'bookinfo'></mycard>
                  </div>
                  </div>
                </swiper-item>
              </block>
            </swiper>
        </div>
      </div>
      <div  class = 'pop' v-if='popshow'  @click = 'changshow'>
      </div>
      <div class="content1" :style="{bottom: silderHeight}" :animation="animation1" >
        <div class="realtitle">
          <div class='innertitle'><img :src="bookinfof.image" ><div>{{bookinfof.title}}</div></div>
        </div>
        <div class="title" @click.prevent.stop = 'updateread'>
          <div><span class='iconfont titleleft' > &#xe615;</span>标记为已读</div>
        </div>
        <div class="title" @click.stop.prevent='test4'>
          <div><span class='iconfont titleleft'> &#xe609;</span>添加到书单</div>
        </div>
      </div>
      <div class='testtest' :animation="animation2">
        <addmybooklist :bookinfof='bookinfof' @hidepop = 'hidepop'></addmybooklist>
      </div>
  </div>
</template>
<script>
import addbook from '../../components/addbook'
import mycard from '../../components/card'
import {post, get} from '@/util'
import addmybooklist from '../../components/tobooklist'
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
        activeIndex: 0,
         bookinfof: {},
        popshow: false,
        animation1: '',
        animation2: ''
      }
    },
    components: {
      addbook,
      mycard,
      addmybooklist
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
        },
        bookinfo(value) {
      this.bookinfof = value
      this.popshow = true
      this.test()
    },
    changshow() {
      this.popshow = false
      this.bookinfof = {}
      this.test1()
      this.test3()

    },
    test() {
        var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
        })
        animation1.translateY(-180).step()
        this.animation1 = animation1.export();
      },
      test1() {
        var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
        })
        animation1.translateY(180).step()
        this.animation1 = animation1.export();
      },
      test2() {
          let animation2 = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
          })
          animation2.translateY(-400).step()
          this.animation2 = animation2.export();
      },
      test3() {
          let animation2 = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
          })
          animation2.translateY(400).step()
          this.animation2 = animation2.export();
      },
      test4(){
        this.test1()
        this.test2()
      },
      hidepop() {
        this.changshow()
      },
      async updateread() {
        const info =await get(`/weapp/updateread?bookid=${this.bookinfof.bookid}`)
        wx.showModal({
                    title: '成功',
                    content: info.message,
                    showCancel: false,
                  })
        this.changshow()
      }
    },
    async mounted() {
      if(wx.getStorageSync('userinfo')) {
          this.userinfo = wx.getStorageSync('userinfo')
          this.mybook()
          this.mybook1()
          this.mybook2()
        }
         wx.setNavigationBarTitle({
            title: '我的书库'
          })
    },
    computed: {
      silderwidth() {
        return this.activeIndex * 250
      },
    },
    onPullDownRefresh(e) {
      this.mybook()
      this.mybook1()
      this.mybook2()
      wx.stopPullDownRefresh();
    },
    onLoad() {
      this.activeIndex = 0
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
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
}
.active{
  color: red;
}
.swiper, .main, .bookshow, .content, .wiper-item{
  height: 100%;
}
.pop{
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.3);
}
.content1{
  position: fixed;
  bottom:-180px;
  left: 0;
  right: 0;
  height: 180px;
  background-color: rgba(41, 40, 40, 0.8);
  opacity: 0.8;
  z-index: 100;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.title{
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
  color: rgb(243, 239, 239);
  border-bottom: 1px solid rgb(128, 127, 127);
  display: flex;
  justify-content: center;
}
.titleleft{
  color: red;
  padding-right: 30rpx;
}
.realtitle{
  height: 100rpx;;
  font-size: 30rpx;
  color: rgb(247, 65, 65);
  line-height: 100rpx;
  padding-left: 20rpx;
  border-bottom: 1px solid rgb(136, 135, 135);
}
.realtitle img{
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.innertitle{
  display: flex;
  align-items: center
}
.testtest{
  width: 100%;
  height: 400px;
  position: fixed;
  bottom: -400px;
  left:0;
  z-index: 10;
}
</style>

