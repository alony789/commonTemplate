/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
const INDEX = () =>
    import ('./views/Index.vue')
const LOGIN = () =>
    import ('gw-base-login/src/Login.vue')
const NOACCESS = () =>
    import ('gw-base-noAccess/noAccess.vue')


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
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
            path: '/Index',
            component: INDEX,
            children: [
                {
                    path: 'noAccess',
                    name: 'noAccess',
                    component: NOACCESS
                },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path == '/Login' || to.path == '/Index/noAccess' || ((from.path == '/login' || from.path == '/Login') && to.path == '/Index') || from.path == '/Index'  || to.path == '/Maintain' || to.path == '/Info') {
        next()
        return
    } else if ((from.path != '/login' || from.path != '/Login') && to.path == '/Index') {
        if (window.sessionStorage.asideList) {
            let asideList = JSON.parse(window.sessionStorage.asideList)
            next(asideList[0].route)
        } else {
            next()
        }

    } else {
        let path = to.path
        if (window.sessionStorage.asideList) {
            let asideList = JSON.parse(window.sessionStorage.asideList)
            let haveRoute = false
            forList(asideList)

            function forList(list) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].route == path) {
                        haveRoute = true
                    }
                    if ('children' in list[i]) {
                        forList(list[i].children)
                    }
                }
            }
            if (haveRoute) {
                next()
            } else {
                next(from.path)
                return false
            }
        } else {
            next()
        }
    }
})
router.afterEach((to, from, next) => {})
export default router
