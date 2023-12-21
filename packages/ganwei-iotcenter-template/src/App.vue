<template>
    <div class="app">
        <el-config-provider :locale="locale">
            <router-view v-cloak v-if="isShow" />
        </el-config-provider>
    </div>
</template>
<script>
import muduleObserve from 'gw-base-utils-plus/moduleObserve'
export default {
    mixins: [muduleObserve],
    name: 'App',
    data () {
        return {};
    },
    mounted () {
        document.documentElement.setAttribute('data-theme', localStorage.theme || 'dark')
        document.documentElement.setAttribute('class', localStorage.theme || 'dark')
    }
};
</script>
<style lang="scss">
html,
body,
#app,
.app {
    width: 100%;
    height: 100%;
}
</style>
