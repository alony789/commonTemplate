/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

(function (_this) {
    let currentAxiosBuilder = null

    function hostMap (host) {
        if (_this.top.isProduction) return host;
        let hostLocalMap = JSON.parse(localStorage.hostMap || '{}')
        return hostLocalMap[host] || host;
    }

    function configInfoData () {
        return new Promise((resolve, reject) => {
            if (sessionStorage.configInfoData) {
                resolve(JSON.parse(sessionStorage.configInfoData))
            } else {
                axios({
                    methed: 'get',
                    url: '/IoT/api/v3/Frontconfiguration/GetFrontconfigurationData'
                })
                    .then(res => {
                        if (res.data.code == 200 && res.data.data) {
                            sessionStorage.configInfoData = res.data.data
                            resolve(JSON.parse(res.data.data))
                        } else {
                            reject({})
                        }
                    })
                    .catch(err => {
                        console.log(err, '获取平台配置失败')
                        reject({})
                    })
            }
        })
    }

    const tip = async (msg, zhMsg, duration) => {
        // RefactorUI版本阻断
        if (window.sessionStorage.versionFlag) {
            currentAxiosBuilder.notification({
                title: currentAxiosBuilder.i18n.tc(zhMsg),
                duration: duration,
                type: 'error'
            })
            return
        }
        let languagePackage = {}
        try {
            languagePackage = sessionStorage.languagePackage ? JSON.parse(sessionStorage.languagePackage) : {}
        } catch (error) {
            console.log(error)
        }

        if (!languagePackage || !languagePackage[localStorage.languageType] || !languagePackage[localStorage.languageType].login) {
            await getLoginLanuage('ganwei-iotcenter-login', 'login', 'Ganweisoft.IoTCenter.Module.Login', zhMsg, duration)
        }
        currentAxiosBuilder.notification({
            title: currentAxiosBuilder.i18n.tc(msg),
            duration: duration,
            type: 'error'
        })
    }

    function getLoginLanuage (pluginName, menuName, packageId, msg, duration) {
        return new Promise((resolve, reject) => {
            let data = {
                pluginName: pluginName,
                menuName: menuName,
                packageId: packageId
            }

            const instance = currentAxiosBuilder.axios

            instance({
                method: 'get',
                url: '/api/localization/getjsontranslationfile',
                params: data,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        currentAxiosBuilder.i18n._vm.messages[sessionStorage.languageType][menuName] = JSON.parse(res.data.data)
                        resolve(res.data.data)
                    } else {
                        console.log('get Language error')
                        reject('get Language error')
                    }
                },
                e => {
                    currentAxiosBuilder.notification({
                        title: currentAxiosBuilder.i18n.tc(msg),
                        duration: duration,
                        type: 'error'
                    })
                    reject('e')
                }
            )
        })
    }

    /**
     * 跳转登录页
     * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
     */
    const toLogin = () => {
        try {
            if (top.location.href.toLowerCase().indexOf('login') == -1) {
                jumpPage('ganwei-iotcenter-login/#/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const jumpPage = (page) => {
        try {
            if (_this.top.isProduction) {
                window.top.location.href = `${window.top.location.origin}/${page}`
            } else {
                window.top.location.href = hostMap(page)
            }
        } catch (error) {
            console.log(error)
            window.top.location.href = hostMap(page)
        }
    }

    /**
     * 请求失败后的错误统一处理
     * @param {Number} status 请求失败的状态码
     */
    const errorHandle = function (status, other) {
        // 状态码判断
        switch (status) {
            case 401: // 403 token过期 清除token并跳转登录页
                if (window.sessionStorage.getItem('isSsoLogin')) {
                    window.sessionStorage.clear()
                    jumpPage('/ganwei-iotcenter-login/ssoLogout')
                } else {
                    toLogin(1)
                }
                break
            case 403: // 403 拒绝访问接口 清除token并跳转无权限页面
                // tip('login.framePro.tips.noJurisdiction', '当前接口无权限', 1500)
                break
            case 404:
                // tip('login.framePro.tips.noInterface', '请联系管理员更新服务接口', 3000);

                break
            case 500: // ghost出现问题
                let url = other.config.url
                if (url.indexOf('/IoT/api/v3/Auth/GetMenus') != -1 || url.indexOf('IoT/api/v3/RealTime/GetRealTimeData') != -1) {
                    toLogin(2)
                } else {
                    // tip('login.framePro.tips.internalException', '服务内部异常', 3000);
                }
                break
            case 501:
                break
            case 504:
                // tip('login.framePro.tips.internalException', '网关超时', 3000);
                toLogin(2)
                break
            default:
                // jumpPage('ganwei-iotcenter-login')
                break
        }
    }

    let defaultResponseInterceptorConfig = {
        fullfilled: res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                let requestData = res.request
                if (requestData.responseURL.indexOf('?ReturnUrl=') != -1) {
                    toLogin(1)
                    return
                }
            }
            return res.status === 200 || res.status === 201 ? Promise.resolve(res) : Promise.reject(res)
        },
        reject: function axiosRetryInterceptor (err) {
            if (typeof err.code == 'string' && err.code.toLowerCase().includes('err_network')) {
                toLogin(1);
            }

            const instance = currentAxiosBuilder.axios

            const { response } = err
            let retryWhiteList = err.config.retryWhiteList
            let url = err.config.url
            let location = url.split('?')[0]

            // 判断是否是需要重复请求的api
            // let ifRetryApi = url.indexOf('IoT/api/v3/Auth/GetVerificationCode') != -1 || url.indexOf('api/localization/getsupportedcultures') != -1 || url.indexOf('api/localization/getjsontranslationfile') != -1
            let ifRetryApi = retryWhiteList.findIndex(reg => reg && reg.test(location)) > -1

            // 请求响应报错，状态码不为200时
            if (response && !ifRetryApi) {
                errorHandle(response.status, response)
                return Promise.reject(response)

                // 重连接口操作，如：请求超时、请求失败需要重复请求的接口
            } else if (response == undefined || ifRetryApi) {
                let config = err.config
                if (ifRetryApi) {
                    // 初始化当前重连次数
                    config.__retryCount = config.__retryCount || 0

                    // 超过重连次数时
                    if (config.__retryCount >= config.retry) {
                        // 超过重连次数且有响应内容时，进行相应的错误处理
                        if (response) {
                            errorHandle(response.status, response)
                            return Promise.reject(response)
                        }
                        tip('login.framePro.tips.overtime', '网络请求超时,请继续等待或者重新登录', 3000)
                        return Promise.reject({})

                    }
                    // 重连次数加一
                    config.__retryCount += 1

                    // 创建一个新的promise来处理请求
                    let backoff = new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve()
                        }, config.retryDelay || 1000)
                    })

                    // 返回一个axios重试请求的promise
                    return backoff.then(function () {
                        return instance(config)
                    })
                }
                // 接口请求超时的处理
                if (response == undefined) {
                    tip('login.framePro.tips.overtime', '网络请求超时,请继续等待或者重新登录', 3000)
                    return Promise.reject({})
                }
            }
        }
    }

    _this['AxiosBuilder'] = function AxiosBuilder () {
        this.axios = window.axios
        this.config = {}
        this.requestInterceptor = []
        this.responseInterceptor = []
        this.i18n = null
        this.notification = null
    }

    _this['AxiosBuilder'].prototype.withTipConfig = function withTipConfig (i18n, notification) {
        this.i18n = i18n
        this.notification = notification
        return this
    }

    _this['AxiosBuilder'].prototype.withDeafultConfig = function withDeafultConfig (config) {
        this.config = config || httpConfig
        return this
    }

    _this['AxiosBuilder'].prototype.withRequestInterceptor = function withRequestInterceptor (requestInterceptor) {
        if (Array.isArray(requestInterceptor) && requestInterceptor[0] instanceof Function && requestInterceptor[1] instanceof Function) {
            this.requestInterceptor.push(requestInterceptor)
        } else {
            console.error('requestInterceptor should be [(config) => {}, (error) => {}]')
        }
        return this
    }

    _this['AxiosBuilder'].prototype.withResponseInterceptor = function withResponseInterceptor (responseInterceptor) {
        if (Array.isArray(responseInterceptor) && responseInterceptor[0] instanceof Function && responseInterceptor[1] instanceof Function) {
            this.responseInterceptor.push(responseInterceptor)
        } else {
            console.error('responseInterceptor should be [(response) => {}, (error) => {}]')
        }
        return this
    }
    _this['AxiosBuilder'].prototype.withDeafultRequestInterceptor = function withDeafultRequestInterceptor () {
        this.requestInterceptor.push([
            config => {
                config.headers['Accept-Language'] = window.localStorage.languageType || 'zh-CN'
                // config.url = config.url + (config.url.indexOf("?") != -1 ? "&culture=" : "?culture=") + window.localStorage.languageType
                let specialConfig = config.overTimeList.find(i => i.api === config.url);
                if (specialConfig) {
                    config.timeout = specialConfig.timeout;
                }
                return config
            },
            error => Promise.error(error)
        ])
        return this
    }
    _this['AxiosBuilder'].prototype.withDeafultResponseInterceptor = function withDeafultResponseInterceptor () {
        this.responseInterceptor.push([defaultResponseInterceptorConfig.fullfilled, defaultResponseInterceptorConfig.reject])
        return this
    }
    let httpConfig = {
        countRetry: 0,
        timeout: 30000,
        retryDelay: 3000
    }

    _this['AxiosBuilder'].prototype.build = function build () {
        this.axios = axios.create(this.config)
        this.axios.defaults.headers.post['Content-Type'] = 'application/json'
        this.axios.defaults.headers['X-Requested-With'] = 'IoT-XMLHttpRequest'
        this.axios.defaults.withCredentials = true
        this.requestInterceptor.forEach(r => {
            this.axios.interceptors.request.use(...r)
        })
        this.responseInterceptor.forEach(r => {
            this.axios.interceptors.response.use(...r)
        })

        this.axios.defaults['timeout'] = httpConfig.timeout
        this.axios.defaults['retry'] = httpConfig.countRetry
        this.axios.defaults['retryDelay'] = httpConfig.retryDelay
        this.axios.defaults['retryWhiteList'] = []
        this.axios.defaults['overTimeList'] = []

        configInfoData().then(res => {
            if (res.httpConfig) {
                this.axios.defaults['timeout'] = res.httpConfig.timeout
                this.axios.defaults['retry'] = res.httpConfig.countRetry
                this.axios.defaults['retryDelay'] = res.httpConfig.retryDelay
                this.axios.defaults['retryWhiteList'] = Array.from(new Set(res.httpConfig.retryWhiteList.replaceAll('\n', '').split(','))).map(str => str && new RegExp(str))
                this.axios.defaults['overTimeList'] = res.httpConfig.overTimeList || []
            }
        })
        return this
    }
    _this['AxiosBuilder'].prototype.getInstance = function getInstance () {
        currentAxiosBuilder = this
        return this.axios
    }
})(window)
