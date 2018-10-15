
<template>
  <div class="main">
    <div class="content" >
      <div>
        <div>
            <div >
              <div>
                <getuser ></getuser>
              </div>
            </div>
            <div>
              <myprogress ></myprogress>
            </div>
        </div>
      </div>
      <div class="mian1">
        <div class="firstshow">
          <div class="title" @click = 'changeflag1' v-if='!flag1'> <span class='iconfont' >&#xe610;</span>我的看书统计</div>
          <div class="title" @click = 'changeflag1' v-if='flag1'> <span class='iconfont' >&#xe602;</span>我的看书统计</div>
          <div class="subtitle" v-if='flag1' @click = 'toechart1'> <span>我的每月看书</span> <span class='iconfont' >&#xe610;</span> </div>
          <div class="subtitle" v-if='flag1' @click = 'toechart2'><span>我的看书偏好</span> <span class='iconfont' >&#xe610;</span></div>
        </div>
        <div class="firstshow">
          <div class="title"  v-if='!flag2' @click = 'changeflag2'><span class='iconfont'>&#xe610;</span>我的藏书</div>
          <div class="title"  v-if='flag2' @click = 'changeflag2'> <span class='iconfont'>&#xe602;</span>我的藏书</div>
          <div class="subtitle" v-if='flag2' @click = 'tomybook'> <span>我的书库</span> <span class='iconfont' >&#xe610;</span> </div>
          <div class="subtitle" v-if='flag2'><span>我的书单</span> <span class='iconfont' >&#xe610;</span></div>
          <div class="subtitle" v-if='flag2'> <span>分享的书</span> <span class='iconfont' >&#xe610;</span> </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import myprogress from '@/components/progress'
import getuser from '@/components/getuserinfo'
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
      },
      toechart1() {
        wx.navigateTo({
          url:`/pages/pb/pages/echart1/main`
        })
      },
      toechart2() {
        wx.navigateTo({
          url:`/pages/pc/pages/echart2/main`
        })
      },
      tomybook() {
        wx.navigateTo({
          url:`/pages/pa/pages/mybook/main`
        })
      }
    },
    components: {
      myprogress,
      getuser
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh()
    }
  }
</script>
<style scoped>
.main{
  height: 100%;
}
.content{
  width: 100%;
  transition: 1s ease all;
  height: 100%;
}
.mian1{
  margin-top: 50rpx;
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
.subtitle{
  height: 100rpx;
  line-height: 100rpx;
  font-size: 28rpx;
  padding-left: 70rpx;
  padding-right: 20rpx;
  color: rgb(150, 151, 151);
  border-bottom: 1px solid rgb(224, 226, 224);
  display: flex;
  justify-content: space-between
}


</style>

