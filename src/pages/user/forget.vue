<template>
  <ts-login :top-tab="toptab" class="g-login">
    <div class="absolute" style="top:-120px;left:-20px;color:#fff;font-size:35px;">后台管理系统</div>
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
        <div class="ts-bgcolor-white marginbottom-1 paddingleft30 height-40">
          <el-button v-if="picShow" @click="getVerifyCode" style="height:40px;">获取图形验证码</el-button>
          <img v-else :src="forgetdata1.urlImg" @click="getVerifyCode" class="cursorPointer" width="110" height="40">
        </div>
      </el-form-item>
      <div class="ts-loginlabel">
        <el-button type="primary" @click="next(1)" :disabled="ablenext1">下一步</el-button>
      </div>
    </el-form>
    <el-form v-else-if="active == 1" :model="forgetdata2" :rules="rules">
      <el-form-item class="ts-loginlabel username borderbottom1" prop="nameInput" label=" ">
        <el-input v-model="forgetdata2.nameInput" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="ts-loginlabel yzm hasbtn borderbottom1" prop="codeInput" label=" ">
        <el-input v-model="forgetdata2.codeInput" type="password" placeholder="请输入短信验证码"></el-input>
        <div class="ts-bgcolor-white marginbottom-1 paddingleft30 height-40">
          <el-button type="info" v-if="hasSend" @click="getPasswordSendMsg">发送验证码</el-button>
          <el-button type="info" v-else disabled>{{time}}s后重新发送</el-button>
        </div>
      </el-form-item>
      <div class="ts-loginlabel">
        <el-button type="primary" @click="next(2)" :disabled="ablenext2">下一步</el-button>
      </div>
    </el-form>
    <el-form v-else-if="active == 2" :model="forgetdata3" :rules="rules">
      <el-form-item class="ts-loginlabel password borderbottom1" prop="newpwd1" label=" ">
        <el-input v-model="forgetdata3.newpwd1" type="password" placeholder="设置数字加字母且6-16位密码"></el-input>
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
import axion from '@/util/api.js'
export default {
  data() {
    return {
      time:0,
      hasSend:true,
      picShow:true,
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
        phone:'',
        newpwd1: '',
        newpwd2: '',
        codeInput:'',
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
    this.replacelogo()
  },
  methods: {
    // 图形验证码
    getVerifyCode() {
				if(this.forgetdata1.nameInput == '') {
					this.$message({
						type: 'warning',
						message: '请输入手机号'
					});
					return;
				}else {
          this.picShow = false;
          let param = {
            phone:this.forgetdata1.nameInput,
            type:1
          }
          axion.getPicCode(param).then( res => {
            if( res.data.retCode == 0) {
              this.forgetdata1.urlImg = res.data.param.validate_code_url
            } else {
              this.$message({
                type:'warning',
                message:res.data.retInfo
              })
            }
          })
        }
    },
    // 短信验证码 phone, verifyCodeToken, verifyCode, hospitalId
    getPasswordSendMsg() {
      let param = {
        phone:this.forgetdata2.nameInput,
        type:1,
        picCode:this.forgetdata1.codeInput
      }
      axion.getMsgCode(param).then( res => {
        if(res.data.retCode == 0) {
          this.hasSend = false
          this.$message({
            type:'success',
            message:'获取短信验证码成功'
          });
          this.time = 60;
          let a =setInterval(() => {
            this.time = this.time - 1;
            if(this.time == 0) {
              this.hasSend = true
              clearInterval(a);
            }
          },1000)
        }else {
          this.$message({
            type:'warning',
            message:'获取短信验证码失败'
          })
        }
      })
    },
    // 重置密码 phone, passowrd, validCode
    resetPasswordDoctor() {
      if (this.forgetdata3.newpwd1 != this.forgetdata3.newpwd2) {
        this.$message({
          message: '两次密码不相同',
          type: 'warning'
        });
        return;
      } else {
        let param = {
          phone:this.forgetdata3.phone,
          newPwd:this.forgetdata3.newpwd1,
          msgCode:this.forgetdata3.codeInput
        }
        axion.reinputPasswoed(param).then( res => {
          if(res.data.retCode == 0) {
            this.$message.success("修改成功")
            this.$router.push('/')
          }
        })
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
    next(type) {
      if(type == 1){
        let param = {
          phone:this.forgetdata1.nameInput,
          picCode:this.forgetdata1.codeInput,
          type:1
        }
        axion.verifyPictureCode(param).then( res => {
          if(res.data.retCode == 0) {
            console.log('图形验证码通过')
            if (this.active < 2) {
              this.active++
              this.forgetdata2.nameInput = this.forgetdata1.nameInput
            }
          }else {
            this.$message.warning(res.data.retInfo)
          }
        })
      }else if(type == 2) {
        let param = {
          phone:this.forgetdata2.nameInput,
          msgCode:this.forgetdata2.codeInput,
          type:1
        }
        axion.verifyMsgCode(param).then( res => {
          if(res.data.retCode == 0) {
            console.log('短信验证码通过')
            if(this.active < 2) {
              this.active++
              this.forgetdata3.phone = this.forgetdata2.nameInput
              this.forgetdata3.codeInput = this.forgetdata2.codeInput
            }
          }else {
            this.$message.warning(res.data.retInfo)
          }
        })
      }
    },
    back() {
      if (this.active > 0) {
        this.active--
      }
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