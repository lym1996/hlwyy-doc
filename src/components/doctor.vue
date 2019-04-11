<!-- 医生管理-->
<template>
    <div class="doctor margin20X">
        <el-row  class="bordernone ">
            <el-col :span="6">
                <span>科室</span>
                <el-select v-model="department" filterable placeholder="请选择" @change="getDocByDept">
                    <el-option
                      v-for="item in departments"
                      :key="item.sectionId"
                      :label="item.sectionName"
                      :value="item.sectionId">
                    </el-option>
              </el-select>
            </el-col>
        </el-row>
        <el-row class="margin20X">
            <el-button type="primary" @click="addDialogShow">新增</el-button>
            <el-button type="danger" @click="deleteDialogShow">删除</el-button>
        </el-row>
        <el-row class="margin20X">
            <el-col :span="24">
                <el-table :data="tabeldata" border stripe tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" class="">
                                <el-form-item label="医生工号">
                                    <span>{{props.row.workId}}</span>
                                </el-form-item>
                                <el-form-item label="医生姓名">
                                    <span>{{props.row.doctorName}}</span>
                                </el-form-item>
                                <el-form-item label="科室">
                                    <span>{{props.row.sectionName}}</span>
                                </el-form-item>
                                <el-form-item label="职称">
                                    <span>{{props.row.linchuangTitle}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="workId" label="医生工号"></el-table-column>
                    <el-table-column prop="doctorName" label="医生姓名"></el-table-column>
                    <el-table-column prop="sectionName" label="科室"></el-table-column>
                    <el-table-column prop="linchuangTitle" label="职称"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="新增" :visible.sync="addDialog" @close="resetForm('addInfo',1)">
            <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="80px" style="margin-left:-12px;">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="医生工号" prop="workId">
                            <el-input v-model="addInfo.workId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="医生姓名" prop="doctorName">
                            <el-input v-model="addInfo.doctorName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="科室" prop="sectionName">
                            <el-select v-model="addInfo.sectionName" placeholder="请选择科室">
                               <el-option
                                  v-for="item in departments"
                                  :key="item.sectionId"
                                  :label="item.sectionName"
                                  :value="item.sectionId">
                                </el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职称" prop="linchuangTitle">
                            <el-select v-model="addInfo.linchuangTitle" placeholder="请选择职称">
                               <el-option
                                  v-for="item in DocTitle"
                                  :key="item.keyValue"
                                  :label="item.keyName"
                                  :value="item.keyValue">
                                </el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="擅长" prop="specialty">
                            <el-input v-model="addInfo.specialty" type="textarea" :rows="2" placeholder="请输入医生擅长"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div style="float:right;">
                    <el-button type="primary" @click="addDoc">确定</el-button>
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
                        <el-form-item label="医生工号" prop="workId">
                            <el-input v-model="editInfo.workId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="医生姓名" prop="doctorName">
                            <el-input v-model="editInfo.doctorName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="科室" prop="sectionName">
                            <el-select v-model="editInfo.sectionName" placeholder="请选择科室">
                               <el-option
                                  v-for="item in departments"
                                  :key="item.sectionId"
                                  :label="item.sectionName"
                                  :value="item.sectionId">
                                </el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职称" prop="linchuangTitle">
                            <el-select v-model="editInfo.linchuangTitle" placeholder="请选择职称">
                               <el-option
                                  v-for="item in DocTitle"
                                  :key="item.keyValue"
                                  :label="item.keyName"
                                  :value="item.keyValue">
                                </el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="擅长" prop="specialty">
                            <el-input v-model="editInfo.specialty" type="textarea" :rows="2" placeholder="请输入医生擅长"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div style="margin-left:240px;">
                    <el-button type="primary" @click="edit">确定</el-button>
                    <el-button @click="resetForm('editInfo',2)">取消</el-button>
                    </div>
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
    data(){
        return{
            token:'',
            departments:[],
            DocTitle:[],//医生职称
            department:'',//搜索选中科室
            docName:'',//搜索医生姓名
            searchInput:'',//搜索框
            searchType:'1',//搜索类型
            tabeldata:[],
            multipleSelection:'',//删除选中Id
            addDialog:false,//新增弹框控制参数
            addInfo:{
                workId:'',
                doctorName:'',
                sectionName:'',
                linchuangTitle:22
,
                specialty:''
            },
            editDialog:false,
            editInfo:{
                doctorId:'',
                workId:'',
                doctorName:'',
                sectionName:'',
                linchuangTitle:'',
                specialty:''
            },
            rules: {}
        }
    },
    mounted() {
        this.token = localStorage.getItem("token")
        this.getDocTitle()
        this.getDept()
        this.getDoc()
    },
    methods: {
        getDocTitle(){
            axion.getDocTitle().then( res => {
                if(res.data.retCode == 0) {
                    this.DocTitle = res.data.param.linchuangTitleList
                    console.log(this.DocTitle)
                }
            })
        },
        getDept() {
            axion.getDept(this.token,hospitalId).then( res => {
                if(res.data.retCode == 0) {
                    this.departments = res.data.param
                }
            })
        },
        //全部医生
        getDoc(){
            axion.getAllDoc(hospitalId).then( res => {
                if(res.data.retCode == 0) {
                    this.tabeldata = res.data.param
                }
            })
        },
        //按科室找医生
        getDocByDept(){
            console.log('123',this.department)
            axion.getDocByDept(this.department).then( res => {
                if(res.data.retCode == 0) {
                    this.tabeldata = res.data.param
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
        //编辑弹框显示
        handleEdit(data){
            this.editDialog = true
            this.editInfo.doctorId = data.doctorId
            this.editInfo.workId = data.workId
            this.editInfo.doctorName = data.doctorName
            this.editInfo.sectionName = data.sectionName
            this.editInfo.linchuangTitle = data.linchuangTitle
            this.editInfo.specialty = data.specialty
            console.log('edit',this.editInfo)
        },
        edit(){
            let param = {
                hospitalId:hospitalId,
                doctorId:this.editInfo.doctorId,
                doctorName:this.editInfo.doctorName,
                sectionId:this.editInfo.sectionName,
                workId:this.editInfo.workId,
                linchuangTitle:this.editInfo.linchuangTitle,
                specialty:this.editInfo.specialty,
                token:this.token
            }
            console.log('11',this.departments)
            for( let i = 0; i< this.departments.length; i++) {
                if(param.sectionId == this.departments[i].sectionName) {
                    param.sectionId = parseInt(this.departments[i].sectionId)
                }
            }
            for(let i = 0; i< this.DocTitle.length; i++) {
                if(param.linchuangTitle == this.DocTitle[i].keyName) {
                    param.linchuangTitle = this.DocTitle[i].keyValue
                }
            }
            console.log('param',param.sectionId)
            axion.editDoc(param).then( res => {
                if(res.data.retCode == 0) {
                    this.$message.success('修改成功')
                    this.editDialog = false
                    this.getDoc()
                }
            })
        },
        //新增弹框显示
        addDialogShow(){
            this.addDialog = true
        },
        //新增接口
        addDoc(){
            let param = {
                doctorName:this.addInfo.doctorName,
                hospitalId:hospitalId,
                sectionId:parseInt(this.addInfo.sectionName),
                workId:parseInt(this.addInfo.workId),
                linchuangTitle:parseInt(this.addInfo.linchuangTitle),
                specialty:this.addInfo.specialty,
                token:this.token
            }
            console.log('param',param)
            // console.log('addinfo',this.addInfo.linchuangTitle)
            this.$refs['addInfo'].validate((valid) => {
                if(valid) {
                    //验证成功调接口
                    axion.addDoc(param).then( res => {
                        if(res.data.retCode == 0) {
                            this.$message.success('添加成功')
                            this.addDialog = false;
                            this.getDoc();
                        }else {
                            this.$message.warning(res.data.retInfo)
                        }
                    })
                }else {
                    return false
                    //验证失败
                }
            })
        },
        //操作表格选择
        handleSelectionChange(val){
            console.log(val)
            let multipleSelection = []
            for(let i=0; i< val.length; i++){
                multipleSelection.push(val[i].doctorId)
            }
            this.multipleSelection = multipleSelection.join(",")
            console.log(this.multipleSelection)
        },
        //删除弹框
        deleteDialogShow(){
            if(this.multipleSelection.length) {
                const h = this.$createElement;
                this.$msgbox({
                    title: "删除确认",
                    message: h("p", null, [
                        h("p",{style: "line-height:22px"}, "是否删除所选医生")
                    ]),
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    beforeClose: (action, instance, done) => {
                        if(action === "confirm") {
                            this.deleteDocs();//调删除接口
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
                this.$message.warning("请选择要删除的医生")
            }
        },
        //删除接口
        deleteDocs(){
            let param = {
                doctorId:this.multipleSelection,
                token:this.token
            }
            axion.deleteDoc(param).then( res => {
                if(res.data.retCode == 0) {
                    console.log('删除成功')
                    this.getDoc()
                }
            })
        }
    },
}
</script>
