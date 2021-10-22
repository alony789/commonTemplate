import Vue from 'vue'
import Router from 'vue-router'
import modelDevice from './src/modelDevice'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '',
        redirect: '/modelDevice'
    },
    {
        path: '/modelDevice',
        name: 'modelDevice',
        component: modelDevice
    }
    ]
})