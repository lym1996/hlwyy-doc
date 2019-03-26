<template>
    <div class="ts-content set-content bordertopnone appointSearch">
        <el-row class="marginbottom20">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>预约查询</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-row>
            <el-col :span="7">
                <span>预约时间</span>
                <el-date-picker v-model="date" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期" :picker-options="pickerOption" @change="gettime" style="width:260px;"></el-date-picker>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="5">
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-row class="margin20X">
            <el-button type="danger" @click="deleteDialogShow">删除</el-button>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabeldata" border stripe tooltip-effect="dark" style="width:100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" class="">
                                <el-form-item label="预约单号">
                                    <span>{{props.row.appId}}</span>
                                </el-form-item>
                                <el-form-item label="患者姓名">
                                    <span>{{props.row.appName}}</span>
                                </el-form-item>
                                <el-form-item label="预约科室">
                                    <span>{{props.row.appDepart}}</span>
                                </el-form-item>
                                <el-form-item label="预约类型">
                                    <span>{{props.row.appType}}</span>
                                </el-form-item>
                                <el-form-item label="预约医生">
                                    <span>{{props.row.appDoc}}</span>
                                </el-form-item>
                                <el-form-item label="预约结果">
                                    <span>{{props.row.appSta}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
                    <el-table-column prop="appId" label="预约单号"></el-table-column>
                    <el-table-column prop="appName" label="患者姓名"></el-table-column>
                    <el-table-column prop="appDepart" label="预约科室"></el-table-column>
                    <el-table-column prop="appType" label="预约类型"></el-table-column>
                    <el-table-column prop="appDoc" label="预约医生"></el-table-column>
                    <el-table-column prop="appSta" label="预约结果"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pickerOption: {
               shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }] 
            },
            date:'',
            department:'',
            departments:[
                {
                    value:'妇产科',
                    label:'妇产科'
                },{
                    value:'口腔科',
                    label:'口腔科'
                },{
                    value:'耳鼻咽喉科',
                    label:'耳鼻咽喉科'
                }
            ],
            tabeldata:[
                {
                    appId:'3131213',
                    appName:'111',
                    appDepart:'wewr',
                    appType:'true',
                    appDoc:'sada',
                    appSta:'eqeqw'
                },
                {
                    appId:'3131213',
                    appName:'111',
                    appDepart:'wewr',
                    appType:'true',
                    appDoc:'sada',
                    appSta:'eqeqw'
                },
            ],
            multipleSelection:''
        }
    },
    methods: {
        //操作选择
        handleSelectionChange(val){
            let multipleSelection = []
            for(let i=0; i< val.length; i++){
                multipleSelection.push(val[i].appId)
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
                        h("p",{style: "line-height:22px"}, "是否删除所选信息")
                    ]),
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    beforeClose: (action, instance, done) => {
                        if(action === "confirm") {
                            this.deleteapp();//调删除接口
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
                this.$message.warning("请选择要删除的信息")
            }
        },
        //删除接口
        deleteapp(){

        },
        gettime(){
            console.log('111',this.date)
        }
    },
}
</script>