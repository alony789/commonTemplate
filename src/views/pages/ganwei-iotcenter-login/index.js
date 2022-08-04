/* eslint-disable */
import Vue from "vue";
import Element from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import "element-ui/lib/theme-chalk/display.css";
import Axios from "axios";
import App from "./App";
import router from "./router";
import myUtils from "gw-base-utils-plus/myUtils";
import api from "gw-base-api-plus/api";
import getCode from "gw-base-api-plus/encrypt.js";
// import "gw-base-style-plus/elementStyleReset/index.css";
import "gw-base-style-plus/elementStyleReset/reset.scss";
import "gw-base-style-plus/style.scss";
// import "gw-base-font-plus/iconfont.css";

import loadMore from "gw-base-components-plus/loadMore/loadMore";
import globalVariable from "gw-base-utils-plus/globalVariable.js";

import loading from "gw-base-components-plus/loading";
import notify from "gw-base-utils-plus/notification";

//中英文切换
import VueI18n from "vue-i18n";
import zh from "gw-base-language/zh-cn/zh";
import en from "gw-base-language/en-us/en";
Vue.use(VueI18n);
import ElementLocale from "element-ui/lib/locale";
const i18n = new VueI18n({
    locale: 'zh-CN',
    messages: {
        zh: zh,
        en: en
    },
    silentTranslationWarn: true //去掉控制台i18n warning
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
Vue.use(loadMore);
Vue.use(Element);
Vue.use(loading);
Vue.prototype.$message = notify;
const bus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.Axios = Axios;

/* 将 globalVariable 挂载到 vue 的原型上 */
Vue.prototype.globalVariable = globalVariable;

/* 将 getCode 挂载到 vue 的原型上 */
Vue.prototype.$getCode = getCode;

/* 将 myUtils 挂载到 vue 的原型上 */
Vue.prototype.myUtils = myUtils;

/* 将api 挂载到 vue 的原型上 */
Vue.prototype.$api = api;

Vue.prototype.$notify = notify;

window.vm = new Vue({
    router,
    i18n,
    render: h => h(App),
    data: {
        bus
    }
}).$mount("#app");
