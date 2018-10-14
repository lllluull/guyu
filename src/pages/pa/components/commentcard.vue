<template>
  <div class="main">
    <div class="left">
      <img :src="comment.user.avatar" >
    </div>
    <div class="right">
      <div class="first">
        <div class="username">
          {{comment.user.name}} <span class='rate'>{{rate}}</span>
        </div>
      </div>
      <div class="second">
          {{comment.comment}}
      </div>
      <div class="third">
        {{comment.create_time}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'comment'
    ],
    computed: {
      rate(){
        if(this.comment.rating) {
          return "★★★★★☆☆☆☆☆".slice(5 - Math.round(this.comment.rating.value)/2 , 10 -  Math.round(this.comment.rating.value)/2)
        }
      }
    }
  }
</script>
<style scoped>
  .main{
  display: flex;
  width: 100%;
  margin-top: 40rpx;
}
.left{
  width: 100rpx;
  text-align: center;
}
.right{
  width: 100%;
}
img{
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%
}
.right{
  margin-left: 20rpx;
}
.username{
  color: rgb(76, 76, 77);
  font-size: 25rpx;
}
.rate{
  color: gold
}
.second{
  margin-top: 5rpx;
  font-size: 25rpx;
  color: rgb(96, 97, 97);
}
.third{
  margin-top: 5rpx;
  font-size: 24rpx;
  color: rgb(54, 126, 235)
}
</style>
