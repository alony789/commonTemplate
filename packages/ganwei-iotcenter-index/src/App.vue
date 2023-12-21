<template>
    <div class="app">
        <el-config-provider :locale="locale">
            <router-view v-cloak v-if="isShow" />
        </el-config-provider>
    </div>
</template>

<script>
import muduleObserve from 'gw-base-utils-plus/moduleObserve'
import judgePermission from './mixins/judgePermission'
export default {
    mixins: [judgePermission, muduleObserve],
    name: 'App',
    data () {
        return {}
    },
    mounted () {

        let style = window.localStorage.theme
        window.document.documentElement.setAttribute('data-theme', style || 'dark')
    }
}
</script>

<style>
html {
    height: 100%;
    --left: calc(var(--maxActiveWidth) + 10);
    --maxActiveWidth: 220;
    --result: calc(var(--maxActiveWidth) - 64);
}

html body {
    height: 100%;
    font-family: 'Microsoft YaHei';
    overflow: hidden;
}

a:focus,
input:focus,
p:focus,
div:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html body div {
    box-sizing: border-box;
}

.app,
#app {
    height: 100%;
    overflow: hidden;
}
</style>
