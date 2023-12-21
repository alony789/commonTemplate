import logoutDialog from './logoutDialog/index.vue'
import PWEditDialog from './PWEditDialog/index.vue'
import systemInfoDialog from './systemInfoDialog/index.vue'
export default {
    components: {
        logoutDialog,
        PWEditDialog,
        systemInfoDialog
    },
    inject: ['config', 'theme'],
    data () {
        return {
            // 登录者姓名
            loginUsername: window.sessionStorage.userName,
            showLogoutDialog: false,
            showPWEditDialog: false,
            showSystemInfoDialog: false,
            passwordPolicy: ''
        }
    },
    mounted () {
        this.passwordPolicy = sessionStorage.passwordPolicy || ''
        if (!sessionStorage.userName || sessionStorage.userName == 'undefined') {
            this.$api.getUserInfo().then(res => {
                const { code, data, message } = res?.data || {}
                if (code == 200) {
                    this.loginUsername = sessionStorage.userName = data?.userName
                    sessionStorage.passwordPolicy = this.passwordPolicy = data?.passwordPolicy?.passwordPolicy
                    if (data?.passwordPolicy == 1) {
                        this.openDialog('showPWEditDialog')
                    }
                } else {
                    this.$message.warning(message)
                }
            })
        } else if (this.passwordPolicy == 1) {
            this.openDialog('showPWEditDialog')
        }
    },
    methods: {
        openDialog (dialog) {
            this[dialog] = true
        },
        closeDialog (dialog) {
            this[dialog] = false
        },
    }
}