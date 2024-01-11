import unread from '@/components/unreadMsg/unread.vue'
import gwSignalr from 'gw-base-components-plus/equipProcessing/gwSignalr.js'
import Speaktts from 'gw-base-utils-plus/speaktts.js'
export default {
    mixins: [Speaktts],
    components: {
        unread
    },
    inject: ['config', 'theme'],
    data () {
        return {
            messageList: [],
            showSound: false,
            eventType: {},
            isFirst: true,
            speakttsRange: '',
            messageObj: {}
        }
    },
    watch: {
        config: {
            handler (val) {
                if (val) {
                    this.speakttsRange = val.speaktts
                }
            },
            immediate: true
        }
    },
    created () {
        this.showSound = sessionStorage.showSound || false
    },
    mounted () {
        this.getRealTimeEventTypeConfig()
    },
    methods: {
        getRealTimeEventTypeConfig () {
            this.Axios({
                method: "Get",
                url: '/static/json/snapshot.json'
            }).then(res => {
                this.eventType = res.data
                this.getRealTimeDataInfo()
            }).catch(err => {
                console.log(err)
                this.eventType = {}
            })
        },
        updateMsgList (index) {
            delete this.messageObj[this.messageList[index]['guid']]
            this.messageList.splice(index, 1)
        },
        getRealTimeDataInfo () {
            this.snapshotSignlar = new gwSignalr('/realTimeChange')
            this.snapshotSignlar.openConnect().then(signalr => {
                signalr.off('realTimeChange')
                signalr.on('realTimeChange', res => {
                    if (res && res.isSuccess && this.$route.path.indexOf('/systemSnapshot') == -1) {

                        let item = res.data
                        if (!this.messageObj[item.guid]) {
                            let eventType = this.getEventType(item.level)
                            item.snapshotName = eventType[localStorage.languageType]
                            item.typeSz = eventType[localStorage.languageType]
                            item.iconImage = eventType.icon
                            item.Time = this.$moment(item.Time).format('YYYY-MM-DD HH:mm:ss')
                            item.color = eventType.color
                            item.backgroundColor = eventType.backgroundColor
                            this.messageObj[item.guid] = true

                            // 是否在语音播报列表中
                            if (this.inSpeakttsArray(item.level)) {
                                if (this.showSound) {
                                    if (this.isFirst) {
                                        this.openSpeak()
                                        this.speechPlay('即将进行语音播报', false)
                                        this.isFirst = false
                                    }
                                    this.speechPlay(item.eventMsg.split('---')[0], false)
                                } else {
                                    this.closeSpeak()
                                }
                            }
                            this.messageList.unshift(item)
                        }
                    }
                })
                signalr.onclose(() => {
                    this.getRealTimeDataInfo()
                })
            }).catch(e=>{
                this.$api.getSafeLevelByGateway().then(rt => { console.log(rt) })
            })
        },
        getEventType (level) {
            let keys = Object.keys(this.eventType)
            let key = keys[0]
            keys.forEach(item => {
                let arr = item.split('-');
                if (Number(level) >= Number(arr[0]) && Number(level) <= Number(arr[1])) {
                    key = item
                }
            })
            let obj = {}
            obj = this.eventType[key]
            return obj
        },
        inSpeakttsArray (level) {
            let key = ''
            if (this.speakttsRange) {
                this.speakttsRange.forEach(item => {
                    let arr = item.split('-');
                    if (Number(level) >= Number(arr[0]) && Number(level) <= Number(arr[1])) {
                        key = item
                    }
                })
            }
            if (key) {
                return true
            }
            return false
        },

        closeSpeak () {
            this.speech.init({ volume: 0, rate: 1.5 }).then(() => {
                console.log("success");
            })
            this.showSound = false
            sessionStorage.showSound = false
        },
        openSpeak () {
            this.speech.init({ volume: 1, rate: 1.5 }).then(() => {
                console.log("success");
            })
            this.showSound = true
            sessionStorage.showSound = true
        },

        toRouter () {
            this.$router.push({ path: '/Index/jumpIframe/ganwei-iotcenter-system-snapshot/systemSnapshot' })
        },

    }
}
