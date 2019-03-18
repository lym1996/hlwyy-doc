<!-- 医生管理-->
<template>
    <div class="doctor margin20X">
        <el-row  class="bordernone">
            <el-col :span="6" class="depart">
                <span>科室</span>
                <el-select v-model="department" filterable placeholder="请选择">
                    <el-option
                      v-for="item in departments"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" class="searchContent">
                <el-input placeholder="请输入搜索内容" v-model="searchInput" class="input-with-select">
                    <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                      <el-option label="医生姓名" value="1"></el-option>
                      <el-option label="医生工号" value="2"></el-option>
                    </el-select>
                     <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
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
                                    <span>{{props.row.docId}}</span>
                                </el-form-item>
                                <el-form-item label="医生姓名">
                                    <span>{{props.row.docName}}</span>
                                </el-form-item>
                                <el-form-item label="科室">
                                    <span>{{props.row.department}}</span>
                                </el-form-item>
                                <el-form-item label="职称">
                                    <span>{{props.row.level}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="docId" label="医生工号"></el-table-column>
                    <el-table-column prop="docName" label="医生姓名"></el-table-column>
                    <el-table-column prop="department" label="科室"></el-table-column>
                    <el-table-column prop="level" label="职称"></el-table-column>
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
                        <el-form-item label="医生工号" prop="docId">
                            <el-input v-model="addInfo.docId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="医生姓名" prop="docName">
                            <el-input v-model="addInfo.docName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="科室" prop="department">
                            <el-select v-model="addInfo.department" placeholder="请选择科室">
                               <el-option
                                  v-for="item in departments"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职称" prop="level">
                            <el-input v-model="addInfo.level"></el-input>
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
                        <el-form-item label="医生工号" prop="docId">
                            <el-input v-model="editInfo.docId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="医生姓名" prop="docName">
                            <el-input v-model="editInfo.docName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="科室" prop="department">
                            <el-select v-model="editInfo.department" placeholder="请选择科室">
                               <el-option
                                  v-for="item in departments"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职称" prop="level">
                            <el-input v-model="editInfo.level"></el-input>
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
export default {
    data(){
        return{
            departments:[{
                value:'全部',
                label:'全部'
            },{
                value:'眼科',
                label:'眼科'
            },{
                value:'内科',
                label:'内科'
            },{
                value:'外科',
                label:'外科'
            },{
                value:'儿科',
                label:'儿科'
            },{
                value:'骨科',
                label:'骨科'
            },{
                value:'妇产科',
                label:'妇产科'
            },{
                value:'口腔科',
                label:'口腔科'
            },{
                value:'耳鼻咽喉科',
                label:'耳鼻咽喉科'
            },{
                value:'肿瘤科',
                label:'肿瘤科'
            }],
            department:'全部',//搜索选中科室
            docName:'',//搜索医生姓名
            searchInput:'',//搜索框
            searchType:'1',//搜索类型
            tabeldata:[
                {
                    docId:116720,
                    docName:'和房价开',
                    department:'外科',
                    level:'主任',
                    specialty:'大叔大叔大大大大大大大'
                },
                {
                    docId:117820,
                    docName:'收到了',
                    department:'内科',
                    level:'主任',
                    specialty:'大叔大叔大大大大大大大'
                },
                {
                    docId:114520,
                    docName:'大家的',
                    department:'眼科',
                    level:'主任',
                    specialty:'大叔大叔大大大大大大大'
                }
            ],
            multipleSelection:'',//删除选中Id
            addDialog:false,//新增弹框控制参数
            addInfo:{
                docId:'',
                docName:'',
                department:'全部',
                level:'',
                specialty:''
            },
            editDialog:false,
            editInfo:{
                docId:'',
                docName:'',
                department:'全部',
                level:'',
                specialty:''
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
        //编辑弹框显示
        handleEdit(data){
            this.editDialog = true
            this.editInfo.docId = data.docId
            this.editInfo.docName = data.docName
            this.editInfo.department = data.department
            this.editInfo.level = data.level
            this.editInfo.specialty = data.specialty
        },
        edit(){},
        //新增弹框显示
        addDialogShow(){
            this.addDialog = true
        },
        //新增接口
        addDoc(){
            this.$refs['addInfo'].validate((valid) => {
                if(valid) {
                    //验证成功调接口
                    console.log('成功')
                }else {
                    return false
                    //验证失败
                }
            })
        },
        //操作表格选择
        handleSelectionChange(val){
            let multipleSelection = []
            for(let i=0; i< val.length; i++){
                multipleSelection.push(val[i].docId)
            }
            this.multipleSelection = multipleSelection.join(",")
            console.log('11',this.multipleSelection)
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
        deleteDocs(){}
    },
}
</script>
