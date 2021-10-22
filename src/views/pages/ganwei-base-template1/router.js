import Vue from 'vue'
import Router from 'vue-router'
import template1 from './src/Index'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            redirect: '/template1'
        },
        {
            path: '/template1',
            name: 'template1',
            component: template1
        }
    ]
})