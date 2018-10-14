<template>
  <div>
    <div class="header">
        <img :src='info.image' mode='aspectFill' class='imgbg'>
        <img :src="info.image"  mode='aspectFit' class='imgout'>
        <div class='title'>{{info.title}}</div>
        <div class='author'>{{info.author}}</div>
    </div>
    <div class="middle">
      <div class="tags" v-if='tagsf.length'>
        <span v-for='item in tagsf' :key='item' class='tagsin'>{{item}}</span>
      </div>
      <div class="rate">
        <span class='lefttitle'>豆瓣评分：</span> <span class='ratepic'>{{rate}}</span>  {{info.rate}}
      </div>
      <div class="publish">
        <span class='lefttitle'>出版社：</span>{{info.publisher}}/{{info.pubdate}}出版
      </div>
      <div class="price">
        <span class="lefttitle">价格:</span>￥{{info.price}}
      </div>
      <div class="adduser">
        <span class="lefttitle">用户:    </span> <img :src="avatar" class="useravatar"> {{nickName}}
      </div>
    </div>
    <div class="bottom">
         <div class="author_intro">
           <h4>作者介绍:</h4>
           <p class='pa'>
             {{info.author_intro}}
           </p>

          </div>
          <div class="summary" >
            <h4>本书简介:</h4>
            <p v-for='p in summary' :key='p' class='pa'>
              {{p}}
            </p>
          </div>
    </div>
  </div>
</template>
<script>
import {get, getLocation} from '@/util'
  export default {
    data() {
      return{
        bookid: 0,
        info: {},
        summary: [],
        comment: '',
        tags: [],
        location: ''
      }
    },
    methods: {
        async getBookDetail() {
          const info = await get(`/weapp/detail?bookid=${this.bookid}`)
          this.info = info.message
          this.summary = this.info.summary.split('\n')
          this.tags = this.info.tags.split(',')
          wx.setNavigationBarTitle({
            title: info.message.title
          })
        },
        async getlocation1(){
          const res = await getLocation()
          wx.request({
            url: `http://api.map.baidu.com/geocoder/v2/`,
            data:{
              ak: `IPwdx1ntu4muxci11k056HxRyEq7dtbx`,
              location: `${res.latitude},${res.longitude}`,
              ret_coordtype: 'gcj02ll',
              output: 'json'
            },
            success: (res) => {
              if(res.data.status === 0) {
                this.location =  res.data.result.formatted_address
              }
            }
          })
        }
    },
    computed: {
      rate() {
        return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.info.rate)/2 , 10 -  Math.round(this.info.rate)/2)
      },
      avatar() {
        if(this.info.user_info) {
          let user_info = JSON.parse(this.info.user_info)
          return user_info.avatarUrl
        }
      },
      nickName() {
        if(this.info.user_info) {
          let user_info = JSON.parse(this.info.user_info)
          return user_info.nickName
        }
      },
      tagsf() {
        let n = this.tags.length/2
        let tag = []
        for (let i=0 ;i < n; i=i+2) {
          let res = this.tags.slice(i, i+2)
          let res2 = res[0]+res[1]
          tag.push(res2)
        }
        return tag
      }
    },
    async mounted() {
      this.bookid = this.$root.$mp.query.id
      this.getBookDetail()
      this.getlocation1()
    },
    onShareAppMessage: function () {
    return {
      path: `/pages/detail/main?id=${item.id}`
    }
    },
     onUnload () {
    this.info = {}
    this.summary = []
    this.tags = []
  }
  }
</script>
<style scoped>
.header{
  height: 380rpx;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.imgbg{
  width: 100%;
  filter: blur(20px)
}
.imgout{
  position: absolute;
  width: 100%;
  height: 250rpx;
  top:20rpx;
  left:0
}
.title{
  position: absolute;
  width: 100%;
  left:0;
  bottom: 60rpx;
  text-align: center;
  color: aliceblue;
  font-size: 29rpx;
}
.author{
  position: absolute;
  width: 100%;
  left:0;
  bottom: 20rpx;
  text-align: center;
  color: rgb(148, 149, 151);
  font-size: 21rpx;
}
.middle{
  margin-top: 10rpx;
  margin-left: 20rpx;
}
.tagsin{
  display: inline-block;
  background-color: rgb(243, 87, 87);
  color: aliceblue;
  font-size: 30rpx;
  margin-left: 10rpx;
  border-radius: 10rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  height: 50rpx;
  line-height: 50rpx;
}
.lefttitle{
  color: rgb(150, 151, 151)
}
.rate{
  font-size: 25rpx;
  color: red;
  padding-top: 30rpx;
}
.ratepic{
  color: gold;
}
.publish, .price, .adduser {
  font-size: 25rpx;
  margin-top: 10rpx;
}
.useravatar{
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  vertical-align: middle;
}
.bottom{
  margin: 20rpx;
}
.author_intro{
  font-size: 24rpx;
  padding-top: 10rpx;
  border-top: 1px solid rgb(194, 191, 191);
  color: rgb(13, 13, 14)
}
.summary{
  font-size: 24rpx;
  padding-top: 20rpx;
  color: rgb(13, 13, 14)
}
.pa{
  color: rgb(83, 83, 83);
  line-height: 50rpx;
}
h4{
  font-size: 30rpx;
}
.comments{
  margin-left: 20rpx;
  margin-right: 20rpx;
}
#textin{
  border: 1px solid rgb(241, 178, 178);
  width: 100%;
  font-size: 28rpx;
}
.tagsi{
  margin-top: 10rpx;
}

</style>

