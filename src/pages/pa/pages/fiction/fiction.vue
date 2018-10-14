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
        <mycard v-for = 'book in booklist' :key = book.id :book='book' :rate = 'book.rate'></mycard>
    </div>
    </div>
    <div class="loading" v-if='more'><img src="../../../../../static/img/loading_green.gif" class='loadingimg'></div>
      <div class="bottom" v-if='!more && booklist.length'>
        <div class="line"></div>
        <div class="inline">The End</div>
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
      booklist: []
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

</style>

