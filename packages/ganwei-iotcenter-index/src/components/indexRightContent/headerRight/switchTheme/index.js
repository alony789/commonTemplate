export default {
    inject: ['config', 'theme'],
    methods: {
        checkStyle (theme) {
            localStorage.setItem('theme', theme)
            this.myUtils.changeStyle()
            this.$bus.emit('themeChange')
        },
    }
}