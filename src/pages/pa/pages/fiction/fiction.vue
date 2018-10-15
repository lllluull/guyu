<template>
  <div class="main">
    <div class="header">
      <div class="headercontent1" :class="isfiction ? 'headeractive' : 'headercontent1' " @click='changefiction'>
        虚构类
      </div>
      <div class="headercontent1" :class="isfiction ? 'headercontent1' : 'headeractive' " @click='changefiction'>
        非虚构类
      </div>
    </div>
    <div>
      <div>
        <mycard v-for = 'book in booklist' :key = book.id :book='book' :rate = 'book.rate' @bookinfo = 'bookinfo'></mycard>
    </div>
    </div>
    <div class="loading" v-if='more'><img src="../../../../../static/img/loading_green.gif" class='loadingimg'></div>
      <div class="bottom" v-if='!more && booklist.length'>
        <div class="line"></div>
        <div class="inline">The End</div>
      </div>
      <div  class = 'pop' v-if='popshow'  @click = 'changshow'>
      </div>
      <div class="content" :style="{bottom: silderHeight}" :animation="animation1" >
        <div class="realtitle">
          <div class='innertitle'><img :src="bookinfof.image" ><div>{{bookinfof.title}}</div></div>
        </div>
        <div class="title" @click.prevent.stop = 'test'>
          <div><span class='iconfont titleleft' > &#xe615;</span>标记为已读</div>
        </div>
        <div class="title">
          <div><span class='iconfont titleleft'> &#xe609;</span>添加到书单</div>
        </div>
      </div>
  </div>
</template>
<script>
import {get} from '@/util'
import mycard from '../../components/card'

export default {
  data() {
    return{
      isfiction: true,
      book_fiction: [],
      total: 0,
      page: 0,
      booklist: [],
      bookinfof: {},
      popshow: false,
      animation1: '',
      animation2: ''
    }
  },
  methods: {
    changefiction() {
      this.page = 0
      this.book_fiction = []
      this.booklist = []
      this.isfiction = !this.isfiction
      if(this.isfiction) {
      this.getdoubaninfo()
      } else {
        this.getdoubaninfo1()
      }
    },
    async getdoubaninfo() {
        const info =await get(`/weapp/getdouban?page=${this.page}`)
        this.book_fiction = info.message.subject_collection_items
        this.total = info.message.total
        this.nomralize(this.book_fiction)
      },
    async getdoubaninfo1() {
      const info =await get(`/weapp/getdouban1?page=${this.page}`)
      this.book_fiction = info.message.subject_collection_items
      this.total = info.message.total
      this.nomralize(this.book_fiction)
    },
    nomralize(list) {
      list.map(v => {
        this.booklist.push({
          title: v.title,
          image: v.cover.url,
          rate: v.rating.value || 0,
          author: v.author[0] || 0,
          publisher: v.press[0] || 0,
          pubdate: v.year[0] || 0,
          id: v.id,
          last: 'shi'
        })
      })
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

    },
    test() {
        var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation1.translateY(-180).step()
      this.animation1 = animation1.export();
      },
      test1() {
        var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation1.translateY(180).step()
      this.animation1 = animation1.export();
      }

  },
  computed: {
    more(){
      if(10 * (this.page+1) >= this.total) {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    mycard
  },
  mounted() {
    this.page = 0
    let res = this.$root.$mp.query.fiction
    if ( res === 'true') {
      this.isfiction = true
    } else {
      this.isfiction = false
    }
    if(this.isfiction) {
      this.getdoubaninfo()
    } else {
      this.getdoubaninfo1()
    }
  },
  onReachBottom() {
    if(!this.more) {
      return
    }
    this.page = this.page + 1
    if(this.isfiction) {
      this.getdoubaninfo()
    } else {
      this.getdoubaninfo1()
    }
  },
   onPullDownRefresh(e) {
    wx.stopPullDownRefresh();
  }
}
</script>
<style>
  .header{
    height: 80rpx;
    width: 100%;
    display: flex;
    align-items: center
  }
  .headercontent1{
    height: 80rpx;
    width: 50%;
    line-height: 80rpx;
    margin: 0 auto;
    text-align: center;
    font-size: 30rpx;
    color: rgb(102, 101, 101);
    box-sizing: border-box
  }
  .headeractive{
    height: 80rpx;
    width: 50%;
    line-height: 80rpx;
    margin: 0 auto;
    text-align: center;
    font-size: 30rpx;
    border-bottom: 2px solid red;
    color: red;
    box-sizing: border-box
  }
  .bottom{
  height: 100rpx;
  width: 100%;
  position: relative;
}
  .line{
  height: 50rpx;
  width: 80%;
  transform: translateX(10%);
  border-bottom: 1px solid rgb(190, 189, 189);
}
.inline{
  position: absolute;
  width: 30%;
  left:35%;
  height: 40%;
  top:30%;
  font-size: 25rpx;
  color: rgb(156, 156, 156);
  line-height: 40rpx;
  text-align: center;
  background-color: #fff;
}
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
  width: 100%
}
.loadingimg{
  height: 80rpx;
  width: 80rpx;
}
.pop{
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.3);
}
.content{
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
  border-bottom: 1px solid rgb(75, 73, 73);
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
  border-bottom: 1px solid rgb(100, 100, 100);
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
</style>

