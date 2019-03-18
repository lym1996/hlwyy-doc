<template>
  <div class="ts-wrapper" :class="{hideSidebar:isCollapse}">
    <ts-sidebar :collapsevalue="isCollapse" :routeMenu="routeMenu" :logo="logo" :simpleLogo="simplelogo"></ts-sidebar>
    <ts-navbar :userInfo="userInfo" :userMenu="userMenu"  :default-active="activeIndex" @sidebarHide="hideside" @userItemClick="useritemclick">
      <router-view></router-view>
    </ts-navbar>
    <el-dialog title="修改密码" :visible.sync="modifyDialog" width="380px" @close="resetForm('modify')">
      <el-form :model="modify" label-position="right" label-width="80px" :rules="rules" ref="modify" class="marginXauto">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="modify.oldPassword" class="width250"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="modify.newPassword" class="width250"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword2">
            <el-input v-model="modify.newPassword2" class="width250"></el-input>
          </el-form-item>
          <div style="padding-left:100px;">
          <el-button type="primary" @click="modifyPass">确定</el-button>
          <el-button @click="resetForm('modify')">取消</el-button>
          </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { sideRoutes } from '@/router/routes.js'
import userphoto from '@/assets/logo.png'
// import logo from '@/assets/img/default/hosLogo.png'
// import simplelogo from '@/assets/img/default/simplelogo.png'
// const ifnew = window.location.href.indexOf('new');
export default {
  data() {
    return {
      isCollapse: false,
      routeMenu: sideRoutes,
      userInfo: {
        userphoto: userphoto,
        username: '个人中心'
      },
      userMenu: [{
        text: '修改密码'
      }, {
        text: '退出'
      }],
      activeIndex: '1',
      logo:userphoto,
      simplelogo:userphoto,
      modifyDialog:false,
      //输入的密码
      modify:{
        oldPassword:'',
        newPassword:'',
        newPassword2:''
      },
      //调接口的参数
      setPasswordPrams:{
        password:'',
        newPassword:''
      },
      rules:{
        newPassword: [
          {
            pattern: /^[\w]{6,16}$/,
            message:"请输入6-16位密码只可包含数字字母"
          }
        ]
      }
    }
  },
  methods: {
    hideside(isCollapse) {
      this.isCollapse = isCollapse
    },
    useritemclick(i) {
      if (i.text == '退出') {
        this.$message(`您选择了${i.text}`)
        sessionStorage.clear();
        localStorage.clear();
        this.$router.push('/')
      }
      if (i.text == '修改密码') {
        this.modifyDialog = true
      }
    },
    //重置表单
    resetForm(formName){
      this.$refs[formName].resetFields();
      this.modifyDialog = false
    },
    //修改密码
    modifyPass(){
      this.setPasswordPrams.password = this.modifyPass.oldPassword
      this.setPasswordPrams.newPassword = this.modify.newPassword
      if(this.modify.oldPassword !="" && this.modify.newPassword != "" && this.modify.newPassword2 != "") {
        if(this.modify.oldPassword == this.modify.newPassword) {
          this.$message({
						message: '新密码与当前密码不能相同',
						type: 'warning'
					});
        }else if(this.modify.newPassword != this.modify.newPassword2){
          this.$message({
						message: '两次新密码输入不一样',
						type: 'warning'
					});
        }
        else {
          //调修改密码接口
        }
      }else {
        this.$message({
					message: '原密码、新密码和确认密码不能为空',
					type: 'warning'
				});
      }
    },
  }
}
</script>
