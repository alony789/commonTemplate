<template>
    <div>
        <a></a>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: ''
        }
    },
    mounted () {
        this.ssoLogout();
    },
    methods: {
        async ssoLogout() {
            await this.Axios({
                methed: 'get',
                url: 'static/json/config.json'
            }).then((res) => {
                if (res.status == 200 && res.data && res.data.ssoLogin) {
                    this.url = res.data.ssoLogin.url;
                    window.location.href = this.url;
                } else {
                    this.errorTxt = '获取配置信息异常，请联系平台运维人员处理~';
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>