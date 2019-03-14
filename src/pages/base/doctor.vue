<template>
    <div class="ts-content set-content bordertopnone doctor">
        <el-row  class="bordernone">
            <el-col :span="4" class="depart">
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
            <el-col :span="6" class="searchContent">
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
            <el-col :span="24">
                <el-table :data="tabeldata" border stripe>
                    <el-table-column type="index" align="center"></el-table-column>
                    <el-table-column prop="docId" label="医生工号"></el-table-column>
                    <el-table-column prop="docName" label="医生姓名"></el-table-column>
                    <el-table-column prop="department" label="科室"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            departments:[{
                value:'1',
                label:'眼科'
            },{
                value:'2',
                label:'内科'
            },{
                value:'3',
                label:'外科'
            },{
                value:'4',
                label:'儿科'
            },{
                value:'5',
                label:'骨科'
            },{
                value:'6',
                label:'妇产科'
            },{
                value:'7',
                label:'口腔科'
            },{
                value:'8',
                label:'耳鼻咽喉科'
            },{
                value:'9',
                label:'肿瘤科'
            },{
                value:'10',
                label:'其他科室'
            }],
            department:'1',
            docName:'',
            searchInput:'',
            searchType:'1',
            tabeldata:[],
        }
    }
}
</script>
<style lang="scss">
.doctor{
    .searchContent{
        .el-select{
            .el-input{
                width:110px;
            }
        }
        .input-with-select{
            .el-input-group__prepend{
                background-color: #fff;
            }
        }
    }
}
</style>
