<template>
  <div class='main'>
    <p>{{year}}已过去了{{days}}天</p>
    <progress percent="60" color="pink" />
    <p class='percent'>{{percent}}%</p>
  </div>
</template>
<script>
  export default{
    methods: {
      isLeapYear (year) {
        if (year % 400 === 0) {
          return true
        } else if (year % 4 === 0 && year % 100 !== 0) {
          return true
        } else {
          return false
        }
      }
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      days () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        let offset = new Date().getTime() - start.getTime()
        return parseInt(offset / 1000 / 60 / 60 / 24) + 1
      },
      alldays () {
        return this.isLeapYear(this.year) ? 366 : 365
      },
      percent () {
        return ((this.days / this.alldays) * 100).toFixed(1)
      }
    }

  }
</script>
<style scoped>
  .main{
    height: 100rpx;
    text-align:center;
    margin-top: 10rpx;
  }
  progress{
    width: 90%;
    transform: translateX(5%)
  }
  p {
    padding-top: 20rpx;
    color: rgb(158, 157, 157);
    font-size: 40rpx;
  }
  .percent{
    font-size: 25rpx;
  }
</style>

