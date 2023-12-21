<template>
    <div>
        <img v-if="n % 2 == 0" :src="theme.fullScreen" alt="" @click.stop.prevent="getFullCreeen()" />
        <img v-else :src="theme.outFullScreeen" @click.stop.prevent="getFullCreeen()" alt="" />
    </div>
</template>

<script src="./index.js"></script>
