<template>
    <div class="mainInfo">
        <!-- <video autoplay loop muted>
            <source :src="url" type="video/mp4" />
        </video> -->
        <div class="loginBg">
            <img :src="require('./Images/login.jpg')" alt />
        </div>

        <el-form ref="licenseForm" :model="licenseForm" class="license">
            <el-form-item label="注册码" prop="registrationCode" :label-width="labelWidth">
                <el-input v-model="licenseForm.registrationCode" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="许可状态" prop="licenseStatus" :label-width="labelWidth">
                <el-input v-model="licenseForm.licenseStatus" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="上传许可" prop="file" :label-width="labelWidth">
                <el-upload class="upload-demo" ref="upload" action="" :limit="1" accept=".shd" :file-list="licenseForm.file" :on-change="fileListChange" :on-remove="fileListremove" :auto-upload="false">
                    <el-button slot="trigger" size="small" icon="el-icon-upload2">选择.SHD文件</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="服务状态" prop="serviceStatus" :label-width="labelWidth">
                <el-input v-model="licenseForm.serviceStatus" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button size="small" type="primary" @click="DownLoadXlog">下载日志</el-button>
                <el-button size="small" type="primary" @click="changeEvents" v-if="!isInitSate">初始化</el-button>
                <el-button size="small" type="primary" @click="changeEvents" v-else>更新许可</el-button>
            </el-form-item>
        </el-form>

        <el-dialog :title='dialogTitle' :visible.sync="loadingDialogVisible" center :show-close="false" :close-on-click-modal="false" class="loadingModal">
            <el-progress :percentage="percentage"></el-progress>
        </el-dialog>
    </div>
</template>

<script>
import mainInfo from "./js/mainInfo.js";
export default mainInfo;
</script>
<style scoped lang="scss" src="./css/mainInfo.scss"></style>