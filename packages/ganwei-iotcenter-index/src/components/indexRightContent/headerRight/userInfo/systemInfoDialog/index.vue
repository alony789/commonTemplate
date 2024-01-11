<template>
    <el-dialog :title="$t('login.framePro.title.dialogSystemInfoTitle')" class="systemInformation_main"
        v-model="dialogVisible" :before-close="closeDialog" width="600px" top="15vh" center>
        <div class="systemInformation">
            <!-- <header>系统运行信息</header> -->
            <div class="information_box">
                <div v-for="(item, index) in infoList" :key="index">
                    <p class="inform_title">{{ item.title }}</p>
                    <div class="inform_msg">
                        <p class="inform_link" v-for="(items, indexs) in item.value" :key="indexs">
                            <span class="inform_nm">{{ items.Key }}</span>
                            <span :title="items.Value" class="inform_value">{{ items.Value }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style src="./index.scss"></style>
