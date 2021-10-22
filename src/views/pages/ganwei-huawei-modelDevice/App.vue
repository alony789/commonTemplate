<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
}
.flex {
    display: flex;
}
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.flex-end-center {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.flex-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.w100 {
    width: 100%;
}
.wh100 {
    width: 100%;
    height: 100%;
}
.line1 {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.el-tooltip__popper {
    width: 500px;
    background-color: rgb(37, 40, 51) !important;
    color: #f0f4ff !important;
}
.el-tooltip__popper {
    width: 300px;
}
</style>
