export default {
    inject: ['config', 'theme'],
    data () {
        return {
            n: 0,
        }
    },
    methods: {
        // 全屏、不全屏
        getFullCreeen () {
            this.n++
            this.n % 2 == 0 ? this.outFullCreeen(document) : this.inFullCreeen(document.documentElement)
        },
        inFullCreeen (element) {
            let el = element
            let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
            if (typeof rfs != 'undefined' && rfs) {
                rfs.call(el)
            } else if (typeof window.ActiveXObject != 'undefined') {
                // eslint-disable-next-line
                let wscript = new ActiveXObject('WScript.Shell')
                wscript.SendKeys('{F11}')
            }
        },
        outFullCreeen (element) {
            let el = element
            let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
            if (typeof cfs != 'undefined' && cfs) {
                cfs.call(el)
            } else if (typeof window.ActiveXObject != 'undefined') {
                // eslint-disable-next-line
                let wscript = new ActiveXObject('WScript.Shell')
                wscript.SendKeys('{F11}')
            }
        },
    }
}