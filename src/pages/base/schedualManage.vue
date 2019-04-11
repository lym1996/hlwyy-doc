<template>
    <div class="ts-content set-content bordertopnone schedualManage">
        <el-row class="marginbottom20">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>排班管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{whichStep}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <div v-if="isfirst">
            <el-row class="marginleft5">
                <el-input placeholder="请输入科室名称" v-model="searchInput" style="width:300px;" >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-row>
            <el-row class="margin20X">
                <el-col :span="4" v-for="(item,index) in departments" :key="index" class="paddingX5 marginbottom10">
                    <div class="department">
                        <el-button @click="toNext(item.sectionId,item.sectionName)">{{item.sectionName}}</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row>
                <el-button type="primary" @click="back">返回</el-button>
            </el-row>
            <el-row class="margintop20 fontsize10">
                <el-col :span="12">
                    <span>科室： {{chooseDepart}}</span>
                    <span class="marginleft20">{{startTime}}</span>
                    <span>至</span>
                    <span>{{endTime}}</span>
                </el-col>
                <el-col :span="12" class="textAlignRight">
                    <el-button v-show="!hasNext" type="primary" @click="getSchedule(0)">查看上周排班</el-button>
                </el-col>
            </el-row>
            <el-row class="margintop20">
                <el-col :span="24">
                    <el-table :data="tabledata" border stripe >
                        <el-table-column prop="time" label="时间" min-width="9%" align="center"></el-table-column>
                        <el-table-column v-for="(iitem,i) in weekdays" :key="i" v-if="i + 1 < todayNumber" :label="iitem" min-width="13%" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.weekData.filter((obj, index) => index === i)[0].source.length === 0" class="flex-align-justify">
                                    <el-col :span="12" style="color:#999;">——</el-col>
                                </div>
                                <div v-else>
                                    <el-row>
                                        <el-col :span="12" v-for="(schedule, j) in scope.row.weekData.filter((obj, index) => index === i)[0].source" :key="j" style="color:#999;">{{schedule.doctorName}}</el-col>
                                    </el-row>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="(iitem, i) in weekdays" :key="i" v-if="i + 1 >= todayNumber" :label="iitem" min-width="13%" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.weekData.filter((obj, index) => index === i)[0].source.length === 0" class="flex-align-justify">
                                    <el-button type="text" @click="openSelectDoctor(scope.row.type,i)">选择医生</el-button>
                                </div>
                                <div v-else>
                                    <el-row>
                                        <el-col :span="12" v-for="(schedule, j) in scope.row.weekData.filter((obj, index) => index === i)[0].source" :key="j">{{schedule.doctorName}}</el-col>
                                    </el-row>
                                    <div class="flex-align-justify">
                                        <el-button type="text" @click="openSelectDoctor(scope.row.type,i)">更改医生</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="margintop20 textAlignRight" v-show="hasNext">
                        <el-button type="info" @click="getSchedule(1)">继续添加下周排班</el-button>
                    </div> 
                </el-col>
            </el-row>
        </div>
        <dialog-select-doctor v-if="chooseflag" :visible="true" :departmentName="chooseDepart" :departmentId="departmentId" :timeType="timeType" :scheduleDate="scheduleDate" @close="closeDialog"></dialog-select-doctor>
    </div>
</template>
<script>
import axion from '@/util/api.js'
import dialogSelectDoctor from '@/components/schedualDialog'
const hospitalId = 123456
export default {
    components:{ dialogSelectDoctor },
    data() {
        return {
            token:'',
            isfirst:true,//是否是第一步
            chooseDepart:'',//选择的科室
            departmentId:'',
            searchInput:'',//搜索科室输入
            departments:[],
                //上面是选择科室步骤需要的参数
                //下面是选择医生需要的参数
                weekdays:[],//放入表格的日期
                timeList:[],//后台返回的日期数组
                today:'',//今天的日期
                todayNumber: 1,//今天是本周的第几天
                amList:[],//后台返回本周所有上午的排班信息
                pmList:[],//后台返回本周所有下午的排班信息
                startTime:'',//一周的开始日期
                endTime:'',//一周的结束日期
                scheduleDate:'',//选择医生时的日期
                timeType:'',//上下午类型 0上午 1下午
                searchType:'',//查询排班是否本周 0本周 1下周
                hasNext:true,
            tabledata:[
                {
                    time:"上午",
                    type: 0,
                    weekData: [
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                    ]
                },
                {
                    time:"下午",
                    type: 1,
                    weekData: [
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                            { source: [] },
                    ]
                }
            ],
            chooseflag:false,//选择医生弹框显示控制flag
        }
    },
    computed: {
        whichStep(){
            if(this.isfirst == true){
                return '科室选择'
            }else{
                return '医生排班'
            }
        }
    },
    mounted() {
        this.token = localStorage.getItem("token")
        this.getDept()
    },
    methods: {
        getDept(){
            axion.getDept(this.token,hospitalId).then( res => {
                if(res.data.retCode == 0) {
                    this.departments = res.data.param
                }
            })
        },
        toNext(id,name){
            this.isfirst = false
            this.chooseDepart = name
            this.departmentId = id
            this.getSchedule(0)
        },
        back(){
            this.isfirst = true
            this.chData = []
        },
        openSelectDoctor(type, index){//index为表格中时间的索引下标
            if(type != undefined) this.timeType = type+1;
            for(let i = 0; i < this.timeList.length; i++) {
                if(index == i){
                    this.scheduleDate = this.timeList[i]
                }
            }
            this.chooseflag = true
            console.log(this.scheduleDate,'111')
        },
        //dialog组件传过来的方法
        closeDialog(){
            this.chooseflag = false
            if(this.searchType == 0){
            this.getSchedule(0)
            }else if(this.searchType == 1){
                this.getSchedule(1)
            }
        },
        // 列表排班操作
        //获取一周排班
        getSchedule(type){
            //形参type为获取本周排班还是下周排班
            //清空原有数据
            for(let i = 0; i < 7; i++){
                this.tabledata[0].weekData[i].source = [];
                this.tabledata[1].weekData[i].source = [];
            }
            // 判断是否查询下周排班
            if(type == undefined || type == 0){//type 0 本周排班
                this.searchType = 0
                this.hasNext = true
            }
            if(type == 1){//type 1 下周排班
                this.searchType = 1
                this.todayNumber = 0
                this.hasNext = false
            }
            if(type == 2){//type 2 上周排班
                this.searchType = 2
            }
            axion.getWeekSchdule(this.token,this.departmentId,this.searchType).then( res =>{
                if(res.data.retCode == 0){
                    this.timeList = res.data.param.timeList
                    this.amList = res.data.param.amList
                    this.pmList = res.data.param.pmList
                    this.today = this.timeList[7];//今天的日期
                    //获取今天是本周的第几天
                    for(let i = 1; i < this.timeList.length; i++){
                        if(this.timeList[i-1] == this.today){
                            this.todayNumber = i
                            break;
                        }
                    }
                    this.getWeekDays(this.timeList);
                    //处理上午排班
                    this.getWeekData(this.timeList, this.amList, this.tabledata[0].weekData)
                    //处理下午排班
                    this.getWeekData(this.timeList, this.pmList, this.tabledata[1].weekData)
                }
            },data =>{
                console.log(data)
            })
        },
        getWeekDays(timeList){
            console.log('timeList',timeList)
            this.weekdays = []
            for(let i = 0; i < timeList.length; i++){
                switch(i) {
                    case 0:
                        this.startTime = timeList[i]
                        this.weekdays.push(timeList[i] + '星期一');
                        break
                    case 1:
                        this.weekdays.push(timeList[i] + '星期二');
                        break
                    case 2:
                        this.weekdays.push(timeList[i] + '星期三');
                        break
                    case 3:
                        this.weekdays.push(timeList[i] + '星期四');
                        break
                    case 4:
                        this.weekdays.push(timeList[i] + '星期五');
                        break
                    case 5:
                        this.weekdays.push(timeList[i] + '星期六');
                        break
                    case 6:
                        this.endTime = timeList[i]
                        this.weekdays.push(timeList[i] + '星期日');
                }
            }
            console.log('weekdays',this.weekdays)
        },
        //处理一周排班
        getWeekData(timeList, schedualList, weekData){
            for(let i = 0; i< timeList.length - 1; i++){
                //清空原有数据
                weekData[i].source = []
                for(let j = 0; j<schedualList.length; j++){
                    if(timeList[i] == schedualList[j].registionDate){
                        weekData[i].source.push(schedualList[j])
                    }
                }
            }
        },
    },
}
</script>