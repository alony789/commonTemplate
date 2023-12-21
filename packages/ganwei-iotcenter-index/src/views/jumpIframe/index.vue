
<template>
    <div class="jumpPage">
        <loading v-show="loading"></loading>
        <iframe v-if="name != 'noPage' && isHasPage" :id="name" :src="path" width="100%" height="100%"></iframe>
        <noPage v-if="name == 'noPage'"></noPage>
    </div>
</template>
<script>
import noPage from '@/components/noAccess/noPage.vue'
export default {
    name: 'MFEJump',
    components: {
        noPage
    },
    inject: ['outerLinkMap'],
    data () {
        return {
            loading: true,
            path: '',
            name: 'MFEJump',
            isHasPage: false,
        };
    },
    created () {
        if (this?.$store?.state?.loadingStatus) {
            this?.$store?.commit("setLoadingStatus", false)
            return;
        }
        this.loadApplication()
    },
    methods: {
        combineQuery () {
            let packageName = this.$route?.params?.packageName;
            let route = this.$route?.params?.route
            let queryArray = Object.entries(this.$route.query);
            let length = queryArray.length
            return (this.$hostMap(packageName) || '') + '/#/' + route + queryArray.reduce((pre, [key, value], currentIndex) => pre + `${key}=${value}${currentIndex == length - 1 ? '' : '&'}`, length ? '?' : '');
        },

        async isFileExist (filePath) {
            let exist = false
            await this.$api.get(filePath).then(res => {
                if (res.status == 200) {
                    exist = true
                } else {
                    exist = false
                }
            }).catch(err => {
                console.log(err)
                exist = false
            })
            return exist
        },

        executeIframeFun (callback) {
            let iframe = document.getElementById(this.name)
            let hasQueue = false
            try {
                // 有些第三方链接，考虑到安全性问题，不允许读取contentWindow内部变量，会报错
                let executeQueues = iframe?.contentWindow?.executeQueues || {}
                Object.keys(executeQueues).forEach(item => {
                    hasQueue = true;
                    executeQueues[item]();
                })
            } catch (error) {
                console.log(error)
            }

            if (callback) {
                if (hasQueue) {
                    setTimeout(() => { callback() }, 500)
                } else {
                    callback()
                }
            }
        },

        async loadApplication () {
            let packageName = this.$route.params.packageName, path = this.combineQuery();
            let asideList = JSON.parse(sessionStorage.asideList || '[]'), menuName = '', packageId = '', route = this.$route?.params?.route || ''
            try {
                if (!path.includes('outerLink=true')) {
                    menuName = route.split('/')[0].split('?')[0]
                    packageId = this.getPackageId(this.$route.path, asideList)
                } else {
                    path = this.outerLinkMap[decodeURIComponent(this.$route.fullPath)]
                }
            } catch (error) {
                console.log(error)
            }
            await this.languageChangeFun(packageName, menuName, packageId, path)
        },

        getPackageId (route, arr) {
            let packageId = ''
            if (arr.length) {
                arr.forEach(item => {
                    if (item.route && item.route.split('?')[0] == route) {
                        packageId = item.packageId
                    }
                    if (!packageId && item.children && item.children.length) {
                        packageId = this.getPackageId(route, item.children)
                    }
                })
            }
            return packageId
        },

        async languageChangeFun (packageName, menuName, packageId, path) {
            let name = ''
            if (packageId) {
                let parameters = `packageId=${packageId}&pluginName=${packageName}&menuName=${menuName}&languageType=${localStorage.languageType}&userName=${sessionStorage.userName}`
                path = path.includes('?') ? `${path}&${parameters}` : `${path}?${parameters}`
                await window.top.getLanguage(packageName, menuName, packageId, this)
            }
            let isExist = true
            if (process.env.NODE_ENV == 'production') {
                isExist = true//await this.isFileExist(`${packageName}/index.html?time=${new Date().getTime()}`)
                if (!isExist) {
                    this.name = 'noPage'
                    this.isHasPage = false
                } else {
                    this.name = path
                    this.isHasPage = true
                }
                name = this.name
                this.path = path
            }
            if (process.env.NODE_ENV == 'development') {
                if (!this.$hostMap(packageName)) {
                    this.name = 'noPage'
                    this.isHasPage = false
                    this.$notify({
                        title: '提示',
                        message: '请在hostMap.js配置该应用!'
                    });
                } else {
                    this.isHasPage = true;
                    name = path
                    this.name = path;
                    this.path = path;
                }
            }
            this.$nextTick(() => {
                let iframe = document.getElementById(name)
                if (iframe) {
                    iframe.onload = () => {
                        this.loading = false
                    }
                } else {
                    this.name = 'noPage'
                    this.loading = false
                }
            })

        },
    },
};
</script>

<style lang="scss" scoped>
.jumpPage {
    width: 100%;
    height: 100%;
}
</style>
