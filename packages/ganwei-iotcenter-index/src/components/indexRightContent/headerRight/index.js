import saveMode from './saveMode/index.vue'
import fullScreen from './fullScreen/index.vue'
import contentFullScreen from './contentFullScreen/index.vue'
import unReadMessages from './unReadMessages/index.vue'
import switchTheme from './switchTheme/index.vue'
import userInfo from './userInfo/index.vue'
import isDebug from '@/components/isDebug/isDebug.vue'

export default {
    components: {
        saveMode,
        fullScreen,
        contentFullScreen,
        unReadMessages,
        switchTheme,
        userInfo,
        isDebug
    },
    inject: ['config', 'theme'],
}