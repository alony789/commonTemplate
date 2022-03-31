<template>
    <div v-loading="groupLoad" class="jumpIframeContainer">
        <!-- <div class="jumpIframeContainer"> -->
        <iframe :src="url" frameborder="0" class="jumpIframe" ref="jumpIframe"></iframe>
        <!-- <el-skeleton :loading="loading" :rows="20" v-if="loading" animated class="ske-box">
            <template slot="template">
                <el-skeleton-item variant="image" style="width: 400px; height: 267px;" />
                <div style="padding: 14px;">
                    <el-skeleton-item variant="h3" style="width: 50%;" />
                    <div style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;">
                        <el-skeleton-item variant="text" style="margin-right: 16px;" />
                        <el-skeleton-item variant="text" style="width: 30%;" />
                    </div>
                </div>
            </template>
        </el-skeleton> -->
    </div>
</template>
<script>

import exportHistory from 'gw-base-utils-plus/historyExport'
export default {
    mixins: [exportHistory],
    data () {
        return {
            url: '',
            groupLoad: true,
            // loading: true
        }
    },
    mounted () {
        window.onmessage = (e) => {
            this.curveSignalR(e)
            if (e.data && typeof e.data == 'object' && 'setMenu' in e.data) {
                // 传递被删除的菜单项的route到Index组件中
                this.$emit("setMenu", { route: e.data.route, setMenu: e.data.setMenu });
            }
        }

        let packageSrc = process.env.NODE_ENV == 'development' ? process.env.PAGE_ENV + '/' : '/'
        let queryVal = this.$route.query.systemName ? ('?systemName=' + this.$route.query.systemName) : '';
        this.url = this.$router.currentRoute.path.replace('/Index/jumpIframe/', '');
        if (process.env.NODE_ENV == 'development' && process.env.FILES_ENV && process.env.FILES_ENV.moduleList && process.env.FILES_ENV.moduleList.indexOf(this.url.split('/')[0]) == -1) {
            this.url = './src/views/pages/ganwei-iotcenter-login/#/Login'
        } else {
            this.url.indexOf('.html') != -1 ? (this.url = packageSrc + this.url + queryVal) : (this.url = packageSrc + this.url.replace('/', '/#/') + queryVal);

            if (this.$route.fullPath.indexOf('topologyList') > -1) {
                this.url = this.url + '?' + this.$route.fullPath.split('?')[1];
            }
        }

        let arr = document.getElementsByClassName('jumpIframe');
        let iframe = arr[arr.length - 1];
        iframe.onload = () => {
            let loadArr = iframe.contentWindow.document.getElementsByClassName('el-loading-mask');
            for (let i = 0; i < loadArr.length; i++) {
                loadArr[i].style.setProperty('visibility', 'visible', 'important');
            }

            this.groupLoad = false;
            // this.loading = false;

            iframe.style.padding = '0px';
            let innerIframe = iframe.contentWindow.document;
            innerIframe.getElementById('app').style.padding = '0px 20px 20px';

            // $('.jumpIframe').css('padding', '0px').contents().find('#app').css('padding', '0px 20px 20px');
            let theme = localStorage.getItem('theme');
            iframe.contentWindow.document.documentElement.setAttribute('data-theme', theme)
        };

    },
    watch: {
        $route (to, from) {
            if (sessionStorage.isTab == 'false') {
                this.url = to.path.replace('/Index/jumpIframe/', '').replace('/', '/#/');
            }
        }
    }
}

</script>
<style lang="scss">
.jumpIframeContainer {
    width: 100%;
    height: 100%;
    position: relative;
}
.jumpIframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: none;
    padding: 0px 16px;
}
.ske-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% + 28px);
    @include background_color('con-bgColor3');
    z-index: 999;
    .el-skeleton {
        height: 100%;
    }
}
</style>
