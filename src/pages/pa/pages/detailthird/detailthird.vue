<template>
    <div class="main">
      <div v-if='!bookinfo || !commentlist.length'>
        <div>
          <loading1></loading1>
        </div>
    </div>
      <div class="header">
        <img :src="imgUrl" mode='aspectFill' class='imgbg' >
        <div class="bgc"></div>
        <img :src="imgUrl"  mode='aspectFit' class='imgout' @click.stop='preview'>
        <div class="title">{{title}}</div>
        <div class="shordes">
          <div class="author">作者:{{author}}</div>
          <div class="publish">出版社:{{publish}}</div>
          <div class="rate">
            豆瓣评分：<span class='ratevalue'>{{ratevalue}}</span>
            <span class='rateshow'>
              <div class='rate1'>{{rate1}}</div>
              <div class='ratecount'>评价数：{{ratecount}}</div>
            </span>
          </div>
        </div>
      </div>

      <div class="middle">
        <div class="tags">
          <div class="h4">所属标签:</div>
          <div class="tagname">
              <span v-for='item in tags' :key='item' class='tagsin'>{{item}}</span>
          </div>
        </div>
        <div class="tiao"></div>
        <div class="intro">
          <div class="h4">本书简介:</div>
          <div class="introcontent" v-if='intromore'>
              <div v-for='item in des' :key='item' class='des'>{{item}}</div>
              <span class='tomore' @click="tointromore">[点击收缩]</span>
          </div>
          <div class="introcontent" v-if='!intromore'>
              <div v-for='item in des1' :key='item' class='des'>{{item}}</div>
              <span class='tomore' @click="tointromore">[点击查看更多]</span>
          </div>
        </div>
        <div class="tiao"></div>
        <div class="comments">
          <div class="h4">本书短评({{comments.total}}):</div>
          <div class="commentContent" v-for='(comment,index) in commentlist' :key = index>
            <comcard :comment = 'comment'></comcard>
          </div>
        </div>
      </div>
      <div class="loading" v-if='more'><img src="../../../../../static/img/loading_green.gif" class='loadingimg'></div>
      <div class="bottom" v-if='!more'>
        <div class="line"></div>
        <div class="inline">The End</div>
      </div>
    </div>
</template>
<script>
import {get, createbookinfo} from '@/util'
import comcard from '../../components/commentcard'
import loading1 from '../../components/loading'
export default {
  data() {
    return{
      bookid:0,
      bookinfo: {},
      intromore: false,
      comments: {},
      commentlist: [],
      page: 0,
      count: 4
    }
  },
  methods:{
    async getBookDetail() {
          const info = await get(`/weapp/detail2?bookid=${this.bookid}`)
          this.bookinfo = info.message
          wx.setNavigationBarTitle({
            title: this.bookinfo.title
          })
    },
    async getBookcomment(page) {
          let startoff = page * this.count
          const info = await get(`/weapp/detailcomment?bookid=${this.bookid}&page=${startoff}`)
          this.comments = JSON.parse(info.message)
          this.commentlist = this.commentlist.concat(this.comments.interests)
    },
    tointromore() {
      this.intromore = !this.intromore
    },
    preview(){
        wx.previewImage({
          urls: [this.imgUrl],
          current: this.imgUrl
        })
      }
  },
  computed: {
    des() {
     let desc =  this.bookinfo.desc
     let ref = />([\s\S]*?)<\/div>/gi
     let out = ''
     if (desc) {
       out =  ref.exec(desc)[1]
     }
    return out.split('\n')
    },
    des1() {
      if(this.des) {
        return this.des.slice(0,4)
      }
    },
    imgUrl(){
      if(this.bookinfo.cover) {
        return this.bookinfo.cover.large.url
      }
    },
    title() {
      if(this.bookinfo) {
        return this.bookinfo.title
      }
    },
    extra() {
      if(this.bookinfo) {
        return this.bookinfo.extra
      }
    },
    short_info() {
      if(this.extra) {
        return this.extra.short_info.split('/')
      }
    },
    rateall() {
      if(this.extra) {
        return this.extra.rating_group.rating
      }
    },
    author() {
      if(this.short_info) {
        return ` ${this.short_info[0]}`
      }
    },
    publish() {
      if(this.short_info) {
        return ` ${this.short_info[2]}/ ${this.short_info[1]}`
      }
    },
    rate1() {
      if(this.rateall) {
        return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.rateall.value)/2 , 10 -  Math.round(this.rateall.value)/2)
      }
    },
    ratevalue(){
      if(this.rateall) {
        return `  ${this.rateall.value}`
      }
    },
    ratecount() {
      if(this.rateall) {
        return `  ${this.rateall.count}`
      }
    },
    tags() {
      if(this.bookinfo.tags) {
        let res = []
        this.bookinfo.tags.map(v => {
          res.push(v.name)
        })
        return res
      }
    },
    allpage() {
      if(this.comments) {
        return this.comments.total
      }
    },
    more() {
      if(this.count  * (this.page+1) >= this.allpage) {
        return false
      } else {
        return true
      }
    }

  },
  components:{
    comcard,
    loading1
  },
  mounted() {
    this.page = 0
    this.bookid = this.$root.$mp.query.id
    this.getBookDetail()
    this.getBookcomment(this.page)
  },
  onReachBottom() {
    if(!this.more) {
      return
    }
    this.page = this.page + 1
    this.getBookcomment(this.page)
  },
  onLoad () {
    this.bookinfo = {}
    this.commentlist = []
  },
  onPullDownRefresh(e) {
    wx.stopPullDownRefresh();
  },
  onUnload () {
    this.bookinfo = {}
    this.commentlist = []
    this.comments = {}
  }
}
</script>
<style scoped>
.header{
  height: 380rpx;
  width: 100%;
  position: relative;
}
.imgbg{
  width: 100%;
  height: 380rpx;
}
.imgout{
  position: absolute;
  width: 220rpx;
  height: 340rpx;
  left: 0;
  left:60rpx;
  bottom: -60rpx;
  z-index: 20;
}
.bgc{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 10;

}
.title{
  position: absolute;
  top: 20rpx;
  width: 100%;
  left: 0;
  font-size: 60rpx;
  color: rgb(242, 245, 247);
  text-align: center;
  z-index: 30;
  font-family: KaiTi
}
.shordes{
  position: absolute;
  top: 150rpx;
  left: 320rpx;
  z-index: 30;
  color: rgb(242, 245, 247);
  font-size: 22rpx;
  width: 400rpx;
  overflow: hidden;
}
.author, .publish, .rate{
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 20rpx;
}
.rateshow{
  color: gold
}
.rate{
  display: flex;
  height: 50rpx;
  line-height: 50rpx;
}
.ratevalue{
  font-size: 50rpx;
  display: inline-block;
}
.rate1{
  line-height: 25rpx;
  padding-left: 10rpx;
}
.ratecount{
  line-height: 25rpx;
  color: rgb(193, 221, 247);
  padding-left: 10rpx;
  font-size: 18rpx;
}
.middle{
  margin-top: 60rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
}
.h4{
  font-size: 30rpx;
  color: rgb(114, 115, 116);
  margin-bottom: 10rpx;
  position: sticky;
    top: 0;
  height: 80rpx;
  line-height: 80rpx;
  width: 100%;
  background-color: #fff

}
.tagsin{
  display: inline-block;
  background-color: rgb(243, 87, 87);
  color: aliceblue;
  font-size: 25rpx;
  margin-left: 10rpx;
  border-radius: 10rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  height: 50rpx;
  line-height: 50rpx;
  margin-top: 5rpx;
  }
.intro{


}
.introcontent{
  font-size: 25rpx;
  color: rgb(72, 73, 73);
  line-height: 30rpx
}
.tomore{
  color: rgb(248, 83, 83);
  font-size: 25rpx;
}
.comments{

}
.commentmore{
  color: rgb(248, 83, 83);
  font-size: 25rpx;
  text-align: center;
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
.tiao{
  width: 150%;
  height: 30rpx;
  background-color: rgb(242, 241, 248);
  margin-top: 30rpx;
  transform: translateX(-20%)
}
</style>
