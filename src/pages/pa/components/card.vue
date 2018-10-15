<template>
<a :href="detailUrl">
    <div class="main">
      <div class="left">
        <div class="img">
          <img :src=book.image mode = 'aspectFit' @click.stop='preview'>
        </div>
        <div class='des'>
          <div class='cardtitle'>{{book.title}}</div>
          <div class='rate'>
            {{rate1}}     {{rate}}
          </div>
          <div class='dessub'>
            {{book.author}} / {{book.publisher}} / {{book.pubdate}}
          </div>
        </div>
      </div>
      <div class="right" @click.stop.prevent = 'tovalue'>
        <span class='iconfont'>&#xe61a;</span>
      </div>
    </div>
    </a>
</template>
<script>

  export default {
    props: [
      'book',
      'rate'
    ],
    methods: {
      preview(){
        wx.previewImage({
          urls: [this.book.image],
          current: this.book.image
        })
      },
      tovalue() {
        console.log('child')
        this.$emit('bookinfo', this.book)
      }
    },
    computed:{
      rate1() {
        return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.rate)/2 , 10 -  Math.round(this.rate)/2)
      },
      detailUrl() {
        if(this.book.rating) {
          return `/pages/pa/pages/detailsec/main?id=${JSON.stringify(this.book)}`
        } else if (this.book.last) {
          return `/pages/pa/pages/detailthird/main?id=${this.book.id}`
        } else if (this.book.price) {
          return `/pages/pa/pages/detailthird/main?id=${this.book.bookid}`
        }else {
          return `/pages/detail/main?id=${this.book.id}`
        }
      }
    }
  }
</script>
<style scoped>
  .main {
    height: 200rpx;
    width: 100%;
    overflow: hidden;
    margin-left: 20rpx;
    border-bottom: 1px solid rgb(236, 234, 234);
    display: flex;
    justify-content: space-between
  }
  .left {
    margin-top: 10rpx;
    height: 180rpx;
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  .img{
    height: 180rpx;
    width: 120rpx
  }
  img{
    max-width: 100%;
    max-height: 100%
  }
  .des {
    margin-left: 10px;
    padding-top: 10px;
    width: 100%;
    overflow: hidden;
  }
  .rate{
    height: 20px;
    font-size: 20rpx;
    color: crimson;
  }
  .cardtitle{
    height: 30px;
    font-size: 16px;
    width: 99%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dessub{
    height: 30px;
    font-size: 18rpx;
    color: rgb(112, 111, 111)

  }
  .right{
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
    font-size: 15px;
  }
</style>
