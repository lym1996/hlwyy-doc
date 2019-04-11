<template>
    <div class="ts-content set-content bordertopnone">
        <el-row class="marginbottom20">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="就诊人管理" name="first">
                <patient></patient>
            </el-tab-pane>
            <el-tab-pane label="医生管理" name="second">
                <doctor></doctor>
            </el-tab-pane>
            <el-tab-pane label="管理员管理" name="third">
                <admin></admin>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import patient from "@/components/patient"
import doctor from "@/components/doctor"
import admin from "@/components/administrator"
export default {
    components: { doctor, patient, admin},
    data() {
        return {
            activeName:'first',
        }
    },
    methods: {
        handleClick(tab,event){
            console.log(tab,event)
        }
    },
}
</script>