<template>
    <div v-loading="groupLoad" class="jumpIframeContainer">
        <iframe :src="url" frameborder="0" id="jumpIframe" ref="jumpIframe"></iframe>
    </div>
</template>
<script>

import exportHistory from 'gw-base-utils/historyExport'
export default {
    mixins: [exportHistory],
    data () {
        return {
            url: '',
            groupLoad: true
        }
    },

    mounted () {
        let devSrc = process.env.NODE_ENV_ALL == 'debugAll' ? process.env.PAGE_ENV : '';
        let packageSrc = process.env.NODE_ENV == 'development' ? devSrc + '/' : ''
        let queryVal = this.$route.query.systemName ? ('?systemName=' + this.$route.query.systemName) : '';
        this.url = this.$router.currentRoute.path.replace('/Index/jumpIframe/', '');
        this.url.indexOf('.html') != -1 ? (this.url = packageSrc + this.url + queryVal) : (this.url = packageSrc + this.url.replace('/', '/#/') + queryVal);

        if (this.$route.fullPath.indexOf('topologyList') > -1) {
            this.url = this.url + '?' + this.$route.fullPath.split('?')[1];
        }

        let iframe = document.getElementById('jumpIframe');
        iframe.onload = () => {
            this.groupLoad = false;
            $('#jumpIframe').css('padding', '0px').contents().find('#app').css('padding', '0px 16px');
            let theme = localStorage.getItem('theme');
            iframe.contentWindow.document.documentElement.setAttribute('data-theme', theme)
        };

    },
    watch: {
        $route (to, from) {
            this.url = to.path.replace('/Index/jumpIframe/', '').replace('/', '/#/');
        }
    }
}

</script>
<style lang="scss">
.jumpIframeContainer {
    width: 100%;
    height: 100%;
}
#jumpIframe {
    width: 100%;
    height: calc(100% - 2px);
    overflow: hidden;
    border: none;
    padding: 0px 16px;
}
</style>
