<template>
    <div v-loading="groupLoad" class="jumpIframeContainer">
        <iframe :src="url" frameborder="0" id="jumpIframe" ref="jumpIframe"></iframe>
    </div>
</template>
<script>
import * as signalR from '@aspnet/signalr';
export default {
    data () {
        return {
            url: '',
            groupLoad: true,
            exportSignalrConnection: null,
            haveDataDwonload: false,
            exportTimer: null,
            exportTimes: 0,
            alreadyExport: true
        }
    },

    mounted () {
        let packageSrc = process.env.NODE_ENV == 'development' ? process.env.PAGE_ENV + '/' : ''
        let queryVal = this.$route.query.systemName ? ('?systemName=' + this.$route.query.systemName) : '';
        this.url = this.$router.currentRoute.path.replace('/Index/jumpIframe/', '');
        this.url.indexOf('.html') != -1 ? (this.url = packageSrc + this.url + queryVal) : (this.url = packageSrc + this.url.replace('/', '/#/') + queryVal);

        if (this.$route.fullPath.indexOf('topologyList') > -1) {
            this.url = this.url + '?' + this.$route.fullPath.split('?')[1];
        }
        let that = this
        window.onmessage = function (e) {
            that.curveSignalR(e)
        }

        // window.addEventListener('message', this.curveSignalR(e));

        let iframe = document.getElementById('jumpIframe');
        iframe.onload = () => {
            this.groupLoad = false;
            $('#jumpIframe').css('padding', '0px').contents().find('#app').css('padding', '0px 16px');
            let theme = localStorage.getItem('theme');
            iframe.contentWindow.document.documentElement.setAttribute('data-theme', theme)
        };

    },
    methods: {
        curveSignalR (e) {
            if (e.data.openCurveLink && !this.haveDataDwonload) {
                if (!this.haveDataDwonload) {
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
                    window.clearInterval(this.exportTimer);
                    this.exportTimer = null;

                    // sessionStorage.removeItem('exportOut');
                    // sessionStorage.exportOut = null;

                    // 判断连接状态
                    this.exportSignalrConnection.off('connectionSucceeded');
                    this.exportSignalrConnection.on('connectionSucceeded', (res) => {
                        if (res) {
                            let data = JSON.parse(e.data.exportData);
                            this.exportCurve(data);
                        }
                    })

                    this.exportSignalrConnection.off('downloadUrl');
                    this.exportSignalrConnection.on('downloadUrl', res => {
                        if (res) {
                            sessionStorage.getDownloadStatus = 'true'
                            if (this.exportTimes && Number(this.exportTimes) > 7) {
                                this.$message.warning(this.$t('publics.warnings[5]'));
                                setTimeout(() => {
                                    let link = document.createElement('a');
                                    link.style.display = 'none';
                                    link.href = res;
                                    document.body.appendChild(link);
                                    link.click();
                                    this.haveDataDwonload = false;
                                    if (this.exportSignalrConnection) {

                                        this.exportSignalrConnection.stop()
                                    }
                                    this.exportSignalrConnection = null

                                }, 2000);
                                this.alreadyExport = true
                            } else {
                                let link = document.createElement('a');
                                link.style.display = 'none';
                                link.href = res;
                                document.body.appendChild(link);
                                link.click();
                                this.haveDataDwonload = false
                                this.alreadyExport = true
                                if (this.exportSignalrConnection) {

                                    this.exportSignalrConnection.stop()
                                }
                                this.exportSignalrConnection = null
                            }

                            // if (sessionStorage.exportOut) {
                            //     window.clearTimeout(sessionStorage.exportOut)
                            //     sessionStorage.exportOut = null;
                            //     sessionStorage.removeItem('exportOut')
                            // }
                            // sessionStorage.exportOut = setTimeout(() => {
                            //     if (sessionStorage.getItem('exportTimes')) {
                            //         sessionStorage.removeItem('exportTimes')
                            //     }
                            //     sessionStorage.getDownloadStatus = 'false'
                            // }, 3000);

                            document.getElementById('jumpIframe').contentWindow.postMessage({ exportYes: true })

                            window.clearInterval(this.exportTimer);
                            this.exportTimer = null;
                            this.exportTimes = 0;

                            //

                        }
                    });

                    this.exportSignalrConnection.off('downloadError');
                    this.exportSignalrConnection.on('downloadError', res => {
                        if (res) {
                            this.$message.warning(res);
                            sessionStorage.getDownloadStatus = 'error'
                        }
                    });
                } else {
                    this.$message.warning('已有历史曲线数据正在处理！')
                }

            }
        },
        exportCurve (data) {
            this.$api.exportCurve(data).then(res => {
                if (res.data.code === 200) {
                    this.alreadyExport = false
                    this.haveDataDwonload = true;
                    if (this.exportTimer) {
                        window.clearInterval(this.exportTimer);
                        this.exportTimer = null;
                    }
                    this.exportTimer = setInterval(() => {
                        this.exportTimes = Number(this.exportTimes) + 1;

                        // if (sessionStorage.getDownloadStatus == 'true' || sessionStorage.getDownloadStatus == 'error') {
                        //     window.clearInterval(this.exportTimer);
                        //     this.exportTimer = null;
                        // }
                        if (this.exportTimes == 5 && this.$route.path.indexOf('equipListsIot') != -1 && !this.alreadyExport) {
                            console.log(this.alreadyExport);
                            this.$message.warning(this.$t('publics.warnings[2]'));
                        }
                    }, 1000);

                } else {
                    this.$message.warning(res.data.message);
                }
            }).catch(err => {
                console.log(err);
            })
        }
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
