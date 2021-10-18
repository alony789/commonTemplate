import Vue from 'vue'
import Router from 'vue-router'
import test from './views/Index'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            redirect: '/test'
        },
        {
            path: '/test',
            name: 'test',
            component: test
        }
    ]
})