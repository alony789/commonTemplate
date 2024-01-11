<template>
    <div class="userInfo">
        <el-dropdown class="index-header-right">
            <el-avatar :src="theme.user" shape="square"></el-avatar>
            <i class="iconfont icon-xialasanjiao"></i>
            <template #dropdown>
                <el-dropdown-menu style="padding: 10px">
                    <div class="user">
                        <el-avatar :src="theme.user" shape="square"></el-avatar>
                        <span>{{ loginUsername }}</span>
                    </div>
                    <p @click.stop.prevent="openDialog('showSystemInfoDialog')" type="default" style="cursor: pointer">
                        <i class="iconfont icon-xitongxinxi"></i>
                        {{ $t('login.framePro.title.dialogSystemInfoTitle') }}
                    </p>
                    <p @click.stop.prevent="openDialog('showPWEditDialog')" type="default" style="cursor: pointer">
                        <i class="iconfont icon-xiugaimima"></i>
                        {{ $t('login.framePro.title.dialogChangePasswordTitle') }}
                    </p>
                    <p @click.stop.prevent="openDialog('showLogoutDialog')" type="default" style="cursor: pointer">
                        <i class="iconfont icon-tuichudenglu"></i>
                        {{ $t('login.framePro.button.exitLogin') }}
                    </p>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <logoutDialog :showDialog="showLogoutDialog" @closeDialog="closeDialog('showLogoutDialog')" />
        <PWEditDialog :passwordPolicy="passwordPolicy" :showDialog="showPWEditDialog"
            @closeDialog="closeDialog('showPWEditDialog')" />
        <systemInfoDialog :showDialog="showSystemInfoDialog" @closeDialog="closeDialog('showSystemInfoDialog')" />
    </div>
</template>
<script src="./index.js"></script>
<style src="./index.scss"></style>
