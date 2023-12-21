import { defineAsyncComponent, ref, watch, inject, nextTick, getCurrentInstance, computed } from 'vue'
const topNav = defineAsyncComponent(() => { return import('@/components/asideMenu/topNav.vue') })
const headerRight = defineAsyncComponent(() => { return import('./headerRight/index.vue') })
const normalPage = defineAsyncComponent(() => { return import('./normalPage/index.vue') })
const labelPage = defineAsyncComponent(() => { return import('./labelPage/index.vue') })
import { useRoute } from 'vue-router'
export default {
    components: {
        topNav,
        headerRight,
        normalPage,
        labelPage
    },
    model: {
        prop: "modelValue",
        event: 'update'
    },
    emits: ['update:modelValue'],
    props: {
        modelValue: { //获取父组件的数据value
            type: Number || String,
            default: -1
        },
        allMenus: {
            type: Object,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    setup (props, context) {
        const config = inject('config')
        const routesMap = inject('routesMap')
        const navTopOpt = ref([])
        const navTopActive = ref(-1)
        const loading = computed(() => props.loading)
        const allMenus = ref([])
        const router = useRoute()
        const { appContext: { config: { globalProperties } } } = getCurrentInstance()

        const topNavSelect = (index, isInit) => {

            navTopActive.value = index
            context.emit('update:modelValue', index)
            if (!isInit) {
                nextTick(() => {
                    globalProperties.$bus.emit('navTopSelectChange')
                })
            }
        }

        watch(() => props.allMenus, (val) => {
            allMenus.value = val
            navTopOpt.value = []
            props.allMenus.forEach((group, index) => {
                if (config.value.showTopNav) {
                    const { name, resourceId: id, route, icon } = group
                    navTopOpt.value.push({ name, id, index, route, icon })
                }
            })
            topNavSelect(routesMap.value[decodeURIComponent(router.fullPath)] || 0, true)
        }, { immediate: true })

        return {
            navTopOpt,
            navTopActive,
            loading,
            topNavSelect,
            allMenus,
            config
        }
    }
}
