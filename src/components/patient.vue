<!-- 患者管理-->
<template>
    <div class="patient margin20X">
        <el-row>
            <el-col :span="8" class="searchContent">
                <el-input placeholder="请输入搜索内容" v-model="searchInput">
                    <el-select v-model="searchType" slot="prepend" placeholder="请选择" @change="changeType">
                        <el-option label="全部" value="2"></el-option>
                        <el-option label="患者姓名" value="1"></el-option>
                        <el-option label="手机号" value="0"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
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
                                    <span>{{props.row.phone}}</span>
                                </el-form-item>
                                <el-form-item label="真实姓名">
                                    <span>{{props.row.theName}}</span>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <span>{{props.row.patientPhone}}</span>
                                </el-form-item>
                                <el-form-item label="身份证">
                                    <span>{{props.row.cardId}}</span>
                                </el-form-item>
                                <el-form-item label="就诊卡号">
                                    <span>{{props.row.patientCard}}</span>
                                </el-form-item>
                                <el-form-item label="出生日期">
                                    <span>{{props.row.birthday}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="phone" label="用户名"></el-table-column>
                    <el-table-column prop="theName" label="真实姓名"></el-table-column>
                    <el-table-column prop="patientPhone" label="手机号"></el-table-column>
                    <el-table-column prop="cardId" label="身份证"></el-table-column>
                    <el-table-column prop="patientCard" label="就诊卡号"></el-table-column>
                    <el-table-column prop="birthday" label="出生日期"></el-table-column>
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
                        <el-form-item label="用户名" prop="phone">
                            <el-input v-model="addInfo.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="真实姓名" prop="theName">
                            <el-input v-model="addInfo.theName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="patientPhone">
                            <el-input v-model="addInfo.patientPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="cardId">
                            <el-input v-model="addInfo.cardId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="addInfo.sex">
                                <el-option label="男" value=1></el-option>
                                <el-option label="女" value=0></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="就诊卡号" prop="patientCard">
                            <el-input v-model="addInfo.patientCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker v-model="addInfo.birthday" type="date" placeholder="请选择日期"></el-date-picker>
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
                        <el-form-item label="用户名" prop="phone">
                            <el-input v-model="editInfo.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="就诊人姓名" prop="theName">
                            <el-input v-model="editInfo.theName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="patientPhone">
                            <el-input v-model="editInfo.patientPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="cardId">
                            <el-input v-model="editInfo.cardId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="editInfo.sex">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="就诊卡号" prop="patientCard">
                            <el-input v-model="editInfo.patientCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker v-model="editInfo.birthday" type="date" placeholder="请选择日期"></el-date-picker>
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
const type = 168475913
export default {
    data() {
        return {
            token:'',
            phone:'',//账号
            searchInput:'',//搜索内容
            searchType:'2',//搜索类型
            tabledata: [],
            multipleSelection:'',//删除用户
            addDialog:false,//新增弹框控制参数
            addInfo:{
                phone:'',
                theName:'',
                patientPhone:'',
                sex:'',
                cardId:'',
                patientCard:'',
                birthday:''
            },
            editDialog:false,
            editInfo:{
                id:'',
                phone:'',
                theName:'',
                patientPhone:'',
                sex:'',
                cardId:'',
                patientCard:'',
                birthday:''
            },
            rules: {}
        }
    },
    mounted() {
        this.phone = localStorage.getItem("phone")
        this.token = localStorage.getItem("token")
        this.getPatient()
    },
    methods: {
        changeType(){
                this.searchInput = ''
        },
        search(){
            if(this.searchType == 2) {
                this.getPatient()
            }
            else{
                let param = {
                    patientPhone:'',
                    patientName:''
                }
                if(this.searchType == 0) {
                    param.patientPhone = this.searchInput
                }else if(this.searchType == 1) {
                    param.patientName = this.searchInput
                }
                axion.selectPatient(param.patientPhone,param.patientName,this.token,this.searchType).then( res => {
                    if(res.data.retCode == 0) {
                        this.tabledata = res.data.param
                        this.tabledata.forEach(obj => {
                            if(obj.sex == 1) {
                                obj.sex = '男'
                            }else{
                                obj.sex = '女'
                            }
                        })
                    }
                })
            }
        },
        getPatient(){
            axion.getPatient(this.phone,this.token,type).then( res => {
                if(res.data.retCode == 0) {
                    this.tabledata = res.data.param
                    this.tabledata.forEach(obj => {
                        if(obj.sex == 1) {
                            obj.sex = '男'
                        }else{
                            obj.sex = '女'
                        }
                    })
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
            this.editInfo.id = data.id
            this.editInfo.phone = data.phone
            this.editInfo.theName = data.theName
            this.editInfo.patientPhone = data.patientPhone
            this.editInfo.sex = data.sex
            this.editInfo.cardId = data.cardId
            this.editInfo.birthday = data.birthday
            this.editInfo.patientCard = data.patientCard
        },
        edit(){
            let param = {
                id:this.editInfo.id,
                phone:this.editInfo.phone,
                theName:this.editInfo.theName,
                patientPhone:this.editInfo.patientPhone,
                cardId:this.editInfo.cardId,
                patientCard:this.editInfo.patientCard,
                birthday:this.$moment(this.editInfo.birthday).format('YYYY-MM-DD'),
                type:type,
                token:this.token
            }
            if(this.editInfo.sex == '男') {
                param.sex = 1
            } else {
                param.sex = 0
            }
            console.log(param,'param')
            axion.editPatient(param).then(res => {
                if(res.data.retCode == 0) {
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    });
                    this.editDialog = false
                    this.getPatient()
                }else {
                    this.$message({
                                type:'warning',
                                message:res.data.retInfo
                            });
                }
            })
        },
        addDialogShow(){
            this.addDialog = true
        },
        addUser(){
            let param = {
                phone:this.addInfo.phone,
                theName:this.addInfo.theName,
                patientPhone:this.addInfo.patientPhone,
                sex:parseInt(this.addInfo.sex),
                cardId:this.addInfo.cardId,
                patientCard:this.addInfo.patientCard,
                birthday:this.$moment(this.addInfo.birthday).format('YYYY-MM-DD'),
                type:type,
                token:this.token
            }
            this.$refs['addInfo'].validate((valid) => {
                if(valid) {
                    axion.addPatient(param).then( res => {
                        if(res.data.retCode == 0) {
                            this.$message({
                                type:'success',
                                message:'添加成功'
                            });
                            this.addDialog = false
                            this.getPatient()
                        }else {
                            this.$message({
                                        type:'warning',
                                        message:res.data.retInfo
                                    });
                        }
                    })
                }else {
                    this.$message({
                        type:'warning',
                        message:'填写信息有误!'
                    })
                    return false
                }
            })
        },
        //操作表格选择
        handleSelectionChange(val){
            let multipleSelection = []
            for(let i=0; i< val.length; i++){
                multipleSelection.push(val[i].id)
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
        deleteUsers(){
            let param = {
                patientId: parseInt(this.multipleSelection),
                token: this.token,
                type: type
            }
            axion.deletePatient(param).then( res => {
                if(res.data.retCode == 0) {
                    this.getPatient()
                    console.log('删除成功')
                }
            })
        },
    },
}
</script>

