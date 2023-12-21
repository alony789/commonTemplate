<template>
    <div class="app">
        <el-config-provider :locale="locale">
            <router-view v-cloak v-if="isShow" />
        </el-config-provider>
    </div>
</template>
<script>
import muduleObserve from 'gw-base-utils-plus/moduleObserve'
import setDefaultLanguage from './mixins/setDefaultLanguage'
export default {
    mixins: [muduleObserve, setDefaultLanguage],
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
#app {
    width: 100%;
    height: 100%;
}

.el-select-dropdown {
    background-color: #fff;
    border: none !important;

    .el-select-dropdown__item {
        color: #333 !important;
    }
}

.el-message {
    background-color: #fff;
    border-color: #fff;
}

.el-popper .el-popper__arrow::before,
.el-select__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow::before {
    border-color: white !important;
    background-color: white !important
}

::-webkit-scrollbar-thumb {
    background-color: #e1e3e6 !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: black;
}

.el-message-box {
    background-color: white !important;

    .el-message-box__title,
    .el-message-box__message {
        color: #333 !important;
    }
}
</style>
