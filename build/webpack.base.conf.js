/**
 * @fileOverview wabpack基础配置，开发和生产环境下的公共配置
 */

'use strict'
const webpack = require('webpack')
// 引入nodejs路径模块，用于操作路径
const path = require('path')
// 加载utils配置文件，用来解决css相关文件loader
const utils = require('./utils')
// 引入config目录下的index.js配置文件，获取生产和开发环境的相关属性
const config = require('../config')
// vue-loader.conf配置文件是用来解决各种css文件的，定义了诸如css,less,sass之类的和样式有关的loader
const vueLoaderConfig = require('./vue-loader.conf')
const glob = require('glob')

const moduleList = require('./module-conf');

// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// 生成相对于根目录的绝对路径，因为有个'..'
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// 生成开发环境下ganwei-base-*路径数组
function resolveGlob(dir) {
    return glob.sync(resolve(dir)).map(item => {
        return item.replace(/\//g, '\\');
    })
}

// eslint的规则
const createLintingRule = () => ({
    // 对.js和.vue结尾的文件进行eslint检查
    test: /\.(js|vue)$/,
    // 使用eslint-loader
    loader: 'eslint-loader',
    // enforce的值可能是pre和post。其中pre有点和webpack@1中的preLoader配置含义相似。
    // post和v1中的postLoader配置含义相似。表示loader的调用时机
    // 这里表示在调用其他loader之前需要先调用这个规则进行代码风格的检查
    enforce: 'pre',
    // 需要进行eslint检查的文件的目录存在的地方
    include: [resolve('src'), resolve('test')],
    // eslint-loader配置过程中需要指定的选项
    options: {
        // 文件风格的检查的格式化程序，这里使用的是第三方的eslint-friendly-formatter
        formatter: require('eslint-friendly-formatter'),
        // 是否需要eslint输出警告信息
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

// 下面就是webpack基本的配置信息（可以理解成是开发环境和生产环境公共的配置）
module.exports = {
    // webpack解析文件时候的根目录(如果把webpack.config.js)放在了项目的根目录下面，这个配置可以省略
    context: path.resolve(__dirname, '../'),
    // 指定项目的入口文件
    // entry: {
    //     app: ['babel-polyfill', './src/main.js']
    // },
    entry() {
        const entry = {};
        switch(process.env.NODE_ENV_ALL){
            case 'proAll': {
                // 所有模块的列表
                const moduleToBuild = moduleList.getModuleToBuild() || []
                // 根据传入的待打包目录名称，构建多入口配置
                for (let module of moduleToBuild) {
                    entry[module] = `./src/modules/${module}/index.js`
                }
                break;
            }
            case 'proFrame': {
                entry['app'] = `./src/main-pro.js`;
                break;
            }
            case 'debugAll': {
                entry['app'] = `./src/main.js`;
                // 所有模块的列表
                // 根据传入的待打包目录名称，构建多入口配置
                for (let module of moduleList.moduleList) {
                    entry[module] = `./build/dev-entries/${module}.js`
                }
                break;
            }
            default: {
                entry['app'] = `./src/main.js`
                break;
            }
        }
        return entry
    },

    // 项目的输出配置
    output: {
        // 项目build的时候，生成的文件的存放路径(这里的路径是../dist)
        path: config.build.assetsRoot,
        // 生成文件的名称
        filename: '[name].js',
        // 输出解析文件的目录，url 相对于 HTML页面(生成的html文件中，css和js等静态文件的url前缀)
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // 配置模块解析时候的一些选项
    resolve: {
        // 指定哪些类型的文件可以引用的时候省略后缀名
        extensions: ['.js', '.vue', '.json'],
        // 别名，在引入文件的时候可以使用
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // 可以在引入文件的时候使用@符号引入src文件夹中的文件
            '@': resolve('src'),
            '@static': resolve('static'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@page': resolve('src/components'),
            '@vendor': path.resolve(__dirname, '../src/vendor')
        }
    },
    // 下面是针对具体的模块进行的具体的配置
    // 下面的配置语法采用的是version >= @2的版本
    module: {
        // rules是一个数组，其中的每一个元素都是一个对象，这个对象是针对具体类型的文件进行的配置。
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            // 创建ESLint配置
            {
                // .vue文件的配置
                // 这个属性是一个正则表达式，用于匹配文件。这里匹配的是.vue文件
                test: /\.vue$/,
                // 指定该种类型文件的加载器名称
                loader: 'vue-loader',
                // 针对此加载器的具体配置
                // 针对前面的分析，这个配置对象中包含了各种css类型文件的配置，css source map的配置 以及一些transform的配置
                options: vueLoaderConfig
            },
            {
                // .js文件的配置
                test: /\.js$/,
                // 对js文件使用babel-loader转码,该插件是用来解析es6等代码 在这里没有指定具体的编译规则，babel-loader会自动
                // 读取根目录下面的.babelrc中的babel配置用于编译js文件
                loader: 'babel-loader',
                // 指定需要进行编译的文件的路径
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client'), ...resolveGlob('node_modules/ganwei-base-*')]
            },
            {
                // 对图片资源进行编译的配置
                // 指定文件的类型
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                // 使用url-loader进行文件资源的编译
                loader: 'url-loader',
                // url-loader的配置选项
                options: {
                    // 文件的大小小于10000字节(10kb)的时候会返回一个dataUrl
                    limit: 10000,
                    // 生成的文件的保存路径和后缀名称
                    publicPath: process.env.NODE_ENV_ALL == 'proAll'?'./':'../../',
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                // 对scss文件进行打包编译
                test: /\.scss$/,
                use: [{
                    loader: 'vue-style-loader'
                }]
            },
            {
                // 对视频文件进行打包编译
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // 文件的大小小于10000字节(10kb)的时候会返回一个dataUrl
                    limit: 10000,
                    // 生成的文件的保存路径和后缀名称
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                // 对字体文件进行打包编译
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    // 用ProvidePlugin进行实例初始化后，jquery就会被自动加载并导入对应的node模块中
    plugins: [new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })],
    // 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
    // 这可以使最初为nodejs编写的代码可以在浏览器端运行
    node: {
        // 这个配置是一个对象，其中的每个属性都是nodejs全局变量或模块的名称
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        // false表示什么都不提供。如果获取此对象的代码，可能会因为获取不到此对象而触发ReferenceError错误
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        // 设置成empty则表示提供一个空对象
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
