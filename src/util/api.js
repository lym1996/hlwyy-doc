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
//修改密码
const changePassword = (param) => post('/user/changePassword',param)
//忘记密码修改密码
const reinputPasswoed = (param) => post('/user/reinputPasswoed',param)
//获取所有科室
const getDept = (token,hospitalId) => get('/section/getByHosId?token='+token+'&hospitalId'+hospitalId)
//登录
const login = (param) => post('/user/login',param)
//获取图形验证码
const getPicCode = (param) => post('user/getPictureCode',param)
//验证图形验证码
const verifyPictureCode = (param) => post('/user/verifyPictureCode',param)
//获取短信验证码
const getMsgCode = (param) => post('user/getMessageCode',param)
//验证短信验证码
const verifyMsgCode = (param) => post('/user/verifyMsgCode',param)
//获取就诊人
const getPatient = (phone,token,type) => get('/patient/get?phone='+phone+'&token='+token+'&type='+type)
//搜索就诊人
const selectPatient = (patientPhone,patientName,token,type) => get('/patient/select?patientPhone='+patientPhone+'&patientName='+patientName+'&token='+token+'&type='+type)
//添加就诊人
const addPatient = (param) => post('/patient/add',param)
//编辑就诊人
const editPatient = (param) => post('/patient/update',param)
//删除就诊人
const deletePatient = (param) => post('/patient/delete',param)
//获取医生职称信息
const getDocTitle = () => get('/doctor/title')
//获取所有医生
const getAllDoc = (hosId) => get('/doctor/listAllDoctorByHosId?hosId='+hosId)
//根据科室查询医生
const getDocByDept = (sectionId) => get('/doctor/listAllDoctorBySectionId?sectionId='+sectionId)
//添加医生
const addDoc = (param) => post('/doctor/add',param)
//修改医生
const editDoc = (param) => post('/doctor/update',param)
//删除医生
const deleteDoc = (param) => post('/doctor/delete',param)
//获取所有管理员
const getAllAdmin = (token) => get('/admin/listAll?token='+token)
//添加管理员
const addAdmin = (param) => post('/admin/add',param)
//修改管理员
const editAdmin = (param) => post('/admin/update',param)
//删除管理员
const deleteAdmin = (param) => post('/admin/delete',param)
//获取本周排班信息
const getWeekSchdule = (token,departmentId,type) => get('/scheduling/getWeak?token='+token+'&sectionId='+departmentId+'&type='+type)
//获取具体日期上下午排班
const getDaySchdule = (token,departmentId,timeType,date) => get('/scheduling/getByDate?token='+token+'&sectionId='+departmentId+'&timeType='+timeType+'&date='+date)
//更新排班
const updateSchdule = (param) => post('/scheduling/updateScheduling',param)
//暴露接口
export default {
    baseURL,
    login,
    verifyPictureCode,
    verifyMsgCode,
    reinputPasswoed,
    changePassword,
    getPicCode,
    getMsgCode,
    getDept,
    getPatient,
    selectPatient,
    addPatient,
    editPatient,
    deletePatient,
    getDocTitle,
    getAllDoc,
    getDocByDept,
    addDoc,
    editDoc,
    deleteDoc,
    getAllAdmin,
    addAdmin,
    editAdmin,
    deleteAdmin,
    getWeekSchdule,
    getDaySchdule,
    updateSchdule
}