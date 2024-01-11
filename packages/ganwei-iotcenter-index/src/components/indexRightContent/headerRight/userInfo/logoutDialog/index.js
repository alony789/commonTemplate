export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            dialogVisible: false,
            submitLoading: false
        }
    },
    watch: {
        showDialog (val) {
            this.dialogVisible = val;
        },
        dialogVisible(val) {
            if(!val) this.closeDialog()
        }
    },
    methods: {
        quitLogin () {
            let isSsoLogin = window.sessionStorage.getItem('isSsoLogin')
            if (isSsoLogin) {
                this.$router.replace('/ganwei-iotcenter-login/ssoLogout')
                window.sessionStorage.clear()
                return
            }
            this.submitLoading = true
            this.$api.loginOut().then(rt => {
                if (rt?.data?.code == 200) {
                    window.sessionStorage.clear()
                    this.$message.success(this.$t('login.framePro.tips.loggedOut'))
                    setTimeout(() => {
                        if (isSsoLogin == null || isSsoLogin == undefined || !isSsoLogin) {
                            if (process.env.NODE_ENV === "development") {
                                window.top.location.href = this.$hostMap('ganwei-iotcenter-login')
                            } else { window.top.location.href = window.top.location.origin + '/ganwei-iotcenter-login' }
                        } else {
                            this.$router.replace('/ganwei-iotcenter-login/ssoLogout')
                        }
                    }, 250)
                } else {
                    this.$message.error(this.$t('login.framePro.tips.logOutFail'))
                }
            }).finally(() => {
                this.submitLoading = false
            })
        },
        closeDialog () {
            this.$emit('closeDialog')
        }
    }

}
