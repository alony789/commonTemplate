/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
const INDEX = () => import("./views/Index.vue");
import encrypt from "gw-base-api-plus/encrypt.js";

const NOACCESS = () => import("gw-base-noAccess/noAccess.vue");
const JUMPIFRAMED = () => import("./views/jumpIframe/jumpIframePro.vue");
const JUMPiFRAMEDLOGIN = () => import('./views/jumpIframe/jumpIframeLogin.vue')

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);
const router = new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    routes: [
        {
            path: "/",
            redirect: 'jumpIframeLogin/ganwei-iotcenter-login/Login'
        },
        {
            path: "/jumpIframeLogin/*",
            name: "jumpIframeLogin",
            component: JUMPiFRAMEDLOGIN
        },
        {
            path: "/Index",
            component: INDEX,
            children: [

                // {
                //     path: "",
                //     redirect: 'ganwei-iotcenter-login/Login'
                // },
                // {
                //     path: "ganwei-iotcenter-login/Login",
                //     name: "jumpIframeLogin",
                //     component: JUMPiFRAMEDLOGIN
                // },
                {
                    path: "noAccess",
                    name: "noAccess",
                    component: NOACCESS
                },
                {
                    path: "jumpIframe/*",
                    name: "jumpIframe",
                    component: JUMPIFRAMED
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.path === "/jumpIframeLogin/ganwei-iotcenter-login/Login") {
        encrypt.clearMyKey();
    }
    if (
        to.path == "/jumpIframeLogin/ganwei-iotcenter-login/ssoLogin" ||
        to.path == "/jumpIframeLogin/ganwei-iotcenter-login/ssoLogout" ||
        (from.path == "/jumpIframeLogin/ganwei-iotcenter-login/ssoLogin" && to.path == "/Index")
    ) {
        next();
        return;
    }

    if (
        to.path == "/jumpIframeLogin/ganwei-iotcenter-login/Login" ||
        to.path == "/Index/noAccess" ||
        ((from.path == "/jumpIframeLogin/ganwei-iotcenter-login/Login" || from.path == "/jumpIframeLogin/ganwei-iotcenter-login/login") &&
            to.path == "/Index") ||
        from.path == "/Index" ||
        to.path == "/jumpIframeLogin/ganwei-iotcenter-login/Maintain" ||
        to.path == "/jumpIframeLogin/ganwei-iotcenter-login/mainInfo"
    ) {
        next();
        return;
    } else if (
        (from.path != "/jumpIframeLogin/ganwei-iotcenter-login/login" || from.path != "/jumpIframeLogin/ganwei-iotcenter-login/Login") &&
        to.path == "/Index"
    ) {

        if (window.sessionStorage.asideList) {
            let asideList = JSON.parse(window.sessionStorage.asideList);
            next(asideList[0].route);
        } else {
            next();
        }
    } else {
        let path = to.path;
        if (window.sessionStorage.asideList) {
            let asideList = JSON.parse(window.sessionStorage.asideList);
            let haveRoute = false;
            forList(asideList);

            function forList (list) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].route == path) {
                        haveRoute = true;
                    }
                    if ("children" in list[i]) {
                        forList(list[i].children);
                    }
                }
            }
            if (haveRoute) {
                next();
            } else {
                next(from.path);
                return false;
            }
        } else {
            console.log(99999);
            next("/jumpIframeLogin/ganwei-iotcenter-login/Login");
        }
    }
});
router.afterEach((to, from) => { });
export default router;
