<template>
    <div class="ts-content set-content bordertopnone schedual">
        <el-row>
            <el-input placeholder="请输入科室名称" v-model="searchInput" style="width:300px;" >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-row>
        <el-row class="margin20X">
            <el-col :span="4" v-for="(item,index) in departments" :key="index" class="paddingX5 marginbottom10">
                <div class="department">
                    <el-button>{{item.name}}</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchInput:'',
            departments:[
                {
                    name:'外科',
                },{
                    name:'外科',
                },{
                    name:'外科',
                },{
                    name:'外科',
                },{
                    name:'外科',
                },{
                    name:'外科',
                },{
                    name:'外科',
                },{
                    name:'外科',
                },
            ],
        }
    },
}
</script>