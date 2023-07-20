/* eslint-disable */
import Vue from "vue";
import Element from "element-ui";

import store from "@/store";
import Axios from "axios";
import App from "./App";

import router from "./router.js";

import api from "./src/request/api";

import "gw-base-style-plus/style.scss";
import i18n from "gw-base-utils-plus/i18n.js";

Vue.use(Element);

const bus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.Axios = Axios;

Vue.prototype.$Store = store;

/* 将api 挂载到 vue 的原型上 */
Vue.prototype.$api = api;

window.vm = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    data: {
        bus
    }
}).$mount("#app");