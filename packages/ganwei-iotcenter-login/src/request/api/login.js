const login = {
    // 获取是否忽略验证码校验
    IsIgnoreFalidateCode () {
        return this.get('/IoT/api/v3/auth/IsIgnoreValidateCode');
    },
    //获取当前可切换的语言列表
    getsupportedcultures () {
        return this.get('/api/localization/getsupportedcultures');
    },
    // 获取验证码
    getVerificationCode () {
        return this.get('/IoT/api/v3/Auth/GetVerificationCode?codeType=0');
    },
    // 用户登录,获取token
    login (params) {
        return this.post('/IoT/api/v3/Auth/Login', params);
    },
    // 确认用户条款
    addUserServer () {
        return this.post('/IoT/api/v3/Auth/AddUserServer')
    },
    // 获取服务状态
    GetServiceStatus () {
        return this.get('/api/ServiceManage/GetServiceStatus');
    },
    // 获取注册码与许可状态
    GetLicenseInfo () {
        return this.get('/api/ServiceManage/GetLicenseInfo');
    },
    // 获取初始化状态
    GetInitSate () {
        return this.get('/api/ServiceManage/GetInitSate');
    },
    // 更新许可
    UpdateLicense (data) {
        return this.post('/api/ServiceManage/UploadLicense', data);
    },
    // 提交文件
    UploadLicense (data) {
        return this.postFile('/api/ServiceManage/UploadLicense', data);
    },
    // 初始化用户数据
    InitService () {
        return this.post('/api/ServiceManage/InitService');
    },
    // 启动服务、重启网关、更新许可
    Reboot () {
        return this.post('/api/ServiceManage/Reboot');
    },
    // 重启网站
    RebootWeb () {
        return this.post('/api/ServiceManage/RebootWeb');
    },
    // 下载日志
    DownLoadXlog () {
        return '/api/Maintain/DownLoadXlog';
    },
    IsInitMaintainPwd () {
        return this.get('/api/ServiceManage/IsInitMaintainPwd');
    },
    // 初始化管理员密码
    InitAdminPwd (initData) {
        return this.post('/api/Maintain/InitAdminPwd', initData);
    },
    // 验证管理员密码
    VerifyLogin (data) {
        return this.post('/api/Maintain/VerifyLogin', data);
    },
    getAuthName () {
        return this.get('/IoT/api/v3/Auth/GetName2SF');
    },
}

export default login