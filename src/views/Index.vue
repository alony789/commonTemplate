<template>
    <el-container id="index">
        <div class="mask" @click.stop.prevent="onAsideListShow()" :class="{ displayNone: isCollapse }">
            <transition name="draw">
                <el-aside class="maxW" :class="maxWActive">
                    <div class="aside-header">
                        <div class="aside-header-box">
                            <router-link :to="{ path: ' /Index' }">
                                <img v-if="isCollapse" class="min-img" :src="smallImg" alt />
                                <img v-else class="max-img" :src="bigImg" alt />
                            </router-link>
                        </div>
                    </div>
                    <div class="left-nav" @click.stop>
                        <!-- 新版导航菜单 -->
                        <el-row class="list">
                            <div class="historical">
                                <el-dropdown v-if="historicalList.length > 0">
                                    <p class="title">
                                        <i class="iconfont iconlishijilu"></i>
                                        <span v-show="!isCollapse">{{
                                                $t("menuJson.history")
                                            }}</span>
                                    </p>
                                    <el-dropdown-menu style="padding: 10px; margin-top: -5px" slot="dropdown">
                                        <p class="index-historical" @click="onHistorical(item)" v-for="(item, i) in historicalList" :key="i" type="default" style="font-size: 14px; cursor: pointer; padding: 10px 0">
                                            <router-link :to="{ path: item.route }">
                                                <i class="iconfont" :class="item.icon"></i>
                                                <span>{{ $t(item.name) }}</span>
                                            </router-link>
                                        </p>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="max">
                                <div v-for="(itemI, i) in menu" :key="i" :class="{
                                        pcShow:
                                            'menuOwner' in itemI &&
                                            itemI.menuOwner === 1,
                                        appShow:
                                            'menuOwner' in itemI &&
                                            itemI.menuOwner === 2
                                    }">
                                    <!-- 含有二级菜单 -->
                                    <div class="multistage" v-if="itemI.children">
                                        <p v-show="!isCollapse" class="title title-border">
                                            {{ $t(itemI.name) }}
                                        </p>

                                        <div v-for="(itemJ, j) in itemI.children" :key="j" :class="{
                                                pcShow:
                                                    'menuOwner' in itemJ &&
                                                    itemJ.menuOwner === 1,
                                                appShow:
                                                    'menuOwner' in itemJ &&
                                                    itemJ.menuOwner === 2
                                            }">
                                            <!-- 含有三级菜单的二级标题 -->
                                            <div class="three-levels" v-if="
                                                    itemI.children &&
                                                        itemJ.children.length >
                                                            0
                                                ">
                                                <p v-show="!isCollapse" class="title three-levels-title">
                                                    {{ $t(itemJ.name) }}
                                                </p>
                                                <!-- 三级 -->
                                                <p class="title p-hover" :class="{
                                                        'menu-active':
                                                            menuActive ==
                                                            itemK.route
                                                    }" @click.stop.prevent="
                                                        onRouters(
                                                            1,
                                                            itemK,
                                                            itemI,
                                                            itemJ
                                                        )
                                                    " v-for="(itemK,
                                                    k) in itemJ.children" :key="k">
                                                    <router-link :to="{
                                                            path: itemK.route
                                                        }">
                                                        <i v-show="!isCollapse" class="iconfont" :class="itemK.icon"></i>
                                                        <span v-show="!isCollapse">{{
                                                                $t(itemK.name)
                                                            }}</span>
                                                        <el-tooltip v-show="isCollapse" class="item" effect="dark" :content="
                                                                $t(itemK.name)
                                                            " placement="right">
                                                            <el-button>
                                                                <i class="iconfont" :class="
                                                                        itemK.icon
                                                                    "></i>
                                                            </el-button>
                                                        </el-tooltip>
                                                    </router-link>
                                                </p>
                                            </div>

                                            <!-- 不含有三级菜单的二级标题 -->
                                            <div class="multistage-alone" v-else>
                                                <p class="title p-hover" :class="{
                                                        'menu-active':
                                                            menuActive ==
                                                            itemJ.route
                                                    }" @click.stop.prevent="
                                                        onRouters(
                                                            1,
                                                            itemJ,
                                                            itemI
                                                        )
                                                    ">
                                                    <router-link :to="{
                                                            path: itemJ.route
                                                        }">
                                                        <i v-show="!isCollapse" class="iconfont" :class="itemJ.icon"></i>
                                                        <span v-show="!isCollapse">{{
                                                                $t(itemJ.name)
                                                            }}</span>
                                                        <el-tooltip v-show="isCollapse" class="item" effect="dark" :content="
                                                                $t(itemJ.name)
                                                            " placement="right">
                                                            <el-button>
                                                                <i class="iconfont" :class="
                                                                        itemJ.icon
                                                                    "></i>
                                                            </el-button>
                                                        </el-tooltip>
                                                    </router-link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 只有一级菜单 -->
                                    <div v-else class="alone">
                                        <p v-show="
                                                !isCollapse &&
                                                    itemI.title !== '首页'
                                            " class="title title-border">
                                            {{ $t(itemI.name) }}
                                        </p>
                                        <p class="path-name p-hover" :class="{
                                                'menu-active':
                                                    menuActive == itemI.route
                                            }" @click.stop.prevent="
                                                onRouters(1, itemI, itemI)
                                            ">
                                            <router-link :to="{ path: itemI.route }">
                                                <i v-show="!isCollapse" class="iconfont" :class="itemI.icon"></i>
                                                <span v-show="!isCollapse">{{
                                                        $t(itemI.name)
                                                    }}</span>
                                                <el-tooltip v-show="isCollapse" class="item" effect="dark" :content="$t(itemI.name)" placement="right">
                                                    <el-button>
                                                        <i class="iconfont" :class="itemI.icon"></i>
                                                    </el-button>
                                                </el-tooltip>
                                            </router-link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-row>
                        <div class="fold">
                            <div @click.stop.prevent="onAsideListShow()">
                                <el-tooltip class="item" effect="dark" :content="
                                        $t('menuJson.collapseNavigationBar')
                                    " placement="right">
                                    <el-button>
                                        <i :class="
                                                isCollapse
                                                    ? 'iconfont iconcebianlanzhankai cacelmargin'
                                                    : 'iconfont iconcebianlanzhankai'
                                            "></i>
                                    </el-button>
                                </el-tooltip>
                                <span v-show="!isCollapse && isCollapseText">{{
                                        $t("menuJson.closeNavigationBar")
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </el-aside>
            </transition>
        </div>

        <!-- breadcrumb -->
        <el-container>
            <el-header class="indexHeader">
                <a href="#" @click.stop.prevent="onAsideListShow()">
                    <i class="iconfont iconcebianlanzhankai"></i>{{ $t("home.workbench") }}</a>
                <div class="header-right displayNone">
                    <el-avatar>{{ loginUn }}</el-avatar>
                    <el-dropdown class="index-header-right">
                        <span class="el-dropdown-link index-header-right">
                            {{ loginUsername }}
                            <i class="iconfont iconxiajiantou"></i>
                        </span>
                        <el-dropdown-menu style="padding: 10px; margin-top: -10px" slot="dropdown">
                            <p @click.stop.prevent="onSystemOperationInfor()" type="default" style="cursor: pointer; color: #63e03f">
                                {{ this.$t("home.dialog.sysTemInfo") }}
                            </p>
                            <p @click.stop.prevent="showEditPwd" type="default" style="padding: 20px 0; cursor: pointer; color: #2779E6">
                                {{ this.$t("home.dialog.changePassword") }}
                            </p>
                            <p @click.stop.prevent="modal2 = true" type="default" style="cursor: pointer; color: #FF5A65">
                                {{ this.$t("home.dialog.logOut") }}
                            </p>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <i v-if="n % 2 == 0" class="iconfont iconquanping" @click.stop.prevent="getFullCreeen()"></i>
                    <i v-else class="iconfont icontuichuquanping2-copy" @click.stop.prevent="getFullCreeen()"></i>
                </div>

                <div class="header-right pcHide">
                    <el-dropdown class="index-header-right">
                        <span class="el-dropdown-link index-header-right">
                            <el-avatar>{{ loginUn }}</el-avatar>
                            <span class="username">{{ loginUsername }}</span>
                            <i class="iconfont iconxiajiantou"></i>
                        </span>
                        <el-dropdown-menu style="padding: 10px 30px; margin-top: 5px" slot="dropdown">
                            <p @click.stop.prevent="onSystemOperationInfor()" type="default" style="cursor: pointer; color: #63e03f">
                                {{ this.$t("home.dialog.sysTemInfo") }}
                            </p>
                            <p @click.stop.prevent="showEditPwd" type="default" style="padding: 15px 0; cursor: pointer; color: #2779E6">
                                {{ this.$t("home.dialog.changePassword") }}
                            </p>
                            <p @click.stop.prevent="modal2 = true" type="default" style="cursor: pointer; color: #FF5A65">
                                {{ this.$t("home.dialog.logOut") }}
                            </p>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <!-- 系统运行信息 -->
                <el-dialog :title="$t('home.dialog.sysTemInfo')" class="systemInformation_main" :visible.sync="curveShowCurve" @close="onCloseCurve" width="600px" top="10vh" center>
                    <div class="systemInformation">
                        <!-- <header>系统运行信息</header> -->
                        <div class="information_box">
                            <div v-for="(item, index) in infoList" :key="index">
                                <p class="inform_title">{{ item.title }}</p>
                                <div class="inform_msg">
                                    <p class="inform_link" v-for="(items, indexs) in item.value" :key="indexs">
                                        <span class="inform_nm">{{
                                                items.Key
                                            }}</span>
                                        <span :title="items.Value" class="inform_value">{{ items.Value }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-dialog>

                <el-dialog class="editPassword" @close="inspectState" @closed="clearInput" :visible.sync="modal1" width="480px" top="28vh" :close-on-click-modal="false" :show-close="false" center>
                    <div slot="title">
                        <span class="el-dialog__title" style="line-height: 24px;font-size: 18px;">{{$t('home.dialog.changePassword')}}</span>
                        <i style="position: absolute;top: 20px;right: 20px;line-height: 20px;font-size: 14px;color: #909399; cursor: pointer;" class="iconfont iconguanbi .el-dialog__headerbtn" @click.stop.prevent="modal1 = false"></i>
                    </div>
                    <el-form :model="changePwd" label-position="right" :class="{
                            changePasswordForm: true,
                            changePasswordForm_en: language == 'en-US'
                        }" :rules="rules" ref="changePasswordForm">
                        <el-form-item :label="$t('home.dialog.originalPassword')" prop="oldPwd">
                            <el-input v-model="changePwd.oldPwd" v-if="modal1" show-password></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('home.dialog.newPassword')" prop="newPwd">
                            <el-input v-model="changePwd.newPwd" v-if="modal1" show-password @change="pwdInputChange"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('home.dialog.confirmPassword')" prop="confPwd">
                            <el-input v-model="changePwd.confPwd" v-if="modal1" show-password></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click.stop.prevent="modal1 = false">{{
                                $t("publics.button.cancel")
                            }}</el-button>
                        <el-button type="primary" @click.stop.prevent="changeCode()">{{ $t("publics.button.confirm") }}
                        </el-button>
                    </span>
                </el-dialog>
                <el-dialog id="quit" :title="$t('home.tips.sureToLogOut')" :visible.sync="modal2" width="350px" top="35vh" center>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click.stop.prevent="modal2 = false">{{
                                $t("publics.button.cancel")
                            }}</el-button>
                        <el-button @click.stop.prevent="quitLogin" type="danger" style="color: #ffffff">
                            {{ $t("publics.button.confirm") }}</el-button>
                    </span>
                </el-dialog>
            </el-header>

            <!-- 面包屑导航菜单 -->
            <div class="breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>{{
                            $t("menuJson.home")
                        }}</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i" :to="{ path: item.item }" v-if="item.title != '首页'">{{ $t(item.title) }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-main class="container-main">
                <!-- <transition name="slide-fade"> -->
                <router-view :key="$route.fullPath"></router-view>
                <!-- </transition> -->
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import packages from './modules.json'
export default {
    data () {
        return {
            smallImg: 'static/Images/logo.png',
            bigImg: 'static/Images/logos0-qh.png',
            menu: [],
            openeds: [],
            historicalList: [],
            isCollapseText: true,
            dialogVisible: false,

            defaultProps: {
                children: 'children',
                label: 'text'
            },

            changePwd: {
                oldPwd: '',
                newPwd: '',
                confPwd: ''
            },

            modal1: false,
            modal2: false,

            // 全屏/不全屏
            n: 0,
            childIndex: 0,

            // 导航显示隐藏
            asideListShow: true,

            // 系统信息显示隐藏
            curveShowCurve: false,
            infoList: [],

            // 登录者姓名
            loginUsername: window.sessionStorage.userName,
            loginUn: '',

            // 登陆者权限模块
            loginRoleList: [],

            isCollapse: false,

            maxWActive: 'maxW-active',

            notifyPromise: Promise.resolve(),

            // 消息提醒定时器
            intevalObj: null,

            // 是否初次调用消息提醒
            isFirstMsg: true,

            // 是否有实时快照权限
            iaHaveSnapshot: false,

            // 面包屑导航菜单
            breadcrumbList: [], // 面包屑数据
            menuActive: '', // 导航菜单高亮

            // 该参数用于保证请求完iam的token后才加载子路由
            isRouter: false,
            flagl: false,

            // 修改密码校验规则
            regPwdLength: /./,
            regPwd1: /./,
            regPwd2: new RegExp('[\\u4E00-\\u9FFF]+', 'g'),
            regPwd3: /^[\S]*$/,

            regPwdLengthMsg: '',
            regPwdMsg: '',
            pwdHaveName: undefined,
            minCharacters: 0,
            pwdCharacters: 0,
            pwdMinCharactersMsg: undefined,
            delayTime: 5000,
            exportSignalrConnection: null,
            noPermission: false
        };
    },

    computed: {
        language () {
            return window.sessionStorage.languageSet;
        },
        rules () {
            return {
                oldPwd: [
                    {
                        type: 'string',
                        required: true,
                        message: this.$t('home.tips.enterOriginPas'),
                        trigger: 'blur'
                    }
                ],
                newPwd: [
                    {
                        validator: this.validatePass,
                        required: true,
                        trigger: 'blur'
                    }
                ],
                confPwd: [
                    {
                        validator: this.validateConfPass,
                        required: true,
                        trigger: 'blur'
                    }
                ]
            };
        }
    },

    created () {
        if (!sessionStorage.languageSet) {
            sessionStorage.languageSet = 'zh-CN';
            this.$i18n.locale = 'zh-CN';
        }
        this.initIAM();
    },
    mounted () {

        if (sessionStorage.menuActive) {
            this.menuActive = sessionStorage.menuActive;
        }
        if (localStorage.breadcrumbList) {
            this.breadcrumbList = JSON.parse(localStorage.breadcrumbList);
        }
        if (localStorage.historicalList) {
            this.historicalList = JSON.parse(localStorage.historicalList);
        }

        // document.title = this.$t('login.documentTitle');
        if (
            window.sessionStorage.passwordPolicy &&
            window.sessionStorage.passwordPolicy == 1
        ) {
            this.modal1 = true;
        }

        this.Axios({
            methed: 'get',
            url: '../../../../static/json/config.json'
        }).then(res => {
            let data = res.data;
            if (sessionStorage.languageSet === 'zh-CN') {
                document.title = data.zh.docTitle;
            } else {
                document.title = data.en.docTitle;
            }
            this.smallImg = data.img.indexSamllImg;
            this.bigImg = data.img.indexBigImg;
        });
    },
    beforeDestroy () {
        clearTimeout(this.intevalObj);
        this.intevalObj = null;
    },
    destroyed () {
        clearTimeout(this.intevalObj);
        this.intevalObj = null;
    },
    watch: {
        $route (to, from) {
            this.menuActive = to.path;
            sessionStorage.menuActive = to.path;
            clearTimeout(this.intevalObj);
            this.intevalObj = null;

            // this.flagl = !this.flagl;
            // if (this.flagl) {
            //     window.document.documentElement.setAttribute('data-theme', 'theme1')
            // } else {
            //     window.document.documentElement.setAttribute('data-theme', 'theme2')
            // }
            let that = this;
            if (this.iaHaveSnapshot && to.path.indexOf('/systemSnapshot') == -1) {
                this.intevalObj = setTimeout(() => {
                    this.getRealTimeDataInfo();
                }, that.delayTime);
            }
            if (from.path.indexOf('equipInfo') != -1) {

                // from.path == '/Index' ||

                // 左侧列表缓存
                let that = this;
                setTimeout(function () {
                    that.myUtils.getEquipListCache(1, '', '');
                }, 1000);
            }
        }
    },

    methods: {

        // validatePass (rule, value, callback) {
        //     let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{8,30}/;
        //     let regPwd2 = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
        //     let regPwd3 = /^[\S]*$/;
        //     let wordLg = value.length;
        //     if (value === '') {
        //         callback(new Error(this.$t('home.tips.inputNewPassword')));
        //     } else if (value == this.changePwd.oldPwd) {
        //         callback(new Error(this.$t('home.tips.newTheSameOldPas')));
        //     } else if (!reg.test(value)) {
        //         callback(new Error(this.$t('home.tips.inputIncludes')));
        //     } else if (wordLg > 30) {
        //         callback(new Error(this.$t('home.tips.outRange')));
        //     } else if (regPwd2.test(value)) {
        //         callback(new Error(this.$t('home.tips.cannotChina')));
        //     } else if (!regPwd3.test(value)) {
        //         callback(new Error(this.$t('home.tips.cannotSpaces')));
        //     } else {
        //         callback();
        //     }
        // },

        getRule () {
            this.$api
                .GetAccountPasswordRule()
                .then(res => {
                    if (res.data.code === 200) {
                        if (res.data.data) {
                            window.sessionStorage.accountRule = JSON.stringify(
                                res.data.data
                            );
                            this.setRule();
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(er => {
                    console.log(er);
                });
        },

        setRule () {
            let rule = JSON.parse(window.sessionStorage.accountRule);
            let regArr = ['(?=.*[a-z])', '(?=.*[A-Z])', '(?=.*[0-9])', "(?=.*[`~!@#$%^&*()_+={}|:;\"'<>,.?/-])"];
            let msgArr = ['小写字母', '大写字母', '数字', '特殊符号'];

            // 密码规则
            if (rule.password.enabled === true) {

                // 密码长度
                this.regPwdLength = new RegExp('^.{' + rule.password.length + ',32}$');
                this.regPwdLengthMsg = `用户名长度在${rule.password.length}-32个字符`;

                // 密码中必须包含的类型
                let regStr = '^';
                let newMsgArr = [];
                for (let item of rule.password.elements) {
                    regStr += regArr[item];
                    newMsgArr.push(msgArr[item]);
                }
                this.regPwd1 = new RegExp(regStr);
                this.regPwdMsg = '用户名需包含' + newMsgArr.join('、');

                if (!rule.password.allowedUserName) {
                    this.pwdHaveName = new Error('密码不可包含用户名');
                } else {
                    this.pwdHaveName = undefined;
                }

                if (rule.password.minCharacters != 0) {
                    this.minCharacters = rule.password.minCharacters;
                    this.pwdMinCharactersMsg = new Error(`最少包含${rule.password.minCharacters}个不同的字符`);
                } else {
                    this.pwdMinCharactersMsg = undefined;
                }
            } else {
                this.regPwdLength = /./;
                this.regPwd1 = /./;
            }
        },

        validatePass (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!this.regPwdLength.test(value)) {
                callback(new Error(this.regPwdLengthMsg));
            } else if (value != '' && !this.regPwd1.test(value)) {
                callback(new Error(this.regPwdMsg));
            } else if (this.regPwd2.test(value)) {
                callback(new Error('不能输入中文'));
            } else if (!this.regPwd3.test(value)) {
                callback(new Error('不能输入空格'));
            } else if (this.pwdCharacters < this.minCharacters) {
                callback(this.pwdMinCharactersMsg);
            } else if (value == this.changePwd.oldPwd) {
                callback(new Error(this.$t('home.tips.newAndOldPwd')));
            } else if (
                value.indexOf(window.sessionStorage.userName) != -1 &&
                window.sessionStorage.userName != ''
            ) {
                callback(this.pwdHaveName);
            } else {
                callback();
            }
        },

        validateConfPass (rule, value, callback) {
            if (value === '') {
                callback(new Error(this.$t('home.tips.enterConfirmPas')));
            } else if (value != this.changePwd.newPwd) {
                callback(new Error(this.$t('home.tips.towPasAreNoSame')));
            } else {
                callback();
            }
        },

        // // 中英文切换方法
        changeLang () {
            this.$i18n.locale == 'zh-CN'
                ? (this.$i18n.locale = 'en')
                : (this.$i18n.locale = 'zh-CN'); // 设置中英文模式
            localStorage.setItem('languageSet', this.$i18n.locale); // 将用户设置存储到localStorage以便用户下次打开时使用此设置
        },

        // 单点登陆接口
        initIAM () {

            let code = this.getQueryParm('code');
            let state = this.getQueryParm('state');

            //    window.sessionStorage.accessToken &&
            //     window.sessionStorage.accessToken != ''

            if (
                !code && !state
            ) {
                this.init();
                this.getUserInfo();
                this.getUserName2SF();
            } else {
                this.$router.push({ path: '/Index' });
                this.$api
                    .IamGetToken({
                        code: code,
                        state: state
                    })
                    .then(res => {
                        this.isRouter = true;
                        if (res.data.code == 200) {

                            // 登陆成功操作

                            this.loginUsername = window.sessionStorage.userName =
                                res.data.data.userName;

                            // sessionStorage.SRToken = 'Bearer ' + token;
                            // window.sessionStorage.setItem(
                            //     'accessToken',
                            //     'Bearer ' + token
                            // );
                            window.sessionStorage.setItem(
                                'isSingleSignOn',
                                res.data.data.isSingleSignOn
                            );
                            this.init();
                            this.getUserInfo();
                            this.getUserName2SF();
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }
                    })
                    .catch(er => {
                        this.isRouter = true;
                    });
            }
        },

        getQueryParm (name) {
            return (
                decodeURIComponent(
                    (new RegExp(
                        '[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)'
                    ).exec(
                        location.href
                        // eslint-disable-next-line no-sparse-arrays
                    ) || [, ''])[1].replace(/\+/g, '%20')
                ) || null
            );
        },

        // 截取路由
        splitRouter (val) {
            let url = val.split('/');
            return url[url.length - 1];
        },

        // 历史菜单-最大10个记录
        historical (data) {
            let index = -1;
            if (
                (index = this.historicalList.findIndex(
                    v => v.route == data.route
                )) > -1
            ) {
                this.historicalList.splice(index, 1);
                this.historicalList.unshift(data);
            } else {
                this.historicalList.unshift(data);
            }
            if (this.historicalList.length > 10) {
                this.historicalList.pop();
            }
            localStorage.historicalList = JSON.stringify(this.historicalList);
        },

        // 历史记录菜单点击事件
        onHistorical (item) {
            this.historical(item);
            this.menuActive = item.route;

            // if(!item.title === '首页') {
            // }
            this.breadcrumbList = [
                {
                    title: item.name,
                    path: this.splitRouter(item.route)
                }
            ];
            localStorage.breadcrumbList = JSON.stringify(this.breadcrumbList);

            sessionStorage.menuActive = this.menuActive;
        },

        // 菜单点击事件
        onRouters (type, item, grandpa, parent) {
            this.historical(item);
            this.breadcrumbList = [];
            this.menuActive = item.route;

            if (type === 1) {

                // 一级菜单
                this.breadcrumbList = [
                    {
                        title: item.name,
                        path: this.splitRouter(item.route)
                    }
                ];
            }
            if (type === 2) {
                this.breadcrumbList = [
                    {
                        title: grandpa.name,
                        path: this.splitRouter(grandpa.route)
                    },
                    {
                        title: item.name,
                        path: this.splitRouter(item.route)
                    }
                ];
            }
            if (type === 3) {
                this.breadcrumbList = [
                    {
                        title: grandpa.name,
                        path: this.splitRouter(grandpa.route)
                    },
                    {
                        title: parent.name,
                        path: this.splitRouter(parent.route)
                    },
                    {
                        title: item.name,
                        path: this.splitRouter(item.route)
                    }
                ];
            }
            sessionStorage.menuActive = this.menuActive;
            localStorage.breadcrumbList = JSON.stringify(this.breadcrumbList);
        },
        handleOpen (key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose (key, keyPath) {

            // 禁止折叠菜单
            this.$refs.menus.open(keyPath);

            // console.log(key, keyPath);
        },
        toRouter () {
            this.menuActive = '/Index/jumpIframe/ganwei-base-system-snapshot/systemSnapshot';
            parent.vm.$router.push({ path: '/Index/jumpIframe/ganwei-base-system-snapshot/systemSnapshot' });
        },
        notify (title, msg, classNm) {

            // 通知，解决element-ui，同时调用notify时，通知重叠的问题
            let _this = this;
            const h = this.$createElement;
            this.notifyPromise = this.notifyPromise
                .then(this.$nextTick)
                .then(() => {
                    this.$notify({
                        title: title,
                        dangerouslyUseHTMLString: true,
                        message: h(
                            'p',
                            {
                                class: 'msgText'
                            },
                            msg
                        ),
                        customClass: classNm,
                        onClick: _this.toRouter
                    });
                });
        },
        getRealTimeDataInfo () {
            let that = this;
            this.$api
                .getRealTimeData()
                .then(res => {
                    if (!that.noPermission) {
                        that.intevalObj = setTimeout(() => {
                            that.getRealTimeDataInfo();
                        }, that.delayTime);
                    }

                    if (res.data.code == 200) {

                        // 判断是否初次调用
                        if (this.isFirstMsg) {
                            this.isFirstMsg = false;
                            return;
                        }
                        let data = res.data.data.Result;
                        data = data.length > 3 ? data.slice(0, 3) : data;
                        for (let i in data) {
                            let title = '',
                                classNm = '';
                            switch (data[i].Level) {
                                case 10003:
                                case 10004:
                                    title = this.$t('home.tips.faultSnapshot');
                                    classNm = 'alarm';
                                    break;
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                    title = this.$t(
                                        'home.tips.warningSnapshot'
                                    );
                                    classNm = 'warning';
                                    break;
                                case 0:
                                case 1:
                                    title = this.$t(
                                        'home.tips.informationSnapshot'
                                    );
                                    classNm = 'info';
                                    break;
                                case 10001:
                                    title = this.$t('home.tips.setSnapshot');
                                    classNm = 'set';
                                    break;
                                case 10002:
                                    title = this.$t('home.tips.assetSnapshot');
                                    classNm = 'ziChan';
                                    break;
                                default:
                                    title = this.$t(
                                        'home.tips.informationSnapshot'
                                    );
                                    classNm = 'info';
                                    break;
                            }
                            this.notify(title, data[i].EventMsg, classNm);
                        }
                    }
                })
                .catch(err => {

                    if (err.status == 401) {
                        clearTimeout(that.intevalObj)
                        that.intevalObj = null;
                        that.noPermission = true;
                    } else {
                        that.intevalObj = setTimeout(() => {
                            that.getRealTimeDataInfo();
                        }, that.delayTime);
                    }
                    console.log(err);
                });
        },
        getUserName2SF () {
            this.$api
                .getUserName2SF()
                .then(res => {
                    if (res.data.code == 200) {
                        document.title = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getUserInfo () {
            this.$api.GetMenus().then(res => {
                if (res.data.code === 200) {

                    // this.menu = JSON.parse(JSON.stringify(res.data.data));
                    let allMenu = JSON.parse(JSON.stringify(res.data.data));
                    let modules = packages.name;
                    let menuItems = {}
                    modules.forEach(module => {
                        let menuItem = allMenu.find(item => {
                            if (JSON.stringify(item).indexOf(module) !== -1) {
                                return item;
                            }
                            return false;
                        })

                        try {
                            menuItems[menuItem.resourceId] = menuItem;
                        } catch (e) {
                            console.log(e);
                        }
                    })
                    this.menu = Object.values(menuItems)
                    window.sessionStorage.asideList = JSON.stringify(this.menu);
                    if (this.menu.length > 0) {
                        this.iaHaveSnapshot = false;
                        let str = JSON.stringify(this.menu);
                        if (str.indexOf('/systemSnapshot') != -1) {
                            this.iaHaveSnapshot = true;
                        }

                        if (
                            window.sessionStorage.asideList &&
                            (this.$route.path == '/Index' ||
                                this.$route.path == '/index/')
                        ) {
                            if ('children' in this.menu[0]) {
                                this.$router.push(
                                    this.menu[0].children[0].route
                                );
                            } else {
                                this.$router.push(this.menu[0].route);
                            }
                        }
                    }
                } else {
                    window.localStorage.clear();
                    window.sessionStorage.clear();
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                    this.$router.replace('/Login');
                }
            });
        },

        // 系统运行信息
        onSystemOperationInfor () {
            this.curveShowCurve = true;
            this.getSystemInfo();
        },
        onCloseCurve () {
            this.curveShowCurve = false;
        },

        // 获取系统运行信息
        getSystemInfo () {
            this.$api.getSystemInfo().then(rt => {
                if (rt.status == 200) {
                    let infoList = [

                        // {
                        //     title: JSON.parse(rt.data.data.applicationRunInfo)
                        //         .Item1,
                        //     value: JSON.parse(rt.data.data.applicationRunInfo)
                        //         .Item2
                        // },
                        {
                            title: JSON.parse(rt.data.data.systemPlatformInfo)
                                .Item1,
                            value: JSON.parse(rt.data.data.systemPlatformInfo)
                                .Item2.slice(-2)
                        }

                        // {
                        //     title: JSON.parse(rt.data.data.systemRunEvnInfo)
                        //         .Item1,
                        //     value: JSON.parse(rt.data.data.systemRunEvnInfo)
                        //         .Item2
                        // }
                    ];
                    this.infoList = infoList;
                }
            });
        },

        inspectState () {
            console.log(window.sessionStorage.passwordPolicy && window.sessionStorage.passwordPolicy == 1)
            if (
                window.sessionStorage.passwordPolicy &&
                window.sessionStorage.passwordPolicy == 1
            ) {
                this.modal1 = true;
                this.$message.warning('密码过期，请修改密码');
            }
            console.log(this.modal1)
        },

        // 清空输入的密码
        clearInput () {
            this.changePwd.oldPwd = '';
            this.changePwd.newPwd = '';
            this.changePwd.confPwd = '';
            this.$refs['changePasswordForm'].resetFields();
        },

        pwdInputChange (val) {
            if (window.sessionStorage.accountRule) {
                let rule = JSON.parse(window.sessionStorage.accountRule);
                if (rule.password.minCharacters != 0) {
                    let len = val.length;
                    let arr = [];
                    for (let i = 0; i < len; i++) {
                        if (arr.indexOf(val[i]) == -1) {
                            arr.push(val[i]);
                        }
                        this.pwdCharacters = arr.length;
                        if (arr.length >= rule.password.minCharacters) {
                            break;
                        }
                    }
                }
            }
        },

        showEditPwd () {

            // 获取最新规则，防止其他人更新后没有获取到最新规则
            this.getRule();
            this.modal1 = true;
        },

        // 修改密码
        changeCode () {
            this.$refs['changePasswordForm'].validate(valid => {
                if (valid) {
                    let data = {
                        userName: window.sessionStorage.userName,
                        oldPassword: this.$getCode.RSAEncrypt(
                            this.changePwd.oldPwd
                        ),
                        newPassword: this.$getCode.RSAEncrypt(
                            this.changePwd.newPwd
                        )
                    };
                    this.$api.getUpdUserInfoData(data).then(rt => {
                        let code = rt.data.code;
                        if (code == 200) {
                            window.sessionStorage.removeItem('passwordPolicy');
                            this.modal1 = false;
                            this.$message.success(
                                this.$t('home.tips.changeSuccess')
                            );
                            this.quitLogin();
                        } else if (code == 5001) {
                            this.$message.warning(
                                rt.data.message
                            );
                            return;
                        } else if (code == -100) {
                            this.$message.error(
                                rt.data.message
                            );
                            setTimeout(() => {
                                this.quitLogin();
                            }, 1000)
                        } else {
                            this.$message.error(
                                rt.data.message

                                // this.$t("publics.tips.editFail")
                            );
                        }
                    });
                } else {
                    this.$message.warning(this.$t('home.tips.enterWrongInfo'));
                }
            });
        },

        // 退出登录
        quitLogin () {
            this.modal2 = false;
            this.$api.loginOut().then(rt => {
                if (rt.data.code == 200) {
                    let code = window.sessionStorage.getItem('isSingleSignOn');
                    window.sessionStorage.clear();
                    this.$message.success(this.$t('home.tips.loggedOut'));
                    this.globalVariable.initsEquipAList = {};
                    try {

                        // eslint-disable-next-line
                        myJavaFun.OpenLocalUrl('login');
                    } catch (e) {
                        if (code == null || code == undefined || !code) {
                            this.$router.replace('/Login');
                        } else {
                            window.location.href = '/loginOut.html';
                        }
                    }
                } else {
                    this.$message.error(this.$t('home.tips.logOutFail'));
                }
            });
        },
        init () {
            this.loginUn = this.loginUsername ? this.loginUsername.substr(0, 1).toUpperCase() : '';
        },
        onListIndex (index, type) {
            if (type === 'child') {
                this.childIndex = index;
                return;
            }
            this.childIndex = 0;
        },

        // 导航菜单折叠显示
        onAsideListShow () {
            this.isCollapse = !this.isCollapse;
            this.asideListShow = !this.asideListShow;
            this.maxWActive = this.asideListShow
                ? 'maxW-active'
                : 'minW-active';
            this.$root.indexLeftBoxShow = this.asideListShow;
            if (!this.isCollapse) {
                setTimeout(() => {
                    this.isCollapseText = true;
                }, 200);
            } else {
                this.isCollapseText = false;
            }

            this.$store.commit('isCollapseFun', this.isCollapse);
        },

        // 全屏、不全屏
        getFullCreeen () {
            this.n++;
            this.n % 2 == 0
                ? this.outFullCreeen(document)
                : this.inFullCreeen(document.documentElement);
        },
        inFullCreeen (element) {
            let el = element;
            let rfs =
                el.requestFullScreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullScreen;
            if (typeof rfs != 'undefined' && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject != 'undefined') {

                // eslint-disable-next-line
                let wscript = new ActiveXObject('WScript.Shell');
                wscript.SendKeys('{F11}');
            }
        },
        outFullCreeen (element) {
            let el = element;
            let cfs =
                el.cancelFullScreen ||
                el.webkitCancelFullScreen ||
                el.mozCancelFullScreen ||
                el.exitFullScreen;
            if (typeof cfs != 'undefined' && cfs) {
                cfs.call(el);
            } else if (typeof window.ActiveXObject != 'undefined') {

                // eslint-disable-next-line
                let wscript = new ActiveXObject('WScript.Shell');
                wscript.SendKeys('{F11}');
            }
        },
        checkStyle (style) {
            switch (style) {
                case 'dark':
                    window.localStorage.styleTheme = style;
                    break;
                case 'light':
                    window.localStorage.styleTheme = style;
                    break;
                default:
                    window.localStorage.styleTheme = style;
                    break;
            }
        }
    }
};
</script>

<style lang="scss" src="gw-base-style/index.scss" scoped></style>
