
<template>
  <div class="main">
    <div class="img">
      <img :src="booklist.image" >
    </div>
    <div class="mask">
    </div>
      <div class="header">
        <div class="title">{{booklist.title}}</div>
        <div class="user">
          <div>由</div><img :src="userinfo.avatarUrl" ><div>{{userinfo.nickName}}</div><div>创建</div>
        </div>
        <div class="dosome" >
          <span v-if='active' class='del' @click='delbook' >选中删除</span><span v-if='!active'>编辑</span>
          <switch color="#007aff" class='switch' @change='changeactive' :checked='active'></switch>
        </div>
      </div>
      <div class="content">
        <card v-for='book in bookinfos' :key="book.bookid" :book='book' :active = 'active' @delitem='getitem' :dellist = 'dellist'></card>
    </div>
  </div>
</template>
<script>
import {get, createbookinfo} from '../../../../util.js'
import card from '../../components/listcard'
export default {
  data() {
      return{
        booklist: {},
        booklists: [],
        userinfo: {},
        active: false,
        dellist: [],
        deltitle: []
      }
  },
  methods: {
    async getbookdetail() {
        let bookid = JSON.stringify(this.leftbooklist)
        const res = await get(`/weapp/detailbooklist?bookid=${bookid}`)
        this.booklists = JSON.parse(res.message)
    },
    changeactive() {
      this.active = !this.active
      this.dellist = []
    },
    getitem(item, items) {
        console.log(item,items)
        if(this.dellist.includes(item)) {
          let index = this.dellist.indexOf(item)
          let index1 = this.deltitle.indexOf(items)
          this.dellist.splice(index, 1)
          this.deltitle.splice(index1, 1)
        } else {
          this.dellist.push(item)
          this.deltitle.push(items)
        }
    },
    async delbook() {
      let id = this.booklist.id
      let bookids = this.leftbooklist.join(',')
      let leftbooktitle = this.leftbooktitle.join(',')
      const res = await get(`/weapp/delbooklistone?bookids=${bookids}&id=${id}&count=${this.count}&bookname=${leftbooktitle}`)
      console.log(res)
      this.getbookdetail()
      this.active = false

    }
  },
  components: {
    card
  },
  mounted() {
    let booklist = this.$root.$mp.query.mybooklist
    this.booklist = JSON.parse(booklist)
    this.getbookdetail()
    wx.setNavigationBarTitle({
            title: '书单详情'
          })
      if(wx.getStorageSync('userinfo')) {
        this.userinfo = wx.getStorageSync('userinfo')
      }
  },
  computed: {
    bookinfos() {
      return this.booklists.map(v => createbookinfo(v))
    },
    leftbooklist() {
      let arr = this.booklist.bookids
      for(let item of this.dellist) {
        if (arr.includes(item)) {
          let index = arr.indexOf(item)
          arr.splice(index,1)
        }
      }
      return arr
    },
    count() {
      if(this.leftbooklist) {
        return this.leftbooklist.length
      }
    },
    leftbooktitle() {
      if(this.booklist.bookallname) {
        let arr = this.booklist.bookallname.split(',')
        for(let item of this.deltitle) {
          if (arr.includes(item)) {
            let index = arr.indexOf(item)
            arr.splice(index,1)
          }
        }
        return arr
      }
    }

  },
  onPullDownRefresh(e) {
    wx.stopPullDownRefresh();
  }
}
</script>
<style scoped>
  .main{
    height: 100%;
    width: 100%;
  }
  .img{
    height: 100%;
    widows: 100%;
    position: fixed;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    z-index: -2;
  }
  .main img{
    width: 100%;
    height: 100%;
  }
  .mask{
    position: fixed;
    background-color: rgb(247, 243, 243);
    opacity: 0.95;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    z-index: -1;
  }
  .header{
    width: 100%;
    height: 200rpx;
    position: relative;

  }
  .user {
    width: 100%;
    height: 70rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    color: rgb(143, 140, 140)
  }
  .user img{
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%
  }
  .dosome{
    position: absolute;
    bottom: 10rpx;
    right: 10rpx;
    font-size: 25rpx;
  }
  .switch {
    zoom: 0.7;
    padding-left: 40rpx;
  }
  .title{
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 40rpx;
    display: flex;
    justify-content: center;
  }
  .del{
    color: crimson;
    font-weight: bold;
  }
</style>
