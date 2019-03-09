const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
import layout from '@/pages/layout'

const routerMap = [{
        path: '/',
        redirect: '/login',
        component: lazyload('user/index'),
        children: [{
            path: 'login',
            name: 'login',
            component: lazyload('user/login'),
            meta: {
                title: '登录'
            }
        }, {
            path: 'forget',
            name: 'forget',
            component: lazyload('user/forget'),
            meta: {
                title: '忘记密码'
            }
        }]
    }]

    const sideRoutes = [
        {
            path: '/patient',
            name: 'patientUser',
            meta: {
                title: '用户管理',
                icon: 'ts-shezhi'
            },
            noDropdown: true,
            component: layout,
            children: [{
                path: 'index',
                alias: '',
                meta: { title: '用户管理' },
                component: lazyload('base/patient')
            }] 
        },
        {
            path: '/doctor',
            name: 'doctorUser',
            meta: {
                title: '医生管理',
                icon: 'ts-shezhi'
            },
            noDropdown: true,
            component: layout,
            children: [{
                path: 'index',
                alias: '',
                meta: { title: '医生管理' },
                component: lazyload('base/doctor')
            }] 
        },
        {
            path: '/schedual',
            name: 'schedual',
            meta: {
                title: '排班管理',
                icon: 'ts-shezhi'
            },
            noDropdown: true,
            component: layout,
            children: [{
                path: 'index',
                alias: '',
                meta: { title: '排班管理' },
                component: lazyload('base/schedual')
            }]  
        },
        {
            path: '/dataStatistics',
            name: 'dataStatistics',
            meta: {
                title: '数据统计',
                icon: 'ts-alfx'
            },
            noDropdown: true,
            component: layout,
            children: [{
                path: 'index',
                alias: '',
                meta: { title: '数据统计' },
                component: lazyload('base/dataStatistics')
            }]   
        }
    ]
    const routes = [...routerMap, ...sideRoutes]

    export {
        sideRoutes,
        routes
    }