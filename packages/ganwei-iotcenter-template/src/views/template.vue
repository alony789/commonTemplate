<template>
    <div class="template">
        模板开发
    </div>
</template>
<script>
export default {
    mounted () {
        this.getSystemInfo()
    },
 methods: {
    getSystemInfo () {
            this.$api.getSystemInfo().then(rt => {
                let result = rt?.data?.data
                if (rt?.status == 200) {
                    let infoList = []
                    if(result?.systemPlatformInfo) {
                        infoList.push({
                            title: JSON.parse(result?.systemPlatformInfo).Item1,
                            value: JSON.parse(result?.systemPlatformInfo).Item2.slice(0)
                        })
                    }
                    if(result?.getApplicationRunInfo) {
                        infoList.push({
                            title: JSON.parse(result?.getApplicationRunInfo).Item1,
                            value: JSON.parse(result?.getApplicationRunInfo).Item2.slice(0)
                        })
                    }
                    if(result?.getSystemRunEvnInfo) {
                        infoList.push({
                            title: JSON.parse(result?.getSystemRunEvnInfo).Item1,
                            value: JSON.parse(result?.getSystemRunEvnInfo).Item2.slice(0)
                        })
                    }
                    this.infoList = infoList
                }
            })
        }
 },
};
</script>
<style lang="scss" scoped>
.template {
    color: white;
    background: var(--frame-main-background-4);
}
</style>
