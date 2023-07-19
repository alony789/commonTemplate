const fs = require('fs')
const { execSync } = require('child_process')
execSync('npm install gw-base-frame-version@latest --registry=http://139.9.43.67:8081/repository/npm-hosted/ --save-optional', { stdio: [0, 1, 2] })

if (!fs.existsSync('./node_modules/gw-base-frame-version/')) {
    console.log('加载配置文件失败')
    console.log('若初始化失败，请删除package.lock，若提示401、403等，请登录私有镜像')
    return;
} else {
    const downloadFrame = require('./node_modules/gw-base-frame-version/downloadFrame.js')
    downloadFrame(process.argv[2])
}








