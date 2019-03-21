<template>
    <div class="ts-content set-content bordertopnone schedual">
        <div v-if="isfirst">
            <el-row class="marginleft5">
                <el-input placeholder="请输入科室名称" v-model="searchInput" style="width:300px;" >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-row>
            <el-row class="margin20X">
                <el-col :span="4" v-for="(item,index) in departments" :key="index" class="paddingX5 marginbottom10">
                    <div class="department">
                        <el-button @click="toNext(item.name)">{{item.name}}</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row>
                <el-button type="primary" @click="back">返回</el-button>
                <div class="fontsize10 margintop20">
                    <span>选择的科室 : {{chooseDepart}}</span>
                    <span class="marginleft100">本周时间 : {{chData[0].time}} 至 {{chData[6].time}}</span>
                </div>
            </el-row>
            <el-row class="margintop20">
                <el-col :span="24">
                    <el-table :data="tabledata" border stripe tooltip-effect="dark" style="width:100%">
                        <el-table-column align="center" prop="timesStamp" label="时间"></el-table-column>
                        <el-table-column align="center" v-for="(item,index) in chData" :key="index" :label="item.time+' '+item.curday">
                            <template slot-scope="scope">
                                <span>{{item.docName}}</span>
                                <el-button v-if="item.docName == ''" type="text" @click="chooseDoc(scope.row,item)">选择医生</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="选择医生" :visible.sync="chooseflag">
            <el-row>
                <div class="fontsize5">
                    <span>医生排班</span>
                    <span class="marginX20">{{choosedate}}</span>
                    <span>{{chooseAf}}</span>
                    <el-input placeholder="请输入医生名称" v-model="searchDoc" style="width:300px;margin-left:45px;" >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-row>
            <el-row class="margintop20">
                <el-col :span="24">
                    <el-table :data="docdata" border stripe tooltip-effect="dark" max-height="350" style="width:100%;" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" align="center"></el-table-column>
                        <el-table-column prop="docId" label="医生工号"  width="150" align="center"></el-table-column>
                        <el-table-column prop="docName" label="医生姓名"  width="120" align="center"></el-table-column>
                        <el-table-column prop="department" label="科室"  width="120" align="center"></el-table-column>
                        <el-table-column prop="level" label="职称" width="120" align="center"></el-table-column>
                        <el-table-column label="具体时间" align="center" min-width="200;">
                            <template slot-scope="scope">
                                <div class="textAlignCenter">
                                    <el-time-select v-model="scope.row.starttime" :picker-options="startOption" style="width:100px;margin-left:20px;" ></el-time-select>
                                    <span>至</span>
                                    <el-time-select v-model="scope.row.endtime" :picker-options="endOption" style="width:100px;"></el-time-select>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <div class="floatRight margintop20">
                <el-button type="primary" @click="submitDoc">确定</el-button>
                <el-button>取消</el-button>
            </div>
            <div style="clear:both;" ></div>
        </el-dialog>
    </div>
</template>
<script>
import axion from '@/util/api.js'
export default {
    data() {
        return {
            startOption:{
                start:'',
                step:'00:30',
                end:'',
            },
            endOption:{
                start:'',
                step:'00:30',
                end:'',
            },
            isfirst:true,//是否是第一步
            chooseDepart:'',//选择的科室
            searchInput:'',//搜索科室输入
            chData:[],//第二部表格固定数据
            choosedate:'',//选择的日期
            chooseAf:'',//选择上午还是下午
            searchDoc:'',//搜索医生
            starttime:'',
            endtime:'',
            departments:[
                {
                    name:'外科',
                },{
                    name:'内科',
                },{
                    name:'骨科',
                },{
                    name:'想科',
                },{
                    name:'哦科',
                },{
                    name:'阿尔文科',
                },{
                    name:'任务科',
                },{
                    name:'客户科',
                },
            ],
            tabledata:[
                {
                    timesStamp:'上午'
                },
                {
                    timesStamp:'下午'
                }
            ],
            docdata:[
                {
                    docId:'21323',
                    docName:'方法',
                    department:'十大',
                    level:'主任',
                    starttime:'',
                    endtime:''
                },
                {
                    docId:'21323',
                    docName:'方法',
                    department:'十大',
                    level:'主任',
                    starttime:'',
                    endtime:''
                },
                {
                    docId:'21323',
                    docName:'方法',
                    department:'十大',
                    level:'主任',
                    starttime:'',
                    endtime:''
                },
                {
                    docId:'21323',
                    docName:'方法',
                    department:'十大',
                    level:'主任',
                    starttime:'',
                    endtime:''
                },
                {
                    docId:'21323',
                    docName:'方法',
                    department:'十大',
                    level:'主任',
                    starttime:'',
                    endtime:''
                }
            ],
            chooseflag:false,//选择医生弹框显示控制flag
        }
    },
    mounted() {
        this.registra()
    },
    methods: {
        toNext(name){
            this.isfirst = false
            this.chooseDepart = name
            this.getWeek()
        },
        back(){
            this.isfirst = true
            this.chData = []
        },
        chooseDoc(row,item){
            this.chooseflag = true
            this.choosedate = item.time
            this.chooseAf = row.timesStamp
            if(this.chooseAf == '上午'){
                this.startOption.start = '08:00'
                this.startOption.end = '11:30'
                this.endOption.start = '08:30'
                this.endOption.end = '12:00'
            }else if(this.chooseAf == '下午'){
                this.startOption.start = '13:00'
                this.startOption.end = '16:30'
                this.endOption.start = '13:30'
                this.endOption.end = '17:00'
            }
        },
        submitDoc(){
            
        },
        getWeek(){
            var new_Date = new Date()
            var timesStamp = new_Date.getTime();
            var currenDay = new_Date.getDay();
            var dates = [];
            for(var i = 0; i < 7; i++) {
                dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
            }
            console.log(dates[0])
            this.pushWeek(dates)//把固定数据推入表格
        },
        pushWeek(dates){
            for(let i=0; i<dates.length; i++){

                let information ={
                    curday:'',
                    docName:'',
                    time:''
                }
                this.chData.push(information)
                if(new Date(dates[i]).getTime() < new Date().getTime()){
                    this.chData[i].docName = '————'
                }else{
                    this.chData[i].docName = ''
                }
                this.chData[i].time = dates[i]
                switch(i){
                    case 0 : this.chData[i].curday = '星期一'; break;
                    case 1 : this.chData[i].curday = '星期二'; break;
                    case 2 : this.chData[i].curday = '星期三'; break;
                    case 3 : this.chData[i].curday = '星期四'; break;
                    case 4 : this.chData[i].curday = '星期五'; break;
                    case 5 : this.chData[i].curday = '星期六'; break;
                    case 6 : this.chData[i].curday = '星期日'; break;
                }
            }
        },
        handleSelectionChange(){},







        registra(){
            let folderName = 'come on';
            let token = '31219150712823d93d57af306e3bb73d';
            let a ={
                token:'31219150712823d93d57af306e3bb73d'
            }
            console.log(a.token)
            axion.list(a.token).then(res => {
                if(res.retCode == 0){
                    console.log('nice')
                }
            })
        }
    },
}
</script>