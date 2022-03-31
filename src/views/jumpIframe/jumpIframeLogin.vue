<template>
    <div class="jumpIframeContainers">
        <iframe :src="url" frameborder="0" class="jumpIframes" ref="jumpIframe"></iframe>
    </div>
</template>
<script>

export default {
    data () {
        return {
            url: ''
        }
    },
    created () {
        sessionStorage.languageSet = 'zh-CN'
        this.$i18n.locale = 'zh-CN'
        // 中英文暂时接口未迁移，后期接口迁移再恢复
        // this.getLanguageLogos();
    },
    mounted () {
        let packageSrc = process.env.NODE_ENV == 'development' ? process.env.PAGE_ENV + '/' : '/'
        let queryVal = this.$route.query.systemName ? ('?systemName=' + this.$route.query.systemName) : '';
        this.url = this.$router.currentRoute.path.replace('/jumpIframeLogin/', '');
        this.url.indexOf('.html') != -1 ? (this.url = packageSrc + this.url + queryVal) : (this.url = packageSrc + this.url.replace('/', '/#/') + queryVal);
        window.sessionStorage.removeItem('menuActiveName');
        window.sessionStorage.removeItem('menuActive');
    },

    methods: {
        // 读取中英文状态
        getLanguageLogos () {
            this.$api
                .getLanguageLogo()
                .then((rt) => {
                    if (rt.data.code === 200) {
                        this.$i18n.locale = rt.data.data.language
                        sessionStorage.languageSet = rt.data.data.language
                    } else {
                        this.$message.error(rt.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
}

</script>
<style lang="scss" scoped>
.jumpIframeContainers {
    width: 100%;
    height: 100%;
    position: relative;
}
.jumpIframes {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: none;
    padding: 0 !important;
}
</style>
