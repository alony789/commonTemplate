import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const template = () => import('./views/template.vue');

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/template'
        },
        {
            path: '/template',
            name: 'template',
            component: template
        }
    ]
})
router.beforeEach((to, from, next) => {
    next()
})
router.afterEach((to, from, next) => { })
export default router