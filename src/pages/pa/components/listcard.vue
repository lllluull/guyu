<template>
    <div class="main" @click="tobookdetail">
      <div class="left">
        <div class="img">
          <img :src=book.imgUrl mode = 'aspectFit' @click.stop='preview'>
        </div>
        <div class='des'>
          <div class='cardtitle'>{{book.title}}</div>
          <div class='rate'>
            {{rate1}}     {{book.ratevalue}}
          </div>
          <div class='dessub'>
            {{book.author}} / {{book.publish}}
          </div>
        </div>
      </div>
      <div class="right" v-if='active' @click='chosedel'>
        <span class='iconfont myicon' :class="del? 'delred' : ''">&#xe61b;</span>
      </div>
    </div>

</template>
<script>

  export default {
    props: [
      'book',
      'active',
      'dellist'
    ],
    data() {
      return {
        del: false
      }
    },

    methods: {
      preview(){
        wx.previewImage({
          urls: [this.book.imgUrl],
          current: this.book.imgUrl
        })
      },
      tobookdetail() {
        if(this.active) {
          return
        }
          wx.navigateTo({
            url:`/pages/pa/pages/detailthird/main?id=${this.book.bookid}`
          })
      },
      chosedel() {
        this.del = !this.del
        this.$emit('delitem', this.book.bookid, this.book.title)
      }

    },
    computed:{
      rate1() {
        return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.book.ratevalue)/2 , 10 -  Math.round(this.book.ratevalue)/2)
      }
    },
    watch: {
      dellist() {
        if(this.dellist.length<1) {
          this.del = false
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
    color: gold;
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
  .myicon{
    color:  rgb(240, 140, 10);
    border-radius: 50%;
    transition: 1s ease all;
  }
  .delred{
    background-color: red;
    color: red;
    transition: 1s ease all;

  }
</style>
