<template>
  <div class='books'>
    <div class="sreach">
      <div class="innersreach" @click = 'tosreach'>
       <span class='iconfont'> &#xe600;</span> {{sreachrandom}}
      </div>
    </div>
    <div class='swiper1'>
    <swiper
    indicator-dots="true"
    autoplay='true'
    interval="2000"
    indicator-active-color='red'
    circular='true'
    >
  <block v-for="top in imgUrl" :key="top.id">
    <swiper-item>
      <image
        v-for='(url,index2) in top'
        :key = 'index2'
        :src=url.image
        class="slide-image1"
        mode='aspectFit'
        @click = 'todetail(url)'
        />
    </swiper-item>
  </block>
</swiper>
</div>
<div class="tiao"></div>
<div class='subtitle'>
  <div>虚构类图书推荐</div> <div class="tofiction" @click = 'tofiction(true)'>   更多<span class='iconfont iconto'>&#xe610;</span></div>
</div>
<div class="a-scroll">
      <scroll-view scroll-x class="my-scroll">
        <div id="img1" class="s-item" v-for='book in book_fiction' :key ='book'>
          <card :book = 'book'></card>
        </div>
      </scroll-view>
    </div>
    <div class="tiao"></div>
    <div class='subtitle'>

  <div>非虚构类图书推荐</div> <div class="tofiction" @click = 'tofiction(false)'> 更多<span class='iconfont iconto'>&#xe610;</span></div>
</div>
<div class="a-scroll">
      <scroll-view scroll-x class="my-scroll">
        <div id="img1" class="s-item" v-for='book in book_fiction1' :key ='book'>
          <card :book = 'book'></card>
        </div>
      </scroll-view>
    </div>
</div>
</template>

<script>
import {get} from '@/util'
import card from '@/components/card2'

export default {
  data () {
    return {
      page: 0,
      more: true,
      toplist: [],
      book_fiction: [],
      book_fiction1: []
    }
  },
  methods: {
      async getTop() {
        const toplist = await get('/weapp/gettop')
        this.toplist = toplist
      },
      todetail(item) {
        wx.navigateTo({
          url:`../pa/pages/detail/main?id=${item.id}`
        })
      },
      tofiction(item) {
        wx.navigateTo({
          url:`/pages/pa/pages/fiction/main?fiction=${item}`
        })
      },
      async getdoubaninfo() {
        const info =await get('/weapp/getdouban?page=0')
        this.book_fiction = info.message.subject_collection_items
      },
      async getdoubaninfo1() {
        const info =await get('/weapp/getdouban1?page=0')
        this.book_fiction1 = info.message.subject_collection_items
      },
      tosreach() {
        wx.navigateTo({
          url:`/pages/pa/pages/sreach/main?item=${this.sreachrandom}`
        })
      }
  },
  computed: {
      imgUrl() {
        if(this.toplist.message){
          return [this.toplist.message.slice(0,2), this.toplist.message.slice(2,4), this.toplist.message.slice(4)]
        }
      },
      rate1(value) {
        return "★★★★★☆☆☆☆☆".slice(5 - Math.round(value)/2 , 10 -  Math.round(value)/2)
      },
      sreachrandom() {
        if (this.book_fiction[0]) {
          let  index = Math.random() * 10
          let index2 = Math.floor(index)
          if(this.book_fiction[index2]) {
            return this.book_fiction[index2].title
          }


        }
      }
  },
  components: {
    card,
  },
  mounted() {
    this.getTop()
    this.getdoubaninfo()
    this.getdoubaninfo1()
  },
  onPullDownRefresh() {
    this.getTop()
    this.getdoubaninfo()
    wx.stopPullDownRefresh()
  }
}
</script>
<style scoped>
  .books{
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .nomore{
    height: 50px;
    line-height: 50px;
    background-color: rgb(235, 237, 238);
    text-align: center;
    font-size: 14px;
    color: rgb(193, 193, 194)
  }
  .swiper1{
    margin-top: 40px;
    background-color: #fff;
  }
  .slide-image1{
    width: 50%;
    height: 300rpx;
  }
  .a-scroll{
      width: 100%;
      height: 300rpx;
      margin-left: 20rpx;
      background-color: #fff;
    }
    .my-scroll{
      width: 100%;
      white-space: nowrap;
    }
    .s-item{
      width: 25%;
      display: inline-block;
    }
    .subtitle{
      font-size: 25rpx;
      color: rgb(59, 59, 59);
      margin-left: 30rpx;
      height: 73rpx;
      line-height: 73rpx;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
    }
    .tofiction{
      color: rgb(247, 147, 147);
      margin-right: 20rpx;
      font-size: 20rpx;
    }
    .tiao{
      width: 150%;
      height: 30rpx;
      background-color: rgb(242, 241, 248);
      margin-top: 30rpx;
      transform: translateX(-20%)
    }
    .iconto{
      font-size: 23rpx;
    }
    .sreach {
      width: 90%;
      position: absolute;
      height: 60rpx;
      background-color: rgb(245, 182, 182);
      opacity: 0.5;
      z-index: 1000;
      transform: translateX(5%);
      top: 10rpx;
      border-radius: 40rpx;
      text-align: center;

    }
    .innersreach{
      width: 80%;
      font-size: 28rpx;
      height: 60rpx;
      line-height: 60rpx;
      margin: 0 auto
    }
</style>

