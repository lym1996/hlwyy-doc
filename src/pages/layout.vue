<template>
  <div class="ts-wrapper" :class="{hideSidebar:isCollapse}">
    <ts-sidebar :collapsevalue="isCollapse" :routeMenu="routeMenu" :logo="logo" :simpleLogo="simplelogo"></ts-sidebar>
    <ts-navbar :userInfo="userInfo" :userMenu="userMenu"  :default-active="activeIndex" @sidebarHide="hideside" @userItemClick="useritemclick">
      <router-view></router-view>
    </ts-navbar>
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
      simplelogo:userphoto
    }
  },
  methods: {
    hideside(isCollapse) {
      this.isCollapse = isCollapse
    },
    useritemclick(i) {
      this.$message(`您选择了${i.text}`)
      if (i.text == '退出') {
        sessionStorage.clear();
        localStorage.clear();
        this.$router.push('/')
      }
      if (i.text == '修改密码') {
        this.$router.push('/user/forget')
      }
    },
  }
}
</script>
