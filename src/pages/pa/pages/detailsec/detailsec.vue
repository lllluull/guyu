<template>
  <div>
    <div class="header">
        <img :src='book.image' mode='aspectFill' class='imgbg'>
        <img :src="book.image"  mode='aspectFit' class='imgout'>
        <div class='title'>{{book.title}}</div>
        <div class='author'>{{book.author}}</div>
    </div>
    <div class="middle">
      <div class="tags" >
        <span v-for='item in tags' :key='item' class='tagsin'>{{item}}</span>
      </div>
      <div class="rate">
        <span class='lefttitle'>豆瓣评分：{{rate}}</span> <span class='ratepic'>{{rate1}}</span>
      </div>
      <div class="publish">
        <span class='lefttitle'>出版社：</span>{{book.publisher}}/{{book.pubdate}}出版
      </div>
      <div class="price">
        <span class="lefttitle">价格:</span>￥{{book.price}}
      </div>
    </div>
    <div class="bottom">
         <div class="author_intro" v-if='book.author_intro'>
           <h4>作者介绍:</h4>
           <p class='pa'>
             {{book.author_intro}}
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
  export default {
    data() {
      return {
        book: {},
        summary: [],
        rate:0,
        tags: []
      }
    },
    methods: {
      gettags(books) {
        let tags = []
        books.tags.map(v => {
          tags.push(`${v.name} ${v.count}`)
        })
        return tags
      }
    },
    computed: {
      rate1() {
        return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.rate)/2 , 10 -  Math.round(this.rate)/2)
      }
    },
    mounted() {
      this.book = JSON.parse(this.$root.$mp.query.id)
      this.summary = this.book.summary.split('\n')
      this.rate = this.book.rating.average
      this.tags = this.gettags(this.book)
  },
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
  font-size: 20rpx;
  margin-left: 10rpx;
  border-radius: 10rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  height: 40rpx;
  line-height: 40rpx;
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
