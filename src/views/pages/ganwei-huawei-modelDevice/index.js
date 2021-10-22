/* eslint-disable */
import Vue from 'vue'
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';


import store from '@/store'
import Axios from 'axios'
import App from './App'

import router from './router.js'
import myUtils from 'gw-base-utils/myUtils'
import api from './src/request/api'
import getCode from 'gw-base-api/encrypt.js'
import moment from 'moment';

import 'gw-base-style/elementStyleReset/index.css'
import 'gw-base-style/elementStyleReset/reset.scss'
import 'gw-base-style/style.scss'
import 'gw-base-font/iconfont.css'


//中英文切换
import VueI18n from 'vue-i18n'
import zh from './src/language/zh-cn/zh'
import en from './src/language/en-us/en'
Vue.use(VueI18n)
import ElementLocale from 'element-ui/lib/locale';
const i18n = new VueI18n({
    locale: sessionStorage.languageSet,
    messages: {
        'zh': zh,
        'en': en
    },
    silentTranslationWarn: true //去掉控制台i18n warning
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n;


Vue.use(Element)


const bus = new Vue()

Vue.config.productionTip = false
Vue.prototype.Axios = Axios

Vue.prototype.$Store = store
Vue.prototype.$moment = moment


/* 将 getCode 挂载到 vue 的原型上 */
Vue.prototype.$getCode = getCode

/* 将 myUtils 挂载到 vue 的原型上 */
Vue.prototype.myUtils = myUtils;

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
}).$mount('#app')