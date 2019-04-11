<!-- 管理员管理-->
<template>
    <div class="admin margin20X">
        <el-row class="margin20X">
            <el-button type="primary" @click="addDialogShow">新增</el-button>
            <el-button type="danger" @click="deleteDialogShow">删除</el-button>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabledata" border stripe tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left">
                                <el-form-item label="姓名">
                                    <span>{{props.row.theName}}</span>
                                </el-form-item>
                                <el-form-item label="职位">
                                    <span>{{props.row.adminLevel}}</span>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <span>{{props.row.phone}}</span>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <span>{{props.row.sex}}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{props.row.createTime}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="theName" label="姓名"></el-table-column>
                    <el-table-column prop="adminLevel" label="职位"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="新增" :visible.sync="addDialog" @close="resetForm('addInfo',1)">
            <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="80px" style="margin-left:-12px;">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="adminName">
                            <el-input v-model="addInfo.theName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="addInfo.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div style="float:right;">
                    <el-button type="primary" @click="addAdmin">确定</el-button>
                    <el-button @click="resetForm('addInfo',1)">取消</el-button>
                    </div>
                    <div style="clear:both;"></div>
                </el-row>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editDialog" @close="resetForm('editInfo',2)">
            <el-form :model="editInfo" :rules="rules" ref="editInfo" label-width="80px" style="margin-left:-12px;">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="theName">
                            <el-input v-model="editInfo.theName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="editInfo.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div style="float:right;">
                    <el-button type="primary" @click="edit">确定</el-button>
                    <el-button @click="resetForm('editInfo',2)">取消</el-button>
                    </div>
                    <div style="clear:both;"></div>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import axion from '@/util/api.js'
const hospitalId = 123456
const type = 168475913
export default {
    data() {
        return {
            token:'',
            searchInput:'',//搜索内容
            searchType:'0',//搜索类型
            tabledata: [],
            multipleSelection:'',//删除用户
            addDialog:false,//新增弹框控制参数
            addInfo:{
                theName:'',
                phone:''
            },
            editDialog:false,
            editInfo:{
                theName:'',
                phone:'',
                id:'',
                userId:''
            },
            rules: {}
        }
    },
    mounted() {
        this.token = localStorage.getItem("token")
        this.getAllAdmin()
    },
    methods: {
        getAllAdmin(){
            axion.getAllAdmin(this.token).then( res => {
                if(res.data.retCode == 0) {
                    this.tabledata = res.data.param
                    for(let i = 0;i< this.tabledata.length; i++) {
                        if(this.tabledata[i].sex == 1) {
                            this.tabledata[i].sex = '女'
                        }else {
                            this.tabledata[i].sex = '男'
                        }
                        this.tabledata[i].adminLevel = '管理员'
                    }
                }
            })
        },
        //重置表单 type==1 为关闭重置新增窗口  type==2 为关闭编辑窗口
        resetForm(formName,type){
            this.$refs[formName].resetFields();
            if(type == 1){
                console.log('type====1',type)
              this.addDialog = false;  
            }else if(type == 2){
                console.log('type=====2',type)
              this.editDialog = false  
            } 
        },
        handleEdit(data){
            this.editDialog = true
            this.editInfo.theName = data.theName
            this.editInfo.phone = data.phone
            this.editInfo.id = data.id
            this.editInfo.userId = data.userId
        },
        edit(){
            let param = {
                id:this.editInfo.id,
                userId:this.editInfo.userId,
                phone:this.editInfo.phone,
                theName:this.editInfo.theName,
                token:this.token
            }
            axion.editAdmin(param).then( res => {
                if(res.data.retCode == 0) {
                    this.$message.success("修改成功")
                    this.editDialog = false
                    this.getAllAdmin()
                }
            })
        },
        addDialogShow(){
            this.addDialog = true
        },
        addAdmin(){
            let param = {
                theName:this.addInfo.theName,
                phone:this.addInfo.phone,
                token:this.token
            }
            this.$refs['addInfo'].validate((valid) => {
                if(valid) {
            
            axion.addAdmin(param).then( res => {
                if(res.data.retCode == 0) {
                    this.$message.success('添加成功')
                    this.addDialog = false
                    this.getAllAdmin()
                }else {
                    this.$message.warning(res.data.retInfo)
                }
            })
                }else {
                    return false
                    //验证失败跳提示
                }
            })
        },
        //操作表格选择
        handleSelectionChange(val){
            let multipleSelection = []
            for(let i=0; i< val.length; i++){
                multipleSelection.push(val[i].userId)
            }
            this.multipleSelection = multipleSelection.join(",")
            console.log('111',this.multipleSelection)
        },
        deleteDialogShow(){
            if(this.multipleSelection.length) {
                const h = this.$createElement;
                this.$msgbox({
                    title: "删除确认",
                    message: h("p", null, [
                        h("p",{style: "line-height:22px"}, "是否删除所选管理员")
                    ]),
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    beforeClose: (action, instance, done) => {
                        if(action === "confirm") {
                            this.deleteUsers();//调删除接口
                            done();
                            instance.confirmButtonLoading = false;
                        }else {
                            done();
                        }
                    }
                }).then(action => {
                    action = '删除成功';
                    this.$message.success(action)
                })
            }else{
                this.$message.warning("请选择要删除的管理员")
            }
        },
        //删除接口
        deleteUsers(){
            let param = {
                adminId:this.multipleSelection,
                token:this.token
            }
            axion.deleteAdmin(param).then( res => {
                if(res.data.retCode == 0) {
                    console.log('删除成功')
                    this.getAllAdmin()
                }
            })
        }
    },
}
</script>

