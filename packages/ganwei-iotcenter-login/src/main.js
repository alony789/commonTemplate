/* eslint-disable */
import { createApp } from "vue";
import Element from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Axios from "axios";
import App from "./App";
import router from "./router";
import api from "./request/api";
import getCode from "gw-base-api-plus/encrypt.js";
import { PartialNotify } from "gw-base-utils-plus/notification";
import hostMap from "./hostMap";
import loading from 'gw-base-components-plus/loading/index.vue'
import i18n from "gw-base-utils-plus/i18n.js";
import { configInfoData } from 'gw-base-utils-plus/commonutils';
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('loading', loading)
app.config.productionTip = false;

app.config.globalProperties.Axios = Axios;

app.config.globalProperties.i18n = i18n

app.use(Element)
app.use(i18n)

app.config.globalProperties.$hostMap = hostMap
app.config.globalProperties.$message = PartialNotify(app, 'ganwei-iotcenter-login')
app.config.globalProperties.$api = api
app.config.globalProperties.$getCode = getCode
app.config.globalProperties.myUtils = {
    configInfoData
};

app.use(router).mount("#app")
