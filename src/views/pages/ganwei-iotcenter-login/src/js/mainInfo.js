export default {
    data () {
        return {
            licenseForm: {
                registrationCode: '',
                file: [],
                licenseStatus: '',
                serviceStatus: ''
            },
            labelWidth: '150px',
            timeInterval: null,  //定时器
            timeOut: null,
            isInitSate: false,
            percentage: 0,
            timeStart: '0',
            loadingDialogVisible: false,
            dialogTitle: '初始化中,请稍等……',
            tipsMessage: '',
            formData: ''
        }
    },
    async created () {
        await this.GetInitSate();
        await this.GetLicenseInfo();
        await this.GetServiceStatus();
        this.timeInterval = setInterval(async () => {
            await this.GetLicenseInfo();
            await this.GetServiceStatus();
        }, 5000);
    },
    methods: {
        // 获取服务状态
        GetServiceStatus () {
            this.$api
                .GetServiceStatus()
                .then(res => {
                    if (res.data.code === 200) {
                        this.licenseForm.serviceStatus = '已启动';
                    } else {
                        this.$message.warning(res.data.message);
                        this.licenseForm.serviceStatus = '未启动';
                    }
                })
                .catch(error => {
                    console.log('error:', error);
                });
        },

        getStatus () {
            this.$api
                .GetServiceStatus()
                .then(res => {
                    if (res.data.code === 200) {
                        this.licenseForm.serviceStatus = '已启动';
                        this.$message.success(this.tipsMessage);
                        this.RebootWeb();
                        setTimeout(async () => {
                            this.loadingDialogVisible = false;
                            this.percentage = 100;
                            this.$router.push('/Login');
                        }, 30000);
                    } else {
                        this.licenseForm.serviceStatus = '未启动';
                        this.loadingDialogVisible = false;
                        this.$message.error('服务未启动');
                        this.timeInterval = setInterval(async () => {
                            await this.GetLicenseInfo();
                            await this.GetServiceStatus();
                        }, 5000);
                    }
                })
                .catch(error => {
                    this.loadingDialogVisible = false;
                    console.log('error:', error);
                });
        },

        // 获取注册码与许可状态
        GetLicenseInfo () {
            this.$api.GetLicenseInfo().then(res => {
                const { code, data, message } = res.data;
                if (code === 200) {
                    this.licenseForm.registrationCode = data.authCode;
                    this.licenseForm.licenseStatus = data.licenseState;
                } else {
                    this.$message.error(message);
                    this.licenseForm.licenseStatus = message;
                }
            }).catch(err => {
                console.log(err);
            })
        },

        // 获取初始化状态
        GetInitSate () {
            this.$api.GetInitSate().then(res => {
                const { code, message } = res.data;
                if (code === 200) {
                    this.isInitSate = false;
                } else if (code === 400) {
                    this.isInitSate = true;
                    this.$message.warning(message)
                }
            })
        },

        // 选中文件改变事件
        fileListChange (file, fileList) {
            this.licenseForm.file = fileList;
        },

        // 文件删除事件
        fileListremove (file, fileList) {
            this.licenseForm.file = fileList;
        },

        async changeEvents () {
            this.percentage = 0;
            this.formData = new FormData();
            if (this.licenseForm.file.length) {
                this.formData.append('file', this.licenseForm.file[0].raw);
            } else {
                this.$message.error('未上传文件，请上传！');
                return;
            }
            clearInterval(this.timeInterval);
            this.timeInterval = null;
            if (this.isInitSate) {
                this.dialogTitle = '更新许可中,请稍等……';
                this.tipsMessage = '更新许可成功';
                await this.getLicenseStatus(this.licenseForm.licenseStatus);
            } else {
                this.loadingDialogVisible = true;
                this.dialogTitle = '初始化中,请稍等……';
                this.tipsMessage = '初始化成功';
                this.UploadLicense();
            }
        },

        async getLicenseStatus (licenseStatus) {
            if (licenseStatus === '已生效') {
                this.$confirm('当前许可状态为有效, 是否继续更新许可?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loadingDialogVisible = true;
                    await this.UpdateLicense(this.formData);
                }).catch(err => {
                    console.log(err);
                })
            } else {
                this.loadingDialogVisible = true;
                await this.UpdateLicense(this.formData);
            }
        },

        // 更新许可
        UpdateLicense (formData) {
            this.$api.UpdateLicense(formData).then(res => {
                const { code, message } = res.data;
                if (code === 200) {
                    this.$message.success(message);
                    this.timeOut = setTimeout(async () => {
                        await this.getStatus();
                    }, 35000);
                } else {
                    this.loadingDialogVisible = false;
                    this.$message.success(message);
                }
            }).catch(err => {
                this.loadingDialogVisible = false;
                console.log(err);
            });
        },

        // 上传许可文件
        async UploadLicense () {
            let formData = new FormData();
            formData.append('file', this.licenseForm.file[0].raw);
            await this.$api
                .UploadLicense(formData)
                .then(res => {
                    if (res.data.code === 200) {
                        this.$message.success(res.data.message);
                        this.loadingDialogVisible = true;
                        this.InitService();
                    } else {
                        this.$message.error(res.data.message || this.$t('manageLicenses.tips.err'));
                        this.licenseForm.file = [];
                        this.loadingDialogVisible = false;
                    }
                })
                .catch(error => {
                    this.licenseForm.file = [];
                    console.log('error:', error);
                });
        },

        // 初始化
        async InitService () {
            setTimeout(() => {
                this.Reboot();
            }, 5000);
            setTimeout(() => {
                this.$api.InitService().then(res => {
                    const { code, message } = res.data;
                    if (code === 200) {
                    } else if (code === 400) {
                        this.loadingDialogVisible = false;
                        this.$message.error(message);
                    }
                })
                    .catch(error => {
                        this.loadingDialogVisible = false;
                        console.log('error', error);
                    });
            }, 30000);

            this.timeOut = setTimeout(async () => {
                await this.getStatus();
            }, 35000);
        },

        // 重启网关
        Reboot () {
            this.$api
                .Reboot()
                .then(() => {
                })
                .catch(error => {
                    console.log('error:', error);
                });
        },

        // 重启网站
        RebootWeb () {
            this.$api
                .RebootWeb()
                .then(() => {
                })
                .catch(error => {
                    console.log('error:', error);
                });
        },

        // 下载日志
        DownLoadXlog () {
            let url = this.$api.DownLoadXlog();
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        increase () {
            this.timeStart = setInterval(() => {
                if (this.percentage < 98) {
                    this.percentage += 2;
                }
                if (this.percentage > 100) {
                    this.percentage = 100;
                }
            }, 1500);
        },
        increaseend () {
            this.percentage = 100;
            clearInterval(this.timeStart);
        }
    },
    watch: {
        // 监听loading状态控制进度条显示
        loadingDialogVisible (value, newValue) {
            if (value) {
                this.increase();
            } else {
                this.increaseend();
            }
        },
    },
    beforeDestroy () {
        clearInterval(this.timeInterval);
        this.timeInterval = null;
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = null;
        }
    },
    destroyed () {
        clearInterval(this.timeInterval);
        this.timeInterval = null;
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = null;
        }
    },
}
