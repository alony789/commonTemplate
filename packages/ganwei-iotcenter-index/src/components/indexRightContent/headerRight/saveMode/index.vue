<template>
    <div class="safeModeBox">
        <span class="safeMode" v-if="safeTipsText"><label :class="'safeMode' + safeMode">{{
            $t(safeTipsText) }}</label>
        </span>
        <div>
            <img v-if="safeMode == 2" :src="`/static/images/index-normalIcon-${theme.value || 'dark'}.svg`" alt=""
                @click.stop.prevent="setSafeMode()" />
            <img v-if="safeMode == 1" :src="`/static/images/index-alarmIcon-${theme.value || 'dark'}.svg`" alt=""
                @click.stop.prevent="setSafeMode()" />
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style src="./index.scss"></style>
