<template>
    <div class="patient margin20X">
        <el-row>
            <el-col :span="8" class="searchContent">
                <el-input placeholder="请输入搜索内容" v-model="searchInput">
                    <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                        <el-option label="用户名" value="0"></el-option>
                        <el-option label="真实姓名" value="1"></el-option>
                        <el-option label="手机号" value="2"></el-option>
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
                                <el-form-item label="用户名">
                                    <span>{{props.row.patName}}</span>
                                </el-form-item>
                                <el-form-item label="真实姓名">
                                    <span>{{props.row.patRealName}}</span>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <span>{{props.row.patPhone}}</span>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <span>{{props.row.patSex}}</span>
                                </el-form-item>
                                <el-form-item label="身份证">
                                    <span>{{props.row.patIdCard}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="patName" label="用户名"></el-table-column>
                    <el-table-column prop="patRealName" label="真实姓名"></el-table-column>
                    <el-table-column prop="patPhone" label="手机号"></el-table-column>
                    <el-table-column prop="patSex" label="性别"></el-table-column>
                    <el-table-column prop="patIdCard" label="身份证"></el-table-column>
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
                        <el-form-item label="用户名" prop="patName">
                            <el-input v-model="addInfo.patName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="真实姓名" prop="patRealName">
                            <el-input v-model="addInfo.patRealName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="patPhone">
                            <el-input v-model="addInfo.patPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="patIdCard">
                            <el-input v-model="addInfo.patIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="patSex">
                            <el-select v-model="addInfo.patSex">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div style="float:right;">
                    <el-button type="primary" @click="addUser">确定</el-button>
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
                        <el-form-item label="用户名" prop="patName">
                            <el-input v-model="editInfo.patName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="真实姓名" prop="patRealName">
                            <el-input v-model="editInfo.patRealName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="patPhone">
                            <el-input v-model="editInfo.patPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="patIdCard">
                            <el-input v-model="editInfo.patIdCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="patSex">
                            <el-select v-model="editInfo.patSex">
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
                    patName:'飞机',
                    patRealName:'李三',
                    patPhone:18888888888,
                    patSex:'男',
                    patIdCard:330481199612223211
                },
                {
                  patName:'大炮',
                    patRealName:'三金',
                    patPhone:188453242888,
                    patSex:'男',
                    patIdCard:335343439612223211  
                },
                {
                    patName:'坦克',
                    patRealName:'李三',
                    patPhone:13424248888,
                    patSex:'男',
                    patIdCard:3304811432456783211
                }
            ],
            multipleSelection:'',//删除用户
            addDialog:false,//新增弹框控制参数
            addInfo:{
                patName:'',
                patRealName:'',
                patPhone:'',
                patSex:'',
                patIdCard:''
            },
            editDialog:false,
            editInfo:{
                patName:'',
                patRealName:'',
                patPhone:'',
                patSex:'',
                patIdCard:''
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
            this.editInfo.patName = data.patName
            this.editInfo.patRealName = data.patRealName
            this.editInfo.patPhone = data.patPhone
            this.editInfo.patSex = data.patSex
            this.editInfo.patIdCard = data.patIdCard
        },
        edit(){
            console.log('111',this.editInfo.patName)
        },
        addDialogShow(){
            this.addDialog = true
        },
        addUser(){
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
                multipleSelection.push(val[i].patPhone)
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
                        h("p",{style: "line-height:22px"}, "是否删除所选用户")
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
                this.$message.warning("请选择要删除的用户")
            }
        },
        //删除接口
        deleteUsers(){}
    },
}
</script>

