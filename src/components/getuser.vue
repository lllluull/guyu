<template>
  <div class="main">
   <button
    open-type="getUserInfo"
    bindgetuserinfo="bindGetUserInfo"
>授权登录</button>
  </div>
</template>
<script>
export default{

}

</script>
<style scoped>
  .main{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    z-index: 100;
  }
</style>
