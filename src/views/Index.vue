<template>
    <el-container id="index">
        <div class="mask" @click.stop.prevent="onAsideListShow()" :class="{ displayNone: isCollapse }"
            v-if="frameLayout.NavMenu">
            <transition name="draw">
                <el-aside class="maxW" :class="maxWActive">
                    <div class="aside-header" v-if="frameLayout.Header">
                        <div class="aside-header-box">
                            <router-link :to="{ path: ' /Index' }">
                                <img v-if="isCollapse" class="min-img" :src="smallImg" alt />
                                <img v-else-if="!islightStyle" class="max-img" :src="bigImg" alt />
                                <img v-else :src="bigImgLight" alt="">
                            </router-link>
                        </div>
                    </div>
                    <div class="left-nav" :class="{ noHeader: !frameLayout.Header }" @click.stop>
                        <!-- 新版导航菜单 -->
                        <el-row class="list">
                            <!-- <div class="historical">
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
                            </div> -->
                            <div class="max">
                                <el-menu ref="menu" :router="true" :default-active="menuActive" @select="onRouters"
                                    :collapse='isCollapse' :collapse-transition='false'>
                                    <asideMenu v-for="item in menu" :data="item" :key="item.resourceId"></asideMenu>
                                </el-menu>
                            </div>
                        </el-row>
                        <div class="fold">
                            <div @click.stop.prevent="onAsideListShow()" :class="menuOverflow">
                                <!-- <el-tooltip class="item" effect="dark" :content="
                                        $t('menuJson.collapseNavigationBar')
                                    " placement="right"> -->
                                <el-button>
                                    <i :class="
                                        isCollapse
                                            ? 'iconfont icon-caidan_zhankai cacelmargin'
                                            : 'iconfont icon-caidan_zhankai isopen'
                                    "></i>
                                </el-button>
                                <!-- </el-tooltip> -->
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
            <el-header class="indexHeader" v-if="frameLayout.Header">
                <div class="aside-header" v-if="!frameLayout.NavMenu">
                    <div class="aside-header-box">
                        <router-link :to="{ path: ' /Index' }">
                            <img v-if="isCollapse" class="min-img" :src="smallImg" alt />
                            <img v-else-if="!islightStyle" class="max-img" :src="bigImg" alt />
                            <img v-else :src="bigImgLight" alt="">
                        </router-link>
                    </div>
                </div>
                <a href="#" @click.stop.prevent="onAsideListShow()">
                    <i class="iconfont iconcebianlanzhankai"></i>{{ $t("home.workbench") }}</a>
                <div class="header-right displayNone">
                    <!-- <el-dropdown class="index-header-right">
                        <span class="el-dropdown-link index-header-right">
                            <i class="iconfont icon_xieyiqiehuan"></i>
                        </span>
                        <el-dropdown-menu style="padding: 10px; margin-top: -10px" slot="dropdown" class="dropdownMenu">
                            <p @click="checkStyle('dark')" style="padding-bottom: 15px;cursor: pointer;">暗</p>
                            <p @click="checkStyle('light')" style="cursor: pointer;">亮</p>
                        </el-dropdown-menu>

                    </el-dropdown> -->

                    <div>
                        <img v-if="n % 2 == 0 && !islightStyle" :src="fullScreenImg" alt=""
                            @click.stop.prevent="getFullCreeen()">
                        <img v-else-if="n % 2 == 0 && islightStyle" :src="fullScreenLightImg"
                            @click.stop.prevent="getFullCreeen()" alt="">
                        <!-- <i v-if="n % 2 == 0" class="iconfont iconquanping" @click.stop.prevent="getFullCreeen()"></i> -->
                        <img v-else :src="outFullScreeenImg" @click.stop.prevent="getFullCreeen()" alt="">
                    </div>

                    <div title="内容区全屏">
                        <i style="font-size: 40px"
                            :class="['iconfont', contentIsFullScreen ? 'icontuichuquanping2-copy' : 'icon-_quanping']"
                            @click.stop.prevent="getContentFullscreen()"></i>
                    </div>

                    <!-- <el-dropdown trigger="click">
                        <el-badge :value="totalMessage" class="item">
                            <img src="/static/Images/message.svg" alt="">
                        </el-badge>
                        <el-dropdown-menu class="msg-dropdown" style="padding: 0 10px;" slot="dropdown">
                            123456789
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <!-- <unread :totalMessage="totalMessage" :messageList='messageList' @jump="toRouter"></unread> -->

                    <div class="themeImage" @click="checkStyle(islightStyle)" v-if="showSwitchTheme">
                        <img :src="skinLightImg" alt="" v-if="islightStyle">
                        <img :src="skinImg" alt="" v-else>
                    </div>

                    <!-- <el-avatar :src="'/static/Images/user.svg'">{{ loginUn }}</el-avatar> -->
                    <el-dropdown class="index-header-right">
                        <el-avatar v-if="theme === 'dark'" :src="'/static/Images/user1.svg'" shape="square"></el-avatar>
                        <el-avatar v-else :src="'/static/Images/user.svg'" shape="square"></el-avatar>
                        <el-dropdown-menu style="padding: 10px;" slot="dropdown">
                            <p @click.stop.prevent="onSystemOperationInfor()" type="default"
                                style="cursor: pointer;color: #F0F4FF;" v-if='!overdue'>
                                <i class="iconfont icon-xitongxinxi"></i>
                                {{ this.$t("home.dialog.sysTemInfo") }}
                            </p>
                            <p @click.stop.prevent="showEditPwd" type="default" style="cursor: pointer;color: #F0F4FF;"
                                v-if='!overdue'>
                                <i class="iconfont icon-xiugaimima"></i>
                                {{ this.$t("home.dialog.changePassword") }}
                            </p>
                            <p @click.stop.prevent="modal2 = true" type="default"
                                style="cursor: pointer;color: #F0F4FF;">
                                <i class="iconfont icon-tuichudenglu"></i>
                                {{ this.$t("home.dialog.logOut") }}
                            </p>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="el-dropdown-link index-header-right">
                        {{ loginUsername }}
                        <!-- <i class="iconfont iconxiajiantou"></i> -->
                    </span>

                </div>

                <div class="header-right pcHide">
                    <el-dropdown class="index-header-right">
                        <span class="el-dropdown-link index-header-right">
                            <el-avatar>{{ loginUn }}</el-avatar>
                            <span class="username">{{ loginUsername }}</span>
                            <i class="iconfont iconxiajiantou"></i>
                        </span>
                        <el-dropdown-menu style="padding: 10px 30px; margin-top: 5px" slot="dropdown">
                            <p @click.stop.prevent="onSystemOperationInfor()" type="default"
                                style="cursor: pointer; color: #63e03f">
                                {{ this.$t("home.dialog.sysTemInfo") }}
                            </p>
                            <p @click.stop.prevent="showEditPwd" type="default"
                                style="padding: 15px 0; cursor: pointer; color: #2779E6">
                                {{ this.$t("home.dialog.changePassword") }}
                            </p>
                            <p @click.stop.prevent="modal2 = true" type="default"
                                style="cursor: pointer; color: #FF5A65">
                                {{ this.$t("home.dialog.logOut") }}
                            </p>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

            <!-- 系统运行信息 -->
            <el-dialog :title="$t('home.dialog.sysTemInfo')" class="systemInformation_main"
                :visible.sync="curveShowCurve" @close="onCloseCurve" width="600px" top="30vh" center>
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

            <el-dialog class="editPassword" @close="inspectState" @closed="clearInput" :visible.sync="modal1"
                width="480px" top="28vh" :close-on-click-modal="false" :show-close="false" center>
                <div slot="title">
                    <span class="el-dialog__title" style="line-height: 24px;font-size: 18px;">{{
                            $t('home.dialog.changePassword')
                    }}</span>
                    <i style="position: absolute;top: 20px;right: 20px;line-height: 20px;font-size: 14px;color: #909399; cursor: pointer;"
                        class="iconfont iconguanbi .el-dialog__headerbtn" @click.stop.prevent="modal1 = false"></i>
                </div>
                <el-form :model="changePwd" label-position="left" label-width="80px" :class="{
                    changePasswordForm: true,
                    changePasswordForm_en: language == 'en-US'
                }" :rules="rules" ref="changePasswordForm">
                    <el-form-item :label="$t('home.dialog.originalPassword')" prop="oldPwd">
                        <el-input v-model="changePwd.oldPwd" v-if="modal1" show-password></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('home.dialog.newPassword')" prop="newPwd">
                        <el-input v-model="changePwd.newPwd" v-if="modal1" show-password @change="pwdInputChange">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('home.dialog.confirmPassword')" prop="confPwd">
                        <el-input v-model="changePwd.confPwd" v-if="modal1" show-password></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" plain @click.stop.prevent="modal1 = false">{{
                            $t("publics.button.cancel")
                    }}</el-button>
                    <el-button type="primary" @click.stop.prevent="changeCode()">{{ $t("publics.button.confirm") }}
                    </el-button>
                </span>
            </el-dialog>
            <el-dialog id="quit" :title="$t('home.tips.sureToLogOut')" :visible.sync="modal2" width="350px" top="35vh"
                center>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" plain @click.stop.prevent="modal2 = false">{{
                            $t("publics.button.cancel")
                    }}</el-button>
                    <el-button @click.stop.prevent="quitLogin" type="danger" style="color: #ffffff">
                        {{ $t("publics.button.confirm") }}</el-button>
                </span>
            </el-dialog>

            <!-- 面包屑导航菜单 -->
            <div class="breadcrumb" v-if="!isTab && frameLayout.NavMenu">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>{{
                            $t("menuJson.home")
                    }}</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i" :to="{ path: item.item }">{{
                            $t(item.title)
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <el-main class="container-main" v-if="!isTab && frameLayout.innerIFrame">
                <router-view :key="$route.fullPath"></router-view>
            </el-main>

            <el-main class="container-main" v-if="isTab && frameLayout.innerIFrame">
                <router-view :key="$route.fullPath" v-if="isError"></router-view>
                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick"
                    v-else>
                    <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title"
                        :name="item.name" :route="item.route" :data-va="index">
                        <template slot="label">
                            <span class="el-icon-refresh-right" @click="refreshTab(index)"
                                :class="{ active: isActive }"></span>
                            <span>{{ item.title }}</span>
                        </template>
                        <router-view :key="item.route" :editableTabs="editableTabs"
                            :editableTabsValue="editableTabsValue"></router-view>
                    </el-tab-pane>
                </el-tabs>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
import asideMenu from 'gw-base-components-plus/asideMenu/menu.vue';
import * as signalR from '@aspnet/signalr';
import screenfull, { isEnabled } from 'screenfull';
import $ from 'jquery'
// import unread from 'gw-base-components-plus/unreadMsg/unread.vue';
import keyEvent from 'gw-base-utils-plus/keyEvent'
import exportHistory from 'gw-base-utils-plus/historyExport'
export default {
    mixins: [{ methods: keyEvent.methods }, exportHistory],
    components: {
        asideMenu
        // , unread
    },
    data() {
        return {
            menuOverflow: '',
            theme: localStorage.theme || '',
            frameLayout: {
                Header: true,
                NavMenu: true,
                innerIFrame: true
            },
            showSwitchTheme: false,
            currentDate: '2021-06-01',

            smallImg: 'static/Images/logo.png',
            bigImg: 'static/Images/logos0-qh.png',
            bigImgLight: 'static/Images/gw-logo-light.svg',
            fullScreenImg: '',
            fullScreenLightImg: '',
            outFullScreeenImg: '',
            skinImg: '',
            skinLightImg: '',
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
            infoList: [{
                "title": "系统运行平台",
                "value": [
                    {
                        "Key": "网关服务版本号",
                        "Value": "x.x.x"
                    },
                    {
                        "Key": "Web程序版本号",
                        "Value": "x.x.x"
                    }
                ]
            }],

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
            noPermission: false,
            islightStyle: localStorage.getItem('theme') === 'light',

            // 标签页数组和当前选中值
            editableTabsValue: '',
            editableTabs: [],

            // 接口是否报错
            isError: false,

            // 刷新按钮状态
            isActive: false,

            // 是否使用标签页
            isTab: false,
            showSignalrData: '',

            // 全屏参数
            isEnableFullScreen: false,
            FullScreenHome: [],
            contentIsFullScreen: false,
            overdue: false,

            // 新消息数量

            totalMessage: 10,
            messageList: [{
                msg: '告警告警告警告警告警告警告警告警告警告警告警',
                time: '2021-03-01 14:00'
            }, {
                msg: '告警告警告警告警告警告警告警告警',
                time: '2021-03-01 14:00'
            }]
        };
    },

    computed: {
        language() {
            return window.sessionStorage.languageSet;
        },
        rules() {
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
        },
        // theme() {
        //     return this.islightStyle ? 'light' : 'dark';
        // }
    },

    created() {
        this.Axios({
            methed: 'get',
            url: '../../../../static/json/config.json'
        }).then(res => {
            let data = res.data;
            this.config = data;
            sessionStorage.isTab = data.labelPage;
            if (!localStorage.theme) {
                localStorage.setItem('theme', this.config.theme.default)
            }
            window.document.documentElement.setAttribute('data-theme', localStorage.theme)
            this.theme = localStorage.theme;

            this.showLangSelect = data.showLangSelect;
            if (!this.showLangSelect || !window.sessionStorage.languageType) {
                window.sessionStorage.languageType = 'zh-CN'
            }
            if (sessionStorage.languageType === 'zh-CN') {
                document.title = this.config.zh.docTitle;
            } else {
                document.title = this.config.en.docTitle;
            }

            this.smallImg = data.img.indexSamllImg;
            this.bigImg = data.img.indexBigImg;
            this.bigImgLight = data.img.indexBigImgLight;
            this.fullScreenImg = data.frameIcon.fullScreen;
            this.fullScreenLightImg = data.frameIcon.fullScreenLight;
            this.outFullScreeenImg = data.frameIcon.outFullScreeen;
            this.skinImg = data.frameIcon.skin;
            this.skinLightImg = data.frameIcon.skinLight;
            this.frameLayout = data.frameLayout;
            this.showSwitchTheme = data.showSwitchTheme;
            sessionStorage.isTab = this.isTab = data.labelPage;
            if (data.autoFullScreen) {
                this.isEnableFullScreen = data.autoFullScreen.enable;
                this.FullScreenHome = data.autoFullScreen.home;
            }
            this.showTopNav = data.showTopNav;
        });

        if (sessionStorage.menuActive) {
            this.menuActive = sessionStorage.menuActive;
        }
        this.init();
        this.getUserInfo();
        this.getUserName2SF();
    },
    mounted() {
        window.onmessage = (e) => {
            this.curveSignalR(e)
        }
        if (!this.isTab) {
            if (localStorage.breadcrumbList) {
                this.breadcrumbList = JSON.parse(localStorage.breadcrumbList);
            }
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


        this.signalrMonitorScene();
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                this.contentFullscreenChange();
            });
        }
        window.addEventListener('message', (e) => {
            if (e.data && typeof e.data == 'object' && 'setMenu' in e.data) {
                // 传递被删除的菜单项的route到Index组件中
                // this.$emit("setMenu", { route: e.data.route, setMenu: e.data.setMenu });
                this.resetMenu({ route: e.data.route, setMenu: e.data.setMenu });
            }
        })

        document.onkeyup = this.keyEvent;
    },
    beforeDestroy() {
        clearTimeout(this.intevalObj);
        this.intevalObj = null;
    },
    destroyed() {
        clearTimeout(this.intevalObj);
        this.intevalObj = null;
    },
    watch: {
        $route(to, from) {
            sessionStorage.menuActive = this.menuActive = to.fullPath;
            if (to.path.includes('noAccess')) {
                this.menu = [];
                this.overdue = true
            }
            this.$nextTick(() => {
                let activeDom = document.querySelector('.el-menu-item.is-active');
                let title = activeDom ? activeDom.getAttribute('name') : '';

                if (!this.isTab) {
                    this.breadcrumbList = [
                        {
                            title: title,
                            path: sessionStorage.menuActive
                        }
                    ];
                    localStorage.breadcrumbList = JSON.stringify(this.breadcrumbList);
                }
                if (title && title != '') {
                    this.setTableTabs(title);
                }
                // 设置标签页选中项状态和名称
                let len = this.editableTabs.length;
                for (let i = 0; i < len; i++) {
                    if (this.$route.fullPath == this.editableTabs[i].route) {
                        this.editableTabsValue = this.editableTabs[i].name;
                        sessionStorage.menuActiveName = this.editableTabs[i].title;
                        break;
                    }
                }
            })


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
        signalrMonitorScene() {
            window.sessionStorage.setItem('clickId', '');
            let connection = new signalR.HubConnectionBuilder().withUrl('/monitor').build();
            // console.log('connection', connection);
            connection.start().then(() => {
                connection.invoke('AddUserToGroup');
                // connection.send('AddMessage', this.loginUsername);
            }).catch(err => console.error(err));
            connection.on('OnOpenWindow', signalrData => {
                window.sessionStorage.setItem('clickId', '');
                const data = JSON.parse(signalrData);
                let pageArr = data.data.replace(/"/g, '').split('%');
                if (pageArr[0].toUpperCase() === sessionStorage.userName.toUpperCase()) {
                    let changePath = '';
                    let judgeArr = [];
                    if (pageArr[1].includes('clickId')) {
                        let newQuery = this.getQueryClickId(pageArr[1]);
                        changePath = newQuery.newHref;
                        judgeArr = newQuery.newParames;
                    } else {
                        changePath = pageArr[1];
                    }
                    let isSame = judgeArr.length > 0 ? judgeArr.every(item => {
                        return window.location.href.includes(item);
                    }) : false;
                    // 当预跳转路径与当前路径相同时不进行二次跳转
                    if (isSame) {
                        return;
                    }
                    changePath && this.$router.push(changePath);
                }
            });
        },

        /**
         * clickId存入localStorage，同时返回去除clickId的路由
         */
        getQueryClickId(variable) {
            let href = variable;
            let param = href.indexOf('&') !== -1 ? href.split('&') : href.split('?');
            let newHref = '';
            let newParames = [];
            for (let i = 0; i < param.length; i++) {
                let pair;
                if (param[i].indexOf('?') != -1) {
                    pair = param[i].split('?')[1].split('=');
                } else {
                    pair = param[i].split('=');
                }
                if (pair[0] == 'clickId') {
                    window.sessionStorage.setItem('clickId', pair[1]);
                    continue;
                }
                newHref += (i == 0 ? '' : '&') + param[i];
                newParames.push(param[i]);
            }
            return { newHref: newHref, newParames: newParames };
        },
        // 改变内容区域全屏的状态
        contentFullscreenChange() {
            this.contentIsFullScreen = screenfull.isFullscreen;
        },
        // 全屏
        getContentFullscreen() {
            if (!screenfull.isEnabled) {
                return false;
            }
            screenfull.toggle(document.getElementsByClassName('container-main')[0]);
            $('.jumpIframe').css('padding', '0px').contents().find('#app').css('padding', '0px 20px 20px');
        },
        resetMenu(data) {
            // 判断是否删除标签页
            if (data.route) {
                // 找到标签页中被删除的菜单
                this.editableTabs.forEach(item => {
                    if (data.route == item.route) {
                        this.removeTab(item.name);
                    }
                })
            }
            // 判断是否重新获取菜单
            if (data.setMenu) {
                this.getUserInfo();
            }

        },

        tabClick(event) {
            let route = event.$attrs.route;
            sessionStorage.menuActive = this.menuActive = route;
            this.$router.push(route);
        },

        // 设置标签页
        setTableTabs(title) {
            let len = this.editableTabs.length;

            // 判断标签页数组是否存在当前选中导航项
            let isHave = this.editableTabs.some(item => {
                return item.route == this.$route.fullPath;
            })

            // 如果不存在则增加一项进数组，存在则只做标签页选中
            if (!isHave) {
                this.editableTabs.push({
                    title: title,
                    route: this.$route.fullPath,
                    name: len ? String(Number(this.editableTabs[len - 1].name) + 1) : '1'
                })
                len = this.editableTabs.length;
                this.editableTabsValue = String(len);

                if (len > 7) {
                    this.editableTabs.shift();
                }
            } else {
                for (let i = 0; i < len; i++) {
                    if (this.$route.fullPath == this.editableTabs[i].route) {
                        this.editableTabsValue = this.editableTabs[i].name;
                        break;
                    }
                }
            }
            sessionStorage.menuActiveName = title;
        },

        // 关闭标签页
        removeTab(targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                            sessionStorage.menuActiveName = nextTab.title;
                            sessionStorage.menuActive = this.menuActive = nextTab.route;
                            this.$router.push(nextTab.route);
                        }
                    }
                });
            }

            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        },

        // 刷新标签页
        refreshTab(index) {
            let iframe = document.getElementsByClassName('jumpIframe');
            iframe[index].contentWindow.location.reload();

            this.isActive = true;
            setTimeout(() => {
                this.isActive = false;
            }, 500);
        },

        getRule() {
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

        setRule() {
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

        validatePass(rule, value, callback) {
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

        validateConfPass(rule, value, callback) {
            if (value === '') {
                callback(new Error(this.$t('home.tips.enterConfirmPas')));
            } else if (value != this.changePwd.newPwd) {
                callback(new Error(this.$t('home.tips.towPasAreNoSame')));
            } else {
                callback();
            }
        },

        // // 中英文切换方法
        changeLang() {
            this.$i18n.locale == 'zh-CN'
                ? (this.$i18n.locale = 'en')
                : (this.$i18n.locale = 'zh-CN'); // 设置中英文模式
            localStorage.setItem('languageSet', this.$i18n.locale); // 将用户设置存储到localStorage以便用户下次打开时使用此设置
        },

        getQueryParm(name) {
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
        splitRouter(val) {
            let url = val.split('/');
            return url[url.length - 1];
        },

        // 历史菜单-最大10个记录
        historical(data) {
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

            // localStorage.historicalList = JSON.stringify(this.historicalList);
        },

        // 菜单点击事件
        onRouters(type, data, el) {
            // this.breadcrumbList = [
            //     {
            //         title: el.$el.innerText,
            //         path: data.pop()
            //     }
            // ];
            // localStorage.breadcrumbList = JSON.stringify(this.breadcrumbList);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {

            // 禁止折叠菜单
            this.$refs.menus.open(keyPath);

            // console.log(key, keyPath);
        },
        toRouter() {
            this.menuActive = '/Index/jumpIframe/ganwei-iotcenter-system-snapshot/systemSnapshot';
            parent.vm.$router.push({ path: '/Index/jumpIframe/ganwei-iotcenter-system-snapshot/systemSnapshot' });
        },
        notify(title, msg, classNm) {

            // 通知，解决element-ui，同时调用notify时，通知重叠的问题
            let _this = this;
            const h = this.$createElement;
            this.notifyPromise = this.notifyPromise
                .then(this.$nextTick)
                .then(() => {
                    this.$notify({
                        type: classNm,
                        title: title,
                        dangerouslyUseHTMLString: true,
                        message: msg,
                        // message: h(
                        //     'p',
                        //     // {
                        //     //     class: 'msgText'
                        //     // },
                        //     msg
                        // ),
                        onClick: _this.toRouter,
                    });
                });
        },
        getRealTimeDataInfo() {
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
                                    classNm = 'error';
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
                                    classNm = 'info';
                                    break;
                                case 10002:
                                    title = this.$t('home.tips.assetSnapshot');
                                    classNm = 'info';
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

                    if (err.status == 401 || err.status == 403) {
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
        getUserName2SF() {
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
        getUserInfo() {
            this.$api.GetMenus().then(res => {
                if (res.data.code === 200) {
                    this.isError = false;

                    this.menu = JSON.parse(JSON.stringify(res.data.data));

                    window.sessionStorage.asideList = JSON.stringify(this.menu);
                    if (this.menu.length > 0) {
                        this.iaHaveSnapshot = false;
                        let str = JSON.stringify(this.menu);
                        if (str.indexOf('/systemSnapshot') != -1) {
                            this.iaHaveSnapshot = true;
                        }

                        let route = sessionStorage.menuActive;
                        if (
                            window.sessionStorage.asideList &&
                            (this.$route.path == '/Index' ||
                                this.$route.path == '/index/')
                        ) {
                            if ('children' in this.menu[0]) {
                                route = this.menu[0].children[0].route;
                                this.$router.push(route);
                                if (!sessionStorage.menuActiveName) {
                                    sessionStorage.menuActiveName = this.$t(this.menu[0].children[0].name);
                                }
                            } else {
                                route = this.menu[0].route
                                this.$router.push(route);
                                if (!sessionStorage.menuActiveName) {
                                    sessionStorage.menuActiveName = this.$t(this.menu[0].name);
                                }
                            }
                        }

                        // 初始化第一个标签页
                        if (this.editableTabs.length == 0) {
                            this.editableTabs.push({
                                title: sessionStorage.menuActiveName,
                                route: route,
                                name: '1'
                            })
                            this.editableTabsValue = '1';
                        }
                    }
                } else {
                    window.localStorage.clear();
                    window.sessionStorage.clear();
                    this.$message({
                        type: 'error',
                        title: res.data.message
                    });
                    this.$router.replace('/Login');
                }
            }).catch(er => {
                this.isError = true;
            });
        },

        // 系统运行信息
        onSystemOperationInfor() {
            this.curveShowCurve = true;
            this.getSystemInfo();
        },
        onCloseCurve() {
            this.curveShowCurve = false;
        },

        // 获取系统运行信息
        getSystemInfo() {
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

        inspectState() {
            if (
                window.sessionStorage.passwordPolicy &&
                window.sessionStorage.passwordPolicy == 1
            ) {
                this.modal1 = true;
                this.$message.warning('密码过期，请修改密码');
            }
        },

        // 清空输入的密码
        clearInput() {
            this.changePwd.oldPwd = '';
            this.changePwd.newPwd = '';
            this.changePwd.confPwd = '';
            this.$refs['changePasswordForm'].resetFields();
        },

        pwdInputChange(val) {
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

        showEditPwd() {

            // 获取最新规则，防止其他人更新后没有获取到最新规则
            this.getRule();
            this.modal1 = true;
        },

        // 修改密码
        changeCode() {
            this.$refs['changePasswordForm'].validate(async valid => {
                if (valid) {
                    let data = {
                        userName: window.sessionStorage.userName,
                        oldPassword: await this.$getCode.RSAEncrypt(
                            this.changePwd.oldPwd
                        ),
                        newPassword: await this.$getCode.RSAEncrypt(
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
        quitLogin() {
            this.modal2 = false;
            this.$api.loginOut().then(rt => {
                if (rt.data.code == 200) {
                    let isSsoLogin = window.sessionStorage.getItem('isSsoLogin');
                    window.sessionStorage.clear();
                    this.$message.success(this.$t('home.tips.loggedOut'));
                    this.globalVariable.initsEquipAList = {};
                    try {

                        // eslint-disable-next-line
                        myJavaFun.OpenLocalUrl('login');
                    } catch (e) {
                        if (isSsoLogin == null || isSsoLogin == undefined || !isSsoLogin) {
                            this.$router.replace('/');
                        } else {

                            // window.location.href = '/loginOut.html';
                            this.$router.replace('/jumpIframeLogin/ganwei-iotcenter-login/ssoLogout');
                        }
                    }
                } else {
                    this.$message.error(this.$t('home.tips.logOutFail'));
                }
            });
        },
        init() {
            this.loginUn = this.loginUsername ? this.loginUsername.substr(0, 1).toUpperCase() : '';
        },
        onListIndex(index, type) {
            if (type === 'child') {
                this.childIndex = index;
                return;
            }
            this.childIndex = 0;
        },

        // 导航菜单折叠显示
        onAsideListShow() {
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
        getFullCreeen() {
            this.n++;
            this.n % 2 == 0
                ? this.outFullCreeen(document)
                : this.inFullCreeen(document.documentElement);
        },
        inFullCreeen(element) {
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
        outFullCreeen(element) {
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
        checkStyle(islightStyle) {
            this.islightStyle = !islightStyle;
            if (this.theme == localStorage.getItem('theme')) {
                return;
            }
            localStorage.setItem('theme', this.theme)
            window.document.documentElement.setAttribute('data-theme', this.theme);

            // document.querySelectorAll('iframe').contentWindow.document.documentElement.setAttribute('data-theme', this.theme);

            let iframe = document.getElementsByClassName('jumpIframe');
            for (let item of iframe) {
                item.contentWindow.document.documentElement.setAttribute('data-theme', this.theme);
                item.contentWindow.postMessage({ theme: this.theme })
                // item.contentWindow.location.reload()
            }
        }
    }
};
</script>

<style lang="scss" src="gw-base-style-plus/index.scss" scoped>
</style>