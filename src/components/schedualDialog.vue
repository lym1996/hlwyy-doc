<template>
    <el-dialog title="医生排班" :visible.sync="visible" :before-close="closeDialog" :close-on-click-modal="false" width="1201px">
            <div>        
                <el-row>
                    <el-col :span="11">
                        <div class="fontsize5 paddingtop10">
                            <span>{{departmentName}}</span>
                            <span class="marginX20">{{scheduleDate}}</span>
                            <span v-if="timeType == 0">上午</span>
                            <span v-else-if="timeType == 1">下午</span>  
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <el-input placeholder="请输入医生名称" style="width:300px;margin-left:328px;" >
                                <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-scrollbar wrap-class="scrollWrap">
                    <el-row class="margintop20">
                        <el-col :span="24">
                            <el-table  :data="data" ref="table" border stripe tooltip-effect="dark" max-height="350" style="width:100%;"
                            @select="checkRegister" @select-all="checkRegisters" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column prop="workId" label="医生工号"  align="center" width="140px;"></el-table-column>
                                <el-table-column prop="doctorName" label="医生姓名"  align="center" width="140px;">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.stopType == 1">
                                            {{scope.row.doctorName}}<span>(已停诊)</span>
                                        </span>
                                        <span v-else>{{scope.row.doctorName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sectionName" label="科室"  align="center"></el-table-column>
                                <el-table-column prop="linchuangTitle" label="职称"  align="center" width="130px;"></el-table-column>
                                <el-table-column prop="regitionPrice" label="价格"  align="center" width="130px">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.regitionPrice" size="small" type="number" max="10000.00" min="0.00" style="width:80px;"></el-input>
                                        <span>元</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="具体时间" align="center"  width="250px">
                                    <template slot-scope="scope">
                                        <div class="textAlignCenter">
                                            <el-time-select v-if="timeType == 0"  placeholder="起始时间" v-model="scope.row.startTime" :editable=false :clearable=false
                                                :picker-options="{
                                                    start: '00:00',
                                                    step: '00:30',
                                                    end: '11:30'
                                                    }" style="width:100px;">
                                            </el-time-select>
                                            <el-time-select v-if="timeType == 1"  placeholder="起始时间" v-model="scope.row.startTime" :editable=false :clearable=false
                                                :picker-options="{
                                                    start: '13:00',
                                                    step: '00:30',
                                                    end: '17:00'
                                                    }" style="width:100px;">
                                            </el-time-select>
                                            <span>—</span>
                                            <el-time-select v-if="timeType == 0"  placeholder="结束时间" v-model="scope.row.endTime" :editable=false :clearable=false
                                                :picker-options="{
                                                    start: '00:30',
                                                    step: '00:30',
                                                    end: '12:00'
                                                    }" style="width:100px;">
                                            </el-time-select>
                                            <el-time-select v-if="timeType == 1"  placeholder="起始时间" v-model="scope.row.endTime" :editable=false :clearable=false
                                                :picker-options="{
                                                    start: '13:00',
                                                    step: '00:30',
                                                    end: '17:00'
                                                    }" style="width:100px;">
                                            </el-time-select>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="registionNum" label="号源" width="80px;">
                                    <template slot-scope="scope">
                                            <el-input v-model="scope.row.registionNum" style="width:50px;"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-scrollbar>
                <div class="floatRight margintop20">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="updateSchedule">确定</el-button>
                </div>
                <div style="clear:both;" ></div>
            </div>
        </el-dialog>
</template>
<script>
import axion from '@/util/api.js'
export default {
    data() {
        return {
            token:'',
            //表格数据
            data:[],
            scheduleList:[],//已排班医生列表
            docList:[],//未排班医生列表
            oldList: [],//旧已排班医生
            newDocList:[]//新更改的排班医生
        }
    },
    mounted() {
        this.token = localStorage.getItem("token")
        this.getScheduleDocList();//获取排班医生表
    },
    methods: {
        closeDialog(){
            this.$emit('close')
        },
        getScheduleDocList(){
            //接口获取 已排班医生列表和未排班医生列表
            axion.getDaySchdule(this.token,this.departmentId,this.timeType,this.scheduleDate).then( res => {
                if(res.data.retCode == 0){
                    this.scheduleList = res.data.param.schedulingList
                    this.docList = res.data.param.nonSchedulingList
                    this.editDocList();//把查询到的未排班医生和已排班医生插入表格中
                }
            }).catch(err => {
                console.log(err)
            })
            
        },
        editDocList(){
            this.data = [];
            //插入已排班医生列表
            this.oldList = this.scheduleList
            this.oldList.forEach(scheduledoc =>{
                this.data.push(scheduledoc)
            });
            console.log('oldList',this.oldList)
            //插入未排班医生列表
            this.docList.forEach(unscheduledoc => {
                this.data.push(unscheduledoc)
            }); 
            setTimeout(() => {
                this.checked();
            }, 50);
        },
        //设置选中状态
        checked(){
            if(this.data){
                this.data.forEach(schdule => {
                    if(schdule.registionSchedulingId != 0)
                        this.$refs.table.toggleRowSelection(schdule, true)
                })
            }
        },
        //单个勾选，判断单个排班是否被挂号
        checkRegister(selection,row){
            if( row != undefined && row.registionSchedulingId != 0){
                //调接口判断是否已经被挂号，条件判断再执行下面那一句
                // this.$refs.table.toggleRowSelection(row, true)
                // this.$message.info('该医生已被挂号，不可取消！')
            }
        },
        //全选
        checkRegisters(selection){
            全取消
            if(selection.length == 0) {
                this.data.forEach(schdule => {
                    if(schdule.registionSchedulingId != 0){
                        //调接口是否被挂号，条件判断再执行下面那一句
                        // this.$refs.table.toggleRowSelection(schdule, true)
                        // this.$message.info('该医生已被挂号，不可取消！')
                    }
                })
            }else {//全选了
                this.data.forEach(schdule => {
                    if(!!!schdule.regitionPrice){
                        this.$refs.table.toggleRowSelection(schedule, false);
                        this.$message.warning("部分排班未填价格！"); 
                    }
                })
                //再检查号源数量什么的,修改的号源数量不能少于挂号人数
            }
        },
        handleSelectionChange(val){
            this.newDocList = val;
        },
        updateSchedule(){
            let schduleList = JSON.stringify(this.newDocList)
            let param = {
                token:this.token,
                sectionId:this.departmentId,
                timeType:this.timeType,
                date:this.scheduleDate,
                registionSchedulingList:schduleList
            }
            if(this.scheduleList.length == 0 && this.newDocList.length == 0){
                this.$message.warning('请选择排班医生')
                return
            }else{
                axion.updateSchdule(param).then( res=>{
                    if(res.data.retCode == 0){
                        this.$message.success('排班成功！')
                        this.closeDialog()
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    props:['visible' , 'departmentName' , 'departmentId' , 'timeType' , 'scheduleDate']
}
</script>
