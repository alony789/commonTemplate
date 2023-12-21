const frame = {
    GetMenus (params) {
        return this.get('/IoT/api/v3/Auth/GetMenus', params)
    },
    // 获取用户信息
    getUserInfo () {
        return this.get('/IoT/api/v3/Auth/userInfo')
    },
    // 获取软件授权名称
    getAuthName () {
        return this.get('/IoT/api/v3/Auth/GetName2SF');
    },
    // 导出历史曲线
    exportCurve (data) {
        return this.post('/IoT/api/v3/EquipList/ExportEquipHistroyCurves', data)
    },
    //获取语言包
    getjsontranslationfile (data) {
        return this.get('/api/localization/getjsontranslationfile', data);
    },
    // 退出登录
    loginOut () {
        return this.get('/IoT/api/v3/Auth/LoginOut');
    },
    // 修改密码
    getUpdUserInfoData (data) {
        return this.post('/IoT/api/v3/Auth/UpdUserInfoData', data);
    },
    // 获取安全设置
    GetAccountPasswordRule () {
        return this.get('/IoT/api/v3/UserManage/GetAccountPasswordRule');
    },
    // 获取系统运行信息
    getSystemInfo () {
        return this.get('/IoT/api/v3/Auth/GetSystemRuntimeInfo');
    },
    // 获取服务状态
    getServiceStatus () {
        return this.get('/api/ServiceManage/GetServiceStatus')
    },
    // 2023-02-23 添加安全模式
    getSafeLevelByGateway () {
        return this.get('/api/ServiceManage/GetSafeLevelByGateway');
    }
}

export default frame