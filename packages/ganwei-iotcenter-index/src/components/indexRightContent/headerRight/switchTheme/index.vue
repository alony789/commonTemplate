<template>
    <el-dropdown>
        <div class="themeImage" style="margin-right: 0px">
            <img :src="theme.skin" alt="" />
        </div>
        <template #dropdown>
            <el-dropdown-menu class="themeChange">
                <template v-if="config.theme.supportThemes.length > 2">
                    <p v-for="themes in config.theme.supportThemes" :key="themes.value" @click="checkStyle(themes.value)"
                        :class="{ actived: themes.value == theme.value }">
                        <span class="theme-color" :style="{ background: themes.color }"></span>
                        {{ $t('login.framePro.theme.supportThemes.' + theme.value) }}
                    </p>
                </template>
                <template v-else>
                    <el-radio-group v-model="theme.value" class="switch" @change="checkStyle">
                        <el-radio-button v-for="theme in config.theme.supportThemes" :label="theme.value"
                            :key="theme.value">
                            <i class="iconfont" :class="theme.icon"></i>
                            {{ $t('login.framePro.theme.supportThemes.' + theme.value) }}
                        </el-radio-button>
                    </el-radio-group>
                </template>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script src="./index.js"></script>
<style src="./index.scss"></style>