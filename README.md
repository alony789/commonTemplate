<h3 align="center" style="font-weight:bold;font-size:30px;">前端框架说明</h3>

<p align="center">
 <a href="https://v2.vuejs.org/" target="__blank" style="margin-right:10px;">
   <img src='https://img.shields.io/badge/Vue-2.5.2-%2394c20c?labelColor=#94c20c' />
 </a>
 <a href="https://www.webpackjs.com/" target="__blank" style="margin-right:10px;">
   <img src='https://img.shields.io/badge/Webpack-3.6.0-%234ec428?labelColor=#5a5a5a' />
 </a>
<a href="https://www.axios-http.cn/docs/intro" target="__blank" style="margin-right:10px;">
   <img src='https://img.shields.io/badge/Axios-0.27.0-%2397c424?labelColor=#5a5a5a' />
 </a>
<a href="https://next.router.vuejs.org/" target="__blank" style="margin-right:10px;">
    <img src='https://img.shields.io/badge/vueRouter-3.1.6-%23d6604a?labelColor=#5a5a5a' />
 </a>
 <a href="https://element.eleme.io/#/zh-CN" target="__blank" style="margin-right:10px;">
 <img src='https://img.shields.io/badge/ElementUI-2.15.3-%23097abb?labelColor=#5a5a5a' />
 </a>
</p>


# 框架介绍

基于 webpack、Vue、axios、vue-router、ElementUI以及微前端开发模式，让初学者能够更快的入门并投入到团队开发中去。该脚手架包含多语言切换、主题切换、内容全屏等基本功能。为微小中大型项目的开发，提供现成的开箱即用的脚手架。已开发功能模块包含：访问控制、报警排班、资产管理、配置管理、数据分析、设备联动、设备列表、设备管理、事件查询、日志预览、菜单管理、实时快照、定时报表、定时任务、权限管理、工单管理等。


# 学习准备
- [VSCode](https://code.visualstudio.com/)
- [Node.js 14](http://nodejs.org/) - 开发环境
- [git](https://git-scm.com/) - 开发环境
- [Vue-2](https://v2.vuejs.org/) - 熟悉 Vue 基础语法
- [ES6+](http://es6.ruanyifeng.com/) - 熟悉 ES6 基本语法
- [Vue-Router-v3](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [ElementUI](https://element.eleme.io/#/zh-CN) - 熟悉 UI 及表单列表及常用组件使用

# 安装使用
- 如果没有安装 Node.js 14，下载地址：<https://nodejs.org>，6.0使用 RefactorUI分支，6.1使用RefactorUI-6.1

```shell
# 验证
ctrl+R输入cmd,回车
输入命令 node -v

- 获取对应分支代码
git clone https://gitee.com/shend/webui-base-frame -b RefactorUI

注意：不要放到中文或带空格的目录下。

1：npm install安装依赖
2: npm run init-lat 更新最新基础配置
3: npm run init-fix 更新稳定基础配置
5：模块开发路径：/pages/xxx，模块命名：xxx-iotcenter-xxx

```

## 开发环境
```开发环境
执行脚本npm run dev-all
```

## 生产环境
```生产环境
1:打包外框：npm run build-frame
2:打包模块: npm run build-all
```

# 目录说明
```shell
├─ build
..├─ dev-entries.js            # 开发环境各模块按需加载入口
..├─ build-all.js              # 生产环境构建
..├─ build.js                  # 生产环境构建
..├─ check-versions.js         # 数据库连接
..├─ complieReset.js           # 编译reset.scss样式文件
..├─ html-inject-plugin.js     # 构建环境插件，用于往html文件添加script、link等标签
..├─ module-conf-empty.js      # 开发环境模块按需加载配置
..├─ module-conf.js            # 构建环境模块校验
..├─ utils.js                  # 构建相关工具
..├─ vue-loader.conf.js        # css加载配置
..├─ webpack.base.conf.js      # webpack加载配置
..├─ webpack.dev.conf.js       # webpack开发环境配置
..├─ webpack.prod.conf.js      # webpack生产环境配置

├─ config
..├─ dev.env.js                # 项目开发环境配置
..├─ index.js                  # 项目主要配置（包括监听端口、打包路径)
..├─ prod.env.all.js           # webpack生产环境配置
..├─ prod.env.js               # 项目生产环境配置

├─ pages                       # 所有模块页面开发放这文件夹中，以xxx-iotcenter-xxx模块格式命名

├─ static                      # 静态文件
   ..├─ fonts                  # 字体文件
   ..├─ http                   # 全局请求配置
   ..├─ images                 # 静态图片
   ..├─ js                     # 全局js，如字体图标配置
   ..├─ themes                 # 主题
├─ .babelrc                    # babel编译参数
├─ .editorconfig               #  代码格式
├─ .eslintignore               # eslint代码检测忽略配置
├─ .eslintrc.js                # eslint 语法检测
├─ .gitignore                  # git上传需要忽略的文件配置
├─ .gitmodules                 # 子模块配置
├─ .jsbeautifyrc               # 代码格式化配置
├─ .postcssrc.js               # 转换css的工具
├─ .prettierignore             # 代码格式忽略文件配置
├─ .prettierrc.cjs             # 代码格式配置
├─ .commitlint.config.cjs      # 代码提交lint检测配置
├─ .project                    # 项目信息说明
├─ index.html                  # 主页
├─ init.js                     # 初始化下载基础配置
├─ npmLogin.js                 # 登录私有镜像
├─ package.json                # 项目基本信息
├─ yarn.lock                   # 安装管理工具
├─ README.md                   # 项目说明
├─ updatePackage.js            # 更新私有模块包
```

# package.json中scripts脚本说明
```shell
├─ public                      # 设置淘宝镜像
├─ private                     # 设置私有镜像，公司开发的工具、组件发布在私有镜像中
├─ group                       # 设置私有镜像，公司开发的工具、组件发布在私有镜像中
├─ addThemeModule              # 添加主题子模块
├─ downloadTheme               # 下载子主题模块
├─ deleteTheme                 # 删除子模块缓存
├─ dev-all                     # 开发环境编译脚本
├─ build-all                   # 生产环境功能模块构建
├─ build-frame                 # 生产环境主体框架构建
├─ init                        # 下载主题、更改依赖指向、下载私有公有依赖库
├─ lint:init                   # 工程化工具husky commitizen lint-staged、cz-git、eslint、prettier安装
├─ prepare                     # 工程化工具husky安装
├─ lint                        # 检测项目中的warning、error
├─ lint:lint-staged            # 检测暂存区的warning、error
├─ lint:eslint                 # 检测项目中的warning、error,并尝试修复
├─ lint:prettier               # 代码提交prettier检测
├─ commit                      # 代码暂存区，所有文件根据prettier配置格式化
├─ init-fix                    # 下载稳定版基础配置
├─ init-lat                    # 下载最新版配置
├─ update-mod                  # 更新私有模块包

```

# 自定义组件、方法说明
## gw-base-api-plus

## gw-base-components-plus
```shell
├─ asideMenu                   # 顶部菜单、左侧菜单组件
├─ contextMenu                 # tab菜单邮件功能
├─ echartList                  # 图表
   ├─ barEchart                # 柱状图
   ├─ curve                    # 曲线图
   ├─ historyEchart            # 历史记录曲线图，如数据分析模块
   ├─ solid-bar                # 柱状图
   ├─ solid-circle             # 圆形图
   ├─ solid-pie                # 饼图
├─ equipProcessing             # 设备列表数据缓存
├─ equipSelect                 # 设备选择弹窗
├─ gwTable                     # table表格公用组件
├─ gwtree                      # 新版树形结构
├─ gwTreeNoCache               # 不缓存设备数据的树形结构
├─ isDebug                     # 调试状态提示组件
├─ loading                     # loading组件
├─ loadMore                    # 滚动加载组件
├─ selectV2                    # 滚动加载下拉框组件
├─ treev2                      # 改装版树形结构组件（由于后台原因，阻塞中）
├─ unreadMsg                   # 消息组件
├─ widthSetting                # 伸缩组件

```

## gw-base-noAccess
```shell
├─ Image                       # 图片
..├─ noAccess.vue              # 无权限提示组件
..├─ noPage.vue                # 无相关页面提示组件
```

## gw-base-style-plus
```shell
├─ elementStyleReset           # element样式包
├─ Images                      # 图片
├─ modular                     # 图片
   ..├─ alertHandle            # 弹窗样式
   ..├─ browserScroll          # 滚动条样式
   ..├─ btnHandle              # 按钮样式
   ..├─ containerHandle        # 容器样式
   ..├─ dialogStyle            # dialog弹窗样式
   ..├─ equipStatus            # 设备状态样式
   ..├─ inputStyle             # 输入框样式
   ..├─ listHandle             # 列表样式
   ..├─ noDataTips             # 暂无数据提示样式
   ..├─ tableHandle            # table表格样式
   ..├─ txtHandle              # 字体样式
..├─ index.scss                # 主体框架样式
..├─ style.scss                # modular样式引用文件
..├─ videoPlaybackCom.scss     # 视频回放样式文件
..├─ videoPlayer.scss          # 视频播放器样式文件
..├─ VideoSystem.scss          # 视频系统样式文件

```

## gw-base-utils-plus
```shell
..├─ apiutils                  # 涉及到api请求的公共方法
..├─ commonutils               # 公共方法（防抖、日期格式化、去重等）
..├─ formValidate              # 表单校验
..├─ gwI18n                    # i18n工具
..├─ historyExport             # 全局历史曲线导出
..├─ i18n                      # 基于gwI18n封装的公用方法
..├─ keyEvent                  # 键盘事件（切换页面）
..├─ message                   # 消息提示组件
..├─ moduleObserve             # i18n语言切换监听
..├─ myUtils                   # 公共方法（防抖、日期格式化、去重等）
..├─ notification              # 消息提示组件
..├─ speaktts                  # 语音播报组件

```


# vscode插件安装和配置

#### 点击插件管理，安装常用基础插件

1. **Vetur —— 语法高亮、智能感知、Emmet等（包含格式化功能， Alt+Shift+F （格式化全文））---- 建议安装**
2. **EsLint —— 语法纠错---- 建议安装**
3. Auto Close Tag —— 自动闭合HTML/XML标签
4. Auto Rename Tag —— 自动完成另一侧标签的同步修改 
5.  JavaScript(ES6) code snippets —— ES6语法智能提示以及快速输入，除js外还支持.ts，.jsx，.tsx，.html，.vue，省去了配置其支持各种包含js代码文件的时间
6.  Beautify——格式化代码，值得注意的是，beautify插件支持自定义格式化代码规则
7.  Path Intellisense —— 自动路径补全 
8.  HTML CSS Support —— 让 html 标签上写class 智能提示当前项目所支持的样式
9.  Highlight Matching Tag (html中高亮标签的开合)
10.  open in browser (安装后，右击html即可打开文件到浏览器浏览，但不占用ip + 端口)
11.  Markdown Preview Enhanced (程序员写markdown，这个可边写边预览markdown效果)
12. SVG Viewer (svg 图片预览)
13. TODO Highlight (代码还没写完，下次提示自己，可以写个TODO，会高亮)
14. **Import Cost (可以显示引入的插件或者第三方库体积大小，报红一般需要优化) ---- 建议安装**
15. JavaScript Booster (js写法优化提示，写的不够好，或有其它写法，有灯泡提示)
16. Codelf (变量命名神器)
17. Chinese (Simplified) Language Pack for Visual Studio Code (中文版VScode 值得用)
18. GitLens — Git supercharged (代码可跟踪，能显示最近一次是谁提交)
19. Bracket Pair Colorizer (括号闭合高亮，便于查闭合，代码块区分)
20. 20. change-case (方便改大小写)
21. **Better Comments (注释分类高亮) ---- 建议安装**
22. **Prettier - Code formatter (配合eslint 进行代码自动修复，注意配置自己需要的规范) ---- 建议安装**
23. REST Client (不想用postman，可以用该插件替代)
24. Version Lens (package.json中下载的插件有更新了，当前是否是最新都会提示)
25. **Vue VSCode Snippets (必备，写vue时的语法、生命周期，模板等提示) ---- 建议安装**
26. **vutur vue 语法提示 ---- 建议安装**
27. **Document This(customize-tags) 意见添加文档注释 ---- 建议安装**
28. **Error Lens 行内显示错误 ---- 建议安装**
29. Image preview 显示LOGO
30. Beautify css/sass/scss/less  美化样式
31. Indenticator 缩进对应层级高亮
32. **vscode-fileheader 文档头部Meta  ---- 建议安装**



#### vscode 配置书写代码规范注释规范settings

vscode-> 设置->code Actions On Save->在settings.json中编辑，把以下配置复制进去，主要注释头，要修改为自己的名称

```
{
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    // 重新设定tabsize
    "editor.tabSize": 4,
    "prettier.tabWidth": 4,
    "vetur.format.options.tabSize": 4,
    // #每次保存的时候自动格式化
    "editor.formatOnSave": true,
    // #每次保存的时候将代码按eslint格式进行修复
    "eslint.autoFixOnSave": true,
    //模板
    "vetur.validation.template": false,
    // 添加 vue 支持
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    // #让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    // #让vue中的js按编辑器自带的ts格式进行格式化
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    // #这个按用户自身习惯选择
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "aligned-multiple"
        },
        "prettier": {
            "semi": false, // 去掉分号
            "singleQuote": false // true 为使用单引号
        }
    },
    "explorer.confirmDelete": false,
    "git.enableSmartCommit": true,
    "diffEditor.ignoreTrimWhitespace": false,
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur" // 使用 vetur 格式化规则
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    //修改标签对
    "auto-rename-tag.activationOnLanguage": [
        "html",
        "xml",
        "php",
        "javascript",
        "vue"
    ],    
    // fileheader
    "fileheader.configObj": {
        "createFileTime": true,
        "language": {
            "languagetest": {
                "head": "/$$",
                "middle": " $ @",
                "end": " $/",
                "functionSymbol": {
                    "head": "/** ",
                    "middle": " * @",
                    "end": " */"
                },
                "functionParams": "js"
            }
        },
        "autoAdd": true,
        "autoAddLine": 100,
        "autoAlready": true,
        "annotationStr": {
            "head": "/*",
            "middle": " * @",
            "end": " */",
            "use": true
        },
        "headInsertLine": {
            "php": 2,
            "sh": 2
        },
        "beforeAnnotation": {
            "文件后缀": "该文件后缀的头部注释之前添加某些内容"
        },
        "afterAnnotation": {
            "文件后缀": "该文件后缀的头部注释之后添加某些内容"
        },
        "specialOptions": {
            "特殊字段": "自定义比如LastEditTime/LastEditors"
        },
        "switch": {
            "newlineAddAnnotation": true
        },
        "supportAutoLanguage": [],
        "prohibitAutoAdd": ["json"],
        "folderBlacklist": ["node_modules", "文件夹禁止自动添加头部注释"],
        "prohibitItemAutoAdd": [
            "项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"
        ],
        "moveCursor": true,
        "dateFormat": "YYYY-MM-DD HH:mm:ss",
        "atSymbol": ["@", "@"],
        "atSymbolObj": {
            "文件后缀": ["头部注释@符号", "函数注释@符号"]
        },
        "colon": [": ", ": "],
        "colonObj": {
            "文件后缀": ["头部注释冒号", "函数注释冒号"]
        },
        "filePathColon": "路径分隔符替换",
        "showErrorMessage": false,
        "writeLog": false,
        "wideSame": false,
        "wideNum": 13,
        "functionWideNum": 0,
        "CheckFileChange": false,
        "createHeader": false,
        "useWorker": false,
        "designAddHead": false,
        "headDesignName": "random",
        "headDesign": false,
        "cursorModeInternalAll": {},
        "openFunctionParamsCheck": true,
        "functionParamsShape": ["{", "}"],
        "functionBlankSpaceAll": {},
        "functionTypeSymbol": "*",
        "typeParamOrder": "type param",
        "customHasHeadEnd": {},
        "throttleTime": 60000,
        "functionParamAddStr": "",
        "NoMatchParams": "no show param",
        "param": "param2", // 函数注释parm参数别名
         "return": "return2", // 函数注释return参数别名
    },
    // 函数注释
    "fileheader.cursorMode": {
        "param2": "",
        "description": "", // 函数注释生成之后，光标移动到这里
        "param": "", // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行
        "return": ""
    },
    "fileheader.Author": "我是注释名称",
    "fileheader.LastModifiedBy": "我是注释名称",
    "settingsSync.ignoredExtensions": [

    ],
    "settingsSync.ignoredSettings": [

    ],
    "editor.fontSize": 18,
}
```



# 脚手架特点

```shell
1：webpack配置相对比较完善，无需自己配置
2：有已开发的公用方法和组件，即插即用
3：采用微前端开发模式，按功能模块打包
4：完善的组件间通讯
5：国际语言、主题的简易使用
```



# 更新日志

2023.06.25 更新README.md文件