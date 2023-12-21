if (!window.localStorage.languageType) {
    localStorage.languageType = sessionStorage.languageType = 'zh-CN'
}
window.getParameterMap = () => {
    let parameters = window.location.search;
    if (parameters.indexOf("?") == -1) return;
    let map = new Map(), str = parameters.substr(1), data = str.indexOf("&") != -1 ? str.split("&") : [str]
    for (let i = 0; i < data.length; i++) {
        let arry = data[i].split("=")
        map.set(arry[0], arry[1])
    }
    return map;
}
window.requestLanguage = async (pluginName, menuName, packageId, vm) => {
    return new Promise((resolve, reject) => {
        let data = {
            packageId,
            pluginName,
            menuName
        }
        window.axios && window.axios({
            method: 'get',
            url: '/api/localization/getjsontranslationfile',
            params: data,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept-Language': window.localStorage.languageType || 'zh-CN'
            }
        }).then(res => {
            const { code, data, message } = res ? (res.data || {}) : {}
            if (code == 200) {
                try {
                    resolve(data ? JSON.parse(data) : {})
                } catch (error) {
                    console.log(error)
                    resolve({})
                }
            } else {
                vm && vm.$message.error(message || '')
            }
        }).catch(err => {
            vm && vm.$message.error(err.data, err)
            resolve({})
        })
    })
}
window.updateLanguage = (vm, i18n) => {
    let languagePackage = {}
    try {
        languagePackage = JSON.parse(sessionStorage.languagePackage)
        // vue3基座切换
        if (vm.i18nInstance) {
            vm.i18nInstance.locale = localStorage.languageType
            vm.i18nInstance.mergeLocaleMessage(localStorage.languageType, JSON.parse(JSON.stringify(languagePackage[localStorage.languageType] || {})))
        }
        // vue2基座切换
        if (vm && i18n && i18n._vm) {
            i18n._vm.locale = localStorage.languageType
            vm.$i18n._vm.messages[localStorage.languageType] = JSON.parse(JSON.stringify(languagePackage[localStorage.languageType] || {}))
        }
    } catch (error) {
        console.log(error)
    }

}
// 语言是否已经存在
window.haveExistLanguage = (menuName) => {
    let languagePackage = {}
    let exsist = false
    if (sessionStorage.languagePackage) {
        try {
            languagePackage = JSON.parse(sessionStorage.languagePackage)
        } catch (error) {
            console.log(error)
        }

        let language = languagePackage[localStorage.languageType]
        if (language && language[menuName]) {
            exsist = true
        }
    }
    return exsist
}
// 保存至会话缓存
window.saveToSession = (menuName, language) => {
    let languagePackage = {}
    try {
        if (sessionStorage.languagePackage) {
            languagePackage = JSON.parse(sessionStorage.languagePackage)
        }
        if (!languagePackage[localStorage.languageType]) {
            languagePackage[localStorage.languageType] = {}
        }
        if (menuName == "login") { languagePackage[localStorage.languageType]['publics'] = language ? (language.publics ? language.publics : {}) : {} }
        languagePackage[localStorage.languageType][menuName] = language || {}
        sessionStorage.setItem('languagePackage', JSON.stringify(languagePackage))
    } catch (error) {
        console.log(error)
    }

    return languagePackage
}
window.getLanguage = async (pluginName, menuName, packageId, vm, i18n) => {
    if (window.haveExistLanguage(menuName)) {
        window.updateLanguage(vm, i18n)
        if (vm) { vm.isShow = true }
        return
    }
    let result = await requestLanguage(pluginName, menuName, packageId, vm)
    window.saveToSession(menuName, result)
    window.updateLanguage(vm, i18n)
    if (vm) { vm.isShow = true }
}