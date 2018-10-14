<template>

  <div class="main">
    <a :href="detailUrl">
    <img :src=book.cover.url >
    </a>
    <div class='des'>{{book.title}}</div>
    <div class="rate">{{rate}}{{rate1}}</div>
  </div>

</template>
<script>
  export default {
    props: [
      "book"
    ],
    computed: {
      rate() {
        if(this.book.rating){
          return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.book.rating.value)/2 , 10 -  Math.round(this.book.rating.value)/2)
        } else {
          return "☆☆☆☆☆"
        }
      },
      rate1() {
        if(this.book.rating){
          return this.book.rating.value
        } else {
          return 0
        }
      },
      detailUrl() {
          return `/pages/pa/pages/detailthird/main?id=${this.book.id}`
      }
    }
  }
</script>
<style scoped>
  .mainleft{
    margin-left: 20rpx;
  }
  img{
      width: 90%;
      height: 220rpx;
      border-radius: 10px;
      box-shadow: 0 0 5px 1px rgb(170, 170, 170)
  }
  .des{
      font-size: 20rpx;
      color: rgb(136, 135, 136);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rate{
      font-size: 25rpx;
      color: gold;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>
