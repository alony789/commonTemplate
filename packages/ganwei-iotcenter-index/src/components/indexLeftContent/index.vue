<template>
    <div :class="{ isCollapse: isCollapse, noIsCollapse: !isCollapse, transition: transition }">
        <!-- 全量菜单 -->
        <div class="maxW maxActive" :class="{ transition: transition }" id="menuRef">
            <div class="aside-header">
                <div class="aside-header-box">
                    <a style="cursor: pointer">
                        <img :src="theme.logo" class="header-top-img" alt="" v-if="theme.logo" @error="showImg" />
                    </a>
                </div>
            </div>
            <div class="left-nav" @click.stop>
                <el-row class="list">
                    <div class="max">
                        <el-input v-model="menuSearch" @keyup.enter="searchMenu"
                            :placeholder="$t('login.framePro.tips.inputMenuName')" clearable>
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <search />
                                </el-icon>
                            </template>
                        </el-input>
                        <el-menu ref="menu" :router="false" :default-active="menuActive" :collapse="false"
                            :collapse-transition="false" unique-opened>
                            <loading v-if="loading"></loading>
                            <asideMenu v-else v-for="item in renderMenu" :data="item" :key="item.resourceId">
                            </asideMenu>
                        </el-menu>
                    </div>
                </el-row>
                <div class="fold">
                    <div @click.stop.prevent="onAsideListShow()">
                        <el-button>
                            <i
                                :class="isCollapse ? 'iconfont icon-caidan_zhankai cacelmargin' : 'iconfont icon-caidan_zhankai isopen'"></i>
                        </el-button>
                        <span>{{ $t('login.menuJson.closeNavigationBar') }}</span>
                    </div>
                </div>
            </div>

            <widthSetting custom @resizeEnd="resizeEnd" v-if="!isCollapse" leftSide="menuRef" rightSide="contentRef">
            </widthSetting>
        </div>

        <!-- 缩放菜单 -->
        <div class="maxW minActive" :class="{ transition: transition }">
            <div class="topIndexHeader"></div>
            <div class="minActiveContent">
                <div class="aside-header">
                    <div class="aside-header-box">
                        <a style="cursor: pointer">
                            <img class="min-img" :src="config.img.indexSmallImg" alt />
                        </a>
                    </div>
                </div>
                <div class="left-nav" @click.stop>
                    <!-- 新版导航菜单 -->
                    <el-row class="list">
                        <div class="max">
                            <el-menu ref="menu" :router="false" :default-active="menuActive" :collapse="true"
                                :collapse-transition="false" unique-opened>
                                <asideMenu :isCollapse="isCollapse" v-for="item in renderMenu" :data="item"
                                    :key="item.resourceId"> </asideMenu>
                            </el-menu>
                        </div>
                    </el-row>
                    <div class="fold">
                        <div @click.stop.prevent="onAsideListShow()">
                            <el-button>
                                <i
                                    :class="isCollapse ? 'iconfont icon-caidan_zhankai cacelmargin' : 'iconfont icon-caidan_zhankai isopen'"></i>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index"></script>

<style src="./index.scss" scoped></style>
