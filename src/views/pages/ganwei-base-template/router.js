import Vue from 'vue'
import Router from 'vue-router'
import template from './src/Index'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            redirect: '/template'
        },
        {
            path: '/template',
            name: 'template',
            component: template
        }
    ]
})