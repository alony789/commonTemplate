import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const LOGIN = () => import('./views/login.vue');
const SSOLOGIN = () => import('./views/ssoLogin.vue');
const SSOLOGOUT = () => import('./views/ssoLogout.vue');

// 许可维护
const MAINTENANCEINFO = () =>
    import('./views/maintenanceInfo.vue');
const MAININFO = () => import('./views/mainInfo.vue');

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/Login',
            name: 'Login',
            component: LOGIN
        },
        {
            path: '/ssoLogin/:appid',
            name: 'ssoLogin',
            component: SSOLOGIN
        },
        {
            path: '/ssoLogin',
            name: 'ssoLogin',
            component: SSOLOGIN
        },
        {
            path: '/ssoLogout',
            name: 'ssoLogout',
            component: SSOLOGOUT
        },
        {
            path: '/ssoLogout/:appid',
            name: 'ssoLogout',
            component: SSOLOGOUT
        },
        {
            path: '/Maintain',
            name: 'Maintain',
            component: MAINTENANCEINFO
        },
        {
            path: '/mainInfo',
            name: 'mainInfo',
            component: MAININFO
        }
    ]
})
router.beforeEach((to, from, next) => {
    next()
})
router.afterEach((to, from, next) => { })
export default router