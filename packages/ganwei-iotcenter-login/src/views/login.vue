<template>
    <div class="login" v-cloak>
        <div class="backgroundImage">
            <loginBg></loginBg>
        </div>

        <el-select v-if="showLangSelect" v-model="languageSelected" @change="langChange" class="languageSelect">
            <template v-slot:prefix>
                <i class="iconfont icon-gw-icon-diqiu"></i>
            </template>
            <el-option v-for="(item, index) in langOptions" :label="item.name" :value="item.value" :key="index">
            </el-option>
        </el-select>

        <section class="main" :style="{ height: outerHeight + 'px' }">
            <aside class="login_form" :style="{ height: loginFormHeight + 'px' }">
                <div class="blurBackground"></div>
                <div class="logo">
                    <img :src="mainImg" alt="" :class="{ invisible: !mainImg }" @error="showImg" />
                </div>
                <el-form ref="loginForm" :model="form" label-width="0px" :rules="rules">
                    <el-form-item prop="userName">
                        <el-input v-model="form.userName" @keyup.enter.native="login"
                            :placeholder="$t('login.input.inputAccount')" autocomplete="off" clearable>
                            <template #prefix>
                                <i class="iconfont icon-denglu_zhanghu"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPwd">
                        <el-input type="password" v-model="form.userPwd" @keyup.enter.native="login"
                            :placeholder="$t('login.input.inputPassword')" autocomplete="off" show-password>
                            <template #prefix>
                                <i class="iconfont icon-denglu_mima"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="!IsIgnoreFalidateCode" prop="verificationCode">
                        <div class="verificationCode">
                            <el-input v-model="form.verificationCode" @keyup.enter.native="login"
                                :placeholder="$t('login.input.inputCode')" autocomplete="off" clearable>
                                <template #prefix>
                                    <i class="iconfont icon-denglu_yanzhengma"></i>
                                </template>
                            </el-input>
                            <span class="codeLoading" v-loading="errorLoading">
                                <img id="code_img" @click="drawCode()" />
                            </span>
                        </div>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="submit" :disabled="loading" @click.stop="login">
                    {{ loading ? $t('login.button.logining') : $t('login.button.loginNow') }}
                </el-button>
            </aside>
        </section>
        <footer class="footer">
            <div class="footer-btn">
                <el-button id="maintain-btn" type="primary" @click.stop="toMaintain()">
                    {{ $t('login.button.updateLisens') }}
                </el-button>
            </div>
        </footer>
        <declaration v-if="showDeclare" @agree="agree" />
    </div>
</template>

<script>
import declaration from '@/components/declaration/declaration.vue'
import loginBg from '@/components/loginBg.vue'
import { useI18n } from 'vue-i18n'
export default {
    components: {
        declaration, loginBg
    },
    data () {
        return {
            form: {
                userName: '',
                userPwd: '',
                verificationCode: '',
                verificationKey: '',
            },
            langOptions: [],
            IsIgnoreFalidateCode: true,
            loading: false,

            showDeclare: false,
            mainImg: '',
            errorLoading: true,
            showMaintain: false,
            showLangSelect: false,
            languageSelected: '',
            outerHeight: '',
            loginFormHeight: '',
            i18nInstance: null
        }
    },

    watch: {
        'i18nInstance.locale' (val) {
            setTimeout(() => {
                if (this.$refs.loginForm) {
                    this.$refs.loginForm.clearValidate()
                }
            }, 50)
        }
    },

    computed: {
        rules () {
            return {
                userName: [
                    { required: true, message: this.$t('login.tips.ACTCantBeNull'), trigger: 'blur' },
                ],
                userPwd: [
                    { required: true, message: this.$t('login.tips.PWDCantBeNull'), trigger: 'blur' },
                ],
                verificationCode: [
                    { required: true, message: this.$t('login.tips.codeCantBeNull'), trigger: 'blur' },
                ],
            }
        }
    },

    created () {
        this.loginCreated()
        this.mainImg = sessionStorage.mainImg
        this.langOptions = JSON.parse(localStorage.langOptions)
        this.languageSelected = localStorage.languageType
        this.i18nInstance = useI18n()

    },

    methods: {
        loginCreated () {
            setTimeout(() => {
                if (window.top.getConfigInfoData) {
                    window.top.getConfigInfoData().then(webConfig => {
                        this.showLangSelect = webConfig.showLangSelect  // 默认选项
                        this.mainImg = webConfig.img.loginImg
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }, 200);

            // 验证码配置
            this.$api
                .IsIgnoreFalidateCode()
                .then(res => {
                    const { code, data, message } = res?.data || {}
                    if (code === 200) {
                        this.IsIgnoreFalidateCode = data || false
                        if (!this.IsIgnoreFalidateCode) {
                            this.drawCode()
                            this.outerHeight = 518;
                            this.loginFormHeight = 518
                        }
                    } else {
                        this.$message.error(message)
                    }
                })
                .catch(err => {
                    this.$message.error(err?.data, err)
                })

        },
        langChange (val) {
            // 语言切换
            try {
                localStorage.languageType = sessionStorage.languageType = val
                window.top.getLanguage('ganwei-iotcenter-login', 'login', 'Ganweisoft.IoTCenter.Module.Login', this)
                sessionStorage.haveSetLanguageType = true
            } catch (error) {
                console.log(error)
            }
        },

        drawCode () {
            if (this.IsIgnoreFalidateCode) {
                return;
            }
            this.form.verificationCode = ''
            this.errorLoading = true
            this.$api
                .getVerificationCode()
                .then(res => {
                    const { code, data, message } = res?.data || {}
                    if (code == 200) {
                        let image = document.getElementById('code_img')
                        this.form.verificationKey = data?.verificationKey || ''
                        if (image) {
                            image.src = data?.verificationCode || ''
                        }
                        this.errorLoading = false
                    } else {
                        this.$message.error(message)
                    }

                })
                .catch(err => {
                    this.$message.error(err?.data, err)
                })
        },

        // 提示
        info (type, msg) {
            this.$message({
                title: msg,
                type: type
            })
        },
        login () {
            // 登录操作
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.form.userName = this.form.userName.trim()
                    this.form.userPwd = this.form.userPwd.trim()
                    this.loading = true
                    this.$message.closeAll()
                    this.$api
                        .login({
                            userName: await this.$getCode.RSAEncrypt(this.form.userName),
                            password: await this.$getCode.RSAEncrypt(this.form.userPwd),
                            verificationKey: this.form.verificationKey,
                            verificationCode: this.form.verificationCode.toUpperCase().replace(/(^\s*)|(\s*$)/g, ''),
                            TimeZone: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || 'Asia/Shanghai'
                        })
                        .then(res => {
                            const { code, data, message } = res?.data || {}
                            if (code == 200) {
                                this.loginData = data || {}
                                if (!data?.userTermsService) {
                                    this.showDeclare = true
                                } else {
                                    this.afterLogin()
                                }
                            } else {
                                this.drawCode()
                                this.$message.error(message)
                            }
                        })
                        .catch(err => {
                            try {
                                this.$message.error(err.data, err)
                            } catch (e) {
                                this.$message.error(this.$t('login.systemError'))
                            }

                            this.drawCode()
                        }).finally(() => {
                            this.loading = false
                        })
                }
            })

        },

        // 进入维护
        toMaintain () {
            this.$router.push('/Maintain')
        },

        // 确认条款
        async agree () {
            try {
                let res = await this.$api.addUserServer()
                if (res?.data?.code !== 200) {
                    this.$message.error(res?.data?.message)
                }
            } catch (err) {
                this.$message.error(err?.data, err)
            }
            this.afterLogin()
        },

        afterLogin () {
            let data = this.loginData
            window.sessionStorage.userName = this.form.userName
            if (data?.passwordPolicy?.passwordPolicy != null) {
                window.sessionStorage.removeItem('passwordPolicy')
                switch (data.passwordPolicy.passwordPolicy) {
                    case 0:
                        this.$message.warning(this.$t('login.tips.PWDOverContactAdmin'))
                        break
                    case 1:
                        window.sessionStorage.passwordPolicy = 1
                        this.$message.warning(this.$t('login.tips.PWDOverTimelyModify'))
                        setTimeout(() => {
                            if (process.env.NODE_ENV === "development") {
                                window.top.location.href = this.$hostMap('ganwei-iotcenter-index') + "?languageType=" + localStorage.languageType + "&userName=" + window.sessionStorage.userName + "&passwordPolicy=" + window.sessionStorage.passwordPolicy
                            } else { window.top.location.href = '/index.html' }
                        }, 250)
                        break

                    default:
                        let reminderDaysInAdvance = data.passwordPolicy.reminderDaysInAdvance
                        if (reminderDaysInAdvance != null) {
                            if (reminderDaysInAdvance > 0) {
                                this.$message.warning(`${this.$t('login.tips.PWDAlso')}${reminderDaysInAdvance}${this.$t('login.tips.dayExpire')}`)
                            } else if (reminderDaysInAdvance == 0) {
                                this.$message.warning(this.$t('login.tips.PWDOverTodayModify'))
                            } else if (reminderDaysInAdvance < 0) {
                                this.$message.warning(this.$t('login.tips.PWDOverTimelyModify'))
                            }
                        } else {
                            this.$message.success(this.$t('login.tips.loginSuccess'))
                        }
                        setTimeout(() => {
                            if (process.env.NODE_ENV === "development") {
                                window.top.location.href = this.$hostMap('ganwei-iotcenter-index') + "?languageType=" + localStorage.languageType + "&userName=" + window.sessionStorage.userName + "&passwordPolicy=" + window.sessionStorage.passwordPolicy
                            } else { window.top.location.href = '/index.html' }
                        }, 250)

                        break
                }
            } else {
                this.$message({
                    title: this.$t('login.tips.loginSuccess'),
                    type: 'success'
                })
                setTimeout(() => {
                    if (process.env.NODE_ENV === "development") {
                        window.top.location.href = this.$hostMap('ganwei-iotcenter-index') + "?languageType=" + localStorage.languageType + "&userName=" + window.sessionStorage.userName + "&passwordPolicy=" + window.sessionStorage.passwordPolicy
                    } else { window.top.location.href = '/index.html' }
                }, 250)
            }
        },

        showImg () {
            if (process.env.NODE_ENV === "development") { this.mainImg = `/static/images/${localStorage.theme == 'dark' ? 'index-logo-src' : 'index-logo-src-light'}.svg` }
        }
    }
}
</script>
<style lang="scss" src="@/assets/css/login.scss" scoped></style>