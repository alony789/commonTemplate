export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        showDialog (val) {
            this.dialogVisible = val;
        }
    },
    data () {
        return {
            infoList: [],
            dialogVisible: false
        }
    },
    mounted () {
        this.getSystemInfo()
    },
    methods: {
        getSystemInfo () {
            this.$api.getSystemInfo().then(rt => {
                if (rt?.status == 200) {
                    let infoList = [
                        {
                            title: JSON.parse(rt?.data?.data?.systemPlatformInfo).Item1,
                            value: JSON.parse(rt?.data?.data?.systemPlatformInfo).Item2.slice(-2)
                        }

                    ]
                    this.infoList = infoList
                }
            })
        },
        closeDialog () {
            this.$emit('closeDialog')
        }
    }
}