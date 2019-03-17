<!-- 管理员管理-->
<template>
    <div class="admin margin20X">
        <el-row>
            <el-col :span="8" class="searchContent">
                <el-input placeholder="请输入搜索内容" v-model="searchInput">
                    <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                        <el-option label="姓名" value="0"></el-option>
                        <el-option label="手机号" value="1"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
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
                                    <span>{{props.row.adminName}}</span>
                                </el-form-item>
                                <el-form-item label="职位">
                                    <span>{{props.row.adminLevel}}</span>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <span>{{props.row.adminPhone}}</span>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <span>{{props.row.adminSex}}</span>
                                </el-form-item>
                                <el-form-item label="身份证">
                                    <span>{{props.row.adminIdCard}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="adminName" label="姓名"></el-table-column>
                    <el-table-column prop="adminLevel" label="职位"></el-table-column>
                    <el-table-column prop="adminPhone" label="手机号"></el-table-column>
                    <el-table-column prop="adminSex" label="性别"></el-table-column>
                    <el-table-column prop="adminIdCard" label="身份证"></el-table-column>
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
                            <el-input v-model="addInfo.adminName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位" prop="adminLevel">
                            <el-input v-model="addInfo.adminLevel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="adminPhone">
                            <el-input v-model="addInfo.adminPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="adminIdCard">
                            <el-input v-model="addInfo.adminIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="adminSex">
                            <el-select v-model="addInfo.adminSex">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
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
                        <el-form-item label="姓名" prop="adminName">
                            <el-input v-model="editInfo.adminName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位" prop="adminLevel">
                            <el-input v-model="editInfo.adminLevel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="adminPhone">
                            <el-input v-model="editInfo.adminPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="adminIdCard">
                            <el-input v-model="editInfo.adminIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="adminSex">
                            <el-select v-model="editInfo.adminSex">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
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
export default {
    data() {
        return {
            searchInput:'',//搜索内容
            searchType:'0',//搜索类型
            tabledata: [
                {
                    adminName:'管理123',
                    adminLevel:'管理员',
                    adminPhone:18888888888,
                    adminSex:'男',
                    adminIdCard:330481199612223211
                },
                {
                  adminName:'456管理',
                    adminLevel:'管理员',
                    adminPhone:188453242888,
                    adminSex:'男',
                    adminIdCard:335343439612223211  
                },
                {
                    adminName:'21管理1',
                    adminLevel:'管理员',
                    adminPhone:13424248888,
                    adminSex:'男',
                    adminIdCard:3304811432456783211
                }
            ],
            multipleSelection:'',//删除用户
            addDialog:false,//新增弹框控制参数
            addInfo:{
                adminName:'',
                adminLevel:'',
                adminPhone:'',
                adminSex:'',
                adminIdCard:''
            },
            editDialog:false,
            editInfo:{
                adminName:'',
                adminLevel:'',
                adminPhone:'',
                adminSex:'',
                adminIdCard:''
            },
            rules: {}
        }
    },
    methods: {
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
            this.editInfo.adminName = data.adminName
            this.editInfo.adminLevel = data.adminLevel
            this.editInfo.adminPhone = data.adminPhone
            this.editInfo.adminSex = data.adminSex
            this.editInfo.adminIdCard = data.adminIdCard
        },
        edit(){
            console.log('111',this.editInfo.adminName)
        },
        addDialogShow(){
            this.addDialog = true
        },
        addAdmin(){
            this.$refs['addInfo'].validate((valid) => {
                if(valid) {
                    //验证成功调接口
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
                multipleSelection.push(val[i].adminPhone)
            }
            this.multipleSelection = multipleSelection.join(",")
            console.log('11',this.multipleSelection)
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
        deleteUsers(){}
    },
}
</script>

