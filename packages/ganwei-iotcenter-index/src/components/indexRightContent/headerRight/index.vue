<template>
    <div class="header-right">
        <saveMode />
        <fullScreen />
        <contentFullScreen />
        <unReadMessages />
        <switchTheme v-if="config.showSwitchTheme" />
        <userInfo />
        <isDebug />
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
