<template>
  <ts-login :top-tab="toptab" class="g-login">
    <a class="back" @click="back" v-if="active>0">返回上级</a>
    <el-steps :active="active">
      <el-step title="填写账号"></el-step>
      <el-step title="安全验证"></el-step>
      <el-step title="设置新密码"></el-step>
    </el-steps>
    <el-form v-if="active == 0" :model="forgetdata1" :rules="rules">
      <el-form-item class="ts-loginlabel username borderbottom1" prop="nameInput" label=" ">
        <el-input v-model="forgetdata1.nameInput" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="ts-loginlabel yzm hasbtn borderbottom1" prop="codeInput" label=" ">
        <el-input v-model="forgetdata1.codeInput" type="password" placeholder="输入图中验证码"></el-input>
        <div class="ts-bgcolor-white marginbottom-1 paddingleft30 height-40"><img :src="forgetdata1.urlImg" class="cursorPointer" width="110" height="40"></div>
      </el-form-item>
      <div class="ts-loginlabel">
        <el-button type="primary" @click="next" :disabled="ablenext1">下一步</el-button>
      </div>
    </el-form>
    <el-form v-else-if="active == 1" :model="forgetdata2" :rules="rules">
      <el-form-item class="ts-loginlabel username borderbottom1" prop="nameInput" label=" ">
        <el-input v-model="forgetdata2.nameInput" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="ts-loginlabel yzm hasbtn borderbottom1" prop="codeInput" label=" ">
        <el-input v-model="forgetdata2.codeInput" type="password" placeholder="请输入短信验证码"></el-input>
        <div class="ts-bgcolor-white marginbottom-1 paddingleft30 height-40">
          <el-button type="info" @click="getPasswordSendMsg">发送验证码</el-button>
        </div>
      </el-form-item>
      <div class="ts-loginlabel">
        <el-button type="primary" @click="next" :disabled="ablenext2">下一步</el-button>
      </div>
    </el-form>
    <el-form v-else-if="active == 2" :model="forgetdata3" :rules="rules">
      <el-form-item class="ts-loginlabel password borderbottom1" prop="newpwd1" label=" ">
        <el-input v-model="forgetdata3.newpwd1" type="password" placeholder="设置数字加字母且8-16位密码"></el-input>
      </el-form-item>
      <el-form-item class="ts-loginlabel password borderbottom1" prop="newpwd2" label=" ">
        <el-input v-model="forgetdata3.newpwd2" type="password" placeholder="确认新密码"></el-input>
      </el-form-item>
      <div class="ts-loginlabel">
        <el-button type="primary" :disabled="ablenext3" @click="resetPasswordDoctor">确认</el-button>
      </div>
    </el-form>
    <div class="textAlignCenter">
      <el-button type="text" class="ts-fontsize-small" @click="$router.push('login')">
        <<返回登录</el-button>
    </div>
  </ts-login>
</template>
<script>
export default {
  data() {
    return {
      toptab: [{
        text: '忘记密码'
      }],
      active: 0,
      forgetdata1: {
        urlImg: '',
        nameInput: '',
        codeInput: ''
      },
      forgetdata2: {
        nameInput: '',
        codeInput: ''
      },
      forgetdata3: {
        newpwd1: '',
        newpwd2: ''
      },
      setMsgPrams: {
        phone: '',
        verifyCodeToken: '',
        verifyCode: '',
        hospitalId: ''
      },
      setPasswordPrams: {
        phone: '',
        passowrd: '',
        validCode: ''
      },
      rules: {
        nameInput: [{ validator: this.checkName, trigger: 'blur', }],
        codeInput: [{ validator: this.checkCode, trigger: 'blur' }],
        newpwd1: [{ validator: this.validatePass, trigger: 'blur' }],
        newpwd2: [{ validator: this.validatePass, trigger: 'blur' }]
      },
      ablenext1: true,
      ablenext2: true,
      ablenext3: true
    }
  },
  created() {
    if (this.forgetdata1.nameInput != '' && this.forgetdata1.codeInput != '') {
      this.ablenext1 = false;
    }
  },
  updated() {
    if (this.forgetdata1.nameInput != '' && this.forgetdata1.codeInput != '') {
      this.ablenext1 = false;
    } else {
      this.ablenext1 = true;
    }
    if (this.ablenext1 == false && this.forgetdata2.nameInput != '' && this.forgetdata2.codeInput != '') {
      this.ablenext2 = false;
    } else {
      this.ablenext2 = true;
    }
    if (this.ablenext2 == false && this.forgetdata3.newpwd1 != '' && this.forgetdata3.newpwd2 != '') {
      this.ablenext3 = false;
    } else {
      this.ablenext3 = true;
    }
  },
  mounted() {
    this.getVerifyCode()
    // this.replacePic()
  },
  methods: {
    //更换登录左边的图
    // replacePic(){
    //   var div = document.querySelector(".ts-leftbg")
    //   var img = div.querySelector("img")
    //   img.src=""
    // },
    // 图形验证码
    getVerifyCode() {},
    // 短信验证码 phone, verifyCodeToken, verifyCode, hospitalId
    getPasswordSendMsg() {},
    // 重置密码 phone, passowrd, validCode
    resetPasswordDoctor() {
      this.setPasswordPrams.phone = this.setMsgPrams.phone
      this.setPasswordPrams.passowrd = this.forgetdata3.newpwd1
      this.setPasswordPrams.validCode = this.forgetdata2.codeInput
      if (this.forgetdata3.newpwd1 != this.forgetdata3.newpwd2) {
        this.$message({
          message: '两次密码不相同',
          type: 'warning'
        });
      } else {
      }
    },
    checkName(rule, value, callback) {
      if (value == '') {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    },
    checkCode(rule, value, callback) {
      if (value == '') {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    },
    validatePass(rule, value, callback) {
      if (value == '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    },
    next() {
      if (this.active < 2) {
        this.active++
        this.forgetdata2.nameInput = this.forgetdata1.nameInput
      }
    },
    back() {
      if (this.active > 0) {
        this.active--
      }
    }
  }
}
</script>
<style lang="scss">
// @import "../../assets/sass/sass-index";
.el-steps{
    .el-step{
        margin-right:-8 px;
        .el-step__main{
            margin-left:-10px !important;
        }
    }
}
.g-login {
  .ts-loginlabel {
    display: flex;
    .el-input {
      margin-left: 5px;
    }
  }
  .ts-logindiv .ts-formdiv .ts-inputdiv .ts-inputbox .ts-loginlabel input {
    border-bottom: none;
    text-indent: 0;
  }
  .el-form-item__content {
    display: flex;
    width: 100%;
  }
  .ts-logindiv .ts-formdiv .ts-inputdiv .ts-inputbox .ts-loginlabel.hasbtn input {
    width: 100%;
  }
  .ts-logindiv .ts-formdiv .ts-inputdiv .ts-inputbox .ts-loginlabel.hasbtn .el-button {
    width: 100%;
    height: 100%;
  }
  .el-button--text {
    color: #73879C;
  }
  .back {
    position: absolute;
    right: 35px;
    top: 20px;
    color: #73879C;
    background: none;
  }
  .el-button--primary {
    span{color:white!important;}
    @media screen and (max-height: 650px) {
      margin-top: 3%;
      line-height: 15px;
      padding-top: 5px;
      padding-bottom: 5px;
      height: 30px;
    }
    @media screen and (min-height: 650px) and (max-height: 800px) {
      margin-top: 5%;
      line-height: 25px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    @media screen and (min-height: 800px) {
      margin-top: 10%;
      line-height: 33px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .el-button--text {
    @media screen and (max-height: 650px) {
      padding-top: 3px;
      padding-bottom: 3px;
    }
    @media screen and (min-height: 650px) and (max-height: 800px) {
      margin-top: 3%;
    }
    @media screen and (min-height: 800px) {
      margin-top: 5%;
    }
  }
  .ts-loginlabel:first-child {
    @media screen and (max-height: 650px) {
      margin-top: 1%;
    }
    @media screen and (min-height: 650px) and (max-height: 800px) {
      margin-top: 5%;
    }
    @media screen and (min-height: 800px) {
      margin-top: 10%;
      margin-bottom: 11%;
    }
  }

  @media screen and (min-height: 650px) and (max-height: 800px) {
    .el-input__inner {
      padding-left: 2px;
      padding-right: 0;
    }
    .paddingleft30 {
      padding-left: 10px;
    }
    .ts-loginlabel.hasbtn img {
      width: 85px;
      height: 33px;
    }
  }
  @media screen and (max-height: 650px) {
    .height-40 {
      height: 35px;
      padding-top: 3px;
      padding-bottom: 3px;
    }
    .el-button-info {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .ts-loginlabel.hasbtn img {
      width: 90px;
      height: 30px;
    }
    .ts-loginlabel {
      margin-bottom: 12px;
    }
    .paddingleft30 {
      padding-left: 0;
    }
    .el-input__inner {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .ts-loginlabel {
    &.username,
    &.yzm,
    &.password {
      line-height: 28px;
    }
  }
}
</style>