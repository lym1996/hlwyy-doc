<template>
  <ts-login :top-tab="toptab" :logo="logopic">
    <div class="ts-loginlabel" style="margin-top:20px;">
      <input type="text" placeholder="请输入用户名" v-model="nameinput" />
    </div>
    <div class="ts-loginlabel">
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
  mounted() {},
  methods: {
    login(){
      this.$router.push('/doctorFee')
    }
  }
}
</script>
