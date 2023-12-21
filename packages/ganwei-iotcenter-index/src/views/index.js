import { defineAsyncComponent, computed } from 'vue'
const indexLeftContent = defineAsyncComponent(() => { return import('@/components/indexLeftContent/index.vue') })
const indexRightContent = defineAsyncComponent(() => { return import('@/components/indexRightContent/index.vue') })
import gwEquipCache from 'gw-base-components-plus/equipProcessing/gwEquipCache'
import exportHistory from 'gw-base-utils-plus/historyExport'
import sceneMonitor from '@/components/sceneMonitor/index.js'
const menuColorList = ['#6763EF', '#2FA9E6', '#B945CE', '#27AE79', '#F68309', '#9872EF', '#0FD3D4', '#F37071', '#FDB03D']
export default {
    mixins: [exportHistory, sceneMonitor],
    components: {
        indexLeftContent,
        indexRightContent,
    },
    data () {
        return {
            config: {
                showSwitchTheme: false,
                img: {
                    indexSmallImg: ''
                },
                theme: {
                    default: '',
                    supportThemes: []
                }
            },
            theme: {
                indexSmallImg: ''
            },
            allMenus: [],
            loading: false,
            navTopActive: -1,
            outerLinkMap: {},
            routesMap: {},
            routesToName: {}
        }
    },

    provide () {
        return {
            theme: computed(() => this.theme),
            config: computed(() => this.config),
            routesMap: computed(() => this.routesMap),
            routesToName: computed(() => this.routesToName),
            outerLinkMap: computed(() => this.outerLinkMap)
        }
    },

    mounted () {
        // 获取配置以及菜单
        this.getWebConfigAndMenu()
        // 设备数据
        let equipDataSource = new gwEquipCache()
        equipDataSource.Init()
        // 设备列表--历史曲线导出、菜单新增等事件通信
        window.addEventListener('message', e => {
            this.curveSignalR(e, true)
            if (e.data && typeof e.data == 'object' && 'setMenu' in e.data) {
                // 传递被删除的菜单项的route到Index组件中
                this.resetMenu({ route: e.data.route, setMenu: e.data.setMenu })
            }
        })
        // 主题切换事件监听
        this.$bus.on('themeChange', () => {
            this.theme = JSON.parse(JSON.stringify(this.config.theme.supportThemes.find(item => item.value === localStorage.theme)))
        })
    },

    methods: {
        getWebConfigAndMenu () {
            this.myUtils
                .configInfoData(this)
                .then(data => {
                    // data.labelPage = false
                    this.config = data
                    if (data?.img?.platLogo) {
                        this.setPlatLogo(data.img.platLogo)
                    }

                    // 主题
                    if (!localStorage.theme) {
                        localStorage.setItem('theme', this.config.theme.default)
                    }
                    window.document.documentElement.setAttribute('data-theme', localStorage.theme)
                    this.theme = JSON.parse(JSON.stringify(this.config.theme.supportThemes.find(item => item.value === localStorage.theme)))
                })
                .catch(err => {
                    console.log(err)
                }).finally(() => {
                    //获取菜单
                    this.getMenus()
                    // 获取平台名称
                    this.getAuthName()
                })
        },
        setPlatLogo (platLogo) {
            let link = document.createElement('link')
            link.setAttribute('rel', 'icon')
            link.href = platLogo
            link.setAttribute('type', 'image/x-icon')
            window.document.head.prepend(link)
        },
        getAuthName () {
            this.$api.getAuthName().then(res => {
                window.top.document.title = res?.data?.data || this.config?.titleConfig?.platName || ''
            }).catch(err => {
                console.log(err)
                window.top.document.title = this.config?.titleConfig?.platName || ''
            })
        },
        getMenus () {
            this.loading = true
            this.$api
                .GetMenus()
                .then(res => {
                    let { code, data, message } = res?.data || {}
                    if (code === 200) {
                        if (data) {
                            data = this.filterPCMenu(data || [])
                            this.setMenuBackgroundColor(data)
                            data.forEach((group, index) => {
                                this.traverse(group, index)
                            })
                            this.allMenus = data
                            window.sessionStorage.asideList = JSON.stringify(this.allMenus)
                        }
                    } else {
                        if (message) {
                            this.$message({
                                type: 'error',
                                title: message
                            })
                        }
                    }
                })
                .catch(er => {
                    console.log(er)
                }).finally(() => {
                    this.loading = false
                })
        },

        filterPCMenu (menus) {
            let newarr = [];
            menus.forEach(element => {
                let menuItem = {}
                if (element.menuOwner == 0 || element.menuOwner == 1) { // 判断条件
                    menuItem = {
                        ...element,
                        children: element.children ? [] : null
                    }
                    newarr.push(menuItem)
                }
                if (element.children && element.children.length > 0) {
                    let redata = this.filterPCMenu(element.children);
                    menuItem.children = redata.length ? redata : null
                }
            });
            return newarr;
        },
        setMenuBackgroundColor (list) {
            let colorIndex = 0
            let length = menuColorList.length
            list.forEach(menuItem => {
                if (colorIndex + 1 > length) {
                    colorIndex = 0
                }
                menuItem.backgroundColor = menuColorList[colorIndex]
                if (menuItem.children) {
                    this.setMenuBackgroundColor(menuItem.children)
                }
                colorIndex++
            })
        },
        traverse (data, index) {
            if (data && !data.route && data.children) {
                for (let item of data.children) {
                    this.traverse(item, index)
                }
            } else {
                if (/^http/.test(data.route)) {
                    if (!data.route.includes('target=_blank')) {
                        let route = `/Index/jumpIframe/custom/${data.name}?outerLink=true`
                        this.outerLinkMap[route] = data.route
                        data.route = route
                    }
                }
                this.routesMap[data.route] = index
                this.routesToName[data.route] = data.name
            }
        },

        resetMenu (data) {
            // 判断是否重新获取菜单
            if (data.setMenu) {
                this.getMenus()
            }
        }
    }
}
