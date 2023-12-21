<template>
    <div>
        <img id="contentFullScreen" :src="theme.contentFullScreen" alt=""
            @click.stop.prevent="getContentFullscreen(true)" />
    </div>
</template>

<script src="./index.js"></script>
