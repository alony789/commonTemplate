<template>
    <el-main class="container-main">
        <el-tabs @contextmenu.prevent="openContextMenu($event)" v-model="editableTabsValue" type="card" closable
            @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="(item, index) in editableTabs" :key="item.route" :label="item.title"
                :disabled="item.disabled" :name="item.name">
                <template v-slot:label>
                    <el-icon v-if="!item.disabled && item.title == refreshName" @click.stop.prevent="refreshTab(index)"
                        :class="{ active: isActive }">
                        <RefreshRight />
                    </el-icon>
                    <el-icon v-if="item.disabled" class="is-loading">
                        <Loading />
                    </el-icon>
                    <span>{{ item.title }}</span>
                </template>
                <Suspense>
                    <router-view v-slot="{ Component }" :key="item.route" :editableTabs="editableTabs"
                        :editableTabsValue="editableTabsValue">
                        <component :ref="item.route" :is="Component" />
                    </router-view>
                </Suspense>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
