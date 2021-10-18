
P.S.:
此仓库编译命令：npm run dev-all（以14.0版本的后端启动前端），
打包命令：npm run build-frame（打包外框架），npm run build-all（打包模块，需将模块放入相应文件夹中，如modules，可在module-conf.js文件中配置）。
# 北向模块仓库

ganwei-north-app-manage：应用接入管理

ganwei-north-config-interface：应用接口授权

ganwei-north-config-terminal：应用终端授权

ganwei-north-forwarding-rule：转发终端引擎

ganwei-north-interface：应用接口管理

ganwei-north-paltform-terminal：北向平台终端管理

ganwei-north-platform：应用平台管理

ganwei-north-product-property：设备配置，包含设备管理和产品管理

ganwei-north-subscription：消息订阅管理

ganwei-north-terminal：终端信息管理

ganwei-north-terminal-types：终端类型管理



# 整合插件化

# 城市框招+华为园区框招（一体机）

P.S.：此分支包含了插件管理、数据采集、数据备份、设备管理共四个城市框招模块且已中英文化。

前端插件化打包后样式问题解决办法  在每个模块下的app.vue 中 加上 
mounted () {
    let theme = localStorage.getItem('theme');
    if (theme) {
        window.document.documentElement.setAttribute('data-theme', theme)
    } else {
        window.document.documentElement.setAttribute('data-theme', 'dark')
    }
}

> 敢为软件

## 安装、运行、打包说明

```shell
# 安装packjson中所列的依赖项

npm install

# 其中涉及敢为组件依赖如下：
    （1） 基线模块
    "ganwei-base-overall",                             // 系统首页
    "ganwei-base-data-analysis",                       // 数据分析
    "ganwei-base-equip-manage",                        // 设备管理
    "ganwei-base-log-previews",                        // 日志预览
    "ganwei-base-equip-lists",                         // 设备列表
    "ganwei-base-system-snapshot",                     // 实时快照
    "ganwei-base-event-querys",                        // 事件查询
    "ganwei-base-work-order-management",               // 工单管理
    "ganwei-base-video-system",                        // 视频系统
    "ganwei-base-time-list",                           // 定时报表
    "ganwei-base-time-tasks",                          // 定时任务
    "ganwei-base-user-privileges",                     // 权限管理
    "ganwei-base-firmware-update",                     // 固件升级
    "ganwei-base-alarm-lists",                         // 报警排表
    "ganwei-base-asset-management",                    // 资产管理
    "ganwei-base-eq-linkages",                         // 设备联动
    "ganwei-base-patrol-plans",                        // 视频巡更
    "ganwei-base-topology-manage"，                    // web组态
    "ganwei-base-webgl",                               //webgl
    "ganwei-base-welcome-word",                        //欢迎词
    "ganwei-base-autoPlay"                            //自动讲解
    "ganwei-base-smartPark"                            //控制面板
    "ganwei-cityiot-report-manage": "^1.0.3",          // 报表管理
    "ganwei-cityiot-multiple-access": "^1.0.2",        // 多方式接入（插件管理）
    "ganwei-cityiot-data-collection": "^1.0.1",        // 数据采集
    "ganwei-cityiot-data-processing": "^1.0.1",        // 数据处理（数据备份）
    "ganwei-cityiot-equip-manage": "^1.0.0",           // 设备管理（包含【上传物模型】功能,使用时把路由更改即可）
    "ganwei-parkiot-bulk-import": "^1.0.0",            // 批量导入终端
    "ganwei-parkiot-examine-approve": "^1.0.0",	       // 审批终端
    "ganwei-base-topology-manage": "^1.0.0",           // web组态
    "ganwei-base-config-manage": "^1.0.8",             // 通用配置管理
    "ganwei-base-plugin-shop": "^1.0.1",               // 应用商店
    "ganwei-base-equip-platform": "^1.0.2",            // 边缘物联网

    （2）水务模块
    "ganwei-water-dataTrack"                           //数据分析
    "ganwei-water-equip-manage"                        //设备管理
    "ganwei-water-overall"                             //系统首页
    "ganwei-water-platform-maintenance"                //平台运维统计
    "ganwei-water-system-snapshot"                     //实时快照


# 长沙IoTCenterWeb模块仓库地址及负责人说明

    访客系统App端   https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.VisitorApp          -刘永华
    视频平台        https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.VideoPlatform       -刘永华
    视频巡更模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.VideoPatrol         -刘永华
    预案管理模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.PlanManage          -黎文达
    华为NCE模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.HuaWeiNCE            -黎文达
    访客管理模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.VisitorManage       -刘永华
    数据统计模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.DataStatistic       -黎文达
    组态管理模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.TopologyManage      -刘永华
    北向产品管理    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.NorthManage         -黎文达/余笑晓
    配置中心模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.ConfigurationCenter  -余笑晓
    应用商店模块    https://gitee.com/ganweichangsha/IoTCenterWeb.Modules.ApplicationStore     余笑晓

    自动讲解    https://gitee.com/shend/webui-base-auto-play/tree/dev/    钟镇洲
    控制面板    https://gitee.com/shend/webui-base-smart-park/tree/dev/   钟镇洲
    和对讲      https://gitee.com/shend/talking                           钟镇洲
    系统首页    https://gitee.com/shend/webui-base-overall                钟镇洲
    设备管理（基线）https://gitee.com/shend/webui-base-equip-manage        钟镇洲
    数据分析    https://gitee.com/shend/webui-base-data-analysis          钟镇洲
    日志预览    https://gitee.com/shend/webui-base-log-preview            钟镇洲
    欢迎词      https://gitee.com/shend/webui-base-welcome-word           蔡国沛
    资产管理    https://gitee.com/shend/webui-base-asset-management       郑堪侠
    定时报表    https://gitee.com/shend/webui-base-time-list              蔡国沛
    权限管理    https://gitee.com/shend/webui-base-user-privileges        蔡国沛
    固件升级    https://gitee.com/shend/webui-base-firmware-update        蔡国沛
    视频系统    https://gitee.com/shend/webui-base-video-system           蔡国沛
    工单管理    https://gitee.com/shend/webui-base-work-order-management  郑堪侠
    设备列表    https://gitee.com/shend/webui-base-equip-list/tree/dev/   钟镇洲
    设备联动    https://gitee.com/shend/webui-base-eq-linkage/tree/dev/   郑堪侠
    实时快照    https://gitee.com/shend/webui-base-system-snapshot        钟镇洲
    定时任务    https://gitee.com/shend/webui-base-time-tasks             蔡国沛
    事件查询    https://gitee.com/shend/webui-base-eventQuery             郑堪侠

    水务模块
    平台运维统计  https://gitee.com/shend/webui-water-platform-maintenance  郑堪侠
    系统首页（水务） https://gitee.com/shend/webui-water-overall            钟镇洲
    实时快照（水务） https://gitee.com/shend/webui-water-system-snapshot    钟镇洲
    设备管理（水务） https://gitee.com/shend/webui-water-equip-manage       钟镇洲
    数据追溯        https://gitee.com/shend/webui-water-data-track         郑堪侠


# 上述为敢为固定版本，如果要获取新特性，则需要更新上述版本，操作如下：

（1）使用NPM仓库更新
     按照下面命令顺序执行(如果提示“禁止运行脚本”,在电脑运行中输入"powerShell",然后以管理员运行，继续输入"set-ExecutionPolicy RemoteSigned",输入Y 回车即可)
     npm install -g npm-check-updates  //如果安装过则直接跳过此步骤
     ncu  // 对比显示出来的版本号与package.json中的差异，然后更新package.json为最新
     npm install

（2）使用敢为仓库更新
     按照下面命令顺序执行(如果提示“禁止运行脚本”,在电脑运行中输入"powerShell",然后以管理员运行，继续输入"set-ExecutionPolicy RemoteSigned",输入Y 回车即可)
     npm config set registry http://139.9.43.67:8081/repository/npm-hosted/
     npm login -registry=http://npm-hosted.ganweisoft.net/
     npm install -g npm-check-updates  //如果安装过则直接跳过此步骤
     ncu
     ncu -u //敢为只有自身组件包，直接替换package.json为最新
     npm install

# 启动运行项目

npm run dev

# 项目打包

npm run build

# 实时曲线依赖

npm install highcharts --save
npm install vue-highcharts --save-dev
```

## 项目和主要文件说明

```shell
├─ build
..├─ build.js                  # 生产环境构建
..├─ check-versions.js         # 数据库连接
..├─ utils.js                  # 构建相关工具
..├─ vue-loader.conf.js        # css加载配置
..├─ webpack.base.conf.js      # webpack加载配置
..├─ webpack.dev.conf.js       # webpack开发环境配置
..├─ webpack.prod.conf.js      # webpack生产环境配置

├─ config
..├─ dev.env.js                # 项目开发环境配置
..├─ index.js                  # 项目主要配置（包括监听端口、打包路径)
..├─ prod.env.js               # 项目生产环境配置

├─ Src
..├─ assets                    # 静态资源（样式文件）
..├─ components                # 公共组件
..├─ request                   # 请求文件
..├─ utils                     # 工具类
..├─ views                     # 相关页面
..├─ App.vue                   # 根组件
..├─ main.js                   # 入口文件
..├─ router.js                 # 路由文件
..├─ store.js                  # vuex文件

├─ .babelrc                    # babel编译参数
├─ .editorconfig               #  代码格式
├─ .eslintignore               # eslint代码检测忽略配置
├─ .eslintrc.js                # eslint 语法检测
├─ .gitignore                  # git上传需要忽略的文件配置
├─ .jsbeautifyrc               # 代码格式化配置
├─ .postcssrc.js               # 转换css的工具
├─ index.html                  # 主页
├─ package.json                # 项目基本信息
├─ yarn.lock                   # 安装管理工具
├─ README.md                   # 项目说明
```

## 新增组态

找到项目**/static/configuration**目录下的**configuration.json**文件

文件结构如下

```
[{
    "resourceOrder": 0,
    "resourceId": 2004,
    "resourceExtendAttr": "0",
    "route": "/Index/configuration",
    "resourceCode": "",
    "parentResId": 1402,
    "show": "false",
    "icon": "iconxiaoyuandiandaohang",
    "text": "IOTCenter",
    "iframeSrc": "https://127.0.0.1:5001/"
}, {
    "resourceOrder": 0,
    "resourceId": 2006,
    "resourceExtendAttr": "0",
    "route": "/Index/configuration",
    "resourceCode": "",
    "parentResId": 1402,
    "show": "false",
    "icon": "iconxiaoyuandiandaohang",
    "text": "map",
    "iframeSrc": "./static/configuration/indexTest.html"
}]
```

## 新增模块

在 router.js 中将对应的文件引入和文件路径进行配置

```
// vue和router
import Vue from 'vue'
import Router from 'vue-router'
const Index = () =>
    import ('./views/Index.vue')
const Home = () =>
    import ('./views/home/Home.vue')

// 用于保存引入的文件
const equipLists = () =>
    import ('./views/equipList/EquipLists.vue')
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,

    // 给当前路由添加选中样式
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Index',
            component: Index,
            children: [{
                    path: '/',
                    redirect: 'equipLists'
                },
                // 新增的页面在这里引入路由中
                {
                    path: 'equipLists',
                    name: 'equipLists',
                    component: equipLists
                }
            ]
        }
    ]
})
```

## 接口配置说明

在登陆成功的时候，会将 token 保存到 sessionStorage

```
case 200:
    // 登陆成功操作
    let gwToken = 'Bearer ' + data.data
    window.sessionStorage.setItem('gw_token', gwToken)
```

在 api.js 文件中，已经封装好四种请求方式的调用方法，api.js 已经挂载到了 vue 中，只需要在调用的方法中传入相应参数，就可以实现接口的调用

```
import base from './base'; // 导入接口域名列表
import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

// 这个为服务地址，服务器地址变更只需要改这里
const reqUrl = 'https://127.0.0.1:5001';

const api = {

    // 用户登录,获取token
    login(params) {
        return axios.post(reqUrl + `/Account/Login`, params);
    },

    // get请求方式，url为请求接口的api，data为传入的参数
    get: function(url, data) {
        return axios({
            method: 'get',
            url: reqUrl +url,
            params: data,
            headers: {

                // 获取token
                'Authorization': window.sessionStorage.getItem('gw_token'),
                'Content-Type': 'application/json'
            }
        });
    },

    // post请求方式
    // ...

    // delete请求方式
    // ...

    // put请求方式
    // ...
}
```

## 公共方法

在 myUtils.js 文件中放着各个可复用的方法，下面举个日期格式化的例子

```
export default class myUtils {
    /**
     * @description 日期格式化
     * @param {Date} date 日期
     * @param {String} fmt 日期格式 eg: yyyy-MM-dd hh:mm:ss
     */
    static dateFormat(date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
}
```

myUtils.js 已经挂载到了 vue 中，在 vue 中调用方式如下

```
let date = new Date()

// this.挂载的名字.方法名
this.myUtils.dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
```


"ganwei-base-alarm-list": "^1.4.5",
"ganwei-base-asset-management": "^1.3.3",
"ganwei-base-autoPlay": "^1.0.9",
"ganwei-base-config-manage": "^1.0.19",
"ganwei-base-data-analysis": "^1.0.21",
"ganwei-base-eq-linkage": "^1.3.0",
"ganwei-base-equip-lists": "^1.1.51",
"ganwei-base-equip-manage": "^1.1.48",
"ganwei-base-equip-platform": "^1.0.6",
"ganwei-base-event-querys": "^1.1.9",
"ganwei-base-firmware-update": "^1.0.26",
"ganwei-base-log-previews": "^1.0.28",
"ganwei-base-overall": "^1.1.9",
"ganwei-base-patrol-plan": "^2.0.8",
"ganwei-base-plugin-shop": "^1.0.14",
"ganwei-base-smartPark": "^1.1.2",
"ganwei-base-system-snapshot": "^1.0.42",
"ganwei-base-time-list": "^1.0.48",
"ganwei-base-time-tasks": "^1.0.48",
"ganwei-base-topology-manage": "^1.0.2",
"ganwei-base-user-privileges": "^1.0.42",
"ganwei-base-video-platform": "^1.0.0",
"ganwei-base-video-system": "^1.0.36",
"ganwei-base-voice": "^1.0.4",
"ganwei-base-vp": "^1.0.0",
"ganwei-base-webgl": "^1.0.1",
"ganwei-base-welcome-word": "^1.0.10",
"ganwei-base-work-order-management": "^1.3.5",
"ganwei-cityiot-data-collection": "^1.0.1",
"ganwei-cityiot-data-processing": "^1.0.1",
"ganwei-cityiot-equip-manage": "^1.0.0",
"ganwei-cityiot-multiple-access": "^1.0.5",
"ganwei-cityiot-report-manage": "^1.0.3",
"ganwei-ioc-video-system": "^1.0.15",
"ganwei-iotcenter-modules-applicationstore": "^1.0.0",
"ganwei-iotcenter-modules-datastatistic": "^1.0.1",
"ganwei-iotcenter-modules-huaweince": "^1.0.0",
"ganwei-iotcenter-modules-planmanage": "^1.0.2",
"ganwei-iotcenter-modules-visitormanage": "^1.0.4",
"ganwei-north-app-manage": "^1.0.0",
"ganwei-north-config-interface": "^1.0.0",
"ganwei-north-config-terminal": "^1.0.0",
"ganwei-north-forwarding-rule": "^1.0.0",
"ganwei-north-interface": "^1.0.0",
"ganwei-north-paltform-terminal": "^1.0.0",
"ganwei-north-platform": "^1.0.0",
"ganwei-north-product-property": "^1.0.0",
"ganwei-north-subscription": "^1.0.0",
"ganwei-north-terminal": "^1.0.0",
"ganwei-north-terminal-types": "^1.0.0",
"ganwei-parkiot-bulk-import": "^1.0.0",
"ganwei-parkiot-examine-approve": "^1.0.0",
"ganwei-water-dataTrack": "^1.0.5",
"ganwei-water-equip-manage": "^1.0.5",
"ganwei-water-overall": "^1.0.7",
"ganwei-water-platform-maintenance": "^1.0.5",
"ganwei-water-system-snapshot": "^1.0.3",
