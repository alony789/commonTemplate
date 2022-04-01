<template>
    <div class="maintain">
        <div class="loginBg">
            <img :src="require('./Images/login.jpg')" alt />
        </div>

        <div class="default">
            <el-form ref="DefaultForm" :model="DefaultForm" :rules="FormRules" v-show="firstLogin" @submit.native.prevent>
                <el-form-item>
                    <h3>请输入随软件附赠的默认密码</h3>
                </el-form-item>
                <el-form-item label="默认密码" prop="DefaultPassword" :label-width="labelWidth">
                    <el-input v-model.trim="DefaultForm.DefaultPassword" onkeyup="this.value=this.value.replace(/\s+/g,'')" autocomplete="off" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="InputPassword" :label-width="labelWidth">
                    <el-input v-model.trim="DefaultForm.InputPassword" onkeyup="this.value=this.value.replace(/\s+/g,'')" autocomplete="off" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认管理员密码" prop="confirmAdminPwd" :label-width="labelWidth">
                    <el-input v-model.trim="DefaultForm.confirmAdminPwd" onkeyup="this.value=this.value.replace(/\s+/g,'')" autocomplete="off" type="password" @keyup.enter.native="confirm('firstLogin', 'DefaultForm')"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" size="small" @click.stop="confirm('firstLogin', 'DefaultForm')" :loading="firstLoading">确 定</el-button>
                </el-form-item>
            </el-form>

            <el-form ref="testForm" :model="testForm" :rules="FormRules" v-show="secondLogin" @submit.native.prevent>
                <el-form-item>
                    <h3>请输入您设置的管理员密码</h3>
                </el-form-item>
                <el-form-item label="管理员密码" prop="password" :label-width="labelWidth">
                    <el-input v-model.trim="testForm.password" onkeyup="this.value=this.value.replace(/\s+/g,'')" autocomplete="off" type="password" @keyup.enter.native="confirm('secondLogin', 'testForm')">
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" size="small" @click.stop="confirm('secondLogin', 'testForm')" :loading="secondLoading">确 定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import multipleAccess from "./js/maintenanceInfo.js";
export default multipleAccess;
</script>
<style scoped lang="scss" src="./css/maintenanceInfo.scss"></style>