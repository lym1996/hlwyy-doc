<template>
  <ts-login :top-tab="toptab">
    <div class="absolute" style="top:-120px;left:-20px;color:#fff;font-size:35px;">后台管理系统</div>
    <div class="ts-loginlabel username" style="margin-top:20px;">
      <input type="text" placeholder="请输入用户名" v-model="nameinput" />
    </div>
    <div class="ts-loginlabel password">
      <input type="password" placeholder="请输入密码" v-model="passwordinput" />
    </div>
    <div class="ts-loginlabel">
      <!-- <el-checkbox v-model="checked">10天内自动登录</el-checkbox> -->
      <a class="ts-fogot" @click="$router.push('forget')">忘记密码？</a> 
    </div>
    <div class="ts-loginlabel">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </ts-login>
</template>
<script>
import axion from '@/util/api.js'
export default {
  data() {
    return {
      checked: true,
      toptab: [{
        text: '账号登录'
      }],
      nameinput: '',
      passwordinput: '',
    }
  },
  mounted() {
    this.replacelogo()
  },
  methods: {
    login(){
      if(this.nameinput == ''){
        this.$message({
          type:'warning',
          message:'请输入用户名'
        });
        return;
      }
      if(this.passwordinput == '') {
        this.$message({
          type:'warning',
          message:'请输入密码'
        });
        return;
      }
      let param = {
        userId:this.nameinput,
        password:this.passwordinput,
        type:168475913
      }
      axion.login(param).then( res => {
        if(res.data.retCode == 0) {
          this.$message({
            type:'success',
            message:'登录成功'
          });
          localStorage.setItem("token",res.data.param.token);
          localStorage.setItem("phone",res.data.param.phone)
          this.$router.push('/userInformation')
        } else {
          this.$message({
            type:'warning',
            message:res.data.retInfo
          })
        }
      })
      
    },
    replacelogo(){
      var logo = document.querySelector(".logo")
      logo.src = ""
      var div = document.querySelector(".ts-logindiv")
      div.style.marginTop = "60px"
    }
  }
}
</script>

