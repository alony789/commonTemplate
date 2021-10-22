
export default {
    data () {
        return {
            pageSize: 25,
            pageNo: 1,
            productPageSize: 25,
            productPageNo: 1,
            searchNameStr: '',
            total: 200,
            content: '',
            list: [],
            productList: [],
            dialogVisible: false,
            conLoad: false,
            seleLoad: true,
            addModelEquip: {
                productId: [],
                secret: '',
                description: '',
                nodeId: '',
                manufacturerId: '',
                model: '',
                name: '',
                gatewayId: '',
                deviceType: '',
                nodeType: '',
                status: '',
                latitude: '',
                longitude: '',
                location: ''
            },
            editModelEquip: {
                productId: [],
                secret: '',
                description: '',
                nodeId: '',
                manufacturerId: '',
                model: '',
                name: '',
                gatewayId: '',
                deviceType: '',
                nodeType: '',
                status: '',
                latitude: '',
                longitude: '',
                location: ''
            },
            rules: {
                productId: [{ required: true, message: '产品ID', trigger: 'blur' }],
                nodeId: [{ required: true, message: '标识码', trigger: 'blur' }],
                name: [{ required: true, message: '设备名称', trigger: 'blur' }]
            },
            pagination: {
                pageSize: 25,
                pageNo: 1,
                total: 0
            },
            deleteList: []
        };
    },
    watch: {
        searchNameStr: function (val) {
            if (!val) {

            }
        }
    },

    mounted () {
        this.getModelDevicesList();

    },
    updated () {
    },

    methods: {
        deleteModels () {
            this.$confirm('是否删除所选物模型设备', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.deleteModelsMultipleEquip({ devicesIds: this.deleteList.join(',') }).then(res => {
                    console.log(res);
                    if (res.data.resCode == '0') {
                        this.getModelDevicesList()
                        if (res.data.result.length == 0) {
                            this.$message.success('删除成功');
                            return;
                        }
                    } else {
                        this.$message.success('删除失败');
                            return;
                    }

                    // let arr = []
                    // arr = res.data.result.map(item => item.message)
                    // this.$message(
                    //     {
                    //         dangerouslyUseHTMLString: true,
                    //         message: arr.join('<br />'),
                    //         type: 'warning'
                    //     }
                    // );
                })
            }).catch(() => {
            });
        },
        handleSelectionChange (val) {
             this.deleteList = []
            if (val.length > 0) {
                val.forEach(item => {
                    this.deleteList.push(item.deviceId)
                })
            }
        },
        confirm () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let formatSevice = {}
                    try {
                        formatSevice = JSON.parse(this.formLabelAlign.services);
                    } catch (error) {
                        this.$message.warning('服务填写不正确')
                        return;
                    }
                    this.confirm = true;
                    let data = {
                        name: this.formLabelAlign.name,
                        description: this.formLabelAlign.description,
                        services: formatSevice
                    }
                    this.$api.addModel(data).then(res => {
                        this.confirm = false;
                        if (res.data.resCode == '0') {
                            this.$message.success('添加成功！');
                            this.$refs.ruleForm.resetFields()
                            this.getList()
                            this.dialogVisible = false
                        } else {
                            this.$message.warning('添加失败！')
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.conLoad = false;
                    });
                }
            });
        },
        showNewDialog () {
            this.dialogVisible = true;
            this.getProductId();
        },
        currentChange (val) {
            this.pagination.pageNo = val;
            this.getList()
        },
        sizeChange (val) {
            this.pagination.pageSize = val;
            this.getList()
        },
        handleClose (done) {
            this.$refs.ruleForm.resetFields()
        },
        getModelDevicesList () {
            let data = {
                PageSize: this.pageSize,
                PageNo: this.pageNo,
                searchNameStr: this.searchNameStr.toString().trim()
            };
            this.$api.getModelDevicesList(data).then((rt) => {
                console.log(rt);
                if (rt.data.resCode == '0') {
                    this.list = rt.data.result.devices;
                    this.pagination.total = rt.data.result.totalCount;
                } else {

                }
            }).catch(err => {
                console.log(err)
            });
        },
        watchSearch() {
            if (this.searchNameStr.toString().trim() == '') {
                this.getModelDevicesList();
            }
        },
        editData(item) {

        },
        getProductId() {
            let data = {
                PageSize: this.productPageSize,
                PageNo: this.productPageNo
            };
            this.seleLoad = true;
            this.$api.getProductListId(data).then((rt) => {
               this.seleLoad = false;
                if (rt.data.resCode == '0') {

                } else {

                }
            }).catch(err => {
               console.log(err);
               this.seleLoad = false;
            });

        }

    }
};