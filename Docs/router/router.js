import Main from '../components/main/main.vue'
import Content from '../components/content'


export default [
    {
        path: '/',
        name: 'home',
        component: Main,
        meta: {
            notCache: true
        },
        children: []
    },

    {
        path: '/components',
        name: 'components',
        component: Content,
        redirect:'/components/install',
        children: [
            {
                path: '/components/install',
                name: 'Install',
                meta: {
                    name: '安装',
                    type: 'compass'
                },
                component: (resolve) => require(['../view/components/install/index.md'], resolve)
            },
            {
                path: '/components/start',
                name: 'Start',
                meta: {
                    name: '快速开始',
                    type: 'compass'
                },
                component: (resolve) => require(['../view/components/start/index.md'], resolve)
            },
            {
                path: '/components/use',
                name: 'Usage',
                meta: {
                    name: '使用',
                    type: 'component'
                },
                component: (resolve) => require(['../view/components/basic/index.md'], resolve)
            },
            {
                path: '/components/API',
                name: 'API',
                meta: {
                    name: '接口',
                    type: 'component'
                },
                component: (resolve) => require(['../view/components/API/index.md'], resolve)
            },
        ]
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('../view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('../view/error-page/404.vue')
    }
]
