<template>
    <div id="ssoLogin" v-loading='loading' loading-type="2">
        <div class="error-box" v-show="isError">
            <img src="./Images/sso_error.png">
            <p class="error-txt">{{errorTxt}}</p>
            <el-button type="primary" @click="toBack">确定</el-button>
        </div>
    </div>
</template>
<script>
import apiFunction from 'gw-base-api-plus/apiFunction';
export default {
    data () {
        return {
            query: null,
            urlConfig: null,
            loginConfig: null,
            loading: true,
            isError: false,
            errorTxt: ""
        }
    },
    mounted () {
        this.ssoLogin();
    },
    methods: {
        async ssoLogin () {
            if (this.$route.query) {
                this.query = this.$route.query;
            }

            let isGetUrl;

            // 获取接口配置
            await this.Axios({
                methed: 'get',
                url: 'static/json/config.json'
            }).then((res) => {
                if (res.status == 200 && res.data && res.data.ssoLogin) {
                    isGetUrl = res.data.enabledSsoUrl;
                    this.urlConfig = res.data.ssoUrl;
                    this.loginConfig = res.data.ssoLogin;
                } else {
                    this.isError = true;
                    this.errorTxt = '获取配置信息异常，请联系平台运维人员处理~';
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            })
            console.log(isGetUrl && JSON.stringify(this.query) == '{}');
            if (isGetUrl && JSON.stringify(this.query) == '{}') {
                console.log('ssourl');

                // 调用获取重定向地址接口
                this.ssoUrlApi(this.urlConfig.api, this.urlConfig.method).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        let url = `${data.requestUrl}?client_id=${data.clientId}&response_type=${data.responseType}&redirect_uri=${data.redirectUri}`
                        url = url.replace(/\#/g, "%23");
                        console.log(url)
                        window.location.href = url;
                    } else {
                        this.isError = true;
                        this.errorTxt = res.data.message;
                    }
                    this.loading = false;
                }).catch(er => {
                    this.isError = true;
                    this.loading = false;
                })
            } else {
                console.log('ssologin');

                // 调用单点登录接口
                this.ssoApi(this.loginConfig.api, this.loginConfig.method, this.query).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success('登录成功！');
                        if (res.data.data) {
                            sessionStorage.userName = res.data.data.userName
                            sessionStorage.roleName = res.data.data.roleName
                        }
                        sessionStorage.isSsoLogin = '1';
                        window.top.location.href = '/#/Index'
                        // this.$router.push('/Index');
                    } else {
                        this.isError = true;
                        this.errorTxt = res.data.message;
                    }
                    this.loading = false;
                }).catch(er => {
                    this.isError = true;
                    this.loading = false;
                    this.errorTxt = '出现异常，请联系平台运维人员处理~';
                })
            }

        },

        // 可配置接口
        ssoUrlApi (api, method) {
            return this.Axios({
                method: method,
                url: api
            });
        },

        // 可配置接口
        ssoApi (api, method, data) {
            return this.Axios({
                method: method,
                url: api,
                data: method.toLowerCase() == 'get' ? null : data,
                params: method.toLowerCase() == 'post' ? '' : data
            });
        },

        toBack () {
            window.history.back(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
#ssoLogin {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .error-box {
        width: 80%;
        max-width: 570px;
        text-align: center;
        transform: translateY(-10px);

        img {
            width: 100%;
        }

        .error-txt {
            font-size: 24px;
            color: #90959b;
            margin: 26px 0 28px;
        }

        .el-button {
            width: 160px;
            font-size: 22px;
            padding: 8px 20px;

            &:not(:hover) {
                background-color: #669eff;
                border-color: #669eff;
            }
        }
    }
}
</style>