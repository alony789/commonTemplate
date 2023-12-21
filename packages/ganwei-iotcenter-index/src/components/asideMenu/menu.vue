<template>
    <div v-if="data.menuOwner !== 2">
        <el-sub-menu v-if="data.nodeType == 1" :key="data.resourceId + 'el-sub-menu'" :index="String(data.resourceId)">
            <template #title>
                <div class="iconBox" :style="{ backgroundColor: data.backgroundColor }" v-if="data.backgroundColor">
                    <i class="iconfont" :class="data.icon
                        ? data.icon
                        : data?.children?.length > 0 && 'icon' in data.children[0]
                            ? data.children[0].icon
                            : ''
                        "></i>
                </div>
                <i v-else class="iconfont" :class="data.icon
                    ? data.icon
                    : data.children.length > 0 && 'icon' in data.children[0]
                        ? data.children[0].icon
                        : ''
                    "></i>
                <el-tooltip :disabled="showToolTip" class="item" effect="dark" ref="tooltip" :content="data.name"
                    placement="right" popper-class="menuOverflowPoper">
                    <span :class="{ mr14: !isCollapse }">{{ data.name }}</span>
                </el-tooltip>
            </template>
            <asideMenu v-for="item in data.children" :data="item" :key="item.resourceId" hasParent>
            </asideMenu>
        </el-sub-menu>
        <el-menu-item :name="data.resourceId" :key="data.resourceId + 'el-menu-item'" :index="data.route"
            @click="changeRoute(data.name, data.route)" v-else-if="data.nodeType == 2">
            <template v-if="isCollapse">
                <el-tooltip class="item" effect="dark" ref="tooltip" :content="data.name" placement="right"
                    popper-class="menuOverflowPoper">
                    <span class="singleCode" v-if="!data.icon">{{ data.name.slice(0, 1) }}</span>
                    <div v-else class="iconBox" :style="{ backgroundColor: data.backgroundColor }">
                        <i class="iconfont" :class="data.icon"></i>
                    </div>
                </el-tooltip>
            </template>
            <template v-else>
                <span v-if="hasParent || !data.icon" class="menuDot"></span>
                <div class="iconBox" :style="{ backgroundColor: data.backgroundColor }" v-else>
                    <i class="iconfont" :class="data.icon"></i>
                </div>
                <el-tooltip :disabled="showToolTip" class="item" effect="dark" ref="tooltip" :content="data.name"
                    placement="right" popper-class="menuOverflowPoper">
                    <span :class="{ mr14: !isCollapse, font16: !hasParent }">{{ data.name }}</span>
                </el-tooltip>
            </template>

        </el-menu-item>
    </div>
</template>
<script>
export default {
    name: 'asideMenu',
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        isCollapse: {
            type: Boolean,
            default: false
        },
        hasParent: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            width: 0,
            showToolTip: true,
            firstMeasure: true
        }
    },
    methods: {
        changeRoute (name, route) {
            this.$bus.emit('jumpUrl', route)
        },
    },
}
</script>

<style lang="scss">
.singleCode {
    width: 25px !important;
    height: 25px !important;
    flex-shrink: 1 !important;
    border-radius: 50%;
    background-color: transparent !important;
    margin-right: 0px !important;
    line-height: 21px !important;
    text-align: center;
}

.font14 {
    font-size: 14px;
}

.font16 {
    font-size: 16px;
}

.iconBox {
    display: inline-block;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

    .iconfont {
        width: auto !important;
        margin-right: 0px !important;
        color: white !important;
        font-size: 14px !important;
    }
}

.mr14 {
    margin-left: 14px;
}

.menuDot {
    display: inline-block;
    height: 3px;
    width: 3px;
    border-radius: 50%;
    background-color: var(--nav-txColor1);
    flex-shrink: 0;
}

.menuOverflowPoper {
    color: var(--nav-txColor1) !important;
}
</style>
