// import _ from 'lodash';
export default {
    data () {
        let validatePass1 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入管理员密码"));
            } else if (value === this.DefaultForm.DefaultPassword) {
                callback(new Error("管理员密码与默认密码一致"));
                this.firstLoading = false;
            } else {
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入管理员密码"));
            } else if (value !== this.DefaultForm.InputPassword) {
                callback(new Error("两次输入管理员密码不一致"));
                this.firstLoading = false;
            } else {
                callback();
            }
        };
        return {
            // 上传文件表单
            uploadForm: {
                systemInfo: "",
                serviceLog: "",
                file: []
            },
            loading: false,
            labelWidth: "150px",
            DefaultForm: {
                DefaultPassword: "",
                InputPassword: "",
                confirmAdminPwd: ""
            }, // 默认密码数据
            testForm: {
                password: ""
            }, //
            firstLogin: Boolean, // 首次登录
            secondLogin: false, // 二次登录
            firstLoading: false,
            secondLoading: false,
            FormRules: {
                DefaultPassword: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                InputPassword: [
                    {
                        required: true,
                        validator: validatePass1,
                        trigger: "blur"
                    }
                ],
                confirmAdminPwd: [
                    {
                        required: true,
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入管理员密码",
                        trigger: "blur"
                    }
                ]
            }, // 表单验证
            url: ""
        };
    },
    created () {
        this.IsInitMaintainPwd();
    },
    methods: {
        // 首次登录
        IsInitMaintainPwd () {
            this.$api.IsInitMaintainPwd().then(res => {
                const { code, data, message } = res.data;
                if (code === 200) {
                    const initData = JSON.parse(data);
                    if (
                        initData.initStatus === 0 ||
                        initData.initStatus === 1
                    ) {
                        this.firstLogin = true;
                        this.secondLogin = false;
                    } else if (initData.initStatus === 2) {
                        this.firstLogin = false;
                        this.secondLogin = true;
                    }
                } else {
                    this.$message.warning(message);
                }
            });
        },

        async confirm (props, DefaultForm) {
            window.sessionStorage.clear();
            let sha512 = require("js-sha512");
            if (props === "firstLogin") {
                this.firstLogin = true;
                this.secondLogin = false;
                let firstFormData = {
                    DefaultPassword: await this.$getCode.RSAEncrypt(
                        sha512(this.DefaultForm.DefaultPassword)
                    ),
                    InputPassword: await this.$getCode.RSAEncrypt(sha512(this.DefaultForm.InputPassword))
                };
                this.$refs[DefaultForm].validate(valid => {
                    if (valid) {
                        this.InitAdminPwd(firstFormData);
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
            if (props === "secondLogin") {
                this.secondLoading = true;
                this.firstLogin = false;
                this.secondLogin = true;
                this.$refs[DefaultForm].validate(async valid => {
                    if (valid) {
                        this.VerifyLogin({
                            InputPassword: await this.$getCode.RSAEncrypt(sha512(this.testForm.password))
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        },

        // 初始化管理员密码
        InitAdminPwd (formData) {
            this.firstLoading = true;
            this.$api
                .InitAdminPwd(formData)
                .then(res => {
                    if (res.data.code === 200) {
                        this.firstLogin = false;
                        this.secondLogin = true;
                        this.$message.success(res.data.message);
                    } else {
                        this.$message.success(res.data.message);
                    }
                    this.firstLoading = false;
                })
                .catch(err => {
                    console.log(err, "err");
                    this.firstLogin = true;
                    this.secondLogin = false;
                    this.$message.success(res.data.message);
                    this.firstLoading = false;
                });
        },

        //验证管理员密码
        VerifyLogin (formData) {
            this.$api
                .VerifyLogin(formData)
                .then(res => {
                    if (res.data.code === 200) {
                        this.secondLoading = true;
                        this.firstLogin = false;
                        this.secondLogin = false;
                        this.$message.success(res.data.message);
                        window.sessionStorage.clear();
                        this.$router.replace("/mainInfo");
                    } else {
                        this.secondLoading = false;
                        this.$message.success(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.secondLoading = false;
                    this.firstLogin = false;
                    this.secondLogin = true;
                    this.$message.success(res.data.message);
                });
        }
    }
};
