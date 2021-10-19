<template>
    <div v-loading="groupLoad" class="jumpIframeContainer">
        <iframe :src="url" frameborder="0" id="jumpIframe">
        </iframe>
    </div>
</template>
<script>
import * as signalR from '@aspnet/signalr';
export default {
    data () {
        return {
            url: '',
            groupLoad: true
        }
    },

    mounted () {

        let id = this.$router.currentRoute.params.id;

        if (this.$route.fullPath.indexOf('topologyList') > -1) {
            this.url = '/#/Indexall/' + id + '?' + this.$route.fullPath.split('?')[1];
        } else {
            let queryVal = this.$route.query.systemName ? ('?systemName=' + this.$route.query.systemName) : '';
            this.url = '/#/Indexall/' + id + queryVal;
        }



        let iframe = document.getElementById('jumpIframe');
        let that = this;
        iframe.onload = function () {
            that.groupLoad = false;
            // $('#jumpIframe').css('padding', '0px').contents().find('#app').css('padding', '0px 16px');
        };


        // 历史曲线导出

        if (this.exportSignalrConnection) {
            this.exportSignalrConnection.stop()
        }
        this.exportSignalrConnection = null;
        this.exportSignalrConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.$api.getSignalrHttp() + '/downFileNotify', {})
            .build();
        this.exportSignalrConnection.start().then(() => { console.log('链接成功'); }).catch(function (ex) {
            console.log('connectHub 连接失败' + ex);
        });
        window.clearInterval(sessionStorage.exportTimer);
        sessionStorage.exportTimer = null;
        sessionStorage.removeItem('exportOut');
        sessionStorage.exportOut = null;

        this.exportSignalrConnection.off('downloadUrl');
        this.exportSignalrConnection.on('downloadUrl', res => {
            if (res) {
                sessionStorage.getDownloadStatus = 'true'
                if (sessionStorage.exportTimes && Number(sessionStorage.exportTimes) > 7) {
                    this.$message.warning(this.$t('publics.warnings[5]'));
                    setTimeout(() => {
                        let link = document.createElement('a');
                        link.style.display = 'none';
                        link.href = res;
                        document.body.appendChild(link);
                        link.click();
                    }, 2000);
                } else {
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = res;
                    document.body.appendChild(link);
                    link.click();
                }
                if (sessionStorage.exportOut) {
                    window.clearTimeout(sessionStorage.exportOut)
                    sessionStorage.exportOut = null;
                    sessionStorage.removeItem('exportOut')
                }
                sessionStorage.exportOut = setTimeout(() => {
                    if (sessionStorage.getItem('exportTimes')) {
                        sessionStorage.removeItem('exportTimes')
                    }
                    sessionStorage.getDownloadStatus = 'false'
                }, 3000);


            }
        });

        this.exportSignalrConnection.off('downloadError');
        this.exportSignalrConnection.on('downloadError', res => {
            if (res) {
                this.$message.warning(res);
                sessionStorage.getDownloadStatus = 'error'
            }
        });

    },
    methods: {
        toRouter () {
            alert(123);
        }
    },
    watch: {
        $route (to, from) {
            try {
                let id = to.path.split('/')[4];
                this.url = '/#/Indexall/' + id;
            } catch (e) {

            }
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
