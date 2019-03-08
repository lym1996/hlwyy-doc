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
            path: '/departFee',
            name: 'departFee',
            meta: {
                title: '科室工作及费用统计',
                icon: 'ts-alfx'
            },
            noDropdown: true,
            component: layout,
            children: [{
                path: 'index',
                alias: '',
                meta: { title: '科室工作及费用统计' },
                component: lazyload('dataCenter/departFee')
            }] 
        },
        {
            path: '/doctorFee',
            name: 'doctorFee',
            meta: {
                title: '医生工作及费用统计',
                icon: 'ts-alfx'
            },
            noDropdown: true,
            component: layout,
            children: [{
                path: 'index',
                alias: '',
                meta: { title: '医生工作及费用统计' },
                component: lazyload('dataCenter/doctorFee')
            }] 
        }
    ]
    const routes = [...routerMap, ...sideRoutes]

    export {
        sideRoutes,
        routes
    }