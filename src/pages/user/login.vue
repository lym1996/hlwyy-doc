<template>
  <ts-login :top-tab="toptab" :logo="logopic">
    <div class="ts-loginlabel username" style="margin-top:20px;">
      <input type="text" placeholder="请输入用户名" v-model="nameinput" />
    </div>
    <div class="ts-loginlabel password">
      <input type="password" placeholder="请输入密码" v-model="passwordinput" />
    </div>
    <div class="ts-loginlabel">
      <el-checkbox v-model="checked">10天内自动登录</el-checkbox>
      <a class="ts-fogot" @click="$router.push('forget')">忘记密码？</a> 
    </div>
    <div class="ts-loginlabel">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </ts-login>
</template>
<script>
export default {
  data() {
    return {
      logopic:'',
      checked: true,
      toptab: [{
        text: '账号登录'
      }],
      nameinput: '',
      passwordinput: '',
    }
  },
  mounted() {
    // this.replacePic()
  },
  methods: {
    login(){
      this.$router.push('/userInformation')
    },
    //更换登录左边的图
    // replacePic(){
    //   var div = document.querySelector(".ts-leftbg")
    //   var img = div.querySelector("img")
    //   img.src=""
    // }
  }
}
</script>
<style lang="scss">
  //  .ts-logindiv{
  //    .ts-formdiv{ 
  //      .ts-inputdiv{
  //        right: 150px!important;
  //      }
  //    }
  //  }  
</style>

