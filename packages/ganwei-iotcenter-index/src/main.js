
/* eslint-disable */
import { createApp } from "vue";
import Element from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from "./store";
import Axios from "axios";
import App from "./App";
import router from "./router";
import api from "./request/api";
import getCode from "gw-base-api-plus/encrypt.js";
import moment from "moment";
import VirtualList from 'vue-virtual-list-v3';
import mitt from 'mitt'
import notification from "gw-base-utils-plus/notification";
import hostMap from "./hostMap";
import loading from 'gw-base-components-plus/loading/index.vue'
import i18n from "gw-base-utils-plus/i18n.js";
import { configInfoData, changeStyle } from 'gw-base-utils-plus/commonutils';
window.axios = Axios;
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('loading', loading)
app.config.productionTip = false;
app.config.globalProperties.$bus = mitt()
app.config.globalProperties.Axios = Axios;
app.config.globalProperties.$store = store
app.config.globalProperties.i18n = i18n
app.config.globalProperties.$moment = moment
app.config.globalProperties.$message = notification
app.config.globalProperties.$hostMap = hostMap
app.config.globalProperties.$api = api
app.config.globalProperties.$getCode = getCode
app.config.globalProperties.myUtils = {
    configInfoData,
    changeStyle
};

app.use(VirtualList).use(i18n).use(router).use(Element).mount("#app");

