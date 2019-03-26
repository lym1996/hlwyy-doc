import axios from 'axios'
import {Message} from 'element-ui'
import { baseURL, objBase, modelBase} from './config'

const errorMsg = '服务器内部错误'
const errorMsg401 = '登陆超时,请重新登录'
const errorFn = err => {
    console.log(err.response.status)
    let status = err.response.status
    if(status == 500) {
        Message.error(errorMsg)
    }
    if(status == 401){
        Message.error(errorMsg401)
    }
    return err
}
const codeerror = d => {
    if (d.data != null && d.data.code == 401) {
        Message.error(d.data.msg)
    }
    return d
}

const post = (_url, obj) => axios.post(_url, obj, objBase).then(codeerror).catch(errorFn)//query参数
const post2 = (_url, body) => axios.post(_url, body, modelBase).then(codeerror).catch(errorFn)//body体
const get = (obj) => axios.get(obj, objBase).then(codeerror).catch(errorFn)
const postfile =  (_url, obj) => axios.post(_url, obj,{ baseURL: baseURL,headers:{'Content-Type':'multipart/form-data'}}).then(codeerror).catch(errorFn)

//需要的接口写下面
const registrate = (param) => post2('/user/registration',param)
const huoqu = (param) => post('/article/folder/save',param)
const list = (token) => get('/article/listArticleFolder?token='+token)
//获取本周排班信息
const getWeekSchdule = (token,departmentId,type) => get('/scheduling/getWeak?token='+token+'&sectionId='+departmentId+'&type='+type)
//获取具体日期上下午排班
const getDaySchdule = (token,departmentId,timeType,date) => get('/scheduling/getByDate?token='+token+'&sectionId='+departmentId+'&timeType='+timeType+'&date='+date)
//更新排班
const updateSchdule = (param) => post('/scheduling/updateScheduling',param)
//暴露接口
export default {
    baseURL,
    getWeekSchdule,
    getDaySchdule,
    updateSchdule
}