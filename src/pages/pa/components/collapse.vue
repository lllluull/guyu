<template>
  <div class="mian">
    <div class="firstshow">
      <div class="title" @click = 'changeflag1' v-if='!flag1'> <span class='iconfont'>&#xe610;</span>点击查看我的读书偏好</div>
      <div class="title" @click = 'changeflag1' v-if='flag1'> <span class='iconfont'>&#xe602;</span>收起</div>
      <div class="show" v-if='flag1'>
        <chart2></chart2>

      </div>
    </div>
    <div class="firstshow">
      <div class="title" @click = 'changeflag2' v-if='!flag2'><span class='iconfont'>&#xe610;</span>点击查看今年读书数统计</div>
      <div class="title" @click = 'changeflag2' v-if='flag2'> <span class='iconfont'>&#xe602;</span>收起</div>
      <div class="show" v-if='flag2'>
        <div>
          <chart></chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chart from './echart'
import chart2 from './echart2'
export default {
  data() {
    return {
      flag1: true,
      flag2: true
    }
  },
  methods: {
    changeflag1() {
      this.flag1 = !this.flag1
    },
    changeflag2() {
      this.flag2 = !this.flag2
    }
  },
  components: {
    chart,
    chart2
  }
}
</script>
<style scoped>
  .mian{
    margin-top: 80rpx;
  }
  .title{
    font-size: 25rpx;
    color: rgb(84, 85, 85);
    padding-left: 20rpx;
    background-color: rgb(243, 247, 250);
    height: 70rpx;
    line-height: 70rpx;
    border-bottom: 1rpx solid rgb(201, 198, 198);
    border-top: 1rpx solid rgb(233, 230, 230);
    border-collapse: collapse;
  }
</style>
