#!/usr/bin/env node
const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')
execSync('npm uninstall prompts', { stdio: [0, 1, 2] })
execSync('npm install gw-module-version@latest --registry=http://139.9.43.67:8081/repository/npm-hosted/ --save-optional', { stdio: [0, 1, 2] })
let url = path.resolve('./node_modules/gw-module-version/')
if (!fs.existsSync(url)) {
    console.log('加载配置文件失败')
    console.log('若初始化失败，请删除package.lock，若提示401、403等，请登录私有镜像')
} else {
    const downloadModule = require(`${url}/downloadModule.js`)
    downloadModule(process.argv)
}
