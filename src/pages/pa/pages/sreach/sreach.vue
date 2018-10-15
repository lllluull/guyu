<template>
  <div class="sreach">
    <div class="sreachinput">
      <div class='inputinner'>
        <span class='iconfont icons'>&#xe600;</span><input  class='inputin' placeholder='请输入书名、作者' cursor-spacing='20' v-model='input'><span class='del iconfont' @click='del' v-show="input">&#xe69a;</span>
      </div>
    </div>
    <div>
      <mycard v-for = 'book in booklist' :key = book.id :book='book' :rate = 'book.rating.average'></mycard>
    </div>
      <div class="history" v-if='!booklist.length && !input && history.length > 0'>
        <h1 class='histitle'>最近搜索</h1>
        <div v-for='item in history' :key = 'item' class='historyinner'>
          <div class="hitsoryleft" @click='addinput(item)'><span><span class='iconfont lll'>&#xe661;</span>{{item}}</span></div><div class="historyright"><span class='iconfont' @click='delhis(item)'>&#xe69a;</span></div>
        </div>
      </div>
      <div v-if='!booklist.length && input' class='noresult'>Ooooops......没有结果</div>
      <div class = 'nomore' v-if='booklist.length && input'>没有更多数据了</div>
  </div>
</template>
<script>
import {post} from '@/util'
import mycard from '../../components/card'
  export default{
    data() {
      return {
        input: '',
        booklist: [],
        history: [],
        item: ''
      }
    },
    methods: {
      async getresult() {
        const res = await post('/weapp/sreach',{input: this.input})
        this.booklist = JSON.parse(res.message).books
      },
      del() {
        this.input = ''
      },
      delhis(item) {
        let index = this.history.indexOf(item)
        this.history.splice(index,1)
        wx.setStorageSync('historySreach', JSON.stringify(this.history))
      },
      addinput(item) {
        this.input = item
      }
    },
    //
    watch: {
      input(newinput) {
        this.booklist = []
        clearTimeout(this.timer)
        this.timer = null
        this.timer = setTimeout(() => {
          this.getresult()
          if (!this.history.includes(newinput)&&newinput!== ''){
              this.history.push(newinput)
              wx.setStorageSync('historySreach', JSON.stringify(this.history))
              this.history = JSON.parse(wx.getStorageSync('historySreach'))
          }
        }, 600)

      }
    },
    components: {
      mycard
    },
    mounted() {
      this.input = this.$root.$mp.query.item
      this.history = JSON.parse(wx.getStorageSync('historySreach'))

    },
  }
</script>
<style scoped>
  .sreachinput{
    width: 100%;
    height: 80rpx;
    background-color: rgba(247, 112, 112,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inputinner{
    width: 95%;
    height: 70%;
    background-color: rgb(255,255,255);
    font-size: 30rpx;
    color: rgb(79, 79, 80);
    display: flex;
    align-items: center;
    border-radius: 10rpx;
  }
  input{
    padding-left: 10rpx;
    width: 85%
  }
  .del{
    font-size:30rpx;
    color: rgb(79, 79, 80);
    padding-left: 10rpx;
  }
  .icons{
    font-size:40rpx;
    color: rgb(79, 79, 80);
  }
  .noresult{
    display: flex;
    height: 200rpx;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .historyinner{
    display: flex;
    font-size: 30rpx;
    height: 50rpx;
    line-height: 50rpx;
    align-items: center;
    border-bottom: 1px solid rgb(192, 190, 190);
    justify-content: space-between;
  }
  .hitsoryleft{
    padding-left: 50rpx;
    font-size: 25rpx;
    height: 40rpx;
    line-height: 40rpx;
  }
  .historyright{
    margin-right: 50rpx;
  }
  .histitle{
    font-size: 35rpx;
    margin-left: 50rpx;
    margin-top: 10rpx;
  }
  .lll{
    padding-right: 10rpx
  }
</style>

